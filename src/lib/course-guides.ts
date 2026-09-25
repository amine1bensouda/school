export type CourseGuide = {
  name: string;
  headline: string;
  summary: string;
  introduction: string[];
  overviewTitle: string;
  overview: string[];
  skills: { title: string; text: string }[];
  examples: { title: string; question: string; steps: string[]; takeaway: string }[];
  plan: { title: string; text: string }[];
  tips: string[];
  faq: { question: string; answer: string }[];
};

// Independently written guides for the seven published question banks.
// Counts, quiz URLs, and durations belong to the database, not editorial copy.
export const courseGuides: Record<string, CourseGuide> = {
  'psat-8-9-math': {
    name: 'PSAT 8/9 Math',
    headline: 'Build strong foundations, one topic at a time',
    summary: 'Start with equations, ratios, and graphs. Develop the reasoning that makes unfamiliar math problems easier to approach, then put it into practice with topic quizzes and mixed exercises.',
    introduction: [
      'A useful PSAT 8/9 practice session begins with a small question: which step can you explain, and which step still feels like a guess? The aim is to strengthen the foundations behind your answers. Getting an equation right once is less useful than being able to set up a similar equation in a new situation.',
      'This bank separates linear equations, functions, systems, inequalities, data, and geometry into focused modules. Choose a topic you have already encountered in class, attempt a short set, and compare your method with the correction. Build accuracy before using timed practice to work on pace.',
    ],
    overviewTitle: 'What to work on in PSAT 8/9 math',
    overview: [
      'Linear reasoning connects much of the early work. Solving for an unknown, reading the slope of a line, and finding a unit rate all involve understanding how quantities relate. Write down what each variable measures before manipulating it. A number of tickets and a ticket price have different units even if both appear in the same problem.',
      'As you move into nonlinear expressions and geometry, keep the same habit of checking meaning. A squared length represents an area, a percentage needs a reference amount, and a graph has a particular scale. These checks are often enough to catch an answer that looks algebraically plausible but does not fit the question.',
    ],
    skills: [
      { title: 'Equations and graphs', text: 'Keep both sides balanced, interpret a starting value and a rate, and test a proposed solution in the original equation.' },
      { title: 'Ratios and data', text: 'Distinguish a part-to-part ratio from a part-to-whole fraction. Choose the correct total when reading a table or calculating a percentage.' },
      { title: 'Geometric reasoning', text: 'Label lengths and angles, identify perpendicular height, and separate perimeter, area, and volume before choosing a formula.' },
    ],
    examples: [
      { title: 'Translate a cost into an equation', question: 'A notebook costs $3. A student buys several notebooks and a $5 folder for $23. How many notebooks did the student buy?', steps: ['Let n be the number of notebooks. The total cost is 3n + 5 dollars.', 'Set 3n + 5 = 23. Subtract 5 from both sides to get 3n = 18.', 'Divide by 3: n = 6. Check that 6 × 3 + 5 = 23.'], takeaway: 'The fixed folder cost is added once. Defining the unknown prevents multiplying that fee by the number of notebooks.' },
      { title: 'Keep the ratio in the right order', question: 'A mixture uses 2 cups of concentrate for every 5 cups of water. How much concentrate is needed for 15 cups of water?', steps: ['The amount of water is multiplied by 15/5 = 3.', 'Multiply the concentrate by the same factor: 2 × 3 = 6 cups.', 'The resulting ratio 6:15 simplifies to 2:5.'], takeaway: 'Scale both quantities together. The total mixture is 21 cups, which is different from the requested amount of concentrate.' },
    ],
    plan: [
      { title: 'Begin with one-variable equations', text: 'Work without a timer and show each equivalent equation. Revisit distribution and fractions if the algebra breaks down.' },
      { title: 'Connect a table to a graph', text: 'Use linear functions to describe what changes and what stays fixed. Explain a slope in words and units.' },
      { title: 'Add data and geometry', text: 'Alternate percentage and ratio practice with lengths, angles, and areas. Keep a note of which denominator or formula you chose.' },
      { title: 'Try a mixed session', text: 'Use a mini-exam after your focused work. Review missed questions by topic, then return to the module that addresses the gap.' },
    ],
    tips: ['Read the requested quantity again before selecting an answer.', 'Estimate first: a discounted price should not exceed the original price.', 'Keep fractions exact until the last step when possible.', 'If you guessed correctly, still review the method; the score alone does not reveal a gap.'],
    faq: [
      { question: 'Where should I start if algebra is difficult?', answer: 'Start with the linear-equation modules and work slowly. Check distribution, signed arithmetic, and inverse operations before attempting systems or nonlinear equations.' },
      { question: 'Should I time every practice session?', answer: 'No. Untimed work lets you see and correct your reasoning. Add a timer after you can solve a topic accurately and explain the steps.' },
      { question: 'What should I do after a low quiz score?', answer: 'Choose one recurring error, study its correction, and solve another problem of the same type. Avoid moving immediately to a longer exam without addressing the error.' },
    ],
  },
  'sat-math': {
    name: 'SAT Math', headline: 'Turn mathematical knowledge into a clear solution strategy',
    summary: 'Practice algebra, advanced math, data analysis, and geometry with a deliberate plan. Learn when to solve, when to graph, and how to recognize the quantity a question actually asks for.',
    introduction: [
      'SAT math preparation is partly about knowing concepts and partly about recognizing them in unfamiliar clothing. A question about a subscription can be a linear equation; a question about a maximum can be a vertex problem. Before calculating, identify the mathematical structure and the output you need.',
      'Use the topic bank to make those connections explicit. Once you can explain a method reliably, move to mixed practice where the topic is no longer announced in advance. The advanced sets, mini-exams, and exam groups below offer different ways to revisit the same ideas under changing conditions.',
    ],
    overviewTitle: 'A practical approach to SAT math questions',
    overview: [
      'Build fluency across equations, equivalent expressions, functions, data, and geometry. For each problem, decide whether an exact algebraic result, a graph intersection, or a numerical comparison is most useful. Graphing can reveal structure, but you still need to interpret axes, choose a sensible window, and distinguish an approximate intersection from an exact value.',
      'Look for opportunities to answer without unnecessary work. If an equation gives 3x + 2 = 17 and the question asks for 6x + 4, the requested expression is twice the given one. Its value is 34. This is not a guessing shortcut: it is a justified relationship between expressions.',
    ],
    skills: [
      { title: 'Algebra and equivalent forms', text: 'Recognize linear systems, factor when roots are needed, and use vertex form when a question concerns a maximum or minimum.' },
      { title: 'Data and modeling', text: 'Interpret a model with units, distinguish percent changes from percentage points, and avoid reading causation into an association.' },
      { title: 'Geometry and functions', text: 'Connect a diagram or graph to its equation. Check radius versus diameter, domain restrictions, and the meaning of a transformed input.' },
    ],
    examples: [
      { title: 'Read the form before expanding', question: 'The function f(x) = 2(x − 3)² + 5 models a quantity. What is its minimum value?', steps: ['For every real x, (x − 3)² is at least zero.', 'The squared term is zero at x = 3, leaving f(3) = 5.', 'The minimum output is 5; the input where it occurs is 3.'], takeaway: 'Vertex form exposes the requested minimum. Expanding the expression would hide that information temporarily.' },
      { title: 'Reverse a percentage change', question: 'An item costs $84 after a 30% discount. What was its original price?', steps: ['A 30% discount leaves 70% of the original price P.', 'Write 0.70P = 84, so P = 84/0.70 = 120.', 'Check: 30% of $120 is $36, leaving $84.'], takeaway: 'Adding 30% of the discounted price uses the wrong base. Recover the original by dividing by the remaining proportion.' },
    ],
    plan: [
      { title: 'Locate the bottleneck', text: 'Take a mixed set and label each miss: interpretation, algebra, concept, or time. A useful diagnosis is more specific than “advanced math is hard.”' },
      { title: 'Repair one topic', text: 'Choose the relevant module and solve a small set carefully. Write down why your preferred method works.' },
      { title: 'Compare methods', text: 'For suitable equations, compare algebra and graphing. Notice which method produces the requested quantity with fewer opportunities for error.' },
      { title: 'Reintroduce time pressure', text: 'Use timed sets after topic review. Track unfinished questions separately from conceptual errors and review both before another full session.' },
    ],
    tips: ['Substitute candidate roots into the original equation, especially after squaring.', 'Read graph scales before estimating coordinates.', 'Check whether the problem asks for x, a coefficient, or a whole expression.', 'Use practice results as feedback; a percentage on this site is not an official SAT scaled score.'],
    faq: [
      { question: 'Should I start with full exams?', answer: 'A mixed set can diagnose gaps, but focused topic work is usually more useful for fixing them. Return to longer sessions once you can explain the methods you previously missed.' },
      { question: 'Does a graph replace an algebraic solution?', answer: 'A graph may provide an efficient route, but rounded coordinates can conceal exact values. Check the required precision and interpret the result in the original problem.' },
      { question: 'Are separate module quizzes an adaptive test?', answer: 'Opening two quizzes in sequence does not itself create adaptive routing. Use the listed sets for practice; do not assume they reproduce official test delivery or score conversion.' },
    ],
  },
  'psat-nmsqt': {
    name: 'PSAT/NMSQT Math', headline: 'Connect your algebra skills to stronger problem solving',
    summary: 'Move from familiar procedures to confident interpretation. Practice linear and nonlinear models, data, and geometry, then use mixed sets to find where your reasoning needs more attention.',
    introduction: [
      'PSAT/NMSQT practice is most productive when it connects classroom techniques to the language of a problem. You may know how to solve a system yet hesitate over which quantities belong in it. Treat that hesitation as useful information: it tells you to practice modeling as well as calculation.',
      'This course organizes practice into algebra, advanced math, data analysis, and geometry, followed by shorter mixed sessions and exam groups. Use the topic labels to build confidence, then deliberately remove that support by attempting a mixed set. Explain why you chose an equation before checking whether its numerical solution is correct.',
    ],
    overviewTitle: 'From a mathematical procedure to a mathematical model',
    overview: [
      'A linear model has a constant change per unit of input. An exponential model has a constant multiplicative factor over equal intervals. Compare differences and ratios in a table before choosing a formula. Then use an observation to recover any unknown starting value.',
      'Data questions require the same care with reference groups. “Of all students” and “of students who ride the bus” describe different denominators. In geometry, distinguish a stated relationship from something that only appears true in a drawing. Label the information supplied, and avoid treating a sketch as a measurement.',
    ],
    skills: [
      { title: 'Linear models and systems', text: 'Interpret a slope and intercept, write two constraints with consistent units, and check the solution against both conditions.' },
      { title: 'Nonlinear relationships', text: 'Connect factors to roots, recognize a multiplicative pattern, and keep the restrictions of rational expressions when simplifying.' },
      { title: 'Evidence from data', text: 'Use the correct reference group, distinguish a sample from a population, and state what a table or graph actually supports.' },
    ],
    examples: [
      { title: 'Recover a fixed charge', question: 'A rental costs $29 for 3 hours and $47 for 6 hours. Assuming a linear cost model, what is the fixed fee?', steps: ['The hourly rate is (47 − 29)/(6 − 3) = $6 per hour.', 'Write C = 6h + b and substitute (3, 29): 29 = 18 + b.', 'The fixed fee is b = $11. The model also gives 6 × 6 + 11 = 47.'], takeaway: 'Cost divided by hours is not the hourly rate when a fixed fee is included. Use differences to remove that fee first.' },
      { title: 'Restrict the sample space', question: 'A group has 60 students. Of the 24 bus riders, 9 are in a music club. Given that a selected student rides the bus, what is the probability they are in the club?', steps: ['The condition restricts the possible students to the 24 bus riders.', 'Nine of those 24 students are in the club.', 'The probability is 9/24 = 3/8, rather than 9/60.'], takeaway: 'The phrase “given that” changes the denominator. Identify the restricted group before calculating.' },
    ],
    plan: [
      { title: 'Explain the quantities', text: 'Choose an algebra quiz and write a sentence defining each variable. Include units when a problem has a real-world setting.' },
      { title: 'Compare representations', text: 'Move between tables, equations, and graphs. Use a spare observation to test the model you constructed.' },
      { title: 'Challenge a familiar method', text: 'Try advanced math or data questions that look similar but need a different assumption, such as a changed denominator or a domain restriction.' },
      { title: 'Review a mixed result', text: 'After a mini-exam, sort errors by reasoning step. Reattempt a problem without looking at its correction before moving to another exam group.' },
    ],
    tips: ['Underline conditions such as “given,” “at least,” and “exactly.”', 'Use both original equations to check a system solution.', 'Do not assume a graph continues beyond the domain described.', 'Keep separate records of arithmetic slips and incorrect model choices.'],
    faq: [
      { question: 'How is this course different from PSAT 8/9 practice?', answer: 'The guides emphasize different starting points: the PSAT 8/9 guide builds foundational habits, while this guide focuses on connecting procedures, representations, and models. Choose individual modules according to what you have studied.' },
      { question: 'What if I solve equations correctly but miss word problems?', answer: 'Practice writing the relationship without solving it first. Check variable definitions, units, and whether the wording calls for an equality or an inequality.' },
      { question: 'Can my quiz percentage predict an official result?', answer: 'No. The bank reports performance on the questions attempted. It does not convert that result into an official PSAT/NMSQT score or eligibility determination.' },
    ],
  },
  'act-math': {
    name: 'ACT Math', headline: 'Build a flexible toolkit for varied math problems',
    summary: 'Work across arithmetic, algebra, functions, geometry, and data. Strengthen method selection with focused modules, then practice switching between topics in mixed sets.',
    introduction: [
      'A broad question bank is most useful when you treat it as a map of skills rather than a checklist to finish. ACT math practice can move quickly from a fraction calculation to a coordinate diagram or a trigonometric relationship. The challenge is recognizing which tools apply and keeping the setup efficient.',
      'The modules below separate those tools into manageable areas, including number operations, equations, functions, geometry, statistics, and word problems. Begin with the topics that interrupt your progress most often. Then use a mixed session to check whether you can choose a method without being told the topic first.',
    ],
    overviewTitle: 'Organize a broad mathematical toolkit',
    overview: [
      'Arithmetic accuracy supports more advanced work. Errors with fractions, signs, or exponent rules can make a sound geometric or algebraic approach fail. If those errors recur, spend a session on the underlying operation rather than repeatedly restarting harder questions.',
      'For diagrams, label known lengths and angles before selecting a formula. For functions, distinguish evaluating an output from solving for an input. For statistics, identify whether the question concerns a typical value, spread, or probability. A brief classification step often prevents a long calculation that answers the wrong question.',
    ],
    skills: [
      { title: 'Algebraic fluency', text: 'Manipulate fractions, solve equations and inequalities, and recognize when factoring is simpler than expanding.' },
      { title: 'Geometry and trigonometry', text: 'Use the reference angle to label opposite and adjacent sides. Track squared and cubed units when computing area or volume.' },
      { title: 'Functions and statistics', text: 'Read a domain, follow a transformation, and distinguish a mean from a median when a data value changes.' },
    ],
    examples: [
      { title: 'Choose a trigonometric ratio', question: 'A right triangle has legs 8 and 15. For the angle opposite the 8-unit leg, find the sine.', steps: ['Use the Pythagorean theorem: the hypotenuse is √(8² + 15²) = 17.', 'Sine is opposite divided by hypotenuse.', 'The sine of the specified angle is 8/17.'], takeaway: 'The reference angle matters. The other acute angle has sine 15/17, even though it belongs to the same triangle.' },
      { title: 'Use a mean to recover a missing value', question: 'Five numbers have a mean of 18. Four of them sum to 71. What is the fifth number?', steps: ['A mean of 18 across five numbers implies a total of 5 × 18 = 90.', 'Subtract the known subtotal: 90 − 71 = 19.', 'Check that (71 + 19)/5 = 18.'], takeaway: 'Convert the mean to a total before subtracting. Subtracting a subtotal directly from the mean mixes different quantities.' },
    ],
    plan: [
      { title: 'Secure the arithmetic', text: 'Use fractions, factors, and percentage modules to remove recurring calculation errors before they interfere with longer questions.' },
      { title: 'Build a geometry routine', text: 'Sketch, label, select a relationship, then calculate. Keep exact radicals or π until a decimal is requested.' },
      { title: 'Switch between representations', text: 'Alternate equations with function graphs and word problems. State why a chosen formula fits the situation.' },
      { title: 'Practice topic switching', text: 'Try a mixed set using its displayed timer. Review slow correct answers as well as wrong ones to identify inefficient methods.' },
    ],
    tips: ['Check that a hypotenuse exceeds either leg.', 'Reverse an inequality sign when multiplying or dividing both sides by a negative value.', 'Test simple inputs to check a proposed function rule.', 'Compare practice-set settings with the official test format you will take instead of assuming they match.'],
    faq: [
      { question: 'Do I need to finish every module in order?', answer: 'No. Start with a diagnostic set or a known weakness, then choose modules that address it. Follow with mixed practice to see whether the skill transfers.' },
      { question: 'Why review a question I answered correctly?', answer: 'A correct guess or an unnecessarily long calculation can conceal a weakness. Review how you selected the method and whether you can reproduce it efficiently.' },
      { question: 'Which geometry formula should I use?', answer: 'First identify the requested quantity and the information supplied. A perimeter, an area, and a volume require different relationships even when they describe the same object.' },
    ],
  },
  'ap-calculus-ab': {
    name: 'AP Calculus AB', headline: 'Understand change and accumulation through connected ideas',
    summary: 'Connect limits, derivatives, integrals, and differential equations. Practice interpreting a result and justifying your reasoning alongside the calculations.',
    introduction: [
      'Calculus becomes easier to organize when you connect its two central questions: how fast is a quantity changing, and how much change has accumulated? Derivatives answer the first locally; definite integrals answer the second over an interval. The methods are closely related, but their units and interpretations differ.',
      'This course moves from functions and limits into differentiation, applications, integration, and differential equations. Use the focused quizzes to check a specific idea, then combine those ideas in mixed practice. Keep a line of explanation beside each calculation so that a correct formula does not replace a clear argument.',
    ],
    overviewTitle: 'Make the connections in Calculus AB',
    overview: [
      'A derivative is the limit of average rates of change. Its sign describes whether the function increases or decreases locally, while its magnitude measures the rate. Before using a theorem, check its hypotheses: a conclusion about a continuous or differentiable function is not justified merely because a graph looks smooth.',
      'A definite integral represents signed accumulation. An antiderivative provides a way to evaluate it, but an application also needs an initial value and an interpretation. If a rate is measured in liters per minute and time in minutes, its integral has units of liters. A negative rate can reduce a quantity without making the quantity itself negative.',
    ],
    skills: [
      { title: 'Limits and differentiation', text: 'Separate a function value from its limit, use derivative rules accurately, and interpret the derivative in context.' },
      { title: 'Applications of change', text: 'Use sign information, critical points, and endpoints to justify an extremum. Relate position, velocity, and acceleration carefully.' },
      { title: 'Integration and initial conditions', text: 'Distinguish net change from total amount, choose bounds, and use an initial condition to determine an integration constant.' },
    ],
    examples: [
      { title: 'Build a tangent line', question: 'For f(x) = x³ − 2x, find the tangent line at x = 2.', steps: ['The point is (2, f(2)) = (2, 4).', 'Differentiate: f′(x) = 3x² − 2, so the slope at 2 is 10.', 'Use point-slope form: y − 4 = 10(x − 2), or y = 10x − 16.'], takeaway: 'A tangent line requires both the derivative value and the point on the original function.' },
      { title: 'Recover an amount from a rate', question: 'Water enters a tank at r(t) = 3t² liters per minute for 0 ≤ t ≤ 2. The tank initially contains 5 liters and has no outflow. How much is present at t = 2?', steps: ['The added water is the integral of 3t² from 0 to 2.', 'An antiderivative is t³, so the accumulated inflow is 8 liters.', 'Add the initial 5 liters to obtain 13 liters.'], takeaway: 'The integral gives a change. It becomes a final amount only after you include the initial condition.' },
    ],
    plan: [
      { title: 'Check functions and limits', text: 'Review domains, continuity, and one-sided behavior. Explain why a limit exists or fails instead of relying only on substitution.' },
      { title: 'Connect rules to meaning', text: 'After differentiating, state the units and interpret the sign. Use a tangent line or a rate example to test your understanding.' },
      { title: 'Study accumulation', text: 'Practice definite integrals and applications together. Label what the integrand measures and what the final integral represents.' },
      { title: 'Combine and justify', text: 'Use mixed practice and write reasons for extrema, theorem applications, and initial-value steps. Review missing justifications as carefully as calculation errors.' },
    ],
    tips: ['Keep f, f′, and f″ distinct when reading a graph.', 'Include the chain-rule factor when differentiating a composition.', 'Check endpoints when finding an absolute extremum on a closed interval.', 'Distinguish a signed integral from total distance or total area.'],
    faq: [
      { question: 'Why does my correct derivative not finish the problem?', answer: 'A problem may ask for an interpretation, an equation of a tangent line, or a justified extremum. The derivative is often an intermediate result, not the requested conclusion.' },
      { question: 'When do I add a constant of integration?', answer: 'An indefinite integral describes a family of antiderivatives and includes a constant. A definite integral evaluates accumulated change between bounds; an initial-value problem uses its initial condition separately.' },
      { question: 'Can a positive function have a negative derivative?', answer: 'Yes. A quantity can remain positive while decreasing. Function values describe amounts; derivative values describe rates of change.' },
    ],
  },
  'ap-calculus-bc': {
    name: 'AP Calculus BC', headline: 'Extend calculus reasoning to infinite processes',
    summary: 'Strengthen differentiation and integration, then develop careful reasoning about sequences and series. Keep convergence, approximation, and error estimates connected.',
    introduction: [
      'Calculus BC practice asks you to coordinate several layers of reasoning. You may need an integration technique, an interpretation of a differential equation, or a test that justifies convergence. Naming a familiar formula is not enough: identify its assumptions and the result it actually establishes.',
      'The bank includes core calculus modules and a dedicated sequences-and-series module, together with mixed sets and exam groups. Revisit earlier differentiation and integration gaps when they interrupt later work. The available module list shows what is currently in this bank; it should not be read as a guarantee of complete syllabus coverage.',
    ],
    overviewTitle: 'Link finite calculations to infinite behavior',
    overview: [
      'A sequence lists terms; a series adds them through its partial sums. Terms approaching zero are necessary for a series to converge, but that condition alone is not sufficient. A convergence argument must use a test whose hypotheses you have checked, rather than the visual impression that terms are getting small.',
      'Approximation introduces another question: how far could a finite answer be from the value being approximated? Distinguish a convergence conclusion from an error bound. In other calculus topics, use the same discipline by stating the interval, domain, sign conditions, or initial condition that makes a method applicable.',
    ],
    skills: [
      { title: 'Differentiation and applications', text: 'Interpret rates, distinguish local and absolute extrema, and keep derivatives with respect to different variables clearly labeled.' },
      { title: 'Integration and differential equations', text: 'Choose a technique based on the expression, retain necessary constants, and verify a proposed solution by substitution.' },
      { title: 'Sequences and series', text: 'Identify an index and first term, justify convergence, and determine what a remainder estimate says about an approximation.' },
    ],
    examples: [
      { title: 'Sum a geometric series', question: 'Find the sum of 4 − 2 + 1 − 1/2 + … .', steps: ['The first term is 4 and the common ratio is −1/2.', 'Its absolute ratio is less than 1, so the infinite geometric series converges.', 'Use a/(1 − r): 4/(1 + 1/2) = 8/3.'], takeaway: 'Checking the ratio is part of the solution. A finite sum formula cannot automatically be extended to every infinite series.' },
      { title: 'Evaluate an improper integral', question: 'Evaluate the integral of 1/x² from 1 to infinity.', steps: ['Replace the infinite upper bound by b and take the limit as b tends to infinity.', 'An antiderivative is −1/x. The finite integral equals 1 − 1/b.', 'The limit is 1, so the improper integral converges to 1.'], takeaway: 'Infinity is handled through a limit, not as an ordinary number substituted into an expression.' },
    ],
    plan: [
      { title: 'Stabilize core calculus', text: 'Check differentiation, antiderivatives, and applications first. Later topics often fail because of an earlier algebra or calculus gap.' },
      { title: 'Classify the series', text: 'Write the general term, index, and sign pattern. Check the term limit before choosing a more specialized convergence test.' },
      { title: 'Separate convergence from accuracy', text: 'After deciding a series converges, ask whether the problem also requires a partial sum or an error bound.' },
      { title: 'Interleave the topics', text: 'Mix a series problem with integration and differential equations. Practice explaining why each method applies rather than only recording its name.' },
    ],
    tips: ['State where a power series is being evaluated and check endpoints separately when needed.', 'Distinguish a term number from its exponent to avoid indexing errors.', 'Verify a differential-equation solution with both the equation and the initial condition.', 'Do not conclude convergence solely because individual terms tend to zero.'],
    faq: [
      { question: 'Should I skip the earlier calculus modules?', answer: 'Only if those methods are secure. Weaknesses with substitution, derivatives, or algebra can obscure the new reasoning in series and other later topics.' },
      { question: 'What is the difference between a sequence and a series?', answer: 'A sequence is a list of terms. A series concerns the sum of terms and converges when its sequence of partial sums approaches a finite value.' },
      { question: 'Does convergence tell me how many terms to use?', answer: 'Not by itself. A requested approximation tolerance needs an appropriate remainder estimate or another justified bound.' },
    ],
  },
  'ap-precalculus': {
    name: 'AP Precalculus', headline: 'Understand functions as models, not just formulas',
    summary: 'Explore polynomial, rational, exponential, logarithmic, and trigonometric relationships. Connect symbolic rules to graphs, tables, and the quantities they model.',
    introduction: [
      'Precalculus brings several function families into one language. The goal is to understand how an input determines an output, what patterns a family can represent, and where a model stops making sense. A formula is more useful when you can describe its behavior before entering numbers.',
      'The bank groups polynomial and rational functions, exponential and logarithmic functions, trigonometric and polar functions, and additional work with parametric functions, vectors, and matrices. Use a focused set to learn the features of one family, then compare families in mixed practice. Extra topics can support broader course study; their presence does not establish official exam weighting.',
    ],
    overviewTitle: 'Recognize patterns and preserve domains',
    overview: [
      'Compare equal-interval differences and ratios in a table. Constant differences suggest a linear relationship, while constant positive ratios suggest an exponential one. Polynomial and rational expressions offer other shapes, and their factored forms can expose zeros, excluded inputs, or end behavior.',
      'Transformations connect an existing model to a new one. Changing f(x) to f(x − h) shifts the graph horizontally because the old input is reached at a different x. Adding a constant outside changes the output. Keep these operations distinct, and retain original domain restrictions even when simplifying cancels a factor.',
    ],
    skills: [
      { title: 'Polynomial and rational structure', text: 'Relate factors to zeros, determine excluded inputs, and distinguish a removable hole from a vertical asymptote.' },
      { title: 'Exponential and logarithmic models', text: 'Separate initial amount, growth factor, and rate. Isolate an exponential term before solving for time with a logarithm.' },
      { title: 'Periodic behavior', text: 'Interpret amplitude, midline, and period. Use a consistent angle unit and connect a trigonometric graph to its context.' },
    ],
    examples: [
      { title: 'Preserve a missing input', question: 'Simplify f(x) = (x² − 9)/(x − 3) and describe what happens at x = 3.', steps: ['Factor the numerator: (x − 3)(x + 3).', 'For x ≠ 3, cancel the common factor to obtain x + 3.', 'The original function remains undefined at 3. Its graph has a hole at the point (3, 6).'], takeaway: 'Equivalent simplified formulas agree on the original domain. Cancellation does not restore an excluded input.' },
      { title: 'Interpret an exponential factor', question: 'A model is P(t) = 200(1.15)^t. Find the initial amount and the percentage increase per unit of time.', steps: ['At t = 0, the power equals 1, so the initial amount is 200.', 'Each increase of one in t multiplies the amount by 1.15.', 'The increase is 0.15 of the preceding amount, or 15% per time unit.'], takeaway: 'The growth factor includes the entire previous amount. A factor of 1.15 is a 15% increase, not a 115% increase.' },
    ],
    plan: [
      { title: 'Read a function in several forms', text: 'Connect an equation to a short table and a sketch. Identify its domain, zeros, and important behavior before solving a question.' },
      { title: 'Compare growth patterns', text: 'Contrast additive and multiplicative change. Keep the time interval explicit when interpreting a rate or factor.' },
      { title: 'Describe periodic models', text: 'Practice amplitude, midline, and period as separate features. Explain what each represents in a contextual problem.' },
      { title: 'Test transfer with mixed practice', text: 'Use a mini-exam to choose among function families without a topic hint. Revisit any model whose behavior you could not explain.' },
    ],
    tips: ['Write denominator and logarithm restrictions before solving.', 'Do not confuse f(a) with solving f(x) = a.', 'Check whether a stated time is continuous or must be a whole number of periods.', 'Choose a graphing window that shows the behavior relevant to the question.'],
    faq: [
      { question: 'How do I distinguish linear and exponential data?', answer: 'Compare equal input intervals. A constant output difference supports a linear model; a constant positive output ratio supports an exponential model.' },
      { question: 'Why is a cancelled denominator still important?', answer: 'The original expression was undefined where that denominator was zero. The simplified rule must retain that restriction to describe the same function.' },
      { question: 'What does a trigonometric period mean?', answer: 'It is the input interval after which the pattern repeats. Interpret its unit from the context, such as seconds for a repeating motion or radians for an angle.' },
    ],
  },
};

/** Clé éditoriale partagée par les guides et les leçons, indépendante du suffixe QBank. */
export function courseGuideKey(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[-_](qbank|question[-_]bank)$/, '')
    .replace(/_/g, '-');
}

export function getCourseGuide(slug: string): CourseGuide | undefined {
  return courseGuides[courseGuideKey(slug)];
}
