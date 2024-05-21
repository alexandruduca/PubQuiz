/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
