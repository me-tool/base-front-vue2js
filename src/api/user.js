const AxiosInstanceClass = require('@/utils/axios').default;
const axiosInstance = new AxiosInstanceClass();

export const getUserInfo = () => axiosInstance.get('/api/user/current');
export const userLogout = () => axiosInstance.get('/api/user/logout');
