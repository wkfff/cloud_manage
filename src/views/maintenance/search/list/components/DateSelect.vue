<!--
  @author:  lzc
  @date:    2019-01-24
  @desc:    日期选择
  @require:
-->
<template>
  <div class="date-range-wrapper">
    <el-radio-group
      v-model="date"
      @change="changeRadioDate"
    >
      <el-radio
        label="all"
        border>全部
      </el-radio>
      <el-radio
        label="today"
        border>今天
      </el-radio>
      <el-radio
        label="yesterday"
        border>昨天
      </el-radio>
      <el-radio
        label="lastSevenDay"
        border>近七天
      </el-radio>
    </el-radio-group>
    <el-date-picker
      v-model="customDate"
      :picker-options="pickerOptions"
      type="datetimerange"
      format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      style="margin-left: -1px; width: 360px"
      @change="changeCustomDate"/>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'DateSelect',
  
  data() {
    return {
      date: 'all',
      customDate: [],
      dateValue: {
        today: '',
        yesterday: '',
        lastSevenDay: ''
      },
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > (new Date()).getTime()
        }
      }
    }
  },
  
  created() {
    this.__initValues()
  },
  
  methods: {
    __initValues() {
      // 今天
      const d = this.__getDate(0)
      this.dateValue.today = [`${d} 00:00:00`, `${d} 23:59:59`]
      
      // 昨天
      const y = this.__getDate(-1)
      this.dateValue.yesterday = [`${y} 00:00:00`, `${y} 23:59:59`]
      
      // 近7天
      this.dateValue.lastSevenDay = [this.__getDate(-7, true), this.__getDate(0, true)]
    },
    
    /**
     * 计算时间
     * @param days {Number} 需要计算距离今天的天数
     * @param hasTime {Boolean} 是否需要显示时分秒
     * @private
     */
    __getDate(days, hasTime) {
      const today = new Date()
      const seconds = today.getTime() + 24 * 60 * 60 * 1000 * days
      today.setTime(seconds)
      const y = today.getFullYear()
      const m = today.getMonth() + 1
      const d = today.getDate()
      const hh = today.getHours()
      const mm = today.getMinutes()
      const ss = today.getSeconds()
      const timeDate = `${y}-${this.__double(m)}-${this.__double(d)} ${this.__double(hh)}:${this.__double(mm)}:${this.__double(ss)}`
      const date = `${y}-${this.__double(m)}-${this.__double(d)}`
      return hasTime ? timeDate : date
    },
    
    /**
     * 小于10的数字在前面加0
     * @param num
     * @return {string}
     * @private
     */
    __double(num) {
      return parseInt(num) < 10 ? `0${num}` : num
    },
    
    /**
     * 选择自定义日期
     * @param val
     */
    changeCustomDate(val) {
      this.date = val ? null : 'all'
      this.$emit('change', val)
    },
    
    /**
     * 单选框日期选择
     * @param val
     */
    changeRadioDate(val) {
      this.customDate = []
      const value = this.dateValue[val]
      this.$emit('change', value)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.date-range-wrapper {
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  /deep/ .el-radio {
    margin-right: 0;
  }
  /deep/ .el-radio--medium.is-bordered .el-radio__inner {
    display: none;
    width: 0;
    height: 0;
  }
  /deep/ .el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: -1px;
    z-index: 2;
  }
  /deep/ .el-radio--medium.is-bordered {
    border-radius: 0;
  }
  /deep/ .el-radio.is-bordered.is-checked + .el-radio.is-bordered,
  /deep/ .el-radio.is-bordered.is-checked + .el-input__inner {
    border-left-color: #43A5FF;
  }
  /deep/ .el-date-editor .el-range-separator {
    min-width: 20px;
  }
  /deep/ .el-radio.is-bordered.is-checked {
    border-color: #29a6ee;
    color: #29a6ee;
    background-color: #bfe4fa;
  }
  /deep/ label {
    font-weight: 500;
  }
}
</style>
