<template>
  <div :style="{ width: foldTag ? '200px!important' : '64px!important' }" class="main-wrap">
    <side-menu :routes="routes" @select="select" :isCollapse="!foldTag"></side-menu>
    <div class="fold-bottom" @click="changeFold">
      <i :class="foldTag ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
    </div>
  </div>
</template>

<script>
  import { metaJSONTree as routes } from '@/router/temp.router';

  export default {
    components: {},
    data() {
      return {
        routes: JSON.stringify(routes).trim(),
        foldTag: true, // 默认展开
      };
    },
    methods: {
      select(index, indexPath) {
        this.toPath = indexPath;
      },
      // 折叠展开菜单
      changeFold() {
        this.foldTag = !this.foldTag;
        console.log(12345678);
        if (window.eventCenter) {
          // side-menu 监听
          window.eventCenter.emit('collapseClick', !this.foldTag);
        }
      },
    },
  };
</script>
<style lang="less" scoped>
  .main-wrap {
    background-color: #fff;
    position: relative;
    // transition: all .3s;
  }
  .fold-bottom {
    border-top: 1px solid #ccc;
    position: absolute;
    bottom: 0;
    height: 48px;
    width: 100%;
    line-height: 48px;
    // color: hsla(0,0%,100%,.65);
    color: black;
    // background-color: red;
    padding-left: 24px;
    cursor: pointer;
    box-sizing: border-box;
    // padding-bottom:4px solid green
  }
  .fold-bottom:hover {
    color: black;
    // background-color: rgb(31, 33, 39);
  }
</style>
