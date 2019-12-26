import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:3333`, // fixme
  // baseURL: `http://10.0.2.2:3333`, // android localhost
});

export default api;
