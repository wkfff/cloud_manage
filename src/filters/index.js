/**
 * @author: lzc
 * @date:   2018-11-30
 * @desc:   全局filter
 */

 import { WORKSHEET } from '@/utils/constant'

/**
 * 小于10的数字在前面添加0
 * @param num
 * @return {string}
 */
const dou = num => num < 10 ? `0${num}` : num

/**
 * 根据时间戳转成带 年-月-日 时:分:秒 格式
 * @param time
 * @return {string}
 */
export const formatDateTime = time => {
  if (!time) return ''
  time = parseInt(time)
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const hh = date.getHours()
  const mm = date.getMinutes()
  const ss = date.getSeconds()

  const result = `${y}-${dou(m)}-${dou(d)} ${dou(hh)}:${dou(ss)}:${dou(mm)}`
  return result.includes('NaN') ? '' : result
}

/**
 * 根据时间戳转成 年-月-日
 * @param time
 * @return {string}
 */
export const formatDate = time => {
  if (!time) return ''
  time = parseInt(time)
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()

  const result = `${y}-${dou(m)}-${dou(d)}`
  return result.includes('NaN') ? '' : result
}

/**
 * cron 表达式
 * @param cronStr
 * @return {string}
 */
export function translateCronToChinese(cronStr) {
  let tempStr = ''
  if (!cronStr) return ''
  const cronArray = cronStr.split(' ')
  if (cronArray.length === 0) {
    return 'cron表达式为空'
  }
  if (typeof cronArray !== 'object') {
    return 'cron表达式类型不正确'
  }
  if (cronArray.length === 6) {
    // 解析月
    if (cronArray[4] !== '*') {
      tempStr += cronArray[4] + '月'
    } else {
      tempStr += '每月'
    }

    // 解析周
    if (cronArray[5] !== '*' && cronArray[5] !== '?') {
      const tempCase = cronArray[5].split(',')
      for (const item of tempCase) {
        switch (item) {
          case '1':
            tempStr += '星期天,'
            break
          case '2':
            tempStr += '星期一,'
            break
          case '3':
            tempStr += '星期二,'
            break
          case '4':
            tempStr += '星期三,'
            break
          case '5':
            tempStr += '星期四,'
            break
          case '6':
            tempStr += '星期五,'
            break
          case '7':
            tempStr += '星期六,'
            break
          case '-':
            tempStr += '至'
            break
          default:
            tempStr += item
            break
        }
      }
    }

    // 解析日
    if (cronArray[3] !== '?') {
      if (cronArray[3] !== '*') {
        tempStr += cronArray[3] + '日'
      } else {
        tempStr += '每日'
      }
    }

    // 解析时
    if (cronArray[2] !== '*') {
      tempStr += cronArray[2] + '时'
    } else {
      tempStr += '每时'
    }

    // 解析分
    if (cronArray[1] !== '*') {
      tempStr += cronArray[1] + '分'
    } else {
      tempStr += '每分'
    }

    // 解析秒
    if (cronArray[0] !== '*') {
      tempStr += cronArray[0] + '秒'
    } else {
      tempStr += '每秒'
    }
    return tempStr
  }
}

/**
 * 腾讯调度周期反解释
 * @param option
 */

// 生成1至31号
const DAYS = (function() {
  const days = {}
  Array(31).fill('*').forEach((item, index) => {
    const num = index + 1
    days[num] = `${num}号`
  })
  return days
})()

// 生成0至23点
const HOURS = (function() {
  const hour = {}
  Array(24).fill('*').forEach((v, i) => {
    hour[i] = `${i}点`
  })
  return hour
})()

// 生成周
const WEEKS = (function() {
  const week = {}
  const map = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '日'
  }
  Array(7).fill('*').forEach((v, i) => {
    const num = i + 1
    week[num] = `周${map[num]}`
  })
  return week
})()

// 生成分钟 0 ~ 55 间隔为5分钟
const MIN = (function() {
  const _tmp = {}
  for (let [i, len] = [0, 60]; i < len; i += 5) {
    _tmp[i] = `${i}分`
  }
  return _tmp
})()

export function cronExpress(option) {
  const { cycle, startDay, startHour, startMin } = option
  if (!cycle) return
  let result = ''
  switch (cycle) {
    case 'M': { // 按月
      const d = DAYS[startDay]
      const h = HOURS[startHour]
      const m = MIN[startMin]
      if (d && h && m) result = `按月 每月 ${d} ${h} ${m}`
      break
    }
    case 'W': { // 按周
      const w = WEEKS[startDay]
      const h = HOURS[startHour]
      const m = MIN[startMin]
      if (w && h && m) result = `按月 每周 ${w} ${h} ${m}`
      break
    }
    case 'D': { // 按天
      const h = HOURS[startHour]
      const m = MIN[startMin]
      if (h && m) result = `按天 每天 ${h} ${m}`
      break
    }
    case 'H': { // 按时
      const h = HOURS[startHour]
      const m = MIN[startMin]
      if (h && m) result = `按小时 每小时 ${m}`
      break
    }
  }
  return result
}

// 状态过滤
export const getWorksheetStatus = (str) => {
  var result = ''
  result = WORKSHEET.APPLY_STATUS[str]
  return result
}
