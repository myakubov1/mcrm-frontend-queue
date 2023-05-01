import { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  CssBaseline,
} from '@mui/material/';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { formatISO } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import axios from 'axios';
import apis from '../services/api';

export default function Appointment() {
  const [error, setError] = useState();
  const [specialties, setSpecialties] = useState();

  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedReason, setSelectedReason] = useState('');

  useEffect(() => {
    axios.get(apis.specialty.getSpecialties)
      .then((response) => {
        setSpecialties(response.data.specialties);
        console.log(response.data.specialties);
      })
      .catch((e) => {
        setError(e.response.data.message);
        console.log(e);
      });
  }, []);

  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value);
    setSelectedDoctor('');
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // преобразуем дату в формат ISO с учетом смещения на +3 часа
    const isoDate = formatISO(selectedDate, { timeZone: '+03:00' });
    // отправляем данные формы на сервер
  };

  const employees = specialties?.find((spec) => spec.name === selectedSpecialty)?.employees;

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="specialty-label">Специальность</InputLabel>
            <Select
              labelId="specialty-label"
              label="specialty"
              id="specialty"
              value={selectedSpecialty}
              onChange={handleSpecialtyChange}
              fullWidth
            >
              {specialties?.map((spec) => (
                <MenuItem key={spec._id} value={spec.name}>
                  {spec.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="doctor-label">Doctor</InputLabel>
            <Select
              labelId="doctor-label"
              label="doctor"
              id="doctor"
              value={selectedDoctor}
              onChange={handleDoctorChange}
              fullWidth
              disabled={!selectedSpecialty}
            >
              {employees?.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  {`${employee.firstName} ${employee.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              required
              value={selectedDate}
              onChange={handleDateChange}
              sx={{ width: '100%' }}
              id="appointmentDate"
              label="Дата записи"
              name="appointmentDate"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Цель визита"
            value={selectedReason}
            onChange={handleReasonChange}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!selectedSpecialty || !selectedDoctor || !selectedDate || !selectedReason}
          >
            Записаться
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
