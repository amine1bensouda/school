import { courseGuideKey } from '@/lib/course-guides';

export type CourseLesson = {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; paragraphs: string[] }[];
  example: { question: string; steps: string[]; takeaway: string };
  checkpoints: string[];
};

const lessonsByCourse: Record<string, CourseLesson[]> = {
  'psat-8-9-math': [
    {
      slug: 'linear-equations-and-functions',
      title: 'Linear equations and functions',
      summary:
        'Learn how to translate a relationship into an equation, keep both sides balanced, and read a slope as a rate of change.',
      sections: [
        {
          heading: 'What a linear relationship describes',
          paragraphs: [
            'A linear equation describes two quantities that change at a constant rate. If notebooks cost $3 each and a folder costs $5, the total is 3n + 5. The 3 is the rate per notebook. The 5 is paid once, so it is not multiplied by n.',
            'A function gives one output for each allowed input. In a table, check equal steps in x and ask whether the corresponding steps in y are constant. A constant change of 4 in y for every increase of 1 in x means the slope is 4.',
          ],
        },
        {
          heading: 'Solving without losing the meaning',
          paragraphs: [
            'To solve an equation, do the same operation to both sides. Subtract a constant before you divide by a coefficient. If the unknown is on both sides, gather the variable terms first. Then substitute your result into the original equation.',
            'When the question gives two variables, two pieces of information are usually required. “Twice as many tickets as adults” is one equation. A total of 30 people is another. Write both before you start eliminating.',
          ],
        },
      ],
      example: {
        question: 'A plumber charges $40 plus $25 per hour. The bill is $140. How many hours is that?',
        steps: [
          'Let h be the number of hours. The bill is 25h + 40.',
          'Set 25h + 40 = 140, so 25h = 100.',
          'h = 4. Check: 25 × 4 + 40 = 140.',
        ],
        takeaway: 'The trip fee is added once. Dividing 140 by 25 ignores that fee and gives a different answer.',
      },
      checkpoints: [
        'Identify which number is a rate and which number is a one-time amount.',
        'Solve a one-variable equation and check it in the original statement.',
        'Read a slope in words, including units, before you graph it.',
      ],
    },
    {
      slug: 'systems-and-inequalities',
      title: 'Systems and inequalities',
      summary:
        'Use two conditions at the same time, and keep the direction of an inequality correct when you multiply or divide by a negative number.',
      sections: [
        {
          heading: 'Two statements, one solution',
          paragraphs: [
            'A system asks for values that satisfy every equation together. If x + y = 10 and x − y = 4, adding the equations cancels y and gives 2x = 14, so x = 7 and y = 3. A solution that fits only the first equation is not finished.',
            'Substitution is useful when one equation already isolates a variable. Replace that variable in the other equation, solve, then return to find the second value. Check both original equations, not only the equation you solved last.',
          ],
        },
        {
          heading: 'The direction of an inequality',
          paragraphs: [
            'An inequality uses the same balancing steps as an equation, with one difference: multiplying or dividing by a negative number reverses the symbol. So −2x < 8 becomes x > −4, not x < −4.',
            'On a number line or graph, decide whether the boundary is included. “At least 12” includes 12 and uses ≥. “Fewer than 12” does not include 12 and uses <.',
          ],
        },
      ],
      example: {
        question: 'Two numbers add to 18. The first is 6 more than the second. What are the numbers?',
        steps: [
          'Let the numbers be a and b. Then a + b = 18 and a = b + 6.',
          'Substitute: (b + 6) + b = 18, so 2b = 12 and b = 6.',
          'Then a = 12. Check: 12 + 6 = 18 and 12 is 6 more than 6.',
        ],
        takeaway: 'Write the comparison and the total as separate equations before substituting.',
      },
      checkpoints: [
        'State what each variable counts before writing a system.',
        'Check a proposed pair in every equation.',
        'Reverse the inequality when you divide by a negative number, and say whether the endpoint is included.',
      ],
    },
    {
      slug: 'ratios-percentages-and-data',
      title: 'Ratios, percentages, and data',
      summary:
        'Keep the order of a ratio, choose the correct whole for a percentage, and read a table before you calculate.',
      sections: [
        {
          heading: 'Scale both parts of a ratio',
          paragraphs: [
            'A ratio 2:5 means 2 parts of the first quantity for every 5 parts of the second. If the second quantity becomes 15, it has been multiplied by 3, so the first quantity is also multiplied by 3. The new ratio is 6:15, which still simplifies to 2:5.',
            'Do not add the ratio numbers and call that the total unless the question asks for the whole mixture. Concentrate and water are different parts. Their sum is a third quantity.',
          ],
        },
        {
          heading: 'Percent of which amount?',
          paragraphs: [
            'A percentage needs a reference amount. Twenty percent of 80 is 0.20 × 80 = 16. Increasing 80 by 20% gives 80 + 16 = 96, which is the same as multiplying by 1.20.',
            'In a table, the phrase “of all students” and “of students in grade 8” use different denominators. Circle the group the question restricts before you divide. For a distribution, the mean uses every value, while the median depends on the ordered middle.',
          ],
        },
      ],
      example: {
        question: 'A shirt priced at $40 is reduced by 15%. What is the sale price?',
        steps: [
          'Fifteen percent of 40 is 0.15 × 40 = 6.',
          'Subtract the discount: 40 − 6 = 34.',
          'Equivalently, the buyer pays 85% of the price: 0.85 × 40 = 34.',
        ],
        takeaway: 'The discount is not subtracted from 15. It is 15% of the original price.',
      },
      checkpoints: [
        'Multiply both parts of a ratio by the same factor.',
        'Name the reference amount before calculating a percentage.',
        'Identify whether a data question asks for a total, a rate, a mean, or a restricted group.',
      ],
    },
    {
      slug: 'geometry-area-and-triangles',
      title: 'Geometry: lines, triangles, area, and volume',
      summary:
        'Label a diagram before choosing a formula, and keep perimeter, area, and volume distinct.',
      sections: [
        {
          heading: 'Use the information that is actually given',
          paragraphs: [
            'A sketch is not a measurement. If a problem says an angle is 70°, write 70 on that angle. If it does not say the triangle is equilateral, do not assume the sides are equal because they look similar.',
            'The sum of angles in a triangle is 180°. A straight line is 180°. Vertical angles are equal. Use those facts to fill missing angles before you try a side formula.',
          ],
        },
        {
          heading: 'Match the formula to the quantity',
          paragraphs: [
            'Perimeter is a length, so it adds lengths. Area is measured in square units. For a triangle, area is one-half times base times the perpendicular height, not half of every side. Volume uses cubic units and a height that is perpendicular to the base.',
            'If one side of a right triangle is missing, the Pythagorean theorem relates the legs a and b to the hypotenuse c by a² + b² = c². The hypotenuse is the side opposite the right angle, and it is the longest side.',
          ],
        },
      ],
      example: {
        question: 'A right triangle has legs 6 and 8. What is the area, and what is the hypotenuse?',
        steps: [
          'The legs are perpendicular, so one can be the base and the other the height. Area = (1/2) × 6 × 8 = 24.',
          'The hypotenuse is √(6² + 8²) = √(36 + 64) = √100 = 10.',
          'The area uses the legs. The perimeter would be 6 + 8 + 10 = 24, which happens to equal the area numerically but is a length, not an area.',
        ],
        takeaway: 'Ask whether the requested quantity is a length, an area, or a volume before you calculate.',
      },
      checkpoints: [
        'Label given lengths and angles on the diagram.',
        'Choose a formula that matches perimeter, area, or volume.',
        'Use perpendicular height for a triangle, and the longest side as the hypotenuse of a right triangle.',
      ],
    },
  ],
  'sat-math': [
    {
      slug: 'heart-of-algebra',
      title: 'Heart of Algebra',
      summary:
        'Build and solve linear equations, systems, and inequalities, including relationships hidden in a word problem.',
      sections: [
        {
          heading: 'Create the equation before you calculate',
          paragraphs: [
            'Many algebra items are translation problems. Define the variable in a sentence: “p is the original price in dollars.” Then write the relationship. A 30% discount leaves 0.70 of the price, so a discounted price of 84 means 0.70p = 84, and p = 120.',
            'Equivalent equations have the same solution, but equivalent expressions are equal for every allowed value. If 3x + 2 = 17, then 6x + 4 = 34 because the second expression is exactly twice the first. You do not need to solve for x first.',
          ],
        },
        {
          heading: 'Systems and constraints',
          paragraphs: [
            'A system describes more than one condition. If a line and another line intersect, their x and y values satisfy both equations at that point. Graphically, the intersection is the solution. Algebraically, elimination or substitution finds the same point exactly.',
            'An inequality describes a range. “No more than 5 hours” is h ≤ 5. On a graph, the solution of a linear inequality is a half-plane, and the boundary is solid when equality is allowed.',
          ],
        },
      ],
      example: {
        question: 'A gym charges $20 per month plus $3 per visit. Another charges $8 per visit with no monthly fee. For how many visits is the first gym cheaper in one month?',
        steps: [
          'Let v be the number of visits. Costs are 20 + 3v and 8v.',
          'Set 20 + 3v < 8v, so 20 < 5v and v > 4.',
          'The first gym is cheaper for 5 or more visits. At 4 visits the costs are equal.',
        ],
        takeaway: 'The question asks for a comparison of two expressions, not for the value of either cost alone.',
      },
      checkpoints: [
        'Write what the variable measures, including units.',
        'Use an equivalent-expression shortcut only when you can name the relationship.',
        'Check a system solution in both original equations.',
      ],
    },
    {
      slug: 'advanced-math',
      title: 'Advanced math: nonlinear relationships',
      summary:
        'Work with quadratics, equivalent forms, exponents, and functions when the relationship is no longer a straight line.',
      sections: [
        {
          heading: 'Let the form do the work',
          paragraphs: [
            'A quadratic can be written in several forms. Standard form ax² + bx + c is useful for a y-intercept. Factored form shows the roots. Vertex form a(x − h)² + k shows the maximum or minimum at x = h. Choose the form that displays the quantity the question asks for.',
            'If f(x) = 2(x − 3)² + 5, the squared term is never negative, so the smallest value of f is 5, reached at x = 3. Expanding would hide that minimum.',
          ],
        },
        {
          heading: 'Functions, exponents, and restrictions',
          paragraphs: [
            'Evaluating f(4) asks for an output. Solving f(x) = 4 asks for the inputs that produce 4. Those are different tasks. A function machine can have two inputs with the same output, but each input has only one output.',
            'With exponents, (x²)³ = x⁶, while x² × x³ = x⁵. A square root or rational expression may exclude values. If a denominator is x − 2, x = 2 is not allowed even if a later simplification no longer shows that factor.',
          ],
        },
      ],
      example: {
        question: 'The function g(x) = −(x + 1)² + 9. What is the maximum value of g?',
        steps: [
          '(x + 1)² is at least 0 for every real x, and it is 0 when x = −1.',
          'Multiplying by −1 turns that minimum into a maximum, so −(x + 1)² is at most 0.',
          'Adding 9 gives a maximum of 9.',
        ],
        takeaway: 'The sign of a tells you whether the vertex is a maximum or a minimum. The k in vertex form is that extreme value.',
      },
      checkpoints: [
        'Match the requested feature — root, vertex, or intercept — to a form.',
        'Distinguish f(a) from solving f(x) = a.',
        'Keep excluded values when a radical or denominator is present.',
      ],
    },
    {
      slug: 'data-analysis',
      title: 'Problem-solving and data analysis',
      summary:
        'Interpret ratios, percentages, units, and statistical displays, and avoid treating a model as a cause.',
      sections: [
        {
          heading: 'Units and models',
          paragraphs: [
            'A model is useful only if you know what each variable measures. If d = 40t + 10, and t is hours after noon, then 40 has units of distance per hour and 10 is the distance already completed at noon. Predicting a value outside the described interval may not be justified by the model.',
            'Percent change compares a change with the starting amount. A rise from 50 to 65 is a change of 15, and 15/50 = 0.30, so the increase is 30%. Percentage points are different: moving from 50% to 65% is an increase of 15 percentage points.',
          ],
        },
        {
          heading: 'What a graph or sample supports',
          paragraphs: [
            'In a scatterplot, a line of best fit summarizes a trend. A point far from the line can strongly influence the slope. Association does not by itself show that one variable causes the other.',
            'A sample estimate describes the people or objects that were measured. “Students in this survey” is not automatically “all students.” Read the axis scale before you estimate a coordinate, because a grid may count by 2 or by 10.',
          ],
        },
      ],
      example: {
        question: 'A price rises from $25 to $30. What is the percent increase?',
        steps: [
          'The change is 30 − 25 = 5.',
          'Compare that change with the original price: 5/25 = 0.20.',
          'The percent increase is 20%. It is not 5%, and it is not 30/25 without subtracting first if the question asks for the increase.',
        ],
        takeaway: 'Percent increase uses the change divided by the starting value, then converted to a percent.',
      },
      checkpoints: [
        'State the units of a rate before you use it.',
        'Use the original amount as the base of a percent change.',
        'Separate what a graph shows from a cause you were not given.',
      ],
    },
    {
      slug: 'geometry-and-trigonometry',
      title: 'Geometry and trigonometry',
      summary:
        'Connect diagrams, circles, and right-triangle ratios to exact relationships rather than to how a figure looks.',
      sections: [
        {
          heading: 'Lengths, areas, and circles',
          paragraphs: [
            'Similar triangles have corresponding angles equal and corresponding sides in proportion. Corresponding sides are across from equal angles, not merely the sides that look parallel in a sketch.',
            'For a circle, radius and diameter are different: the diameter is twice the radius. The circumference is 2πr, and the area is πr². A central angle determines an arc length that is the same fraction of the circumference as the angle is of 360°, or of 2π radians.',
          ],
        },
        {
          heading: 'Right-triangle trigonometry',
          paragraphs: [
            'Sine, cosine, and tangent are ratios for a chosen acute angle. Sine is opposite over hypotenuse. Changing the reference angle swaps which leg is opposite.',
            'If a right triangle has legs 5 and 12, the hypotenuse is 13. The sine of the angle opposite the side of length 5 is 5/13. The sine of the other acute angle is 12/13.',
          ],
        },
      ],
      example: {
        question: 'A circle has radius 6. What is its area, and what is the length of a 60° arc?',
        steps: [
          'Area = πr² = 36π.',
          'A 60° arc is 60/360 = 1/6 of the circle.',
          'The circumference is 12π, so the arc length is 12π / 6 = 2π.',
        ],
        takeaway: 'Area uses r². Arc length uses a fraction of the circumference, which depends on r once, not on r².',
      },
      checkpoints: [
        'Mark the reference angle before choosing sine, cosine, or tangent.',
        'Use the radius, not the diameter, in πr².',
        'Match corresponding sides in similar figures by equal angles.',
      ],
    },
  ],
  'act-math': [
    {
      slug: 'numbers-fractions-and-factors',
      title: 'Numbers, fractions, and factors',
      summary:
        'Keep fraction operations exact, and use factors to simplify before you expand or guess.',
      sections: [
        {
          heading: 'Fractions and rational expressions',
          paragraphs: [
            'To add fractions, use a common denominator. 1/3 + 1/4 = 4/12 + 3/12 = 7/12. Multiplying the denominators is one way to find a common multiple, but a smaller common denominator is allowed and often safer.',
            'A rational expression is a fraction that contains variables. You may cancel a common factor only when it is a factor of the entire numerator and the entire denominator. Canceling a term that is added, such as the 2 in (x + 2)/(x + 2y), is not valid.',
          ],
        },
        {
          heading: 'Factors and multiples',
          paragraphs: [
            'A factor divides a number with no remainder. The prime factorization of 36 is 2² × 3². The greatest common factor of two numbers is the product of the primes they share. The least common multiple includes the highest power of every prime that appears.',
            'Factoring a polynomial reverses multiplication. x² − 9 = (x − 3)(x + 3). That identity is useful for simplifying, solving, or finding excluded values, but it is not the same as solving x² − 9 = 0 until you set the expression equal to zero.',
          ],
        },
      ],
      example: {
        question: 'Simplify (x² − 9)/(x² − x − 6) for x ≠ 3 and x ≠ −2.',
        steps: [
          'Factor the numerator: (x − 3)(x + 3).',
          'Factor the denominator: (x − 3)(x + 2).',
          'Cancel the common factor x − 3, leaving (x + 3)/(x + 2). The original expression is still undefined at x = 3 and x = −2.',
        ],
        takeaway: 'Cancel factors, not terms, and keep the inputs that were never allowed.',
      },
      checkpoints: [
        'Add fractions only after writing a common denominator.',
        'List prime factors when comparing a greatest common factor and a least common multiple.',
        'State the values excluded by an original denominator.',
      ],
    },
    {
      slug: 'percentages-rates-and-averages',
      title: 'Percentages, rates, ratios, and averages',
      summary:
        'Choose the correct base for a percent or rate, and convert an average back into a total when a value is missing.',
      sections: [
        {
          heading: 'Rates and averages',
          paragraphs: [
            'A rate compares different units, such as miles per hour. If a car travels 150 miles in 2.5 hours at a constant speed, the speed is 150/2.5 = 60 miles per hour. Distance, rate, and time stay linked by distance = rate × time.',
            'The mean is the total divided by the number of values. If five scores have a mean of 80, their total is 400. A missing score is the total minus the known scores, not the mean minus those scores.',
          ],
        },
        {
          heading: 'Percent and ratio language',
          paragraphs: [
            '“20% of the class” uses the whole class as the base. “The ratio of boys to girls is 3:2” compares two parts. In a class of 30, those parts total 5 shares, so each share is 6 students: 18 boys and 12 girls.',
            'A successive percent change multiplies factors. A 10% increase followed by a 10% decrease is ×1.10 × 0.90 = ×0.99, which is a 1% decrease overall, not a return to the start.',
          ],
        },
      ],
      example: {
        question: 'Four test scores are 70, 80, 90, and 85. What fifth score gives a mean of 84?',
        steps: [
          'Five scores with a mean of 84 have total 5 × 84 = 420.',
          'The known scores sum to 70 + 80 + 90 + 85 = 325.',
          'The fifth score is 420 − 325 = 95.',
        ],
        takeaway: 'Turn the mean into a total before you subtract.',
      },
      checkpoints: [
        'Include units in a rate and check that they cancel correctly.',
        'Recover a total from a mean before finding a missing value.',
        'Multiply percent-change factors instead of adding the percentages.',
      ],
    },
    {
      slug: 'equations-quadratics-and-sequences',
      title: 'Equations, quadratics, and sequences',
      summary:
        'Solve linear and quadratic equations by a method that matches the form, and recognize arithmetic and geometric patterns.',
      sections: [
        {
          heading: 'Equations and quadratics',
          paragraphs: [
            'A linear equation has one solution unless it simplifies to a statement that is always true or always false. A quadratic can have two, one, or no real solutions. Factoring, completing the square, or the quadratic formula are tools; the fastest one depends on whether the expression factors cleanly.',
            'If (x − 2)(x + 5) = 0, then x = 2 or x = −5. That conclusion uses the fact that a product is zero only when a factor is zero. It does not apply to (x − 2)(x + 5) = 6 until you rewrite the equation as something equal to zero.',
          ],
        },
        {
          heading: 'Sequences',
          paragraphs: [
            'An arithmetic sequence adds the same difference. Starting at 7 with difference 4 gives 7, 11, 15, 19. The nth term can be written 7 + (n − 1) × 4 if the first term is term 1.',
            'A geometric sequence multiplies by the same ratio. Starting at 3 with ratio 2 gives 3, 6, 12, 24. Check the first term and the index carefully: using n instead of n − 1 shifts every term.',
          ],
        },
      ],
      example: {
        question: 'Solve x² − 5x + 6 = 0.',
        steps: [
          'Look for two numbers that multiply to 6 and add to −5: −2 and −3.',
          'Factor: (x − 2)(x − 3) = 0.',
          'The solutions are x = 2 and x = 3. Each makes the original equation true.',
        ],
        takeaway: 'Factor only after the quadratic equals zero, then set each factor equal to zero.',
      },
      checkpoints: [
        'Choose factoring or another method after looking at the numbers.',
        'Test both candidate solutions in the original equation.',
        'Say whether a sequence adds a difference or multiplies by a ratio.',
      ],
    },
    {
      slug: 'geometry-trigonometry-and-circles',
      title: 'Geometry, circles, and trigonometry',
      summary:
        'Measure diagrams with the right relationship: angle facts, area and volume, circles, and trigonometric ratios.',
      sections: [
        {
          heading: 'Plane figures',
          paragraphs: [
            'Start by naming the figure and the requested measurement. A rectangle with length 8 and width 3 has area 24 and perimeter 22. Confusing those two answers is common because both calculations use the same two numbers.',
            'A circle with radius r has area πr² and circumference 2πr. A sector is a fraction of the circle. A 90° sector is one quarter of both the area and the arc, but the numbers differ because one uses πr² and the other uses 2πr.',
          ],
        },
        {
          heading: 'Trigonometry',
          paragraphs: [
            'In a right triangle, sin(θ) = opposite/hypotenuse, cos(θ) = adjacent/hypotenuse, and tan(θ) = opposite/adjacent. The adjacent side is next to θ but is not the hypotenuse.',
            'Angle measure may be requested in degrees. A straight angle is 180°, and a full turn is 360°. If two lines are parallel, corresponding angles are equal, which often supplies the missing angle in a triangle.',
          ],
        },
      ],
      example: {
        question: 'A right triangle has an angle of 30° and a hypotenuse of 10. What is the side opposite the 30° angle?',
        steps: [
          'Sine uses the opposite side: sin(30°) = opposite / 10.',
          'sin(30°) = 1/2, so opposite / 10 = 1/2.',
          'The opposite side is 5.',
        ],
        takeaway: 'Identify the sides relative to the stated angle, not relative to the picture’s orientation.',
      },
      checkpoints: [
        'Separate area from perimeter before calculating.',
        'Use r or d consistently for a circle.',
        'Name the opposite and adjacent sides for the given angle.',
      ],
    },
    {
      slug: 'functions-statistics-and-probability',
      title: 'Functions, statistics, and probability',
      summary:
        'Read a function as a rule with a domain, and use the correct denominator in a probability or a statistic.',
      sections: [
        {
          heading: 'Functions and transformations',
          paragraphs: [
            'A function assigns each input in its domain to one output. Evaluating asks for the output. Solving asks which inputs produce a given output. A vertical shift f(x) + 3 adds 3 to every output. A horizontal shift f(x − 3) replaces the input with a number 3 less, which moves the graph right.',
            'A logarithm is the inverse of an exponential. log₁₀(1000) = 3 because 10³ = 1000. The argument of a logarithm must be positive.',
          ],
        },
        {
          heading: 'Statistics and probability',
          paragraphs: [
            'The mean is pulled by extreme values. The median is the middle of an ordered list and may stay put when one extreme changes. Probability of an event is favorable outcomes over possible outcomes in the situation that is actually being described.',
            '“Given that” restricts the possible outcomes. If 9 of 24 bus riders are in a club, and you already know the student rides the bus, the probability is 9/24, not 9 divided by the whole school.',
          ],
        },
      ],
      example: {
        question: 'A bag has 5 red and 7 blue marbles. One marble is drawn and not replaced; it is red. What is the probability the next one is also red?',
        steps: [
          'After the first red marble, 4 red marbles remain and 11 marbles remain in total.',
          'The new probability is 4/11.',
          'The original probability of red was 5/12, which no longer describes the bag.',
        ],
        takeaway: 'A condition that removes an outcome changes both the numerator and the denominator when that outcome was one of the counted items.',
      },
      checkpoints: [
        'Describe a transformation as a change to the input or to the output.',
        'Choose mean or median according to whether every value, or the middle, matters.',
        'Rewrite the sample space after a “given that” condition.',
      ],
    },
  ],
  'psat-nmsqt': [
    {
      slug: 'heart-of-algebra',
      title: 'Linear models and systems',
      summary:
        'Turn a constant-rate situation into a linear model, and solve systems that represent two conditions at once.',
      sections: [
        {
          heading: 'Slope as a rate',
          paragraphs: [
            'If a rental costs $29 for 3 hours and $47 for 6 hours, the change in cost over 3 hours is $18, so the hourly rate is $6. The total is not simply hours times a single charge when a fixed fee is also present. Substituting one point into C = 6h + b gives the fee.',
            'The slope is change in output over change in input. Units belong in the interpretation: dollars per hour, not just “6.” A negative slope means the output decreases as the input increases.',
          ],
        },
        {
          heading: 'Two constraints',
          paragraphs: [
            'A system is the right tool when one equation cannot carry all the information. “Three notebooks and two pens cost $11” and “one notebook and two pens cost $7” differ by two notebooks and $4, so each notebook costs $2. Then each pen costs $2.50.',
            'Graphically, the solution is the intersection. If the lines are parallel and distinct, there is no solution. If they are the same line, every point on that line works.',
          ],
        },
      ],
      example: {
        question: 'C = 6h + b, and C = 29 when h = 3. Find the fixed fee b.',
        steps: [
          'Substitute the known point: 29 = 6 × 3 + b.',
          '29 = 18 + b, so b = 11.',
          'Check the other point if it is given. For h = 6, C = 36 + 11 = 47.',
        ],
        takeaway: 'Use a rate from two points, then one point to recover the starting fee.',
      },
      checkpoints: [
        'Compute a slope from two points before guessing a formula.',
        'Include units when you describe the slope.',
        'Verify a solution of a system in both equations.',
      ],
    },
    {
      slug: 'advanced-math',
      title: 'Nonlinear equations and equivalent expressions',
      summary:
        'Recognize when a relationship is quadratic, exponential, or rational, and simplify without changing the domain.',
      sections: [
        {
          heading: 'Choosing the structure',
          paragraphs: [
            'Constant additive change suggests a linear model. Constant multiplicative change suggests an exponential model. A product of two linear factors suggests a quadratic, whose graph is a parabola and whose zeros are the roots of those factors.',
            'Equivalent expressions agree on their common domain. (x² − 1)/(x − 1) equals x + 1 only when x ≠ 1. Reporting the simplified polynomial without that restriction describes a different function at x = 1.',
          ],
        },
        {
          heading: 'Solving nonlinear equations',
          paragraphs: [
            'If an equation contains a square root, isolating the radical and squaring both sides can introduce an extra solution. Substitute every candidate into the original equation and reject the ones that fail.',
            'For a quadratic set equal to zero, the solutions are the inputs that make a factor zero. If the question asks for the vertex instead, a root is not the requested value.',
          ],
        },
      ],
      example: {
        question: 'For which x is (x² − 1)/(x − 1) equal to 5, if x ≠ 1?',
        steps: [
          'For x ≠ 1 the expression equals x + 1.',
          'Set x + 1 = 5, so x = 4.',
          'x = 4 is allowed. Check: (16 − 1)/(4 − 1) = 15/3 = 5.',
        ],
        takeaway: 'Simplify within the original domain, then solve, then confirm the result was not excluded.',
      },
      checkpoints: [
        'Decide whether a table grows by adding or by multiplying.',
        'Reject extraneous solutions after squaring.',
        'Keep denominator restrictions after canceling.',
      ],
    },
    {
      slug: 'data-analysis',
      title: 'Data, probability, and conditional statements',
      summary:
        'Read the group a statistic refers to, and change the denominator when the problem says “given that.”',
      sections: [
        {
          heading: 'Reference groups',
          paragraphs: [
            'A percentage is meaningless until you know “percent of what.” In a two-way table, a row percent and a column percent answer different questions. “Of the students who prefer bus” uses only that column or row as the whole.',
            'Measures of center summarize differently. The mean uses the sum of all values. The median uses position in an ordered list. A large outlier moves the mean more than the median.',
          ],
        },
        {
          heading: 'Conditional probability',
          paragraphs: [
            'The word “given” restricts the outcomes you are allowed to count. If 9 of 24 bus riders are in a music club, then among bus riders the probability of being in the club is 9/24. Dividing 9 by every student in the school answers a different question.',
            'Write the restricted group in words before you form the fraction. That sentence is the denominator.',
          ],
        },
      ],
      example: {
        question: 'Of 60 students, 24 ride the bus, and 9 of those 24 are in a club. A student is chosen among bus riders. What is the probability the student is in the club?',
        steps: [
          'The condition “rides the bus” leaves 24 possible students.',
          'Nine of those 24 are in the club.',
          'The probability is 9/24 = 3/8.',
        ],
        takeaway: 'Do not use 60 in the denominator after the group has already been restricted.',
      },
      checkpoints: [
        'Underline the group that follows “of” or “given that.”',
        'Say whether a display asks for a count, a rate, or a conditional probability.',
        'Explain how an outlier would affect the mean and the median differently.',
      ],
    },
    {
      slug: 'geometry-and-trigonometry',
      title: 'Geometry and right-triangle trigonometry',
      summary:
        'Use exact relationships among lengths and angles, and attach each trigonometric ratio to a chosen angle.',
      sections: [
        {
          heading: 'Diagrams',
          paragraphs: [
            'Write given lengths on the figure and mark right angles as given, not as guessed. Parallel lines create equal corresponding angles. Those equal angles can show that triangles are similar, and then corresponding sides are proportional.',
            'Area and volume formulas need the dimension they name. The area of a triangle uses a base and the height perpendicular to that base. The volume of a prism is the area of the base times the perpendicular height of the prism.',
          ],
        },
        {
          heading: 'Trigonometric ratios',
          paragraphs: [
            'Pick the acute angle you are using and label the opposite side, the adjacent side, and the hypotenuse. Sine is opposite over hypotenuse. The same triangle gives a different sine for the other acute angle.',
            'If the hypotenuse and one acute angle are known, a sine or cosine equation produces a side. If two sides of a right triangle are known, the Pythagorean theorem produces the third side without trigonometry.',
          ],
        },
      ],
      example: {
        question: 'A ramp rises 3 units over a horizontal distance of 4 units. How long is the ramp, and what is the sine of the angle it makes with the ground?',
        steps: [
          'The ramp is the hypotenuse: √(3² + 4²) = 5.',
          'The angle with the ground has opposite side 3 and hypotenuse 5.',
          'Sine of that angle is 3/5.',
        ],
        takeaway: 'The hypotenuse is the ramp itself, not the horizontal distance.',
      },
      checkpoints: [
        'Mark right angles and parallel lines only when the problem supports them.',
        'Use perpendicular height in area and volume formulas.',
        'Re-label opposite and adjacent when the reference angle changes.',
      ],
    },
  ],
  'ap-calculus-ab': [
    {
      slug: 'functions-limits-and-continuity',
      title: 'Functions, limits, and continuity',
      summary:
        'Separate a function value from a limit, and state the conditions that make a function continuous at a point.',
      sections: [
        {
          heading: 'Limits',
          paragraphs: [
            'The limit of f(x) as x approaches a describes the values f approaches, not necessarily f(a). A hole in a graph can make the limit exist while the function value is undefined or different. One-sided limits must agree for the two-sided limit to exist.',
            'If direct substitution gives a number for a polynomial or a rational function whose denominator is not zero, that number is the limit. If substitution gives 0/0, the expression may have a common factor, and canceling that factor can reveal the limit. The canceled value may still not be in the domain.',
          ],
        },
        {
          heading: 'Continuity',
          paragraphs: [
            'A function is continuous at a if it is defined there, the limit exists there, and the limit equals the function value. Continuity on a closed interval matters because several theorems, including the intermediate value theorem, require it.',
            'A jump, a hole, or a vertical asymptote is a reason continuity fails. Pointing at a graph is not a justification unless you connect it to one of those three conditions.',
          ],
        },
      ],
      example: {
        question: 'Let f(x) = (x² − 4)/(x − 2) for x ≠ 2, and suppose f(2) is not defined. What is the limit as x approaches 2?',
        steps: [
          'Factor: (x − 2)(x + 2)/(x − 2).',
          'For x ≠ 2, f(x) = x + 2.',
          'As x approaches 2, the expression approaches 4, even though f(2) is not defined.',
        ],
        takeaway: 'The limit can exist at a point where the function does not.',
      },
      checkpoints: [
        'State whether you are finding a function value or a limit.',
        'Check both one-sided limits when a piecewise definition changes.',
        'Name which condition of continuity fails if the function is discontinuous.',
      ],
    },
    {
      slug: 'differentiation',
      title: 'Differentiation',
      summary:
        'Compute derivatives with the standard rules and interpret the derivative as a rate or as the slope of a tangent line.',
      sections: [
        {
          heading: 'Rules and the chain rule',
          paragraphs: [
            'The derivative of a power xⁿ is n xⁿ⁻¹ for constant n. Sums and constant multiples pass through the derivative. A product needs the product rule, and a quotient needs the quotient rule. A composition needs the chain rule: the derivative of the outside, evaluated at the inside, times the derivative of the inside.',
            'For f(x) = x³ − 2x at x = 2, f(2) = 4 and f′(x) = 3x² − 2, so f′(2) = 10. The tangent line is y − 4 = 10(x − 2). The derivative alone is the slope; the point still comes from the original function.',
          ],
        },
        {
          heading: 'Meaning',
          paragraphs: [
            'If s(t) is position, s′(t) is velocity and s″(t) is acceleration. A positive velocity means the position is increasing, even if the position itself is negative. Units of the derivative are output units per input unit.',
            'Differentiability implies continuity, but continuity does not imply differentiability. A corner can be continuous and still have no derivative.',
          ],
        },
      ],
      example: {
        question: 'Find the equation of the tangent line to y = x² at x = 3.',
        steps: [
          'The point is (3, 9).',
          'y′ = 2x, so the slope at x = 3 is 6.',
          'The tangent line is y − 9 = 6(x − 3), or y = 6x − 9.',
        ],
        takeaway: 'Use the original function for the point and the derivative for the slope.',
      },
      checkpoints: [
        'Identify products, quotients, and compositions before differentiating.',
        'Include the inner derivative when a function is composed.',
        'Interpret the sign of a derivative as increasing or decreasing, with units.',
      ],
    },
    {
      slug: 'applications-of-derivatives',
      title: 'Applications of derivatives',
      summary:
        'Use derivatives to justify increasing behavior, concavity, and extreme values on an interval.',
      sections: [
        {
          heading: 'Extrema',
          paragraphs: [
            'A critical point is an interior point where the derivative is zero or undefined. Candidates for an absolute maximum or minimum on a closed interval also include the endpoints. Evaluating only the critical points can miss an extreme value that occurs at an endpoint.',
            'If f′ changes from positive to negative at c, f has a local maximum at c. If f′ changes from negative to positive, f has a local minimum. A zero derivative by itself does not prove a maximum or a minimum, because the derivative might not change sign.',
          ],
        },
        {
          heading: 'Related rates and meaning',
          paragraphs: [
            'In a related-rates problem, name each quantity and what its derivative represents. Differentiate the relationship with respect to time, then substitute the values that hold at the instant in question. Do not substitute a constant length before differentiating if that length is actually changing.',
            'The second derivative describes concavity: f″ > 0 on an interval means the graph is concave up there. A justification should name the sign and the interval, not only say “the graph looks like a cup.”',
          ],
        },
      ],
      example: {
        question: 'f(x) = x³ − 3x on [−2, 2]. Where do the absolute maximum and minimum occur?',
        steps: [
          'f′(x) = 3x² − 3 = 3(x − 1)(x + 1), so the critical points are x = −1 and x = 1.',
          'Evaluate f(−2) = −2, f(−1) = 2, f(1) = −2, and f(2) = 2.',
          'The absolute maximum value is 2, at x = −1 and x = 2. The absolute minimum value is −2, at x = −2 and x = 1.',
        ],
        takeaway: 'On a closed interval, compare critical values with both endpoints.',
      },
      checkpoints: [
        'List critical points and endpoints before choosing an absolute extremum.',
        'Explain a local extremum by a sign change of the first derivative.',
        'Differentiate a related-rates equation before substituting an instant’s values.',
      ],
    },
    {
      slug: 'integration-and-accumulation',
      title: 'Antiderivatives and definite integrals',
      summary:
        'Treat an antiderivative as a family of functions, and a definite integral as accumulated change.',
      sections: [
        {
          heading: 'Antiderivatives',
          paragraphs: [
            'An indefinite integral of a function is the family of its antiderivatives, so it includes a constant. The derivative of x² + 7 and the derivative of x² − 3 are the same, 2x. An initial condition chooses the constant.',
            'The power rule for antiderivatives reverses differentiation: the antiderivative of xⁿ is xⁿ⁺¹/(n + 1) plus a constant, when n ≠ −1. Check an antiderivative by differentiating it.',
          ],
        },
        {
          heading: 'Definite integrals',
          paragraphs: [
            'A definite integral from a to b of a rate gives the net change in the quantity over that interval. If water enters at r(t) liters per minute from t = 0 to t = 2, the integral of r is liters added, not the final amount, until you add the water that was already there.',
            'Net area counts area below the axis as negative. Total area does not. Read the question before you drop the absolute value or keep the signed result.',
          ],
        },
      ],
      example: {
        question: 'Water enters a tank at r(t) = 3t² liters per minute for 0 ≤ t ≤ 2. The tank starts with 5 liters and has no outflow. How much water is present at t = 2?',
        steps: [
          'An antiderivative of 3t² is t³.',
          'The accumulated inflow is 2³ − 0³ = 8 liters.',
          'The amount present is 5 + 8 = 13 liters.',
        ],
        takeaway: 'The integral gives net change. The initial amount is added separately.',
      },
      checkpoints: [
        'Include + C for an indefinite integral and determine C from an initial condition.',
        'Differentiate to check an antiderivative.',
        'Say whether a definite integral represents net change, total amount, or signed area.',
      ],
    },
    {
      slug: 'differential-equations',
      title: 'Differential equations',
      summary:
        'Read a differential equation as a statement about a rate, and use an initial condition to select one solution.',
      sections: [
        {
          heading: 'What the equation says',
          paragraphs: [
            'dy/dx = 2x says the slope at each x is 2x. Solutions are functions, not a single number. Integrating both sides gives y = x² + C, a family of parabolas with the same derivative.',
            'An initial condition such as y(0) = 3 selects C. Here 3 = 0 + C, so y = x² + 3. A solution must satisfy both the differential equation and the initial condition.',
          ],
        },
        {
          heading: 'Separable equations and verification',
          paragraphs: [
            'If dy/dx = ky, separating variables leads to an exponential solution y = Ae^(kx), provided y is not zero. The constant A is chosen from the initial amount. This is the model for continuous proportional growth or decay.',
            'To verify a proposed solution, differentiate it and substitute it back into the differential equation. Then check the initial condition. Passing only one of those tests is not enough.',
          ],
        },
      ],
      example: {
        question: 'Solve dy/dx = 4y with y(0) = 2.',
        steps: [
          'Separate: dy/y = 4 dx, for y ≠ 0.',
          'Integrate: ln|y| = 4x + C, so y = Ae^(4x).',
          'y(0) = 2 gives A = 2, so y = 2e^(4x). Differentiating returns 8e^(4x), which equals 4y.',
        ],
        takeaway: 'The differential equation produces the family. The initial condition produces the particular function.',
      },
      checkpoints: [
        'Interpret dy/dx as a slope or a rate before integrating.',
        'Use the initial condition to find the constant.',
        'Verify by differentiating and by checking the initial value.',
      ],
    },
  ],
  'ap-calculus-bc': [
    {
      slug: 'sequences-and-series',
      title: 'Sequences and series',
      summary:
        'Distinguish a list of terms from the sum of those terms, and justify convergence with a test whose conditions you have checked.',
      sections: [
        {
          heading: 'Sequences versus series',
          paragraphs: [
            'A sequence is an ordered list, such as 1, 1/2, 1/3, 1/4. A series adds the terms of a sequence. The partial sums form a new sequence, and the series converges when those partial sums approach a finite number.',
            'If the terms of a series do not approach zero, the series diverges. The converse is false: terms can approach zero while the series still diverges, as with the harmonic series. “The terms get small” is not a convergence proof.',
          ],
        },
        {
          heading: 'Geometric series and error',
          paragraphs: [
            'An infinite geometric series a + ar + ar² + … converges when |r| < 1, and its sum is a/(1 − r). You must state the ratio and confirm that absolute value before using the formula. For 4 − 2 + 1 − 1/2 + …, a = 4 and r = −1/2, so the sum is 4/(1 − (−1/2)) = 8/3.',
            'A requested approximation is not settled by convergence alone. A remainder estimate or error bound says how far a partial sum can be from the infinite sum. Name the test or remainder result you use.',
          ],
        },
      ],
      example: {
        question: 'Does the geometric series with first term 5 and common ratio 2 converge?',
        steps: [
          'The ratio is r = 2.',
          '|r| = 2, which is not less than 1.',
          'The series diverges. The formula a/(1 − r) does not apply.',
        ],
        takeaway: 'Check |r| < 1 before summing an infinite geometric series.',
      },
      checkpoints: [
        'Say whether the object is a sequence, a series, or a sequence of partial sums.',
        'Use “terms go to zero” only as a necessary condition for convergence.',
        'Pair a convergence conclusion with an error bound when an approximation is requested.',
      ],
    },
    {
      slug: 'integration-techniques',
      title: 'Integration techniques and improper integrals',
      summary:
        'Choose an integration method from the form of the integrand, and treat an infinite bound as a limit.',
      sections: [
        {
          heading: 'Choosing a method',
          paragraphs: [
            'Substitution is appropriate when you see a function and a constant multiple of its derivative. Integration by parts is appropriate for a product that becomes simpler when one factor is differentiated. Partial fractions rewrite a proper rational expression as a sum of simpler fractions after factoring the denominator.',
            'After integrating, differentiate your result. An indefinite integral still needs a constant. A definite integral may change its limits when you substitute; forgetting the new limits is a frequent error.',
          ],
        },
        {
          heading: 'Improper integrals',
          paragraphs: [
            'An integral to infinity is defined as a limit of integrals to a finite bound b, as b approaches infinity. You cannot substitute “infinity” as an ordinary number. The integral of 1/x² from 1 to infinity is the limit of 1 − 1/b, which is 1, so it converges.',
            'An integral can also be improper at a finite endpoint where the integrand is unbounded. That case is likewise defined by a limit. If the limit is infinite or does not exist, the improper integral diverges.',
          ],
        },
      ],
      example: {
        question: 'Evaluate the integral of 1/x² from 1 to infinity.',
        steps: [
          'Replace the upper bound by b: the integral from 1 to b is −1/b − (−1/1) = 1 − 1/b.',
          'Take the limit as b approaches infinity.',
          'The limit is 1, so the improper integral converges to 1.',
        ],
        takeaway: 'Write the limit explicitly. Infinity is not a number you plug into an antiderivative.',
      },
      checkpoints: [
        'Name the integration method and the feature of the integrand that suggests it.',
        'Differentiate to verify an antiderivative.',
        'Rewrite an improper integral as a limit before evaluating it.',
      ],
    },
    {
      slug: 'applications-and-differential-equations',
      title: 'Applications and differential equations',
      summary:
        'Connect derivatives and integrals to motion, accumulation, and models whose rate depends on the quantity itself.',
      sections: [
        {
          heading: 'Accumulation in context',
          paragraphs: [
            'If a rate is given, the definite integral of that rate is a net change. Position is not the same as distance traveled if the velocity changes sign. Distance uses the integral of speed, which is the absolute value of velocity.',
            'Keep units. An acceleration in meters per second squared, integrated over seconds, becomes a velocity in meters per second. An initial condition supplies the missing constant when you go backward from a rate to the quantity.',
          ],
        },
        {
          heading: 'Differential equations',
          paragraphs: [
            'A slope field shows the direction of solutions without giving the explicit formula. A solution curve follows those segments and must pass through the given point if an initial condition is present.',
            'Logistic and other proportional models are interpreted, not only solved. The phrase “rate proportional to the amount present” becomes dy/dt = ky. Euler’s method approximates a solution with short tangent steps; the step size affects the accuracy, and the result is an approximation.',
          ],
        },
      ],
      example: {
        question: 'Velocity is v(t) = t − 2 on 0 ≤ t ≤ 4, and the position at t = 0 is 1. What is the position at t = 4?',
        steps: [
          'An antiderivative of t − 2 is t²/2 − 2t.',
          'The net change in position is (8 − 8) − 0 = 0.',
          'The position at t = 4 is the initial position plus net change, which is 1. The distance traveled is larger because the velocity is negative and then positive.',
        ],
        takeaway: 'Net change can be zero while the object still moves. Distance and displacement answer different questions.',
      },
      checkpoints: [
        'Add an initial value after integrating a rate.',
        'Use absolute value when the question asks for total distance.',
        'Check a differential-equation solution against both the equation and the initial condition.',
      ],
    },
    {
      slug: 'parametric-and-polar-reasoning',
      title: 'Parametric and polar reasoning',
      summary:
        'Treat x and y as functions of another variable, and compute slopes or areas without forcing y to be a function of x.',
      sections: [
        {
          heading: 'Parametric curves',
          paragraphs: [
            'A parametric curve gives x(t) and y(t). The slope dy/dx is (dy/dt) / (dx/dt), provided dx/dt is not zero. A horizontal tangent occurs when dy/dt = 0 and dx/dt ≠ 0. A vertical tangent can occur when dx/dt = 0 and dy/dt ≠ 0.',
            'Arc length and speed use both derivatives: speed is the square root of (dx/dt)² + (dy/dt)². Do not use only dy/dx if the question asks how fast the particle is moving along the curve.',
          ],
        },
        {
          heading: 'Polar curves',
          paragraphs: [
            'In polar coordinates, a point is a distance from the origin and an angle. r = 2 cos θ is a circle, not a cosine wave drawn in the Cartesian plane. Convert to x and y when you need a familiar Cartesian equation, using x = r cos θ and y = r sin θ.',
            'Area in polar coordinates uses (1/2)∫ r² dθ over the given interval of θ. The factor one-half and the square of r are part of the formula. Identify the interval of θ that traces the region once.',
          ],
        },
      ],
      example: {
        question: 'x = t² and y = t³. Find dy/dx at t = 2.',
        steps: [
          'dx/dt = 2t and dy/dt = 3t².',
          'dy/dx = (3t²) / (2t) = 3t/2 for t ≠ 0.',
          'At t = 2, the slope is 3.',
        ],
        takeaway: 'Differentiate with respect to the parameter, then divide. Do not treat t as y.',
      },
      checkpoints: [
        'Compute dy/dx from the two parametric derivatives.',
        'Use speed, not slope, when the question asks how fast a particle moves.',
        'Square r and include 1/2 in a polar area integral.',
      ],
    },
  ],
  'ap-precalculus': [
    {
      slug: 'polynomial-and-rational-functions',
      title: 'Polynomial and rational functions',
      summary:
        'Connect factors to zeros, excluded inputs, holes, and end behavior.',
      sections: [
        {
          heading: 'Zeros and factors',
          paragraphs: [
            'If (x − 4) is a factor of a polynomial, then x = 4 is a zero and the graph meets the x-axis there. A repeated factor can change whether the graph crosses or touches the axis. The end behavior of a polynomial depends on the degree and the sign of the leading coefficient.',
            'Evaluating p(2) is different from solving p(x) = 2. A table can reveal a constant difference for a linear function, or a constant second difference for a quadratic. Compare equal steps in the input before you name the family.',
          ],
        },
        {
          heading: 'Rational functions',
          paragraphs: [
            'A rational function is undefined where its original denominator is zero. If a factor cancels, the graph has a hole at that input. If a factor remains in the denominator, the graph has a vertical asymptote there, unless that input was already excluded for another reason you must still state.',
            'For f(x) = (x² − 9)/(x − 3), the simplified rule x + 3 agrees with f everywhere except x = 3. The graph has a hole at the point (3, 6), not a vertical asymptote.',
          ],
        },
      ],
      example: {
        question: 'Describe the graph of f(x) = (x − 1)(x + 2)/(x − 1).',
        steps: [
          'The original function is undefined at x = 1.',
          'For every other x, f(x) = x + 2.',
          'The graph is the line y = x + 2 with a hole at (1, 3).',
        ],
        takeaway: 'Cancellation removes the factor from the simplified rule, but it does not put the excluded input back into the domain.',
      },
      checkpoints: [
        'List zeros from factors and excluded inputs from the original denominator.',
        'Decide whether a canceled factor creates a hole or a remaining factor creates a vertical asymptote.',
        'Separate evaluating a function from solving an equation.',
      ],
    },
    {
      slug: 'exponential-and-logarithmic-functions',
      title: 'Exponential and logarithmic functions',
      summary:
        'Read an initial amount and a growth factor, and use logarithms to solve for an exponent.',
      sections: [
        {
          heading: 'Exponential models',
          paragraphs: [
            'In P(t) = 200(1.15)^t, the initial amount is 200 because any nonzero number to the power 0 is 1. Each increase of 1 in t multiplies the amount by 1.15, which is a 15% increase, not a 115% increase. The 1 in 1.15 is the original amount kept, and the 0.15 is the increase.',
            'Equal time steps with a constant ratio support an exponential model. Equal time steps with a constant difference support a linear model. Check the ratio or the difference before choosing a formula.',
          ],
        },
        {
          heading: 'Logarithms',
          paragraphs: [
            'A logarithm asks for an exponent. If 2^x = 16, then x = log₂(16) = 4 because 2⁴ = 16. The input of a logarithm must be positive, so the domain is part of the answer when the input is an expression.',
            'To solve 3(2)^t = 48, divide by 3 first: 2^t = 16, so t = 4. Taking a logarithm before isolating the exponential term usually creates extra algebra.',
          ],
        },
      ],
      example: {
        question: 'A population is P(t) = 500(0.8)^t. What does 0.8 mean, and what percent change is that per time unit?',
        steps: [
          'At t = 0, P = 500.',
          'Each time unit multiplies the population by 0.8.',
          'It keeps 80% of the previous amount, which is a 20% decrease per time unit.',
        ],
        takeaway: 'A factor between 0 and 1 is decay. Subtract the factor from 1 to get the percent decrease, as a decimal, when the factor is positive.',
      },
      checkpoints: [
        'Read the initial amount by substituting t = 0.',
        'Convert a growth factor to a percent increase or decrease.',
        'Isolate the exponential before using a logarithm, and keep the logarithm’s domain.',
      ],
    },
    {
      slug: 'trigonometric-and-polar-functions',
      title: 'Trigonometric and polar functions',
      summary:
        'Describe amplitude, midline, and period, and interpret polar coordinates as distance and angle.',
      sections: [
        {
          heading: 'Sine and cosine graphs',
          paragraphs: [
            'A sine or cosine graph repeats. The midline is the horizontal center of the wave. The amplitude is the distance from the midline to a maximum. The period is the length of one complete repetition, measured in the input’s units, such as radians or seconds.',
            'In y = 3 sin(2x) + 1, the amplitude is 3, the midline is y = 1, and the 2 inside the sine compresses the period from 2π to π. Adding 1 outside changes outputs. Multiplying the input changes how fast the angle increases.',
          ],
        },
        {
          heading: 'Polar coordinates',
          paragraphs: [
            'A polar point (r, θ) is r units from the origin at an angle θ from the positive x-axis. Negative r is plotted in the opposite direction of θ. The same point can have more than one polar representation because an angle can increase by a full turn.',
            'A polar equation such as r = 4 describes all points 4 units from the origin, which is a circle. Convert with x = r cos θ and y = r sin θ when a Cartesian description is easier.',
          ],
        },
      ],
      example: {
        question: 'For y = 4 cos(πx) − 2, state the amplitude, midline, and period.',
        steps: [
          'The amplitude is 4, the coefficient of cosine.',
          'The midline is y = −2.',
          'The period is 2π divided by the coefficient of x inside cosine, so 2π / π = 2.',
        ],
        takeaway: 'Amplitude, midline, and period are three separate features. Do not read the amplitude from the midline.',
      },
      checkpoints: [
        'Identify amplitude, midline, and period from an equation and from a graph.',
        'Explain a horizontal change as a change to the input.',
        'Plot a polar point using both a distance and an angle.',
      ],
    },
    {
      slug: 'parametric-vectors-and-matrices',
      title: 'Parametric functions, vectors, and matrices',
      summary:
        'Describe motion with a parameter, combine vectors by components, and use matrices to represent linear relationships.',
      sections: [
        {
          heading: 'Parametric functions and vectors',
          paragraphs: [
            'If x and y both depend on t, the path is a parametric curve. Eliminating t can produce a Cartesian equation, but the allowed values of t still restrict which part of that equation is traced. The direction of motion comes from how t increases.',
            'A vector in the plane has components. Adding vectors adds the corresponding components. The magnitude of ⟨a, b⟩ is √(a² + b²), which is a length. A velocity vector’s components are horizontal and vertical rates, and its magnitude is speed.',
          ],
        },
        {
          heading: 'Matrices',
          paragraphs: [
            'A matrix can store the coefficients of a linear system. Multiplying a matrix by a vector applies the linear transformation that matrix represents. The order of matrix multiplication matters: AB and BA are not generally equal, and one of them may not even be defined if the sizes do not match.',
            'The identity matrix leaves a compatible vector unchanged. An inverse, when it exists, undoes the transformation. A system with no unique solution does not have an invertible coefficient matrix.',
          ],
        },
      ],
      example: {
        question: 'A particle has position ⟨3t, t²⟩ at time t. What is its position and speed at t = 2?',
        steps: [
          'The position is ⟨6, 4⟩.',
          'The velocity is the derivative ⟨3, 2t⟩, so at t = 2 it is ⟨3, 4⟩.',
          'The speed is √(3² + 4²) = 5.',
        ],
        takeaway: 'Differentiate each component to get velocity, then take the magnitude to get speed.',
      },
      checkpoints: [
        'State the interval of the parameter, not only the Cartesian path.',
        'Add vectors component by component and compute magnitude with the Pythagorean relation.',
        'Check that matrix dimensions match before multiplying, and keep the multiplication order.',
      ],
    },
  ],
};

export function getCourseLessons(courseSlug: string): CourseLesson[] {
  return lessonsByCourse[courseGuideKey(courseSlug)] ?? [];
}

export function getCourseLesson(courseSlug: string, lessonSlug: string): CourseLesson | undefined {
  return getCourseLessons(courseSlug).find((lesson) => lesson.slug === lessonSlug);
}
