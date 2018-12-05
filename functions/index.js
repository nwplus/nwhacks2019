// Handles exporting functions to GCF

// import functions
const exampleHelloWorld = require('./src/examples/index').helloWorld;
const exampleGetData = require('./src/examples/index').getData;
const { submitApplicationHacker } = require('./src/submitApplication/index');
const { submitApplicationVolunteer } = require('./src/submitVolunteerApplication/index');
const { backfillShortInfo } = require('./src/tasks/backfill/backfillShortInfo');
// export functions
exports.exampleHelloWorld = exampleHelloWorld;
exports.exampleGetData = exampleGetData;
exports.submitApplicationHacker = submitApplicationHacker;
exports.submitApplicationVolunteer = submitApplicationVolunteer;
exports.backfillShortInfo = backfillShortInfo;
