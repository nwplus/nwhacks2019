const cleaner = require('deep-cleaner');

exports.Hacker = function Hacker(data) {
  const hacker = {
    hacker_quick_info: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      timestamp: data.timestamp,
    },
    hacker_main_info: {
      // PAGE ONE
      city: data.city,
      school: data.school,
      gender: data.gender,
      birthDate: data.birthDate,
      education: data.education,
      gradYear: data.gradYear,
      travel: data.travel,
      major: data.major,
      phoneNumber: data.phoneNumber,
      ethnicity: data.ethnicity,
      // PAGE TWO
      isFirstHackathon: data.isFirstHackathon,
      githubLink: data.githubLink, // optional
      personalWebsiteLink: data.personalWebsiteLink, // optional
      linkedInLink: data.linkedInLink, // optional
      resumeLink: data.resumeLink,
      interestForNwHacks: data.interestForNwHacks,
      recentProject: data.recentProject,
      isDeveloper: data.isDeveloper, // optional
      isHardware: data.isHardware, // optional
      isDesigner: data.isDesigner, // optional
      // PAGE THREE
      source: data.source,
      isPrivacyPolicyChecked: data.isisPrivacyPolicyChecked,
      isCodeOfConductChecked: data.isCodeOfConductChecked,
      isDataReportingChecked: data.isDataReportingChecked,
      isDocumentsChecked: data.isDocumentsChecked,
    },
  };

  // remove any empty values
  cleaner(hacker.hacker_quick_info);
  cleaner(hacker.hacker_main_info);

  return hacker;
};
