const fieldLabels = {
  hacker: {
    'assessment-only': {
      shortInfo: [
        { name: 'isFirstHackathon', label: 'Is this your first hackathon?' },
        { name: 'githubLink', label: 'GitHub/BitBucket/GitLab' },
        { name: 'personalWebsiteLink', label: 'Personal website/portfolio' },
        { name: 'linkedInLink', label: 'LinkedIn' },
        { name: 'resumeLink', label: 'Resume' },
      ],
      longInfo: [
        { name: 'interestForNwHacks', label: 'What are you interested in building at nwHacks? Tell us about an idea you have, and why it gets you excited.' },
        { name: 'recentProject', label: 'Tell us about a recent project you\'ve worked on that you\'re proud of! (It doesn\'t have to be technical)' },
      ],
    },
    'all-fields': {
      shortInfo: [
        { name: 'timestamp', label: 'Submitted' },
        { name: 'firstName', label: 'First name' },
        { name: 'lastName', label: 'Last name' },
        { name: 'email', label: 'Email' },
        { name: 'phoneNumber', label: 'Phone number' },
        { name: 'gender', label: 'Gender' },
        { name: 'ethnicity', label: 'Race/ethnicity' },
        { name: 'birthdate', label: 'Birthdate (YYYY-MM-DD)' },
        { name: 'education', label: 'Education level' },
        { name: 'school', label: 'School' },
        { name: 'major', label: 'Major' },
        { name: 'gradYear', label: 'Graduation year' },
        { name: 'city', label: 'City' },
        { name: 'travel', label: 'Would you like to apply for a travel reimbursement?' },
        { name: 'isFirstHackathon', label: 'Is this your first hackathon?' },
        { name: 'githubLink', label: 'GitHub/BitBucket/GitLab' },
        { name: 'personalWebsiteLink', label: 'Personal website/portfolio' },
        { name: 'linkedInLink', label: 'LinkedIn' },
        { name: 'resumeLink', label: 'Resume' },
        { name: 'source', label: 'How did you hear about nwHacks?' },
      ],
      rsvpInfo: [
        { name: 'rsvp_dietRestriction', label: 'RSVP: Dietary restrictions' },
        { name: 'rsvp_tShirtSize', label: 'RSVP: T-shirt size' },
        { name: 'rsvp_emergencyContactName', label: 'RSVP: Emergency contact name' },
        { name: 'rsvp_emergencyContactNumber', label: 'RSVP: Emergency contact phone number' },
        { name: 'rsvp_wouldLikeToSee', label: 'RSVP: What would you like to see at nwHacks?' },
      ],
      longInfo: [
        { name: 'interestForNwHacks', label: 'What are you interested in building at nwHacks? Tell us about an idea you have, and why it gets you excited.' },
        { name: 'recentProject', label: 'Tell us about a recent project you\'ve worked on that you\'re proud of! (It doesn\'t have to be technical)' },
      ],
    },
  },
  volunteer: {
    'assessment-only': { // no assessment for volunteers
      shortInfo: [],
      longInfo: [],
    },
    'all-fields': {
      shortInfo: [
        { name: 'timestamp', label: 'Submitted' },
        { name: 'freeHours', label: '24-hour availability' },
        { name: 'firstName', label: 'First name' },
        { name: 'lastName', label: 'Last name' },
        { name: 'email', label: 'Email' },
        { name: 'phoneNumber', label: 'Phone number' },
        { name: 'gender', label: 'Gender' },
        { name: 'ethnicity', label: 'Race/ethnicity' },
        { name: 'education', label: 'Education level' },
        { name: 'school', label: 'School' },
        { name: 'major', label: 'Major' },
        { name: 'gradYear', label: 'Graduation year' },
        { name: 'city', label: 'City' },
        { name: 'source', label: 'How did you hear about nwHacks?' },
      ],
      rsvpInfo: [
        { name: 'rsvp_orientationAvailability_jan16orientation', label: 'RSVP: Available for January 16th orientation?' },
        { name: 'rsvp_orientationAvailability_jan17orientation', label: 'RSVP: Available for January 17th orientation?' },
        { name: 'rsvp_orientationAvailability_neitherOrientation', label: 'RSVP: Not available for either orientation?' },
        { name: 'rsvp_dietRestriction', label: 'RSVP: Dietary restrictions' },
        { name: 'rsvp_tShirtSize', label: 'RSVP: T-shirt size' },
        { name: 'rsvp_emergencyContactName', label: 'RSVP: Emergency contact name' },
        { name: 'rsvp_emergencyContactNumber', label: 'RSVP: Emergency contact phone number' },
        { name: 'rsvp_wouldLikeToSee', label: 'RSVP: What would you like to see at nwHacks?' },
      ],
      longInfo: [
        { name: 'interestForNwHacks', label: 'What are you interested in building at nwHacks? Tell us about an idea you have, and why it gets you excited.' },
      ],
    },
  },
};

const travelLabels = {
  0: 'No, I will not need a travel reimbursement.',
  1: 'Yes, I would like to apply for a travel reimbursement.',
  2: 'No, but I would like a seat on the bus from the Seattle/UW area.',
};

export { fieldLabels, travelLabels };
