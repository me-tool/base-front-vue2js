<template>
  <el-container
    direction="vertical"
    class="page-container"
    :style="{ height: isMicro ? '100%' : '100vh' }">
    <page-header
      v-show="!isFullscreen"
      style="height: 60px"
      :user-name="userName"
      :page-name="pageName"
      @logout-click="handleLogoutClick"
      v-if="!isMicro">
      <template v-slot:page-header>
        <slot name="page-header"></slot>
      </template>
    </page-header>
    <el-container>
      <page-menu v-show="!isFullscreen && !showMenu" v-if="!isMicro">
        <template v-slot:page-menu>
          <slot name="page-menu"></slot>
        </template>
      </page-menu>
      <page-aside v-show="!isFullscreen && $scopedSlots['page-side-menu']" v-if="!isMicro">
        <template v-slot:page-side-menu>
          <slot name="page-side-menu"></slot>
        </template>
      </page-aside>
      <el-main class="page-main__container" :style="{ padding: isMicro ? '0' : '10px' }">
        <slot></slot>
        <bread-crumb class="bread-crumb" :routes="routes" v-if="!isMicro"></bread-crumb>
        <el-main class="page-container__main">
          <slot name="page-main"></slot>
        </el-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import PageHeader from './components/page-header';
  import PageAside from './components/page-aside';
  import PageMenu from './components/page-menu';
  import { metaJSONTree as routes } from '@/router/temp.router';
  export default {
    data() {
      return {
        isFullscreen: false, //弹窗
        showMenu: false,
        routes: JSON.stringify(routes).trim(),
      };
    },
    props: {
      pageName: {
        type: String,
        default: '',
      },
      userName: {
        type: String,
        default: '用户名',
      },
      isMicro: {
        type: Boolean,
        default: true,
      },
    },
    components: { PageHeader, PageAside, PageMenu },
    mounted() {},
    methods: {
      //退出登录
      handleLogoutClick() {
        this.$emit('logout-click');
      },
    },
  };
</script>

<style lang="less" scoped>
  .page-container {
    // height: 100%;
    background-color: #f2f2f2;

    overflow: hidden;
  }
  .page-container__content {
    overflow: auto;
  }
  .page-main__container {
    display: flex;
    flex-direction: column;
    background: #f2f2f2 !important;
  }
  .isMicro {
    padding: 0;
  }
  .page-container__main {
    overflow: auto;
    padding: 0;
  }
</style>

<style lang="less">
  .bread-crumb {
    margin-bottom: 10px;
    background: #fff;
  }
  .drawerClass .el-drawer__wrapper,
  .drawerClass .v-modal {
    top: 40px;
  }
  .drawerClass .el-drawer__wrapper .el-drawer__container > div {
    width: 200px !important;
  }
  .drawerClass .drawerP {
    line-height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin-left: 10px;
    }
  }
  .box-card {
    margin-bottom: 10px;
    cursor: pointer;
  }
  .box-card .menutop h1 {
    text-align: center;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .box-card .menutop ul {
    display: block;
    // width: 50%;
    margin: auto;
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
    list-style: none;
  }
  .box-card .menutop ul li {
    margin-top: 10px;
  }
  .box-card h3 {
    margin-bottom: 20px;
  }
  .menubottom {
    margin-top: 0px;
    width: 90px;
    // background: olive;
    margin: 0 auto;
    // margin-top: 50px;
  }
  .editbutton {
    padding: 10px 10px 10px 10px;
    border-radius: 10px;
  }
</style>
