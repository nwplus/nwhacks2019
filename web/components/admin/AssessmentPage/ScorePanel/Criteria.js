const criteria = [
  {
    name: 'githubPersonalWebsite',
    title: 'Github/Personal Website',
  },
  {
    name: 'resumeLinkedin',
    title: 'Resume/LinkedIn',
  },
  {
    name: 'writtenResponse1',
    title: "What is a project you're interested in building?",
  },
  {
    name: 'writtenResponse2',
    title: "Tell us about a recent project you’ve worked on that you're proud of!",
  },
];

// Determines the weight ratio of the scores between
//  1. the total score of the portfolio criteria
//  2. the total score of the longAnswers criteria
// +-----------------------+----------------------------------+
// | Portfolio score (/10) | Portfolio / long answers scaling |
// +-----------------------+----------------------------------+
// | 1                     | 50/50                            |
// | 2-5                   | 70/30                            |
// | 6-8                   | 80/20                            |
// | 9-10                  | 90/10                            |
// +-----------------------+----------------------------------+
const weightRatio = {
  1: 0.5,
  2: 0.7,
  3: 0.7,
  4: 0.7,
  5: 0.7,
  6: 0.8,
  7: 0.8,
  8: 0.8,
  9: 0.9,
  10: 0.9,
};

// calculates the final score given an map of criteria name to score value
const calculateFinalScore = (scores) => {
  const portfolioScore = scores.githubPersonalWebsite + scores.resumeLinkedin;
  const longAnswersScore = scores.writtenResponse1 + scores.writtenResponse2;
  const portfolioWeight = weightRatio[portfolioScore];
  const longAnswersWeight = 1 - portfolioWeight;
  const finalScore = portfolioWeight * portfolioScore + longAnswersWeight * longAnswersScore;
  return Math.round(finalScore * 10) / 10; // round to one decimal place
};

export { criteria, calculateFinalScore };
