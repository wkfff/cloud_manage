/**
 *
 * @copyright(c) 2019
 * @created by  Daniel
 * @package cloud-platform
 * @version :  2019-01-16 16:58 $
 */

export default class Json {
  static loads(val) {
    let value = ''
    try {
      value = val && JSON.parse(val)
    } catch (err) {
      return val // 解析失败返回原值
    }
    return value
  }
  
  static dumps(val) {
    return JSON.stringify(val)
  }
}
