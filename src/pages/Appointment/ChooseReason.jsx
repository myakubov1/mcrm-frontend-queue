import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { setReason } from '../../reducers/appointmentSlice';

export default function ChooseReason() {
  const dispatch = useDispatch();
  const selectedReason = useSelector((state) => state.appointments.reason);

  const handleChange = (value) => {
    dispatch(setReason(value));
  };

  return (
    <TextField
      sx={{ minWidth: 250 }}
      id="outlined-multiline-static"
      label="Multiline"
      multiline
      rows={4}
      value={selectedReason}
      onChange={(event) => handleChange(event.target.value)}
    />
  );
}
