import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import dayjs from 'dayjs';
import { formatISO } from 'date-fns';
import apis from '../services/api';

export default function SignUp() {
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passport, setPassport] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setBday] = useState(null);
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(apis.clients.registerClient, {
        firstName,
        lastName,
        passport,
        phoneNumber,
        email,
        dateOfBirth,
        password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
      });
  };

  const handleDateChange = (date) => {
    // преобразуем дату в формат ISO с учетом смещения на +3 часа
    const isoDate = formatISO(date, { timeZone: '+03:00' });
    console.log(isoDate);
    setBday(date);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* Text field with first name */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                id="firstName"
                label="First Name"
                autoFocus
                autoComplete="given-name"
                fullWidth
              />
            </Grid>
            {/* Text field with last name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                fullWidth
              />
            </Grid>
            {/* Text field with passport */}
            <Grid item xs={12}>
              <TextField
                required
                value={passport}
                onChange={(event) => setPassport(event.target.value)}
                id="passport"
                label="Passport"
                name="passport"
                autoComplete="passport"
                fullWidth
              />
            </Grid>
            {/* Text field with phone number */}
            <Grid item xs={12}>
              <TextField
                required
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="tel"
                fullWidth
              />
            </Grid>
            {/* Text field with email */}
            <Grid item xs={12}>
              <TextField
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                fullWidth
              />
            </Grid>
            {/* Text field with birthdate */}
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  required
                  value={dateOfBirth}
                  onChange={handleDateChange}
                  sx={{ width: '100%' }}
                  id="dateOfBirth"
                  label="Date of Birth"
                  name="dateOfBirth"
                  autoComplete="bday"
                />
              </LocalizationProvider>
            </Grid>
            {/* Text field with password */}
            <Grid item xs={12}>
              <TextField
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
