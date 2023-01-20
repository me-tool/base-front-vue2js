export const enumCollection = {
  isValidEnum: {
    0: '无效',
    1: '有效',
  },
  statusEnum: {
    // 状态
    0: '禁用',
    1: '启用',
  },
  userEnum: {
    10: '管理员',
    20: '成员',
  },
};

export const enum2Options = (name) => {
  const obj = enumCollection[name];
  return Object.keys(obj).reduce((prev, key) => {
    prev.push({
      code: !isNaN(key) ? Number(key) : key,
      desc: obj[key],
    });
    return prev;
  }, []);
};

export const enum2Text = (name, code) => {
  const obj = enumCollection[name];
  return obj[code];
};
