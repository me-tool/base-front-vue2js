import Vue from 'vue';
import ElementUI, { Message, Loading } from 'element-ui';
import useComponents from '@me-tool/components';

import loading from '@/utils/loading';
import { isMicro } from './constants';
import App from './App';
import router from './router';
import store from './store';

import('./style/common.less');
import('./style/mixin.less');
import('./style/style.less');

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(loading);
useComponents(Vue);
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading;

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkLoadFailed) {
    const targetPath = router.history.pending ? router.history.pending.fullPath : '';
    router.replace(targetPath);
  }
});

new Vue({ router, store, render: (h) => h(App), el: '#app' });
