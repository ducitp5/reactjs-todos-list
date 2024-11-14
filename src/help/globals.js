// src/global.js
global.ddd = function (data) {
    console.log(data); // Print the data to console
    throw new Error('Execution stopped by dumpAndDie'); // Stop execution
};

// src/globals.js
global.dd = function (data) {
    console.log(data); // Print the data to console
    process.exit(1);   // Stop the program
};
