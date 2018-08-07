// Handles exporting functions to GCF

// import functions
const exampleFunction = require('./src/example').helloWorld;

// export functions
exports.example = exampleFunction;
