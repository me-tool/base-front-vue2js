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
      <div slot="table-operate">
        <el-button type="primary" size="medium" @click="editThis()" v-if="createdBtnShow">
          <i class="el-icon-plus"></i>
          新增
        </el-button>
        <el-button size="medium" type="warning" @click="toAppList">返回</el-button>
      </div>
      <el-table-column label="操作" width="120px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row._options.edit" @click="editThis(scope.row)">
            编辑
          </el-button>
          <el-button type="text" v-if="scope.row._options.delete" @click="deleteThis(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </table-extra>

    <!-- 添加成员 begin -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px" append-to-body>
      <div class="dialog-content">
        <el-form ref="baseForm" :model="addInfo" label-width="100px" :rules="rules">
          <el-form-item label="成员名称" prop="name">
            <el-input
              placeholder="成员名称"
              v-model="addInfo.name"
              :disabled="dialogDisabled"></el-input>
          </el-form-item>
          <el-form-item label="成员账号" prop="account">
            <el-input
              placeholder="成员账号"
              v-model="addInfo.account"
              :disabled="dialogDisabled"></el-input>
          </el-form-item>
          <el-form-item label="成员角色" prop="role">
            <el-select v-model="addInfo.role">
              <el-option
                v-for="(item, index) in SOURCE_USER_TYPES"
                :key="index"
                :label="item.desc"
                :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveToDb()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加成员 end -->
  </div>
</template>

<script>
  import {
    getSourceAppMembers,
    deleteSourceAppMember,
    createSourceAppMember,
    updateSourceAppMember,
    sourceAppCurrent,
  } from '@/api';
  import { formOptions, tableColumns } from './config.js';
  import { enum2Options } from '@/utils/enum';
  import { RULE_ENG_NUM_MIDDLE_UNDERLINE } from '@/utils/rules';
  import { isEmpty } from '@/utils/utils';

  const addInfo = {
    name: '',
    account: '',
    role: 20,
  };
  const validRules = {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    account: [
      { required: true, message: '请输入成员账号', trigger: 'blur' },
      { validator: RULE_ENG_NUM_MIDDLE_UNDERLINE, trigger: 'blur' },
    ],
    role: [{ required: true, message: '请选择成员角色', trigger: 'blur' }],
  };

  export default {
    data() {
      return {
        SOURCE_USER_TYPES: enum2Options('userEnum'),
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
        dialogTitle: '',
        dialogVisible: false,
        addInfo: {},
        rules: validRules,

        //
        appId: '',
        createdBtnShow: false,
      };
    },
    watch: {
      '$route.query.appId'() {
        this.entry();
      },
    },
    created() {
      this.entry();
    },
    computed: {
      dialogDisabled() {
        return this.dialogTitle === '编辑成员';
      },
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
        if (!this.appId) {
          this.toAppList();
          return;
        }

        this.loading = true;
        let params = { ...this.filterForm, ...this.pagination };
        Object.keys(params).forEach((o) => {
          if (isEmpty(params[o])) {
            delete params[o];
          }
        });
        getSourceAppMembers(params, { id: this.appId })
          .then(({ data }) => {
            this.loading = false;
            this.tableData = data.rows;
            this.total = data.count;
          })
          .catch(() => {
            this.toAppList();
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
          this.addInfo = JSON.parse(JSON.stringify(row));
          this.dialogTitle = '编辑成员';
        } else {
          this.addInfo = JSON.parse(JSON.stringify(addInfo));
          this.dialogTitle = '新增成员';
        }

        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs['baseForm'] && this.$refs['baseForm'].clearValidate();
        });
      },
      // 新增修改
      saveToDb() {
        this.$refs['baseForm'].validate((valid) => {
          if (valid) {
            const params = {
              ...this.addInfo,
              appId: this.appId,
            };
            if (this.addInfo.id) {
              updateSourceAppMember(params, { appId: this.appId, id: this.addInfo.id })
                .then((resp) => {
                  if (!resp.success) {
                    return this.$message.error(`编辑失败`);
                  }
                  this.$message.success(`编辑成功`);
                  this.dialogVisible = false;
                  this.getList();
                })
                .catch(() => {});
            } else {
              createSourceAppMember(params, { id: this.appId })
                .then((resp) => {
                  if (!resp.success) {
                    return this.$message.error(`保存失败`);
                  }
                  this.$message.success(`新增成功`);
                  this.dialogVisible = false;
                  this.getList();
                })
                .catch(() => {});
            }
          }
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
            const resp = await deleteSourceAppMember(row, { appId: this.appId, id: row.id });
            if (!resp.success) {
              return this.$message.error(`删除失败`);
            } else {
              this.$message.success('删除成功');
            }
            this.getList();
          })
          .catch(() => {});
      },
      toAppList() {
        this.$router.push('/app/list');
      },
      entry() {
        this.appId = this.$route.query.appId;
        if (!this.appId) {
          this.toAppList();
          return;
        }
        sourceAppCurrent({ id: this.appId })
          .then((res) => {
            this.createdBtnShow = res.data.role === 10; // 是否是管理员权限
            this.getList();
          })
          .catch(() => {
            this.toAppList();
          });
      },
    },
  };
</script>
