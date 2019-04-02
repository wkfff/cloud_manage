import { Cache } from '@/utils'
const cache = new Cache()

// 如果取出cache.get('user')undefined或者''和null使用默认值{}，否则报错
const { phone, email } = cache.get('user') || {}

export default {
  firstInput: '', // 第一步的搜索条件
  checkedProduct: {}, // 第一步选中的产品/服务
  secondInput: '', // 第二步的搜索条件
  checkedMaintenance: {}, // 第二部选中的运维类型

  formData: { // 第三部的表单
    id: '', // workOrderId
    product: '',
    handle_type: '',
    description: '',
    priority: 2,
    top_system: '',
    phone: '',
    email: '',
    items: [],
    hold_emp_no: '',
    hold_emp_name: '',
    hold_phone: '',
    hold_email: '',
    reason: '',
    schedule_begin_time: '',
    plan_use_time: '12',
    project_code: '',
    project: '',
    work_order_name: ''
  },
  isDisabled: true, // 用来控制删除按钮是否禁用,
}
