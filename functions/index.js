// Handles exporting functions to GCF

// import functions
const exampleHelloWorld = require('./src/examples/index').helloWorld;
const exampleGetData = require('./src/examples/index').getData;
const { submitApplicationHacker } = require('./src/submitApplication/index');
const { submitApplicationVolunteer } = require('./src/submitVolunteerApplication/index');
const { backfillShortInfo } = require('./src/tasks/backfill/backfillShortInfo');
const { backfillLongInfo } = require('./src/tasks/backfill/backfillLongInfo');
const { checkValidID } = require('./src/RSVP/checkValidID');
const { submitRSVP } = require('./src/RSVP/submitRSVP');
const { tagApplicants } = require('./src/tagApplicants/index');
const { importMentors } = require('./src/importMentors/index');

// export functions
exports.exampleHelloWorld = exampleHelloWorld;
exports.exampleGetData = exampleGetData;
exports.submitApplicationHacker = submitApplicationHacker;
exports.submitApplicationVolunteer = submitApplicationVolunteer;
exports.backfillShortInfo = backfillShortInfo;
exports.backfillLongInfo = backfillLongInfo;
exports.checkValidID = checkValidID;
exports.submitRSVP = submitRSVP;
exports.tagApplicants = tagApplicants;
exports.importMentors = importMentors;
