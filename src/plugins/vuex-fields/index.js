/**
 * @file:   用于vuex数据与form表单数据双向绑定的插件
 * @author: lzc
 * @date:   2019-02-14
 */
import arrayToObject from './lib/arrayToObject'

/**
 * 规范命名空间
 * @param fn
 * @return {function(...[*]): *}
 */
const normalizeNamespace = fn => {
  return (...params) => {
    let [namespace, map, getterType, mutationType] =
      typeof params[0] === `string` ? [...params] : [``, ...params]
    
    if (namespace.length && namespace.charAt(namespace.length - 1) !== `/`) {
      namespace += `/`
    }
    
    getterType = `${namespace}${getterType || `getField`}`
    mutationType = `${namespace}${mutationType || `updateField`}`
    
    return fn(namespace, map, getterType, mutationType)
  }
}

/**
 * 注册进store的getter函数中
 * @param state
 * @return {function(*): T}
 */
const getField = state => {
  return path => path.split(/[.[\]]+/).reduce((prev, key) => prev[key], state)
}

/**
 * 注册进store的mutations函数中，用于提交state
 * @param state
 * @param path
 * @param value
 */
const updateField = (state, { path, value }) => {
  path.split(/[.[\]]+/).reduce((prev, key, index, array) => {
    if (array.length === index + 1) {
      prev[key] = value
    }
    return prev[key]
  }, state)
}

/**
 * 注册进组件computed对象，用扩展运算符展开
 * @type {function(...[*]): *}
 */
const mapFields = normalizeNamespace((namespace, fields, getterType, mutationType) => {
  const fieldsObject = Array.isArray(fields) ? arrayToObject(fields) : fields
  // 返回一个对象，每个对象包含get和set函数
  return Object.keys(fieldsObject).reduce((prev, key) => {
    const path = fieldsObject[key]
    const field = {
      get() {
        return this.$store.getters[getterType](path)
      },
      set(value) {
        this.$store.commit(mutationType, { path, value })
      }
    }
    
    prev[key] = field
    
    return prev
  }, {})
})

/**
 * 注册进组件computed对象，用于绑定数组里面的数据
 * @param namespace
 * @param paths
 * @param getterType
 * @param mutationType
 * @return {{}}
 */
const multiRowFields = (namespace, paths, getterType, mutationType) => {
  const pathsObject = Array.isArray(paths) ? arrayToObject(paths) : paths
  return Object.keys(pathsObject).reduce((entries, key) => {
    const path = pathsObject[key]
    entries[key] = {
      get() {
        const store = this.$store
        const rows = store.getters[getterType](path)
        return rows.map((fieldsObject, index) =>
          Object.keys(fieldsObject).reduce((prev, fieldKey) => {
            const fieldPath = `${path}[${index}].${fieldKey}`
            return Object.defineProperty(prev, fieldKey, {
              get() {
                return store.getters[getterType](fieldPath)
              },
              set(value) {
                store.commit(mutationType, { path: fieldPath, value })
              }
            })
          }, {}))
      }
    }
    return entries
  }, {})
}
const mapMultiRowFields = normalizeNamespace(multiRowFields)

/**
 * 生成对应辅助函数，用于自定义获取某个对象下的state等
 * @param getterType
 * @param mutationType
 * @return {{mapFields: (function(...[*]): *), mapMultiRowFields: (function(...[*]): *), [p: string]: }}
 */
const createHelpers = ({ getterType, mutationType }) => ({
  [getterType]: getField,
  [mutationType]: updateField,
  mapFields: normalizeNamespace(
    (namespace, fields) => mapFields(namespace, fields, getterType, mutationType)
  ),
  mapMultiRowFields: normalizeNamespace(
    (namespace, paths) => mapMultiRowFields(namespace, paths, getterType, mutationType)
  )
})

// 对外暴露的方法
export {
  getField,
  updateField,
  mapFields,
  mapMultiRowFields,
  createHelpers
}
