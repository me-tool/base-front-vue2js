<template>
  <el-header class="page-header">
    <div class="page-header__name" @click="navTo('/')">
      <img class="page-header__logo" :src="logoUrl" />
    </div>
    <div class="topMenu">
      <div class="topMenuWrap">
        <span class="topMenuItem"></span>
        <el-popover placement="bottom" width="480" trigger="click">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-around">
            <div
              v-for="(item, index) in topMenuList"
              :key="index"
              @click="toUrl(item.url)"
              style="cursor: pointer; width: auto; margin: 2px 0; font-size: 19px">
              <div style="text-align: center">{{ item.label }}</div>
              <div style="text-align: center; font-size: 12px; color: #999999">{{ item.desc }}</div>
            </div>
          </div>
          <span slot="reference" class="menuList">U+产品</span>
        </el-popover>
      </div>
    </div>

    <div class="page-header__right">
      <el-button plain @click="toWorkbench" style="margin-right: 15px">工作台</el-button>
      <el-dropdown @command="handleCommand">
        <span class="page-header__right-user">
          <img class="page-header__right-user__img" :src="avatarUrl" />
          <span style="margin-right: 10px">
            {{ userName }}
            <i class="el-icon-caret-bottom"></i>
          </span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout-click" style="text-algin: center">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
  export default {
    data() {
      return {
        isFullscreen: false,
        logoUrl: require('@/assets/img/logo.png'),
        unfold: require('@/assets/img/unfold.png'),
        avatarUrl: require('@/assets/img/avatar.png'),
        activeKey: '',
        topMenuList: [
          {
            url: '/marketing',
            label: 'U+ Marketing',
            desc: '精准营销平台',
          },
        ],
      };
    },
    props: {
      userName: {
        type: String,
        default: '用户名',
      },
    },
    methods: {
      async handleCommand(command) {
        if (command) {
          this.$emit(command);
        }
      },
      navTo(path) {
        if (path !== this.$route.fullPath) {
          this.$router.push({ path });
        }
      },
      toUrl(url) {
        this.$message.warning('该功能暂未开放');
        // window.open(url);
      },
      toWorkbench() {
        // location.href = '/workbench';
        this.$message.warning('该功能暂未开放');
      },
    },
  };
</script>

<style lang="less" scoped>
  .menuList {
    font-size: 18px;
  }
  .menuList:hover {
    color: #2c68ff;
    cursor: pointer;
  }
  .page-header {
    position: relative;
    background-color: #fff;
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    padding: 0;
    display: flex;
    justify-content: space-between;

    .topMenu {
      position: absolute;
      left: 200px;

      .topMenuWrap {
        font-size: 14px;
        line-height: 20px;
        display: inline-block;
        width: 200px;
        margin-left: 10px;
        .topMenuItem {
          margin: 0 12px;
          cursor: pointer;
        }
        .topMenuItem:hover {
          // background-color: #eef1f5;
          color: #2c68ff;
        }
      }
    }

    &__unfold {
      width: 40px;
      height: 40px;
      text-align: center;

      &:hover {
        background: #2c68ff;
      }

      .img {
        position: relative;
        top: 1px;
        width: 16px;
        height: 16px;
        transition: all 0.3s ease;

        &.open {
          transform: rotate(-90deg);
        }
      }
    }
  }

  .page-header__name {
    display: flex;
    align-items: center;
    // color: #fff;
    font-weight: 300;
    // width: 200px;
    // cursor: pointer;
    padding-left: 16px;
  }

  .page-header__logo {
    width: 116px;
    // height: 26px;
    margin: 0 8px 0 16px;
  }

  .page-header__right {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: 30px;

    &-user {
      display: flex;
      align-content: center;
      // color: #fff;
      font-weight: 300;
      cursor: pointer;

      &:hover {
        background-color: #eef1f5;
      }
    }
  }

  .page-header__right-user {
    display: flex;
    align-content: center;
    // color: #fff;
    font-weight: 400;

    &:hover {
      // background-color: #000;
    }
  }

  .page-header__right-user__img {
    height: 20px;
    width: 20px;
    margin: auto 10px;
  }

  .page-header__right-tab {
    color: #fff;
    font-size: 12px;
    padding: 0 15px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      // background-color: #eef1f5;
      color: #2c68ff;
    }
  }

  .page-header__span {
    padding-left: 20px;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }

  .isActive {
    // background-color: #eef1f5;
    color: #2c68ff;
  }
</style>
