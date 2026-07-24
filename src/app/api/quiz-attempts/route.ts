import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth-server';
import { scoreQuizAttempt, type SubmittedAnswer } from '@/lib/quiz-attempt-score';


export const dynamic = 'force-dynamic';

/**
 * GET /api/quiz-attempts
 * Récupère tous les quiz attempts de l'utilisateur connecté
 */
export async function GET() {
  try {
    const user = await requireAuth();

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        userId: user.id,
      },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: {
        completedAt: 'desc',
      },
    });

    return NextResponse.json({ attempts });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error getting quiz attempts:', error);
    return NextResponse.json(
      { error: 'Failed to get quiz attempts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/quiz-attempts
 * Crée un nouveau quiz attempt
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();

    const { quizId, answers, timeSpent } = body;

    // Validation
    if (!quizId || !Array.isArray(answers) || !Number.isFinite(timeSpent)) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Vérifier que le quiz existe
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: { include: { answers: true } } },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    // Créer le quiz attempt
    const submitted: SubmittedAnswer[] = answers
      .filter((item: unknown): item is SubmittedAnswer => Boolean(
        item && typeof item === 'object' &&
        typeof (item as SubmittedAnswer).questionId === 'string' &&
        typeof (item as SubmittedAnswer).answer === 'string'
      ))
      .slice(0, quiz.questions.length);
    const result = scoreQuizAttempt(quiz.questions, submitted);

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId,
        ...result,
        timeSpent: Math.max(0, Math.min(Math.trunc(timeSpent), 24 * 60 * 60)),
      },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(
      { attempt },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error creating quiz attempt:', error);
    return NextResponse.json(
      { error: 'Failed to create quiz attempt' },
      { status: 500 }
    );
  }
}
