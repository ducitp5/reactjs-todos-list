const { exec } = require('child_process');
const path = './src/data/create-db.js'; // Path to the script

exec(`node ${path}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error running create-db.js: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Script stderr: ${stderr}`);
        return;
    }
    console.log(`Script output:\n${stdout}`);
});
