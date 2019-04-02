<!--
  @author:  Daniel
  @date:    2019-01-24
  @desc:    工单内容
  @require:
-->
<template>
  <div class="detail-box">
    <div class="sheet-cont-title">
      <span class="checked-icon"></span>
      工单记录
    </div>
    
    <div
      v-if="Object.keys(handleInfo).length"
      class="sheet-cont">
      <div class="sheet-cont-header">
        <div class="item-text">
          <svg-icon iconClass="user"/>
        </div>
        <div class="item-text">处理人：{{ handleInfo.operater }}</div>
        <div class="item-text">工号：{{ handleInfo.emp_no }}</div>
        <div class="item-text time">{{ handleInfo.created_at }}</div>
      </div>
      <div class="sheet-cont-items">
        <CloudDetail
          :fields="handlerDetailFields"
          :fields-values="handleInfo"
          :config="detailConfig"
        />
      </div>
    </div>
    
    <div class="sheet-cont">
      <div class="sheet-cont-header">
        <div class="item-text">
          <svg-icon iconClass="user"/>
        </div>
        <div class="item-text">提单用户名：{{ detailInfo.operater }}</div>
        <div class="item-text">工号：{{ detailInfo.emp_no }}</div>
        <div class="item-text">手机号：{{ contentInfo.phone }}</div>
        <div class="item-text">邮箱：{{ contentInfo.email }}</div>
        <div class="item-text time">{{ detailInfo.created_at }}</div>
      </div>
      <div class="sheet-cont-items">
        <CloudDetail
          :fields="detailFields"
          :fields-values="contentInfo"
          :config="detailConfig"
        />
        <div class="label-text">操作内容</div>
        <CloudTable
          ref="itemTable"
          v-if="columnConfig.length"
          :column-config="columnConfig"
          :fetch-config="fetchConfig"
        />
      </div>
    </div>
  </div>
</template>

<script type="text/jsx">
import CloudDetail from '@/components/CloudDetail'
import CloudTable from '@/components/CloudTable'
import CONFIG from './config'
import { GET_WORKSHEET_DETAIL_CONTENT } from '@/api/worksheet'

export default {
  name: 'SheetContent',
  
  components: {
    CloudDetail,
    CloudTable
  },
  
  props: {
    contentInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  data() {
    return {
      detailConfig: {
        hideTitle: true,
        onlyShow: true,
        labelWidth: 90,
        colSpan: 12
      },
      fetchConfig: {
        url: GET_WORKSHEET_DETAIL_CONTENT,
        urlParams: [this.$route.params.id]
      }
    }
  },
  
  computed: {
    /**
     * 处理人详情字段配置
     * @return {*[]}
     */
    handlerDetailFields() {
      return [
        {
          label: '处理意见',
          prop: 'content'
        },
        {
          label: '结果',
          prop: 'status',
          render(h, { row }) {
            return (
              <span class={row.status === 3 ? 'text-success' : 'text-error'}>{ row.status === 3 ? '批准' : '拒绝' }</span>
            )
          }
        }
      ]
    },
    
    /**
     * 提单用户详情字段配置
     * @return {*[]}
     */
    detailFields() {
      return [
        {
          label: '产品/服务',
          prop: 'product_name'
        },
        {
          label: '运维类型',
          prop: 'handle_type_name'
        },
        {
          label: '简要描述',
          prop: 'description',
          colSpan: 24
        },
        {
          label: '配置信息',
          colSpan: 24,
          render: (h, { row }) => {
            const { product_code, handle_type_code } = this.contentInfo
            const fields = (product_code && handle_type_code && CONFIG[product_code][handle_type_code]['CONFIG_FIELDS']) || []
            
            const result = []
            fields.forEach(item => {
              const { label, prop, options, separator } = item
              
              // 数组prop
              if (Array.isArray(prop)) {
                const res = []
                prop.forEach(v => {
                  const val = options ? options[row[v]] : row[v]
                  val && result.push(val)
                })
                res.length && result.push(`${label}：${res.join(separator || ' ')}`)
              }
              
              // 字符串 prop
              if (typeof prop === 'string') {
                const value = options ? options[row[prop]] : row[prop]
                value && result.push(`${label}：${value}`)
              }
            })
            return (
              <span>{ result.length ? result.join('； ') : '-' }</span>
            )
          }
        }
      ]
    },
    
    /**
     * 处理人详情
     * @return {*|{}}
     */
    handleInfo() {
      let result = {}
      console.log('contentInfo----->', this.contentInfo)
      this.contentInfo.flows && this.contentInfo.flows.forEach(item => {
        if (item.status !== 1) {
          result = item
        }
      })
      return result
    },
    
    /**
     *  提单用户详情
     * @return {default.props.contentInfo|{type, default}|{}}
     */
    detailInfo() {
      let result = {}
      this.contentInfo.flows && this.contentInfo.flows.forEach(item => {
        if (item.status === 1) {
          result = item
        }
      })
      return result
    },
    
    columnConfig() {
      const { product_code, handle_type_code } = this.contentInfo
      return (product_code && handle_type_code && CONFIG[product_code][handle_type_code]['TABLE_FIELDS']) || []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-box {
  background: white;
  min-height: 190px;
  overflow-y: auto;
  margin-top: 20px;
  padding: 20px;
  padding-bottom: 40px;
  .sheet-cont-title {
    font-weight: bold;
    .checked-icon {
      display: inline-block;
      width: 2px;
      height: 30px;
      background: #4A8DF0;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
  .sheet-cont {
    min-height: 150px;
    border: 1px solid $borderColor;
    margin-top: 15px;
    .sheet-cont-header {
      
      margin-bottom: 20px;
      height: 65px;
      font-size: 15px;
      border-bottom: 1px solid $borderColor;
      padding: 0 20px;
      .item-text {
        display: inline-block;
        vertical-align: middle;
        line-height: 65px;
        svg {
          font-size: 30px;
          color: $textLevelD;
        }
        &:first-child {
          padding: 0;
        }
        &:nth-child(2) {
          padding-left: 10px;
        }
        &.time {
          float: right;
          color: $textLevelD;
        }
      }
    }
    .sheet-cont-items {
      padding-left: 60px;
      .label-text {
        color: #777E8C;
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
  
}
</style>
