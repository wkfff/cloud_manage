/**
 * @file:   将数组转换成对象
 * @author: lzc
 * @date:   2019-02-14
 */

/**
 * 将数组类型转成对象类型
 * @param fields
 * @return {*|{}}
 * @example 例如，fields: ['user.firstName', 'user.lastName'] => {firstName: 'user.firstName', lastName: 'user.lastName'}
 */
const arrayToObject = (fields = []) => {
  return fields.reduce((prev, field) => {
    const key = field.split('.').slice(-1)[0]
    if (typeof prev[key] !== 'undefined') {
      throw new Error(`对象${key}已存在`)
    }
    prev[key] = field
    return prev
  }, {})
}

export default arrayToObject
