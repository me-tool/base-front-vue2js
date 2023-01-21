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
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="scope.row._options.member"
            @click="handleSetMember(scope.row)">
            成员管理
          </el-button>
        </template>
      </el-table-column>
    </table-extra>
  </div>
</template>

<script>
  import { getSourceAppList } from '@/api';
  import { formOptions, tableColumns } from '../list/config.js';

  export default {
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
      //
      handleSetMember(row) {
        this.$router.push({ path: '/app/member', query: { appId: row.id } });
      },
    },
  };
</script>
