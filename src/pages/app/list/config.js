import { enum2Options, enum2Text } from '@/utils/enum';

export const formOptions = [
  {
    key: 'name',
    label: '源应用名称',
    placeholder: '源应用名称',
    type: 'input',
    value: '',
  },
  {
    key: 'status',
    label: '系统状态',
    placeholder: '系统状态',
    type: 'select',
    value: '',
    options: {
      list: [{ code: '', desc: '全部' }, ...enum2Options('statusEnum')],
      label: 'desc',
      value: 'code',
    },
  },
];

export const tableColumns = [
  {
    label: '编号',
    type: 'index',
    fixed: true,
    width: '100px',
  },
  {
    label: '源应用名称',
    prop: 'name',
    showOverflowTooltip: true,
    width: '150px',
  },
  {
    label: '源应用标识',
    prop: 'identifier',
    showOverflowTooltip: true,
    width: '200px',
  },
  {
    label: '源应用描述',
    prop: 'description',
    showOverflowTooltip: true,
    width: '200px',
  },
  {
    label: '环境',
    prop: 'envCodeView',
    showOverflowTooltip: true,
    width: '100px',
  },
  {
    label: '应用类型',
    prop: 'typeView',
    showOverflowTooltip: true,
    width: '100px',
  },
  {
    label: '版本',
    prop: 'version',
    showOverflowTooltip: true,
    width: '100px',
    formatter: function (row, column) {
      try {
        if (row._options.upgrade) {
          return `${row[column.property]}<img src="./img/upgrade.png" style="width:24px" ></img>`;
        }
        return row[column.property];
      } catch {
        return row[column.property];
      }
    },
  },
  {
    label: '状态',
    showOverflowTooltip: true,
    prop: 'statusView',
    width: '100px',
  },
  {
    label: '创建人',
    prop: 'creator',
    showOverflowTooltip: true,
    width: '150px',
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    width: '150px',
    showOverflowTooltip: true,
  },
  {
    label: '修改人',
    prop: 'modifier',
    showOverflowTooltip: true,
    width: '150px',
  },
  {
    label: '更新时间',
    prop: 'updatedAt',
    showOverflowTooltip: true,
    width: '150px',
  },
];
