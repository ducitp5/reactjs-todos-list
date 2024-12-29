// src/features/counter/Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';
import store from "../../../app/store";
import { Provider } from 'react-redux';

const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
        </div>
    );
};

// Export Counter wrapped with Provider
const CounterWithProvider = () => (
    <Provider store={store}>
        <Counter />
    </Provider>
);

export default CounterWithProvider;
export { Counter };