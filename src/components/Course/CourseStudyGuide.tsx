import Link from 'next/link';
import type { CourseGuide } from '@/lib/course-guides';
import type { CourseLesson } from '@/lib/course-lessons';
import FaqSchema from '@/components/SEO/FaqSchema';

interface CourseStudyGuideProps {
  courseSlug: string;
  guide: CourseGuide;
  lessons: CourseLesson[];
}

export default function CourseStudyGuide({ courseSlug, guide, lessons }: CourseStudyGuideProps) {
  return (
    <article className="mb-10 sm:mb-12 space-y-8">
      <FaqSchema items={guide.faq} />

      <section className="rounded-2xl bg-white/90 border border-white/60 shadow-lg p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700 mb-2">
          Course guide
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{guide.headline}</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {guide.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-white/90 border border-white/60 shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{guide.overviewTitle}</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {guide.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {lessons.length > 0 && (
        <section aria-label="Lessons">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Lessons</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lessons.map((lesson, index) => (
              <li key={lesson.slug}>
                <Link
                  href={`/quiz/course/${encodeURIComponent(courseSlug)}/lesson/${lesson.slug}`}
                  className="block h-full rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                    Lesson {index + 1}
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-gray-900">{lesson.title}</span>
                  <span className="mt-2 block text-sm text-gray-600 leading-relaxed">{lesson.summary}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="rounded-2xl bg-white/90 border border-white/60 shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Skills to practice</h2>
        <ul className="space-y-4">
          {guide.skills.map((skill) => (
            <li key={skill.title}>
              <h3 className="font-semibold text-gray-900">{skill.title}</h3>
              <p className="text-gray-700 leading-relaxed">{skill.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Worked examples</h2>
        {guide.examples.map((example) => (
          <div key={example.title} className="rounded-2xl bg-white/90 border border-white/60 shadow-lg p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{example.title}</h3>
            <p className="text-gray-800 mb-3">{example.question}</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 mb-3">
              {example.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Takeaway. </span>
              {example.takeaway}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl bg-white/90 border border-white/60 shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">A study sequence</h2>
        <ol className="space-y-4">
          {guide.plan.map((step, index) => (
            <li key={step.title}>
              <h3 className="font-semibold text-gray-900">
                {index + 1}. {step.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl bg-white/90 border border-white/60 shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Before you answer</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {guide.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-white/90 border border-white/60 shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Questions students ask</h2>
        <dl className="space-y-5">
          {guide.faq.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold text-gray-900">{item.question}</dt>
              <dd className="mt-1 text-gray-700 leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
