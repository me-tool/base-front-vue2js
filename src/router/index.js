import Vue from 'vue';
import Router from 'vue-router';

import tempRouter from './temp.router.js'; // 自动化路由 webpack启动后会自动生成
const ErrorEmptyPage = () => import('@/pages/error-empty');

Vue.use(Router);

/**
 * 解决编程式路由往同一地址跳转时会报错的情况
 * Uncaught (in promise) Error: Navigation cancelled from "/workbench" to "/empty" with a new navigation.
 */
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
//push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
//replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: '',
    redirect: '/navigator',
  },
  {
    path: '/',
    redirect: '/navigator',
  },
  {
    path: '/403',
    redirect: '/errors/403',
  },
  {
    path: '/404',
    redirect: '/errors/404',
  },
  {
    path: '/500',
    redirect: '/errors/500',
  },
  ...tempRouter,
  {
    path: '/empty',
    props: true,
    name: 'emptyPage',
    component: ErrorEmptyPage,
  },
];

const router = new Router({
  routes,
  mode: 'hash',
});

router.beforeEach((to, from, next) => {
  next();
  const appName = process.env.VUE_APP_NAME;
  // 如果是子应用 to.meta = {}, 这里需要在子应用中添加相同的配置
  if (to.meta && to.meta.menu && to.meta.menu.title) {
    document.title = `${appName}-${to.meta.menu.title}`;
  }
});

export default router;
