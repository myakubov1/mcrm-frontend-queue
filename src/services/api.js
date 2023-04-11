const CLIENTS = {
  getClients: 'http://localhost:3001/api/client/',
};

const EMPLOYEE = {
  getEmployees: 'http://localhost:3001/api/employee/',
  login: 'http://localhost:3001/api/employee/login/',
  registration: 'http://localhost:3001/api/employee/registration/',
};

const SPECILATY = {
  getSpecialties: 'http://localhost:3001/api/specialty/',
};

const apis = {
  clients: CLIENTS,
  employee: EMPLOYEE,
  specialty: SPECILATY,
};

export default apis;
