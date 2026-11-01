'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SeoFields from './SeoFields';

interface ExamsPageFormData {
  examsTitle: string;
  examsSubtitle: string;
  examsLandingHtml: string;
  examsMetaTitle: string;
  examsMetaDescription: string;
}

interface ExamsPageFormProps {
  initialData: ExamsPageFormData;
}

export default function ExamsPageForm({ initialData }: ExamsPageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ExamsPageFormData>(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examsTitle: formData.examsTitle,
          examsSubtitle: formData.examsSubtitle,
          examsLandingHtml: formData.examsLandingHtml || null,
          examsMetaTitle: formData.examsMetaTitle || null,
          examsMetaDescription: formData.examsMetaDescription || null,
        }),
      });
      if (response.ok) {
        router.refresh();
        alert('Exams page saved');
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.details || data.error || 'Error saving');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Exams page content</h2>
          <p className="text-sm text-gray-500 mt-1">
            Edits the public page{' '}
            <a href="/quiz" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
              /quiz
            </a>
            . Course cards still come from published courses.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            required
            value={formData.examsTitle}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, examsTitle: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="All Exams"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intro text *
          </label>
          <textarea
            required
            rows={3}
            value={formData.examsSubtitle}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, examsSubtitle: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="{count} exams available to test your knowledge..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Use <code className="text-xs">{'{count}'}</code> to insert the number of quizzes
            (e.g. “810 exams”).
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Full page HTML / CSS (optional)</h2>
          <p className="text-sm text-gray-500 mt-1">
            If filled, this code replaces the entire Exams page (title, intro, and course
            cards). Leave empty to keep the default layout editable above.
          </p>
        </div>
        <textarea
          value={formData.examsLandingHtml}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, examsLandingHtml: e.target.value }))
          }
          rows={16}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
          placeholder={'<section>\n  <h1>All Exams</h1>\n</section>\n<style>\nsection { padding: 48px; }\n</style>'}
          spellCheck={false}
        />
      </div>

      <SeoFields
        metaTitle={formData.examsMetaTitle}
        metaDescription={formData.examsMetaDescription}
        defaultTitle={formData.examsTitle}
        defaultDescription={formData.examsSubtitle.replace(/\{count\}/g, 'exams')}
        onMetaTitleChange={(value) =>
          setFormData((prev) => ({ ...prev, examsMetaTitle: value }))
        }
        onMetaDescriptionChange={(value) =>
          setFormData((prev) => ({ ...prev, examsMetaDescription: value }))
        }
      />

      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !formData.examsTitle.trim()}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Exams page'}
        </button>
      </div>
    </form>
  );
}
