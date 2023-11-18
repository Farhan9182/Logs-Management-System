import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;
const instance = axios.create({baseURL: API_BASE_URL});

instance.interceptors.request.use((config) => {
    if (API_TOKEN) {
        config.headers.Authorization = `Bearer ${API_TOKEN}`;
    }
    return config;
});

export const createLogApi = async (logData) => {
    try {
        const structuredLogData = {...logData, metadata: {parentResourceId: logData.parentResourceId}};
        const response = await instance.post('/logs/create', structuredLogData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const bulkCreateLogsApi = async (logsData) => {
    try {
        const response = await instance.post('/logs/bulkCreate', logsData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getLogsApi = async (filters) => {
    try {
        const response = await instance.get('/logs/get?'+filters);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default instance;
