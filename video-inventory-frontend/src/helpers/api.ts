/**
 * @Author: Abdullah Al Shafi
 * @Date:   2024-11-04 01:05:23
 * @Last Modified by:   Abdullah Al Shafi
 * @Last Modified time: 2024-11-07 17:24:12
 */
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

export default api;
