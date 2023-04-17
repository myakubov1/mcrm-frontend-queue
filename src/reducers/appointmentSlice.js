import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  specialty: '',
  employee: '',
  date: '',
  reason: '',
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setSpecialty: (state, action) => {
      state.specialty = action.payload;
    },
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setReason: (state, action) => {
      state.reason = action.payload;
    },
  },
});

export const {
  setSpecialty, setEmployee, setDate, setReason,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
