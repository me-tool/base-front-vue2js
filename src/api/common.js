const AxiosInstanceClass = require('@/utils/axios').default;
const axiosInstance = new AxiosInstanceClass();

//系统管理列表
export const queryTotal = () => axiosInstance.get('api/common/total');
