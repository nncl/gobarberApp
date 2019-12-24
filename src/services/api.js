import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:3333`, // fixme
});

api.interceptors.response.use(null, err => {
  const { status } = err.response;
  if (status === 401) {
    // FIXME
  }
  return err;
});

export default api;
