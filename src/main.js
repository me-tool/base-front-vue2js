import Vue from 'vue';
import ElementUI, { Message, Loading } from 'element-ui';
import SideMenu from '@jdu/side-menu';
import breadCrumb from '@jdu/bread-crumb';
import TableExtra from '@jdu/table-extra';
import FormSearch from '@jdu/form-search';
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
Vue.use(SideMenu);
Vue.use(TableExtra);
Vue.use(FormSearch);
Vue.use(breadCrumb);
Vue.use(loading);

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
