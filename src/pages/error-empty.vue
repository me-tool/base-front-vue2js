<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
    <span>{{ msg }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      msg: {
        type: String,
        default: '暂无数据',
      },
    },
    data() {
      return {
        dialogVisible: false,
      };
    },
    created() {
      if (this.msg) {
        this.dialogVisible = true;
      } else {
        this.toHome();
      }
    },
    methods: {
      onConfirm() {
        this.dialogVisible = false;
        this.toHome();
      },
      toHome() {
        // this.$router.replace({ path: '/' });
        window.location.href = '/';
      },
    },
  };
</script>
