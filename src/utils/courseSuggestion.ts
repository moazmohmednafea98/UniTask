export const suggestCourseFromTask = (taskName: string, taskDescription: string, availableCourses: string[]): string | null => {
  const text = (taskName + ' ' + taskDescription).toLowerCase();
  
  // Create a map of course keywords for matching
  const courseKeywords: { [key: string]: string[] } = {
    'Calculus': ['calculus', 'integral', 'derivative', 'limit'],
    'Physics': ['physics', 'mechanics', 'motion', 'force', 'energy'],
    'Data Structures': ['data structure', 'stack', 'queue', 'tree', 'graph', 'linked list'],
    'Algorithms': ['algorithm', 'sorting', 'searching', 'complexity', 'dynamic programming'],
    'Database': ['database', 'sql', 'query', 'schema', 'table', 'relational'],
    'Web Development': ['web', 'html', 'css', 'javascript', 'react', 'frontend', 'backend'],
    'Machine Learning': ['machine learning', 'neural', 'model', 'training', 'ai'],
    'Chemistry': ['chemistry', 'reaction', 'element', 'molecule', 'compound', 'chemical'],
    'Biology': ['biology', 'cell', 'organism', 'dna', 'genetic', 'evolution'],
    'English': ['english', 'literature', 'essay', 'writing', 'reading', 'grammar'],
    'Accounting': ['accounting', 'ledger', 'balance', 'financial', 'audit'],
    'Marketing': ['marketing', 'campaign', 'brand', 'consumer', 'sales'],
  };

  // Score each available course
  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const course of availableCourses) {
    let score = 0;
    const courseLower = course.toLowerCase();

    // Direct course name match
    if (text.includes(courseLower)) {
      score += 10;
    }

    // Check keywords for this course
    for (const [courseKey, keywords] of Object.entries(courseKeywords)) {
      if (courseLower.includes(courseKey.toLowerCase())) {
        for (const keyword of keywords) {
          if (text.includes(keyword)) {
            score += 1;
          }
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = course;
    }
  }

  // Only return a match if confidence is high enough (score > 2)
  return bestScore > 2 ? bestMatch : null;
};
