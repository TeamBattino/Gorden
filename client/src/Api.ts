import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://api.example.com';

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export const getRequest = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axios.get(`${API_URL}${endpoint}`);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    throw new Error(`GET request failed: ${error}`);
  }
};

export const postRequest = async <T>(endpoint: string, payload?: any): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axios.post(`${API_URL}${endpoint}`, payload);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    throw new Error(`POST request failed: ${error}`);
  }
};
