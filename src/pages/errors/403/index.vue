<template>
  <error-content code="403" desc="您没有浏览这个页面的权限" :src="src" />
</template>

<script>
  import error403 from './403.png';
  import errorContent from '../error-content.vue';

  export default {
    name: 'error_403',
    components: {
      errorContent,
    },
    data() {
      return {
        src: error403,
      };
    },
  };
</script>
