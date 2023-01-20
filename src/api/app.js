const AxiosInstanceClass = require('@/utils/axios').default;
const axiosInstance = new AxiosInstanceClass();

//获取源应用列表
export const getSourceAppList = (params) => axiosInstance.get('/api/apps', params);
export const getSourceAppMembers = (params, pathParams) =>
  axiosInstance.get('/api/app/:id/members', params, { pathParams }); // 获取当前应用的的成员
export const createSourceAppMember = (params, pathParams) =>
  axiosInstance.post('/api/app/:id/member', params, { pathParams }); // 添加成员到源应用中
export const updateSourceAppMember = (params, pathParams) =>
  axiosInstance.put('/api/app/:appId/member/:id', params, { pathParams }); // 编辑成员到源应用
export const deleteSourceAppMember = (params, pathParams) =>
  axiosInstance.delete('/api/app/:appId/member/:id', params, { pathParams }); // 删除成员到源应用
