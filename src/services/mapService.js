import axios from 'axios';

export const MapService = {
  async getAll() {
    const response = await axios.get('http://localhost:3000/Points');
    return response.data;
  },
  async getById(id) {
    const response = await axios.get(`http://localhost:3000/Points/${id}`);
    return response.data;
  },
};