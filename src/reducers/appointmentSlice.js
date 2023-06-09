import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  specialty: '',
  specialtyName: '',
  employee: '',
  employeeName: '',
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
    setSpecialtyName: (state, action) => {
      state.specialtyName = action.payload;
    },
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    setEmployeeName: (state, action) => {
      state.employeeName = action.payload;
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
  setSpecialty, setEmployee, setDate, setReason, setEmployeeName, setSpecialtyName,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
