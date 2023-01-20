<template>
  <div class="fillBox">
    <div class="container">
      <el-card>
        <div slot="header">
          <span>系统数据看板</span>
        </div>
        <el-form label-width="100px">
          <el-form-item label="系统个数:">
            {{ totalObj.productCount }}
          </el-form-item>
          <el-form-item label="版本个数:">
            {{ totalObj.productVersionCount }}
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <div slot="header">
          <span>源应用数据看板</span>
        </div>
        <el-form label-width="100px">
          <el-form-item label="源应用个数:">
            {{ totalObj.appCount }}
          </el-form-item>
          <el-form-item label="版本个数:">
            {{ totalObj.appVersionCount }}
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <div slot="header">
          <span>流程数据看板</span>
        </div>
        <el-form label-width="100px">
          <el-form-item label="系统个数:">
            {{ totalObj.productWorkflowCount }}
          </el-form-item>
          <el-form-item label="源应用个数:">
            {{ totalObj.appWorkflowCount }}
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { queryTotal } from '@/api';

  export default {
    data() {
      return {
        totalObj: {},
      };
    },
    created() {
      queryTotal()
        .then((res) => {
          this.totalObj = res.data;
        })
        .catch((err) => {});
    },
  };
</script>

<style scoped lang="less">
  .fillBox {
    height: 100%;
    background-color: #fff;
    padding: 0px;
    margin: 0px;
  }
  .container {
    display: flex;
    justify-content: space-around;
    padding: 40px 20px 0px 20px;

    .el-card {
      min-width: 400px;
      height: 200px;
      border: 1px solid #f2f2f2;
    }
  }
</style>
