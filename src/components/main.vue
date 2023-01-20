<template>
  <basic-layout :user-name="userName" :isMicro="isMicro" @logout-click="handleLogoutClick">
    <template slot="page-main">
      <router-view></router-view>
    </template>
  </basic-layout>
</template>

<script>
  import { mapMutations } from 'vuex';
  import BasicLayout from '@/layouts/basic-layout/index';
  import { getUserInfo, userLogout } from '@/api';
  import { isMicro } from '@/constants';
  import { clearCookie } from '@/utils/utils';

  export default {
    components: { BasicLayout },
    data() {
      return {
        userName: '用户名',
        isMicro: isMicro,
      };
    },
    created() {
      getUserInfo().then(({ data }) => {
        this.userName = data.name;
        this.updateUserInfo(data);
      });
    },
    methods: {
      ...mapMutations('user', ['updateUserInfo']),
      //退出登录
      async handleLogoutClick() {
        this.$confirm('确认退出吗?', '提示', {})
          .then(() => {
            clearCookie();
            userLogout().catch((err) => {});
          })
          .catch(() => {});
      },
    },
  };
</script>
