/**
 * @author: lzc
 * @date:   2019-01-16
 * @desc:   工单管理接口
 */
// 获取状态数量
export const GET_WORKSHEET_COUNT = `/cloud/instance/apply/count`

// 获取工单列表
export const GET_WORKSHEET_LIST = `/cloud/workOrder`

// 审核通过 id
export const PATCH_APPROVAL = `/cloud/instance/apply/approve/{0}`

// 审核拒绝 id
export const PATCH_APPROVAL_REJECT = `/cloud/instance/apply/reject/{0}`

// 获取工单详情 id
export const GET_WORKSHEET_DETAIL = `/cloud/workOrder/{0}`

// 详情操作内容列表
export const GET_WORKSHEET_DETAIL_CONTENT = `/cloud/workOrder/{0}/item`

// 获取新建工单的字典信息
export const GET_WORKSHEET_DICTIONARY = `/cloud/dictionary`

// 获取TOP系统查询
export const GET_TOP_SYSTEM = `/cloud/dictionary/topSystem`

// 新增工单
export const ADD_WORK_ORDER = `/cloud/workOrder/submit/{0}`

// 保存工单
export const SAVE_WORK_ORDER = `/cloud/workOrder`

// 根据主机查询实例
export const GET_INSTANCE_BY_HOST = `/cloud/workOrder/third/getInstanceByHost`

// 根据拥有者信息查询
export const GET_HOLD_USER_LIST = `/cloud/workOrder/third/holdUserList`

// 模糊搜索主机信息查询
export const GET_HOST_INFO = `/cloud/workOrder/third/hosts`

// 导入模板
export const IMPORT_WORKSHEET_TEMPLATE = `/cloud/workOrder/item/import?type={0}`

// 工单item查询
export const GET_WORKSHEET_ITEM = `/cloud/workOrder/item/list`

/** -------------------任务与事件------------------------- **/
// 工单列表
export const GET_SHEET_LIST = `/cloud/workOrder`
// 任务详情
export const GET_TASK_LIST_DETAIL = `/cloud/workOrder/{0}`
// 详情操作列表
export const GET_SHEET_HANDLE_LIST = `/cloud/workOrder/item/list`

// 执行日志列表
export const GET_EXECUTE_LOG = `/cloud/workOrder/job/logs`

// 重新执行 jobCode
export const POST_RESTART_EXECUTE = `/cloud/workOrder/job/{0}/trigger`

// 删除工单
export const DELETE_SHEET = `/cloud/workOrder/{0}`

// 工单分类数量
export const GET_SHEET_COUNT = `/cloud/workOrder/list/count`
// 工单详情分类数量
export const GET_SHEET_CLASSIFY_COUNT = `/cloud/workOrder/item/list/count`
// 当前值班DBA信息
export const GET_DBA_INFO = `/cloud/workOrder/third/getOndutyUser`
// 联系值班DBA
export const SEND_MESSAGE_TO_DBA = `/cloud/workOrder/third/sendMsg`
