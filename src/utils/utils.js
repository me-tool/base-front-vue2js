export const isEmpty = (field) => {
  var flag = false;
  if (field === '' || field == undefined || field == null) {
    flag = true;
  }
  return flag;
};
export const isObjectEmpty = (value) => {
  return isEmpty(value) || (!isEmpty(value) && Object.getOwnPropertyNames(value).length === 0);
};
/**
 * 从字符串中解析 ip
 * https://qastack.cn/programming/2403122/regular-expression-to-extract-text-between-square-brackets
 * @param {*} str str = `[123.1][345.123]`
 * @returns [123.1,345.123]
 */
export const matchIps = (str) => str.match(/(?<=\[).+?(?=\])/g);

export const clearCookie = () => {
  const cookies = document.cookie.split(';');
  const domain = '.' + location.host;
  console.log(cookies);
  cookies.forEach((cookie) => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=' + domain + '; path=/';
  });
};
