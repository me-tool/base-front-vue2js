<template>
  <el-main class="error-page">
    <img :src="src" :alt="code" />
    <div class="text-con">
      <h4>{{ code }}</h4>
      <h5 style="margin: 33px 0">{{ desc }}</h5>
      <div>
        <el-button type="primary" @click="backHome()">回到首页</el-button>
      </div>
    </div>
  </el-main>
</template>

<script>
  export default {
    name: 'error_content',
    props: {
      code: String,
      desc: String,
      src: String,
    },
    methods: {
      backHome() {
        this.$router.push({
          name: 'home',
        });
      },
    },
  };
</script>
<style lang="less" scoped>
  .error-page {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    &::before,
    &::after {
      content: '';
      display: block;
    }

    img {
      width: 500px;
    }

    .text-con {
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
      transform: translateY(60px);

      h4 {
        margin: 0;
        font-size: 96px;
        line-height: 120px;
        color: #000620;
        text-align: left;
        opacity: 0.87;
      }

      h5 {
        font-size: 20px;
        line-height: 28px;
        color: rgba(0, 6, 32, 0.38);
        letter-spacing: 0;
      }
    }
  }

  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateY(60px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dark .error-page {
    background: #1f1f1f;

    .text-con {
      h4 {
        color: rgba(255, 255, 255, 0.8);
      }

      h5 {
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
</style>
