// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/NavigationRoutes/counter/counterSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export default store;
