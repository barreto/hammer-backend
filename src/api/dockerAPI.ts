import axios from 'axios';

const dockerAPI = axios.create({
    baseURL: process.env.DOCKER_URL
});

export default dockerAPI;
