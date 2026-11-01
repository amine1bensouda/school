import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  invalidateSiteSettingsCache,
  SITE_SETTINGS_ID,
} from '@/lib/site-settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const row = await prisma.siteSettings.upsert({
      where: { id: SITE_SETTINGS_ID },
      create: { id: SITE_SETTINGS_ID },
      update: {},
    });
    return NextResponse.json(row);
  } catch (error: any) {
    console.error('GET /api/admin/site-settings:', error);
    return NextResponse.json(
      { error: 'Failed to load settings', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      examsTitle,
      examsSubtitle,
      examsLandingHtml,
      examsMetaTitle,
      examsMetaDescription,
    } = body;

    const row = await prisma.siteSettings.upsert({
      where: { id: SITE_SETTINGS_ID },
      create: {
        id: SITE_SETTINGS_ID,
        examsTitle:
          examsTitle != null && String(examsTitle).trim() !== ''
            ? String(examsTitle).trim()
            : 'All Exams',
        examsSubtitle:
          examsSubtitle != null && String(examsSubtitle).trim() !== ''
            ? String(examsSubtitle).trim()
            : '{count} exams available to test your knowledge and improve your mathematics skills',
        examsLandingHtml:
          examsLandingHtml != null && String(examsLandingHtml).trim() !== ''
            ? String(examsLandingHtml)
            : null,
        examsMetaTitle:
          examsMetaTitle != null && String(examsMetaTitle).trim() !== ''
            ? String(examsMetaTitle).trim()
            : null,
        examsMetaDescription:
          examsMetaDescription != null &&
          String(examsMetaDescription).trim() !== ''
            ? String(examsMetaDescription).trim()
            : null,
      },
      update: {
        ...(examsTitle !== undefined && {
          examsTitle:
            examsTitle != null && String(examsTitle).trim() !== ''
              ? String(examsTitle).trim()
              : 'All Exams',
        }),
        ...(examsSubtitle !== undefined && {
          examsSubtitle:
            examsSubtitle != null && String(examsSubtitle).trim() !== ''
              ? String(examsSubtitle).trim()
              : '{count} exams available to test your knowledge and improve your mathematics skills',
        }),
        ...(examsLandingHtml !== undefined && {
          examsLandingHtml:
            examsLandingHtml != null && String(examsLandingHtml).trim() !== ''
              ? String(examsLandingHtml)
              : null,
        }),
        ...(examsMetaTitle !== undefined && {
          examsMetaTitle:
            examsMetaTitle != null && String(examsMetaTitle).trim() !== ''
              ? String(examsMetaTitle).trim()
              : null,
        }),
        ...(examsMetaDescription !== undefined && {
          examsMetaDescription:
            examsMetaDescription != null &&
            String(examsMetaDescription).trim() !== ''
              ? String(examsMetaDescription).trim()
              : null,
        }),
      },
    });

    invalidateSiteSettingsCache();
    return NextResponse.json(row);
  } catch (error: any) {
    console.error('PUT /api/admin/site-settings:', error);
    return NextResponse.json(
      { error: 'Failed to save settings', details: error.message },
      { status: 500 }
    );
  }
}
