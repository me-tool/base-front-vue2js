<template>
  <error-content code="500" desc="抱歉，服务器出错了" :src="src" />
</template>

<script>
  import error from './500.png';
  import errorContent from '../error-content.vue';

  export default {
    name: 'error_500',
    components: {
      errorContent,
    },
    data() {
      return {
        src: error,
      };
    },
  };
</script>
