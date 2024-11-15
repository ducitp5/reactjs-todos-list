import uuid from 'react-uuid';

const BASE_URL = "http://localhost:3001/tasks";

export const fetchTasksFromDB = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch tasks from DB.");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const deleteTaskFromDB = async (id) => {
    let $uri = `${BASE_URL}/${id}`;

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
// export const addTaskToDB = async (task) => {
//     try {
//         if (!task.id) task.id = uuid();
//         const response = await fetch(BASE_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(task),
//         });
//         if (!response.ok) throw new Error("Failed to add task to DB.");
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//     }
// };
