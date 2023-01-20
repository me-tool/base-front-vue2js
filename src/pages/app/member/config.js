import { enum2Options } from '@/utils/enum';

export const formOptions = [
  {
    key: 'name',
    label: '成员名称',
    placeholder: '成员名称',
    type: 'input',
    value: '',
  },
  {
    key: 'role',
    label: '成员类型',
    placeholder: '成员类型',
    type: 'select',
    value: '',
    options: {
      list: [{ code: '', desc: '全部' }, ...enum2Options('userEnum')],
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
    label: '成员名称',
    prop: 'name',
    showOverflowTooltip: true,
  },
  {
    label: '成员账号',
    prop: 'account',
    showOverflowTooltip: true,
  },
  {
    label: '成员角色',
    prop: 'roleView',
    showOverflowTooltip: true,
  },
  {
    label: '创建人',
    prop: 'creator',
    showOverflowTooltip: true,
  },
  {
    label: '创建时间',
    showOverflowTooltip: true,
    prop: 'createdAt',
  },
];
