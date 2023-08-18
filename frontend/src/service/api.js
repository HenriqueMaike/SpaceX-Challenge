import axios from 'axios';

//Base da API: http://localhost:3333/
//URL da API: launches || launches/stats || /launches?name=Falcon&page=2&limit=2

const api = axios.create({
    baseURL: 'http://localhost:3333/'
});

export default api;