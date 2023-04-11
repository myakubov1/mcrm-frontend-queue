import {
  Autocomplete,
  Box,
  Card, Chip,
  Divider,
  Grid,
  Link,
  List,
  ListItemButton,
  Paper,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import apis from '../services/api';

// eslint-disable-next-line max-len
const StyledEmployeeItem = styled((props) => <ListItemButton {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  borderRadius: theme.shape.borderRadius,
}));

export default function Appointment() {
  const [specialties, setSpecialties] = useState([]);
  const [error, setError] = useState(null);
  const [appointmentDoctor, setAppointmentDoctor] = useState();
  const [appointmentDate, setAppointmentDate] = useState();
  const [appointmentSpecialty, setAppointmentSpecialty] = useState();

  const handleDoctor = (value) => {
    setAppointmentDoctor(value);
  };

  const handleData = (value) => {
    setAppointmentDate(value);
  };

  const handleSpecialty = (value) => {
    setAppointmentSpecialty(value);
  };

  useEffect(() => {
    axios.get(apis.specialty.getSpecialties)
      .then((response) => {
        setSpecialties(response.data);
      })
      .catch((e) => {
        setError(e.response.data.message);
        console.log(error);
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1,
        }}
      >
        <Item sx={{ flexGrow: 1 }}>
          <Typography>Doctor: </Typography>
          <Typography>{appointmentDoctor}</Typography>
          <Typography>Spec: </Typography>
          <Typography>{appointmentSpecialty}</Typography>
          <Typography>Date: </Typography>
          <Typography>{appointmentDate}</Typography>
        </Item>
        <Item>
          <Button variant="contained">Contained</Button>
        </Item>
      </Box>
      <Card sx={{ marginY: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} sx={{ maxHeight: '350px', overflowX: 'auto' }}>
            <SpecialtyAccordion
              handleSpecialty={handleSpecialty}
              handleDoctor={handleDoctor}
              specialties={specialties}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                views={['day']}
                disablePast
                onChange={(value) => handleData(value.toLocaleString())}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

function SpecialtyAccordion({ specialties, handleSpecialty, handleDoctor }) {
  return (
    specialties?.map((specialty, index) => (
      <Accordion key={specialty._id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{specialty.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EmployeeRow
            m={handleSpecialty}
            handleSpecialty={specialties[index].name}
            handleDoctor={handleDoctor}
            employees={specialty.employees}
          />
        </AccordionDetails>
      </Accordion>
    ))
  );
}

function EmployeeRow({
  employees, handleSpecialty, handleDoctor, m,
}) {
  return (
    <List>
      {employees?.map((employee, i) => (
        <StyledEmployeeItem
          key={i}
          onClick={() => {
            handleDoctor(`${employee.firstName} ${employee.lastName}`);
            m(handleSpecialty);
          }}
        >
          <Stack
            divider={<Divider orientation="vertical" flexItem />}
            direction="row"
            spacing={2}
            alignItems="center"
            width="100%"
          >
            <Box
              component="img"
              alt={employee.firstName}
              src={`/assets/images/covers/cover_${1 + 1}.jpg`}
              sx={{
                width: 48, height: 48, borderRadius: 1.5, flexShrink: 1,
              }}
            />
            <Box sx={{ flexGrow: 1.5, width: '130px' }}>
              <Typography variant="body2" noWrap>
                {employee.firstName}
              </Typography>

              <Typography variant="body2" noWrap>
                {employee.lastName}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0, textAlign: 'center', width: '50px' }}>
              <Typography variant="body2" noWrap>
                {employee.experience}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: 'center', width: '130px' }}>
              {employee?.specialties.map((spec, index) => (
                <Chip label={spec} key={index} variant="outlined" />
              ))}
            </Box>
          </Stack>
        </StyledEmployeeItem>
      ))}
    </List>
  );
}
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}
