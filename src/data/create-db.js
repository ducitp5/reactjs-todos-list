const fs = require('fs');
const path = './src/data/database/db.json';
const defaultTasksPath = './src/data/defaultTasks.json';

// Check if db.json exists
if (!fs.existsSync(path)) {
    // If not, load data from defaultTasks.json
    let initialData = { tasks: [] };

    if (fs.existsSync(defaultTasksPath)) {
        const defaultTasks = JSON.parse(fs.readFileSync(defaultTasksPath, 'utf-8'));
        initialData.tasks = defaultTasks; // Assign tasks from defaultTasks.json
    } else {
        console.log('defaultTasks.json not found. Initializing db.json with an empty tasks array.');
    }

    // Write to db.json
    fs.writeFileSync(path, JSON.stringify(initialData, null, 2));
    console.log('db.json created with initial structure from defaultTasks.json.');
} else {
    console.log('db.json already exists.');
}
