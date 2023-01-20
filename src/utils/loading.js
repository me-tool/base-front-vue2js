import { Loading } from 'element-ui';

let loadingInstance;

const showLoading = (options = {}) => {
  loadingInstance = Loading.service({
    lock: true,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.4)',
    fullscreen: true,
    ...options,
  });
};

const hideLoading = () => {
  loadingInstance.close();
};

export default function (Vue) {
  Vue.prototype.$loading = {
    showLoading,
    hideLoading,
  };
}
