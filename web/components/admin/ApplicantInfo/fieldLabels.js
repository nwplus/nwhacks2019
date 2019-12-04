const fieldLabels = {
  hacker: {
    'assessment-only': {
      shortInfo: [
        { name: 'firstHackathon', label: 'Is this your first hackathon?' },
        { name: 'linkGithub', label: 'GitHub/BitBucket/GitLab' },
        { name: 'linkPortfolio', label: 'Personal website/portfolio' },
        { name: 'linkLinkedin', label: 'LinkedIn' },
        { name: 'linkResume', label: 'Resume' },
      ],
      longInfo: [
        { name: 'longTechnology', label: 'How would you like to utilize technology to make the world a better place?' },
        { name: 'longProject', label: 'Tell us about a project you\'ve worked on outside of school. This does not have to be technical or design related, just something you\'ve worked on that you\'re proud of.' },
      ],
    },
    'all-fields': {
      shortInfo: [
        { name: 'timestamp', label: 'Submitted' },
        { name: 'firstname', label: 'First name' },
        { name: 'lastname', label: 'Last name' },
        { name: 'email', label: 'Email' },
        { name: 'phonenumber', label: 'Phone number' },
        { name: 'gender', label: 'Gender' },
        { name: 'ethnicity', label: 'Race/ethnicity' },
        { name: 'education', label: 'Education level' },
        { name: 'school', label: 'School' },
        { name: 'major', label: 'Major' },
        { name: 'gradyear', label: 'Graduation year' },
        { name: 'city', label: 'City' },
        { name: 'travel', label: 'Would you like to apply for a travel reimbursement?' },
        { name: 'firstHackathon', label: 'Is this your first hackathon?' },
        { name: 'linkGithub', label: 'GitHub/BitBucket/GitLab' },
        { name: 'linkPortfolio', label: 'Personal website/portfolio' },
        { name: 'linkLinkedin', label: 'LinkedIn' },
        { name: 'linkResume', label: 'Resume' },
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
        { name: 'longTechnology', label: 'How would you like to utilize technology to make the world a better place?' },
        { name: 'longProject', label: 'Tell us about a project you\'ve worked on outside of school. This does not have to be technical or design related, just something you\'ve worked on that you\'re proud of.' },
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
  no: 'No, I will not need a travel reimbursement.',
  'travel reimbursement': 'Yes, I would like to apply for a travel reimbursement.',
  'shuttle bus': 'No, but I would like a seat on the bus from the Seattle/UW area.',
};

export { fieldLabels, travelLabels };
