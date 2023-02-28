import { configureStore } from '@reduxjs/toolkit'
import filter from './filters/slice';
import pizza from './pizza/slice';
import cart from './cart/slice';
import drinks from './drinks/slice';
import salads from './salads/slice';

import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
        drinks,
        salads
    }
})

export type RootType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();