// let regExp = {
//   "required":{
//     "rule" : /\S/,
//     "desc" : '不能为空' ,
//   },
//   "integer":{
//     "rule" : /^[+]{0,1}(\d+)$/,
//     "desc" : '请输入正整数' ,
//   },
//   "code" : {
//     "rule" : /^[a-zA-Z0-9_]*$/,
//     "desc" : '请输入字母，数字，下划线'
//   },
//   "nameCN":{
//     "rule" : /[\u4e00-\u9fa5]/,
//     "desc" : '请输入中文'
//   },
//   "nameEN" : {
//     "rule" : /^[a-zA-Z][a-zA-Z0-9_]*$/,
//     "desc" : '请输入字母，数字，下划线，且必须以字母开头'
//   },
//   "name":{
//     "rule" : /^[-\w\u4e00-\u9fa5]+$/,
//     "desc" : '请输入汉字,字母，数字，下划线,中划线'
//   },
//   "name1": {
//     "rule" : /^[-a-zA-Z_-]{1}[0-9a-zA-Z_-]{1,}$/,
//     "desc" : '只能由大、小写字母,数字,下划线组成,且字母下划线开头' ,
//   },
//   "name2":{
//     "rule" : /^[\w\u4e00-\u9fa5.]+$/,
//     "desc" : '请输入汉字，字母，数字，点，下划线'
//   },
//   "email":{
//     "rule" : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
//     "desc" : '请输入正确的电子邮箱地址'
//   },
//   "domain ":{
//     "rule" : /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\/.?/,
//     "desc" : '请输入正确域名'
//   },
//   "url":{
//     "rule" : /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
//     "desc" : '请输入url'
//   },
//   "telephone":{
//     "rule" : /^1[3-9][0-9]{9}$/,
//     "desc" : '请输入正确的电话号码'
//   },
//   "idcard":{
//     "rule" : /^\d{15}|\d{18}$/, //^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$
//     "desc" : '请输入正确的身份证号码'
//   },
//   "date":{
//     "rule" : /^\d{4}-\d{1,2}-\d{1,2}/,
//     "desc" : '请输入正确的日期格式'
//   },
//   "qq":{
//     "rule" : /[1-9]\d{5}(?!\d)/,
//     "desc" : '请输入正确的QQ号码'
//   },
//   "nameTag":{
//     "rule":/^[^\s]+(\s+[^\s]+)*$/,
//     "desc" : '不能包含空格'
//   },
// }

/**
 * 只能输入英文、数字、下划线和横线
 */
export const RULE_ENG_NUM_MIDDLE_UNDERLINE = (rule, value, callback) => {
  const reg = /^[A-Za-z0-9-_]+$/;
  if (!value) {
    callback();
  } else {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('只能输入英文、数字、下划线和横线'));
    }
  }
};

/**
 * 域名判断
 * 1. 域名中的标号都由英文字母和数字组成，每一个标号不超过63个字符，也不区分大小写字母。
 * 2. 标号中除连字符（-）外不能使用其他的标点符号。
 * 3. 级别最低的域名写在最左边，而级别最高的域名写在最右边。
 * 4. 由多个标号组成的完整域名总共不超过255个字符
 */
export const RULE_DOMAIN = (rule, value, callback) => {
  const reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/gm;
  if (!value) {
    callback();
  } else {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('输入的域名不合法'));
    }
  }
};

/**
 * IP 判断
 * 1. IP地址的长度为32位(共有2^32个IP地址)，分为4段，每段8位
 * 2. 用十进制数字表示，每段数字范围为0～255，段与段之间用句点隔开。
 * 3. 0.0.0.0 ～ 255.255.255.255
 */
export const RULE_IP = (rule, value, callback) => {
  const reg = /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?!$)|$)){4}$/gm;
  if (!value) {
    callback();
  } else {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('输入的 IP 不合法'));
    }
  }
};
