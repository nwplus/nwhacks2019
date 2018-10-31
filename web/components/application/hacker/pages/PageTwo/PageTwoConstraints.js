export const constraints = {
  isFirstHackathon: {
    presence: true,
  },
  resumeLink: {
    presence: true,
    url: true,
  },
  interestForNwHacks: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 750,
    },
  },
  recentProject: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 750,
    },
  },
};
