const PORT = 3001;
const CLIENTS = {
  registerClient: `http://localhost:${PORT}/api/client/registration/`,
  loginClient: `http://localhost:${PORT}/api/client/login/`,
  getClientProfile: `http://localhost:${PORT}/api/client/`,
  updateClientProfile: `http://localhost:${PORT}/api/client/`,
  deleteClientProfile: `http://localhost:${PORT}/api/client/`,
};

const EMPLOYEE = {
  registerEmployee: `http://localhost:${PORT}/api/employee/registration/`,
  loginEmployee: `http://localhost:${PORT}/api/employee/login/`,
  getEmployeeProfile: `http://localhost:${PORT}/api/employee/`,
  updateEmployeeProfile: `http://localhost:${PORT}/api/employee/`,
  deleteEmployeeProfile: `http://localhost:${PORT}/api/employee/`,
};

const SPECILATY = {
  createSpecialty: `http://localhost:${PORT}/api/specialty/`,
  getSpecialties: `http://localhost:${PORT}/api/specialty/`,
};

const APPOINTMENT = {
  getAppointments: `http://localhost:${PORT}/api/appointment/`,
  createAppointment: `http://localhost:${PORT}/api/appointment/`,
};

const apis = {
  clients: CLIENTS,
  employee: EMPLOYEE,
  specialty: SPECILATY,
  appointment: APPOINTMENT,
};

export default apis;
