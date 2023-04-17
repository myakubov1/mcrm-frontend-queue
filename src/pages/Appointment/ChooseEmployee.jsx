import Box from '@mui/material/Box';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployee } from '../../reducers/appointmentSlice';

export default function ChooseEmployee({ specialties }) {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector((state) => state.appointments.employee);
  const selectedSpecialty = useSelector((state) => state.appointments.specialty);

  const handleChange = (event) => {
    dispatch(setEmployee(event.target.value));
  };

  const filteredSpecialties = specialties?.filter((specialty) => specialty._id === selectedSpecialty);
  const employees = filteredSpecialties?.flatMap((spec) => spec.employees.map((employee) => (
    <MenuItem key={employee._id} value={employee._id}>{`${employee.firstName} ${employee.lastName}`}</MenuItem>
  )));

  return (
    <Box>
      <FormControl sx={{ minWidth: 250 }}>
        <InputLabel id="employee-label">Employee</InputLabel>
        <Select
          labelId="employee-label"
          label="Employee"
          value={selectedEmployee}
          onChange={handleChange}
        >
          {employees}
        </Select>
      </FormControl>
    </Box>
  );
}
