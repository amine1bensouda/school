import ExamsPageForm from '@/components/Admin/ExamsPageForm';
import { getExamsPageSettings } from '@/lib/site-settings';

export default async function AdminExamsPage() {
  const settings = await getExamsPageSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Exams page
        </h1>
        <p className="text-gray-600">
          Edit the public Exams listing at /quiz
        </p>
      </div>
      <ExamsPageForm
        initialData={{
          examsTitle: settings.examsTitle,
          examsSubtitle: settings.examsSubtitle,
          examsLandingHtml: settings.examsLandingHtml || '',
          examsMetaTitle: settings.examsMetaTitle || '',
          examsMetaDescription: settings.examsMetaDescription || '',
        }}
      />
    </div>
  );
}
