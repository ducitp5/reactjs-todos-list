// utils/localStorageService.js

export const fetchTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem("task");
    return tasks ? JSON.parse(tasks) : [];
};

// export const saveTasksToLocalStorage = (tasks) => {
//     localStorage.setItem("task", JSON.stringify(tasks));
// };
//
// export const deleteTaskFromLocalStorage = (id, items) => {
//     return items.filter(item => item.id !== id);
// };
//
// export const addTaskToLocalStorage = (task, items) => {
//     const existingItems = items.filter((item) => item.id !== task.id);
//     return [...existingItems, task];
// };
