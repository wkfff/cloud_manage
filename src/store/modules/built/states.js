export default {
  // 新建MySQL订单form数据
  createMysqlFormData: {
    db_type: 1,
    instance_type: 'MySQL',
    instance_type_id: 1,
    city: '深圳',
    instance_name: '', // 实例名称
    instance_desc: '', // 描述
    business_name: '', // 所属业务系统
    app_code: '', // 架构办代码
    project_code: '', // 项目编号
    project_name: '', // 项目名称
    instance_type_name: '', // 架构类型
    db_version: 'MySQL 5.6', // db_version
    db_spec: '2C4G', // 计算规格
    disk: 100, // 数据存储容量
    disk_log_size: 100, // 日志存储容量
    root_name: '', // 数据库用户名
    root_password: '', // 数据库密码
    character_set: 'UTF8', // 字符集
    max_connections: '', // 最大连接数
    apply_num: '', // 申请数量
    
    backup_policy: '每日全备', // 数据持久化策略
    service_time: '5*8', // 业务服务时间
    maintain_work_day: ['00:00', '23:59'], // 工作日维护时间
    maintain_weekend: ['09:00', '17:00'], // 节假日维护时间
    rto: '15min', // RTO
    rpo: '1min', // RPO
    
    app_owner: '', // 业务负责人
    dev_leader_name: '', // 开发负责人
    dev_manager_name: '', // 开发室经理
    sys_owner: '', // 系统负责人
    recommend_leader: '', // 推荐系统管理员
    recommend_db_leader: '' // 推荐数据库管理员
  }
}
