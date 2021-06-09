import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/DataSlice/DataSclice'

export const store = configureStore({
  reducer: {
    global: dataReducer
  },
});
