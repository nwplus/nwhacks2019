const cleaner = require('deep-cleaner');

exports.Volunteer = function Volunteer(data) {
  const volunteer = {
    // contains all info about a hacker
    volunteer_full_info: {
      id: data.id,
      timestamp: data.timestamp,
      // PAGE ONE
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      city: data.city,
      school: data.school,
      gender: data.gender,
      isOver19: data.isOver19,
      education: data.education,
      gradYear: data.gradYear,
      major: data.major,
      phoneNumber: data.phoneNumber,
      ethnicity: data.ethnicity,
      // PAGE TWO
      interestForNwHacks: data.interestForNwHacks,
      freeHours: data.freeHours,
      dayOne0830To1300: data.dayOne0830To1300,
      dayOne1300To1800: data.dayOne1300To1800,
      dayOne1800To2300: data.dayOne1800To2300,
      dayOneOvernight: data.dayOneOvernight,
      dayTwo0800To1200: data.dayTwo0800To1200,
      dayTwo1200To1800: data.dayTwo1200To1800,
      source: data.source,
      isPrivacyPolicyChecked: data.isPrivacyPolicyChecked,
      isCodeOfConductChecked: data.isCodeOfConductChecked,
    },
    // contains a subset of frequently used fields from hacker_full_info
    volunteer_short_info: {
      id: data.id,
      timestamp: data.timestamp,
      // PAGE ONE
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      city: data.city,
      school: data.school,
      gender: data.gender,
      isOver19: data.isOver19,
      education: data.education,
      gradYear: data.gradYear,
      major: data.major,
      phoneNumber: data.phoneNumber,
      ethnicity: data.ethnicity,
      // PAGE TWO
      freeHours: data.freeHours,
      day1_830_to_1: data.day1_830_to_1,
      day1_1_to_6: data.day1_1_to_6,
      day1_6_to_11: data.day1_6_to_11,
      day1_overnight: data.day1_overnight,
      day2_8_to_12: data.day2_8_to_12,
      day2_12_to_6: data.day2_12_to_6,
      source: data.source,
      isPrivacyPolicyChecked: data.isPrivacyPolicyChecked,
      isCodeOfConductChecked: data.isCodeOfConductChecked,
    },
    volunteer_long_info: {
      id: data.id,
      timestamp: data.timestamp,
      interestForNwHacks: data.interestForNwHacks,
    },
  };

  // remove any empty values
  cleaner(volunteer.volunteer_short_info);
  cleaner(volunteer.volunteer_full_info);
  cleaner(volunteer.volunteer_long_info);

  return volunteer;
};
