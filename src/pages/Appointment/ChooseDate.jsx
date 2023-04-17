import { DateCalendar, LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { setDate } from '../../reducers/appointmentSlice';

export default function ChooseDate() {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(setDate(dayjs(value).toISOString()));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{ margin: 0 }}
        views={['day']}
        disablePast
        onChange={(value) => handleChange(value)}
      />
    </LocalizationProvider>
  );
}
