import uuid from 'react-uuid';
import * as config from 'help/config.js'

const DB_HOST_TASK = config.DB_HOST_TASK;
const HOST_PORT = config.APP_PORT;
const DB_HOST = config.DB_HOST

console.log(DB_HOST_TASK, HOST_PORT, DB_HOST)

export const fetchTasksFromJsonDB = async () => {
    try {
        const response = await fetch(DB_HOST_TASK);
        if (!response.ok) throw new Error("Failed to fetch tasks from DB.");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const deleteTaskFromJsonDB = async (id) => {
    let $uri = `${DB_HOST_TASK}/${id}`;

    try {
        const response = await fetch($uri, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete task from DB.");
        console.log('deleteTaskFromDB', response)

        return response.json();
    }
    catch (error) {
        console.error(error,$uri);
        return false;
    }
};

export const addTaskToJsonDB = async (task) => {

    try {
        if (!task.id) task.id = uuid();
        const response = await fetch(config.DB_HOST_TASK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error("Failed to add task to DB.");
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

// export const updateTaskInDB = async (task) => {
//     try {
//         const response = await fetch(`${BASE_URL}/${task.id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(task),
//         });
//         if (!response.ok) throw new Error("Failed to update task in DB.");
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//     }
// };
//

