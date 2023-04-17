import Box from '@mui/material/Box';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { setSpecialty } from '../../reducers/appointmentSlice';

export default function ChooseSpecialty({ specialties }) {
  const dispatch = useDispatch();
  const selectedSpecialty = useSelector((state) => state.appointments.specialty);

  const handleChange = (event) => {
    dispatch(setSpecialty(event.target.value));
  };

  return (
    <Box>
      <FormControl sx={{ minWidth: 250 }}>
        <InputLabel id="specialty-label">Specialty</InputLabel>
        <Select
          labelId="specialty-label"
          label="Specialty"
          value={selectedSpecialty}
          onChange={handleChange}
        >
          {specialties?.map((specialty, i) => (
            <MenuItem key={specialty._id} value={specialty._id}>{specialty.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
