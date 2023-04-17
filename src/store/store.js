import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from '../reducers/appointmentSlice';

const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
  },
});

export default store;
