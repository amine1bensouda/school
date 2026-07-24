import test from 'node:test';
import assert from 'node:assert/strict';
import { createSignedToken, verifySignedToken } from '../src/lib/signed-token';
import { sanitizeCss, sanitizeHtml } from '../src/lib/sanitize-html';
import { extensionForMime, validateUploadBytes } from '../src/lib/upload-validation';
import { scoreQuizAttempt } from '../src/lib/quiz-attempt-score';

test('signed session rejects a forged token', async () => {
  const token = await createSignedToken('user-1', 'a-long-test-secret', 'user.v1');
  assert.equal(await verifySignedToken(token, 'a-long-test-secret', 'user.v1', 60_000), 'user-1');
  assert.equal(await verifySignedToken(token.replace('user-1', 'user-2'), 'a-long-test-secret', 'user.v1', 60_000), null);
});

test('HTML and CSS sanitizers remove executable content', () => {
  const clean = sanitizeHtml('<p onclick="evil()">ok</p><script>alert(1)</script><a href="javascript:evil()">x</a>');
  assert.equal(clean.includes('script'), false);
  assert.equal(clean.includes('onclick'), false);
  assert.equal(clean.includes('javascript:'), false);
  assert.equal(sanitizeCss('@import "evil";a{background:url(javascript:x)}').includes('javascript:'), false);
});

test('upload validation uses file bytes and fixed extensions', () => {
  const pdf = Uint8Array.from(Buffer.from('%PDF-1.7'));
  assert.equal(validateUploadBytes('application/pdf', pdf.buffer), true);
  assert.equal(validateUploadBytes('image/png', pdf.buffer), false);
  assert.equal(extensionForMime('application/pdf'), '.pdf');
  assert.equal(extensionForMime('application/x-php'), null);
});

test('quiz score ignores client-provided totals', () => {
  const result = scoreQuizAttempt([
    { id: 'q1', type: 'multiple_choice', answers: [{ text: '4', isCorrect: true }, { text: '5', isCorrect: false }] },
    { id: 'q2', type: 'multiple_choice', answers: [{ text: '9', isCorrect: true }] },
  ], [{ questionId: 'q1', answer: '4' }, { questionId: 'q2', answer: 'wrong' }]);
  assert.deepEqual(result, { score: 1, correctAnswers: 1, totalQuestions: 2, percentage: 50 });
});
