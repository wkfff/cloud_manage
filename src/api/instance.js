/**
 * @author: lzc
 * @date:   2019-01-16
 * @desc:   实例管理模块接口
 */

// mysql 列表
export const GET_MYSQL_LIST = `/cloud/instance/mysql`
// 实例类型
export const GET_MYSQL_INSTANCE_TYPE = `/cloud/instanceType`
// 架构类型
export const GET_ARCHITECTURE_TYPE = `/cloud/architecture`
// 获取所属业务
export const GET_BUSINESS = `/cloud/business`

/* *------------MySQL--------------* */

// mysql详情
export const GET_MYSQL_DETAIL = `/cloud/instance/mysql/{0}`
// 修改MYSQL
export const PATCH_MYSQL = `/cloud/instance/mysql/{0}`
// 新增MySQL实例
export const POST_MYSQL_INSTANCE = `/cloud/instance/apply`
// 获取MySQL镜像
export const GET_MYSQL_IMAGES = `/cloud/instance/mysql/images`
// 维护信息设置 id
export const PATCH_INSTANCE_INIT = `/cloud/instance/init/{0}`
// 获取所属业务系统
export const GET_SYSTEM_LIST = `/cloud/cmdb/getSystemList`
// 获取所属项目列表
export const GET_PROJECT_LIST = `/cloud/cmdb/getProjectList`

// 新增订单，获取相关负责人下拉列表
export const GET_LEADER = `/cloud/instance/apply/oneAccount`
// 智能推荐
export const RECOMMEND_DBA = `/cloud/instance/apply/dba`
// 提交订单 id
export const POST_COMMIT_INSTANCE = `/cloud/instance/apply/submit/{0}`

/* *------------Redis--------------* */

// Redis列表
export const GET_REDIS_LIST = `/cloud/instance/redis`
// Redis详情
export const GET_REDIS_DETAIL = `/cloud/instance/redis/{0}`

/* *------------MongoDB--------------* */
// MongoDB列表
export const GET_MONGO_LIST = `/cloud/instance/mongo`
// MongoDB详情
export const GET_MONGODB_DETAIL = `/cloud/instance/mongo/{0}`
