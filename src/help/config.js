export const HOST           = process.env.REACT_APP_HOST;           // http://localhost
export const APP_PORT       = process.env.REACT_APP_PORT;           // 3003
export const APP_HOST       = HOST +":" + APP_PORT;                 // http://localhost:3003
export const DB_PORT        = process.env.REACT_APP_DB_PORT         // 3001
export const DB_HOST        = HOST +":" +DB_PORT                    // http://localhost:3001
export const DB_HOST_TASK   = DB_HOST +"/tasks";                    // http://localhost:3001/tasks
// export const DB_HOST        = process.env.REACT_APP_DB_HOST;
