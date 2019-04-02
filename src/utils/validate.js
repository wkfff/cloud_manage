/**
 * Created by jiachenpan on 16/11/18.
 */
import _ from 'lodash'
export function validUsername(rule, value, callback) {
  const reg = /^.{1,20}$/
  if (_.isEmpty(value) || !reg.test(value.trim())) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 数据接入-任务名称 */
export const validateAccessJobName = [
  { message: '长度为2-200个非空格字符', min: 2, max: 200, trigger: 'blur', transform: function(value) {
    return value.trim()
  } }
]
/* 数据接入-任务描述 */
export const validateAccessJobDescription = [
  { message: '描述不能为空格', trigger: 'blur', transform: function(value) {
    return value.trim()
  } },
  { min: 0, max: 256, message: '任务描述最大长度256', trigger: 'blur' }
]
/* 校验 ip 地址 */
export function validateIp(rule, value, callback) {
  const reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确的 IP'))
  } else {
    callback()
  }
}
/* 校验 端口 */
export function validatePort(rule, value, callback) {
  const reg = /^\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]$/
  if (!reg.test(value)) {
    return callback(new Error('请输入正确的端口'))
  } else {
    return callback()
  }
}
/* 校验 密码 */
export function validatePassword(rule, value, callback) {
  const reg = /^.{1,20}$/
  if (!reg.test(value.trim())) {
    callback(new Error('请输入正确的密码'))
  } else {
    callback()
  }
}

/* 校验 字符集 */
export function validateDsCharset(rule, value, callback) {
  const reg = /^[0-9a-zA-Z\-\_]{1,20}$/
  if (!reg.test(value.trim())) {
    callback(new Error('请输入正确的字符集,(仅含英文字母,数字,_,-)'))
  } else {
    callback()
  }
}

/* 校验 表名 */
export function validateTable(rule, value, callback) {
  const reg = /^[a-zA-Z0-9]{1}[a-zA-Z0-9_]{1,30}$/
  const regNum = /^\d+$/
  const regSplid = /^\d+$/
  const val = value.trim()
  if (!reg.test(val) || regNum.test(val) || regSplid.test(val)) {
    callback(new Error('请输入正确的表名,(必选以字母或数字开头,是字母,数字,下划线组合,且不能全为数字或者下划线,长度小于30的字符串)'))
  } else {
    callback()
  }
}

/* 校验 手机号 */
export function validatePhone(rule, value, callback) {
   const reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/
   if (!reg.test(value)) {
     callback(new Error('请输入正确的手机号'))
   } else {
     callback()
   }
}

/* 校验 邮箱 */
export function validateEmail(rule, value, callback) {
  const reg = /^[*#\u4e00-\u9fa5 a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}