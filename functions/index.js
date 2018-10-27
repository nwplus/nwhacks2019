// Handles exporting functions to GCF

// import functions
const exampleHelloWorld = require('./src/examples/index').helloWorld;
const exampleGetData = require('./src/examples/index').getData;

// export functions
exports.exampleHelloWorld = exampleHelloWorld;
exports.exampleGetData = exampleGetData;
