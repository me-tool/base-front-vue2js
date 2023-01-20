<template>
  <div class="fillBox">
    <form-search
      v-bind:value.sync="formOptions"
      label-width="120px"
      @search-click="handleSearch"
      @reset-click="handleReset"></form-search>

    <table-extra
      :loading="loading"
      :formTableData="tableColumns"
      :tableData="JSON.stringify(tableData)"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="total"
      :current-page="pagination.pageNum"
      :page-size="pagination.pageSize"
      :hide-fullscreen="true">
      <el-table-column label="操作" fixed="right" width="400px">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row._options.edit" @click="editThis(scope.row)">
            编辑
          </el-button>
          <el-button type="text" v-if="scope.row._options.delete" @click="deleteThis(scope.row)">
            删除
          </el-button>
          <el-button type="text" v-if="scope.row._options.copy" @click="handleCopy(scope.row)">
            复制
          </el-button>
          <el-button
            type="text"
            v-if="scope.row._options.member"
            @click="handleSetMember(scope.row)">
            成员管理
          </el-button>
          <el-button
            type="text"
            v-if="scope.row._options.workflow"
            @click="handleOnlineFlow(scope.row)">
            上线申请
          </el-button>
          <el-button type="text" v-if="scope.row._options.online" @click="handleOnline(scope.row)">
            上线
          </el-button>
          <el-button
            type="text"
            v-if="scope.row._options.cancelOnline"
            @click="handleCancelOnline(scope.row)">
            取消上线
          </el-button>
          <el-button
            type="text"
            v-if="scope.row._options.version"
            @click="handleVersion(scope.row)">
            版本列表
          </el-button>
          <el-button type="text" v-if="scope.row._options.nginx" @click="showAppNginx(scope.row)">
            Nginx 配置
          </el-button>
        </template>
      </el-table-column>
    </table-extra>

    <!-- 添加数据 begin -->
    <add-item :show="dialogVisible" :data="addInfo" @close="addDialogClose"></add-item>

    <!-- 源应用上线申请 begin -->
    <el-dialog title="源应用上线申请" :visible.sync="onlineVisible" width="600px">
      <div class="dialog-content">
        <el-form ref="onlineForm" :model="onlineInfo" label-width="90px" :rules="onlineRules">
          <el-form-item label="审批人" prop="approver">
            <el-input
              placeholder="审批人"
              v-model="onlineInfo.approver"
              maxlength="20"
              show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="上线说明(变更)" prop="description">
            <el-input
              type="textarea"
              placeholder="上线说明(变更)"
              v-model="onlineInfo.description"
              maxlength="200"
              show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="workflowDialogClose">取 消</el-button>
        <el-button type="primary" @click="doHandleOnlineFlow()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="查看 Nginx" :visible.sync="nginxDialogVisible" width="80%" class="nginx">
      <div class="preview">
        <el-row :gutter="3">
          <el-col :span="24">
            <el-input disabled v-model="nginxContent" rows="40" type="textarea"></el-input>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getSourceAppList,
    deleteSourceApp,
    sourceAppOnline,
    sourceAppWorkflow,
    sourceAppCopy,
    sourceAppNginx,
    sourceAppCancelOnline,
  } from '@/api';
  import { formOptions, tableColumns } from '../list/config.js';
  import AddItem from '../add.vue';
  import MemberIndex from '../member/index.vue';
  import VersionIndex from '../version/index.vue';
  import { isEmpty } from '@/utils/utils';

  const addInfo = {
    name: '',
    identifier: '',
    description: '',
    gitProjectId: '',
    envCode: 20,
    type: 20,
    assetMode: 10,
    gitProjectName: '',
    customContent: '',
    data: {
      apis: [{ identifier: '', targetUrl: '' }],
      assets: [
        // {
        //   name: '',
        //   identifier: '',
        //   targetUrl: '',
        // },
      ],
    },
    customConfig: {},
  };

  export default {
    components: { AddItem, MemberIndex, VersionIndex },
    data() {
      return {
        formOptions: JSON.parse(JSON.stringify(formOptions)),
        tableColumns,

        // table
        loading: false,
        total: 0,
        tableData: [],

        // filter
        filterForm: {},
        pagination: {
          pageSize: 10,
          pageNum: 1,
        },
        currentRow: {}, //当前操作行数据
        // 添加
        dialogVisible: false,
        addInfo: {},
        // 上线操作
        onlineVisible: false, // 上线操作
        onlineInfo: {},
        onlineRules: {
          approver: [{ required: true, message: '请输入审批人', trigger: 'blur' }],
          description: [{ required: true, message: '请输入说明', trigger: 'blur' }],
        },
        // nginx
        nginxDialogVisible: false,
        nginxContent: '',
      };
    },
    created() {
      this.getList();
    },
    methods: {
      handleSearch(params) {
        this.filterForm = { ...params };
        this.getList();
      },
      handleReset() {
        // 数据置空
        this.filterForm = {};
        this.pagination = { pageSize: 10, pageNum: 1 };
        this.getList();
      },
      getList() {
        this.loading = true;
        const params = { ...this.filterForm, ...this.pagination };
        Object.keys(params).forEach((o) => {
          if (isEmpty(params[o])) {
            delete params[o];
          }
        });
        getSourceAppList(params).then(({ data }) => {
          this.loading = false;
          this.tableData = data.rows;
          this.total = data.count;
        });
      },
      handleCurrentChange(val) {
        this.pagination.pageNum = val;
        this.getList();
      },
      handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.getList();
      },
      editThis(row) {
        if (row) {
          this.currentRow = row;
          this.addInfo = JSON.parse(JSON.stringify(row));
        } else {
          this.addInfo = JSON.parse(JSON.stringify(addInfo));
        }
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs['baseForm'] && this.$refs['baseForm'].clearValidate();
        });
      },
      deleteThis(row) {
        this.$confirm('确认要删除?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            const res = await deleteSourceApp(row, { id: row.id });
            if (res.success) {
              this.$message.success('删除成功');
              this.getList();
            } else {
              this.$message.error(res.msg || '删除失败');
            }
          })
          .catch(() => {});
      },
      handleVersion(row) {
        this.currentRow = row;
        this.$router.push({ path: '/app/version', query: { appId: row.id } });
      },
      handleSetMember(row) {
        this.currentRow = row;
        this.$router.push({ path: '/app/member', query: { appId: row.id } });
      },
      handleOnlineFlow(row) {
        this.onlineInfo = {
          appId: row.id,
          name: row.name,
        };
        this.onlineVisible = true;
      },
      doHandleOnlineFlow() {
        this.$refs['onlineForm'].validate((valid) => {
          if (valid) {
            sourceAppWorkflow(this.onlineInfo, { id: this.onlineInfo.appId })
              .then(() => {
                this.$message.success('上线申请已提交');
                this.onlineVisible = false;
                this.getList();
              })
              .catch(() => {});
          }
        });
      },
      handleOnline(row) {
        this.$confirm(`确认现在上线源应用“${row.name}”, 版本号${row.version}?`, '源应用上线', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            sourceAppOnline(row.id).then((res) => {
              if (res.success) {
                this.$message.success('上线成功');
              } else {
                this.$message.error(res.msg);
              }
              this.getList();
            });
          })
          .catch(() => {});
      },
      handleCancelOnline(row) {
        this.$confirm(
          `确认[取消]上线源应用“${row.name}”, 版本号${row.version}?`,
          '源应用取消上线',
          {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          },
        )
          .then(() => {
            sourceAppCancelOnline(row.id).then((res) => {
              if (res.success) {
                this.$message.success('取消上线成功');
              } else {
                this.$message.error(res.msg);
              }
              this.getList();
            });
          })
          .catch(() => {});
      },
      // 复制操作
      handleCopy(row) {
        console.log(row);
        this.$confirm(
          `确认复制源应用“${row.name}”, 版本号${row.version},注意：复制后的引用需要修改后重新提交上线申请`,
          '复制源应用',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          },
        )
          .then(() => {
            sourceAppCopy(null, { id: row.id }).then((res) => {
              if (!res.success) {
                return this.$message.error(res.msg);
              } else {
                this.$message.success('复制成功');
              }
              this.getList();
            });
          })
          .catch(() => {
            this.$message.error(res.msg);
          });
      },
      detailClick(row) {
        this.$message.success('查看 ' + row.signatureName);
      },
      //
      addDialogClose() {
        this.dialogVisible = false;
        this.getList();
      },
      workflowDialogClose() {
        this.onlineVisible = false;
        this.getList();
      },
      showAppNginx(row) {
        sourceAppNginx({ id: row.id })
          .then((res) => {
            this.nginxContent = res.data.content;
            this.nginxDialogVisible = true;
          })
          .catch(() => {});
      },
    },
  };
</script>

<style lang="less" scoped>
  .el-dialog__wrapper.nginx {
    /deep/.el-dialog {
      margin-top: 20px !important;
    }
    /deep/.el-dialog__body {
      padding: 0 25px !important;
    }

    .preview {
      padding-bottom: 20px;
    }
  }
</style>
