// TODO: сделать чекаут с названиями, а не id.
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableRow, TableBody,
} from '@mui/material';
import jwtDecode from 'jwt-decode';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import apis from '../../services/api';
import ChooseSpecialty from './ChooseSpecialty';
import ChooseEmployee from './ChooseEmployee';
import ChooseDate from './ChooseDate';
import ChooseReason from './ChooseReason';
import { useAuth } from '../../hooks/useAuth';

export default function AppointmentForm() {
  const { token } = useAuth();
  const decoded = jwtDecode(token);
  const [specialties, setSpecialties] = useState(null);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const selectedAppointment = useSelector((state) => state.appointments);
  const steps = [
    {
      id: 1,
      label: 'Select a specialty',
      component: <ChooseSpecialty specialties={specialties} />,
      isReady: !!selectedAppointment.specialty,
    },
    {
      id: 2,
      label: 'Select a employee',
      component: <ChooseEmployee specialties={specialties} />,
      isReady: !!selectedAppointment.employee,
    },
    {
      id: 3,
      label: 'Select a date',
      component: <ChooseDate />,
      isReady: !!selectedAppointment.date,
    },
    {
      id: 4,
      label: 'Reason',
      component: <ChooseReason />,
      isReady: !!selectedAppointment.reason,
    },
  ];

  useEffect(() => {
    axios.get(apis.specialty.getSpecialties)
      .then((response) => {
        setSpecialties(response.data.specialties);
      })
      .catch((e) => {
        setError(e.response.data.message);
        console.log(error);
      });
  }, []);

  // Методы для работы со степпером
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = async () => {
    const data = {
      client: decoded.clientId,
      employee: selectedAppointment.employee,
      appointmentDate: selectedAppointment.date,
      appointmentReason: selectedAppointment.reason,
    };
    await axios
      .post(apis.appointment.createAppointment, data)
      .then((response) => {
        setIsCompleted(true);
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
      });
  };
  return (
    isCompleted ? <div>123</div>
      : (
        <Box>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.id}>
                <StepLabel>
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Box sx={{ mt: 3 }}>{step.component}</Box>
                  <Box>
                    <div>
                      {step.isReady ? (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                      )}

                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <TableContainer>
              <Table aria-label="caption table">
                <caption>Your appointment</caption>
                <TableHead>
                  <TableRow>
                    <TableCell>Specialty</TableCell>
                    <TableCell>Employee</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Reason</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{selectedAppointment.specialty}</TableCell>
                    <TableCell>{selectedAppointment.employee}</TableCell>
                    <TableCell>{selectedAppointment.date}</TableCell>
                    <TableCell align="right">{selectedAppointment.reason}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 1, mr: 1 }}>
              Send
            </Button>
            <Button variant="outlined" onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
          )}
        </Box>
      )
  );
}
