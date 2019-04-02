/**
 * @author: lzc
 * @date:   2019-01-17
 * @desc:   常量字典表配置
 */

// 数据库版本
export const DATABASE_TYPE = {
  'MySQL 5.6': 'MySQL 5.6',
  'MySQL 5.7': 'MySQL 5.7'
}

// redis 数据库版本
export const REDIS_DATABASE_TYPE = {
  'Redis 2.8': 'Redis 2.8'
}

// mongodb 数据库版本
export const MONGODB_DATABASE_TYPE = {
  'MongoDB 3.2': 'MongoDB 3.2'
}

// 字符集
export const CHARACTER_TYPE = {
  'utf8': 'utf8',
  'gbk': 'gbk',
  'latin1': 'latin1',
  'utf8mb4': 'utf8mb4'
}

// mysql
export const INSTANCE_MYSQL = {
  // 区域
  AREA: {
    '深圳': '深圳',
    '上海': '上海'
  },
  
  // 运行状态
  RUN_STATUS: {
    0: '申请资源中',
    1: '创建中',
    2: '正常',
    3: '异常',
    4: '待创建',
    5: '待初始化'
  },
  
  // 运行状态颜色
  RUN_STATUS_COLOR: {
    0: 'text-info',
    1: 'text-warn',
    2: 'text-success',
    3: 'text-error',
    4: 'text-warn',
    5: 'text-warn'
  },
  
  // 实例规格
  INSTANCE_SPEC: {
    '2C4G': '2核4G',
    '2C8G': '2核8G',
    '4C8G': '4核8G',
    '4C16G': '4核16G',
    '8C16G': '8核16G',
    '8C32G': '8核32G',
    '16C32G': '16核32G',
    '16C64G': '16核64G'
  }
}

// 实例类型
export const INTANCE_DB_TYPE = {
  1: '实例MySQL',
  2: '实例Redis',
  3: '实例MongoDB'
}

// redis
export const INSTANCE_REDIS = {
  // 区域
  AREA: {
    '深圳': '深圳',
    '上海': '上海'
  },
  // 运行状态
  RUN_STATUS: {
    1: '创建中',
    2: '运行中',
    3: '停止',
    5: '待初始化'
  },
  RUN_STATUS_COLOR: {
    1: '',
    2: 'text-success',
    3: 'text-error',
    5: 'text-warn'
  },
  
  // 实例规格对应硬盘大小
  INSTANCE_SPEC_DISK: {
    '2C8G': 500,
    '4C16G': 800,
    '8C32G': 1000,
    '16C64G': 1200
  }
}

// MongoDB
export const INSTANCE_MONGODB = {
  // 运行状态 0：申请资源中 1:创建中 2:正常 3:异常
  RUN_STATUS: {
    0: '申请资源中',
    1: '创建中',
    2: '正常',
    3: '异常'
  },
  // 运行状态显示颜色
  RUN_STATUS_COLOR: {
    0: 'text-info',
    1: 'text-warn',
    2: 'text-success',
    3: 'text-error'
  },
  // 区域
  AREA: {
    '深圳': '深圳',
    '上海': '上海'
  }
}

// 资源管理 机器
export const RESOURCE_MACHINE = {
  // 1:待初始化 2:待使用  3:已使用 -1:待确认 4：正在初始化 5：初始化失败
  STATE: {
    1: '待初始化',
    2: '待使用',
    3: '已使用',
    '-1': '待确认',
    4: '正在初始化',
    5: '初始化失败'
  },
  // 状态颜色对应class
  STATE_COLOR: {
    1: 'text-warn',
    2: 'text-warn',
    3: 'text-success',
    '-1': 'text-warn',
    4: 'text-active',
    5: 'text-error'
  }
}

export const LOGIN_DIRECTION = {
  // SSO 单点登陆的招行 CLOUD 云管平台
  'SSO': 'sso',
  'CLOUD': 'cloud'
}

// 招行单点登陆的登录链接
export const SSO_LOGIN = 'http://sso.tcmb.com/SSOLogin.aspx?SSOSysID=4072&NextAction=/dashboard'

// 招行单点登陆的登出链接
export const SSO_LOGOUT = 'http://sso.tcmb.com/SSOLogin.aspx?SSOSysID=4072&wa=wsignout1.0&NextAction=1'

// 工单管理
export const BUILT = {
  // 处理状态
  APPLY_STATUS: {
    1: '待审核',
    2: '审核通过',
    3: '拒绝申请'
  },
  // 处理状态颜色class
  APPLY_STATUS_COLOR: {
    1: 'text-warn',
    2: 'text-success',
    3: 'text-error'
  },
  
  // 工单状态
  STATUS: {
    1: '未提交',
    2: '审批中',
    3: '审批未通过',
    4: '审批通过',
    5: '已完成'
  },
  
  // 工单状态颜色class
  STATUS_COLOR: {
    1: 'text-warn',
    2: 'text-active',
    3: 'text-error',
    4: 'text-success',
    5: 'text-success'
  },
  
  // 执行状态
  EXECUTE_STATUS: {
    1: '未部署',
    2: '部署中',
    3: '部署失败',
    4: '部署成功'
  },
  
  // 执行状态 class
  EXECUTE_STATUS_COLOR: {
    1: 'text-warn',
    2: 'text-success',
    3: 'text-error',
    4: 'text-success'
  },
  
  // 工单类型
  PRIORITY: {
    1: '服务单',
    2: '标准变更',
    3: '极简变更'
  },
  
  // 产品服务类型
  PRODUCT_TYPE: {
    1: '云数据库MySQL',
    4: '云数据库Oracle',
    5: '云数据库DB2'
  },
  
  // 运维类型
  HANDLE_TYPE: {
    6: '一键用户授权',
    8: '参数修改',
    7: '白名单提权'
  },
  
  LOG_STATUS: {
    1: '成功 ',
    2: '失败 ',
    3: '执行中'
  },
  
  LOG_STATUS_COLOR: {
    1: 'text-success',
    2: 'text-error',
    3: 'text-success'
  },
  
  // 处理记录类型
  LOG_TYPE: {
    1: '执行流程',
    2: '审批流程'
  },
  
  // 执行结果
  LOG_RESULT: {
    1: {
      1: '成功',
      2: '失败',
      3: '执行中'
    },
    2: {
      1: '提交成功',
      2: '批准',
      3: '拒绝'
    }
  },
  LOG_RESULT_COLOR: {
    1: {
      1: 'text-success',
      2: 'text-error',
      3: 'text-active'
    },
    2: {
      1: 'text-warn',
      2: 'text-success',
      3: 'text-error'
    }
  }
}

// 工单管理
export const WORKSHEET = {
  // 处理状态
  APPLY_STATUS: {
    1: '待审核',
    2: '审核通过',
    3: '拒绝申请'
  },
  // 处理状态颜色class
  APPLY_STATUS_COLOR: {
    1: 'text-warn',
    2: 'text-success',
    3: 'text-error'
  },
  
  // 工单状态
  STATUS: {
    1: '未提交',
    2: '审批中',
    3: '审批未通过',
    4: '审批通过',
    5: '已完成'
  },
  
  // 工单状态颜色class
  STATUS_COLOR: {
    1: 'text-warn',
    2: 'text-active',
    3: 'text-error',
    4: 'text-success',
    5: 'text-success'
  },
  
  // 执行状态
  EXECUTE_STATUS: {
    1: '未执行',
    2: '执行中',
    3: '执行失败',
    4: '执行成功'
  },
  
  // 执行状态 class
  EXECUTE_STATUS_COLOR: {
    1: 'text-warn',
    2: 'text-success',
    3: 'text-error',
    4: 'text-success'
  },
  
  // 工单类型
  PRIORITY: {
    1: '服务请求',
    2: '标准变更',
    3: '极简变更'
  },
  
  // 产品服务类型
  PRODUCT_TYPE: {
    1: '云数据库MySQL',
    4: '云数据库Oracle',
    5: '云数据库DB2'
  },
  
  // 运维类型
  HANDLE_TYPE: {
    6: '用户授权',
    8: '参数修改',
    7: '白名单提权',
    9: '用户创建及授权'
  },
  
  LOG_STATUS: {
    1: '成功 ',
    2: '失败 ',
    3: '执行中'
  },
  
  LOG_STATUS_COLOR: {
    1: 'text-success',
    2: 'text-error',
    3: 'text-success'
  },
  
  // 处理记录类型
  LOG_TYPE: {
    1: '执行流程',
    2: '审批流程'
  },
  
  // 执行结果
  LOG_RESULT: {
    1: {
      1: '成功',
      2: '失败',
      3: '执行中'
    },
    2: {
      1: '提交成功',
      2: '批准',
      3: '拒绝'
    }
  },
  LOG_RESULT_COLOR: {
    1: {
      1: 'text-success',
      2: 'text-error',
      3: 'text-info'
    },
    2: {
      1: 'text-success',
      2: 'text-success',
      3: 'text-error'
    }
  }
}

// 系统管理中任务管理
export const SYSTEM_TASK_EXCUTE_STATUS = {
  1: '执行中',
  2: '执行成功',
  3: '执行失败'
}

// 系统管理中任务管理执行状态颜色
export const SYSTEM_TASK_STATUS_COLOR = {
  1: 'text-active',
  2: 'text-success',
  3: 'text-error'
}

// 工单管理 工单类型（参数修改是标准变更2 一键授权是服务变更1 白名单提权尚不可知）
export const PRIORITY = {
  'MYSQL_PRODUCT': {
    'PARAMETER': 1,
    'AUTHORIZATION': 1,
    'WHITELIST': 1
  },
  'ORACLE_PRODUCT': {
    'PARAMETER': 1,
    'AUTHORIZATION': 1,
    'WHITELIST': 1
  },
  'DB2_PRODUCT': {
    'PARAMETER': 1,
    'AUTHORIZATION': 1,
    'WHITELIST': 1
  },
  'SQLSERVER_PRODUCT': {
    'WHITELIST': 1
  }
}

const DEFAULT_MYSQL_ORACLE_PARAMETER_PROPS = [
  {
    label: '实例名',
    prop: 'instance_name'
  },
  {
    label: '主机信息',
    prop: 'host',
    render: (h, { row }) => {
      const hostIP = `${row.host ? row.host : '-'} ${row.ip ? ('( ' + row.ip + ' )') : ''}`
      return <span>{ hostIP }</span>
    }
  },
  {
    label: '参数名',
    prop: 'param_key'
  },
  {
    label: '参数值（修改后）',
    prop: 'param_value'
  }
]

const DEFAULT_MYSQL_AUTHORIZATION_PROPS = [
  {
    label: '实例名',
    prop: 'instance_name'
  },
  {
    label: '主机信息',
    prop: 'host',
    render: (h, { row }) => {
      const hostIP = `${row.host ? row.host : '-'} ${row.ip ? ('( ' + row.ip + ' )') : ''}`
      return <span>{ hostIP }</span>
    }
  },
  {
    label: 'Schema名',
    prop: 'object_owner'
  },
  {
    label: '对象名',
    prop: 'object_name'
  },
  {
    label: '权限名',
    prop: 'authority'
  },
  {
    label: '被授权数据库用户（帐号）',
    children: [
      {
        label: '是否新建',
        prop: 'is_create_user',
        render: (h, { row }) => {
          return <span>{ row.is_create_user === '1' ? '是' : '否' }</span>
        }
      },
      {
        label: '用户名（帐号名）',
        prop: 'grantee'
      },
      {
        label: '初始密码',
        prop: 'password'
      }
    ]
  }
]

const DEFAULT_MYSQL_WHITELIST_PROPS = [
  {
    label: '实例名',
    prop: 'instance_name'
  },
  {
    label: '主机信息',
    prop: 'host',
    render: (h, { row }) => {
      const hostIP = `${row.host ? row.host : '-'} ${row.ip ? ('( ' + row.ip + ' )') : ''}`
      return <span>{ hostIP }</span>
    }
  },
  // {
  //   label: 'Schema名',
  //   prop: 'object_owner'
  // },
  {
    label: '提权类型',
    prop: 'authority_type',
    render: (h, { row }) => {
      return <span>{ MYSQL_AUTHORITY_TYPES[row.authority_type] }</span>
    }
  }
]

const DEFAULT_ORACLE_WHITELIST_PROPS = [
  {
    label: '实例名',
    prop: 'instance_name'
  },
  {
    label: '主机信息',
    prop: 'host',
    render: (h, { row }) => {
      const hostIP = `${row.host ? row.host : '-'} ${row.ip ? ('( ' + row.ip + ' )') : ''}`
      return <span>{ hostIP }</span>
    }
  },
  {
    label: '数据库名',
    prop: 'object_owner'
  },
  {
    label: '提权类型',
    prop: 'authority_type',
    render: (h, { row }) => {
      return <span>{ ORACLE_AUTHORITY_TYPES[row.authority_type] }</span>
    }
  }
]

const DEFAULT_ORACLE_AUTHORIZATION_PROPS = [
  {
    label: '实例名',
    prop: 'instance_name'
  },
  {
    label: '主机信息',
    prop: 'host',
    render: (h, { row }) => {
      const hostIP = `${row.host ? row.host : '-'} ${row.ip ? ('( ' + row.ip + ' )') : ''}`
      return <span>{ hostIP }</span>
    }
  },
  {
    label: '权限类型',
    prop: 'authority_type'
  },
  {
    label: '权限名',
    prop: 'authority'
  },
  {
    label: 'Schema名',
    prop: 'object_owner'
  },
  {
    label: '对象名',
    prop: 'object_name'
  },
  {
    label: '被授权数据库用户（帐号）',
    children: [
      {
        label: '是否新建',
        prop: 'is_create_user',
        render: (h, { row }) => {
          return <span>{ row.is_create_user === '1' ? '是' : '否' }</span>
        }
      },
      {
        label: '用户名（帐号名）',
        prop: 'grantee'
      },
      {
        label: '初始密码',
        prop: 'password'
      }
    ]
  }
]

const DEFAULT_DB2_PARAMETER_PROPS = [
  {
    label: '实例名',
    prop: 'instance_name'
  },
  {
    label: '主机信息',
    prop: 'host',
    render: (h, { row }) => {
      const hostIP = `${row.host ? row.host : '-'} ${row.ip ? ('( ' + row.ip + ' )') : ''}`
      return <span>{ hostIP }</span>
    }
  },
  {
    label: '数据库名',
    prop: 'object_owner'
  },
  {
    label: '参数类型',
    prop: 'param_type'
  },
  {
    label: '参数名',
    prop: 'param_key'
  },
  {
    label: '参数值（修改后）',
    prop: 'param_value'
  }
]

const DEFAULT_DB2_WHITELIST_PROPS = [
  {
    label: '实例名',
    prop: 'instance_name'
  },
  {
    label: '主机信息',
    prop: 'host',
    render: (h, { row }) => {
      const hostIP = `${row.host ? row.host : '-'} ${row.ip ? ('( ' + row.ip + ' )') : ''}`
      return <span>{ hostIP }</span>
    }
  },
  {
    label: '数据库名',
    prop: 'object_owner'
  }
]

const DEFAULT_DB2_AUTHORIZATION_PROPS = [
  {
    label: '实例名',
    prop: 'instance_name'
  },
  {
    label: '主机信息',
    prop: 'host',
    render: (h, { row }) => {
      const hostIP = `${row.host ? row.host : '-'} ${row.ip ? ('( ' + row.ip + ' )') : ''}`
      return <span>{ hostIP }</span>
    }
  },
  {
    label: '数据库名',
    prop: 'object_owner'
  },
  {
    label: 'Schema名',
    prop: 'object_schema'
  },
  {
    label: '对象名',
    prop: 'object_name'
  },
  {
    label: '权限名',
    prop: 'authority'
  },
  {
    label: '被授权用户名（帐号名）',
    prop: 'grantee'
  }
]

const DEFAULT_SQLSERVER_WHITELIST_PROPS = [
  {
    label: '实例名',
    prop: 'instance_name'
  },
  {
    label: '主机信息',
    prop: 'host',
    render: (h, { row }) => {
      const hostIP = `${row.host ? row.host : '-'} ${row.ip ? ('( ' + row.ip + ' )') : ''}`
      return <span>{ hostIP }</span>
    }
  },
  {
    label: '数据库名',
    prop: 'object_owner'
  },
  {
    label: '提权类型',
    prop: 'authority_type',
    render: (h, { row }) => {
      return <span>{ SQLSERVER_AUTHORITY_TYPES[row.authority_type] }</span>
    }
  }
]

export const TABLE_COLUMN_PROPS = {
  'MYSQL_PRODUCT': {
    'PARAMETER': DEFAULT_MYSQL_ORACLE_PARAMETER_PROPS,
    'AUTHORIZATION': DEFAULT_MYSQL_AUTHORIZATION_PROPS,
    'WHITELIST': DEFAULT_MYSQL_WHITELIST_PROPS
  },
  'ORACLE_PRODUCT': {
    'PARAMETER': DEFAULT_MYSQL_ORACLE_PARAMETER_PROPS,
    'AUTHORIZATION': DEFAULT_ORACLE_AUTHORIZATION_PROPS,
    'WHITELIST': DEFAULT_ORACLE_WHITELIST_PROPS
  },
  'DB2_PRODUCT': {
    'PARAMETER': DEFAULT_DB2_PARAMETER_PROPS,
    'AUTHORIZATION': DEFAULT_DB2_AUTHORIZATION_PROPS,
    'WHITELIST': DEFAULT_DB2_WHITELIST_PROPS
  },
  'SQLSERVER_PRODUCT': {
    'WHITELIST': DEFAULT_SQLSERVER_WHITELIST_PROPS
  }
}

// mysql 权限类型 不可以直接export AUTHORITY_TYPES
const MYSQL_AUTHORITY_TYPES = {
  'somdbdev': '高权限',
  'somdbqry': '低权限'
}
const ORACLE_AUTHORITY_TYPES = {
  'appadm_high': '高权限',
  'appadm_low': '低权限'
}
const SQLSERVER_AUTHORITY_TYPES = {
  'sa': '高权限'
}
export {
  MYSQL_AUTHORITY_TYPES,
  ORACLE_AUTHORITY_TYPES,
  SQLSERVER_AUTHORITY_TYPES
}

// 去显示影藏third表单项
export const FORM_ITEM_SHOW = {
  'MYSQL_PRODUCT': {
    'PARAMETER': ['top_system'],
    'AUTHORIZATION': [],
    'WHITELIST': ['plan_use_time']
  },
  'ORACLE_PRODUCT': {
    'PARAMETER': ['top_system'],
    'AUTHORIZATION': [],
    'WHITELIST': ['plan_use_time']
  },
  'DB2_PRODUCT': {
    'PARAMETER': ['top_system'],
    'AUTHORIZATION': [],
    'WHITELIST': ['plan_use_time']
  },
  'SQLSERVER_PRODUCT': {
    'WHITELIST': ['plan_use_time']
  }
}

// 去显示影藏third表单项项目是否校验
export const FORM_ITEM_PROJECT_VALIDATE = {
  'MYSQL_PRODUCT': {
    'PARAMETER': false,
    'AUTHORIZATION': false,
    'WHITELIST': true
  },
  'ORACLE_PRODUCT': {
    'PARAMETER': false,
    'AUTHORIZATION': false,
    'WHITELIST': true
  },
  'DB2_PRODUCT': {
    'PARAMETER': false,
    'AUTHORIZATION': false,
    'WHITELIST': true
  },
  'SQLSERVER_PRODUCT': {
    'WHITELIST': true
  }
}

// 批量导入modal中下载的地址
export const WORKSHEET_DOWNLOAD_LINK = {
  'MYSQL_PRODUCT': {
    'PARAMETER': '/excels/mysql_parameter_template.xlsx',
    'AUTHORIZATION': '/excels/mysql_authorization_template.xlsx',
    'WHITELIST': '/excels/mysql_whitelist_template.xlsx'
  },
  'ORACLE_PRODUCT': {
    'PARAMETER': '/excels/oracle_parameter_template.xlsx',
    'AUTHORIZATION': '/excels/oracle_authorization_template.xlsx',
    'WHITELIST': '/excels/oracle_whitelist_template.xlsx'
  },
  'DB2_PRODUCT': {
    'PARAMETER': '/excels/db2_parameter_template.xlsx',
    'AUTHORIZATION': '/excels/db2_authorization_template.xlsx',
    'WHITELIST': '/excels/db2_whitelist_template.xlsx'
  },
  'SQLSERVER_PRODUCT': {
    'WHITELIST': '/excels/sqlserver_whitelist_template.xlsx'
  }
}

// 批量导入modal中upload 方法的query
export const WORKSHEET_DOWNLOAD_QUERY = {
  'MYSQL_PRODUCT': {
    'PARAMETER': 'MYSQL_PARAM',
    'AUTHORIZATION': 'MYSQL_AUTHORIZATION',
    'WHITELIST': 'MYSQL_WHITELIST'
  },
  'ORACLE_PRODUCT': {
    'PARAMETER': 'ORACLE_PARAM',
    'AUTHORIZATION': 'ORACLE_AUTHORIZATION',
    'WHITELIST': 'ORACLE_WHITELIST'
  },
  'DB2_PRODUCT': {
    'PARAMETER': 'DB2_PARAM',
    'AUTHORIZATION': 'DB2_AUTHORIZATION',
    'WHITELIST': 'DB2_WHITELIST'
  },
  'SQLSERVER_PRODUCT': {
    'WHITELIST': 'SQLSERVER_WHITELIST'
  }
}

// Oracle一键授权选择system或者role隐藏schema名和对象名
export const ORACLE_AUTHORIZATION_AUTHORITY_TYPE_HIDE = ['ORACLE_SYSTEM', 'ORACLE_ROLE']

// 自助式架构模块--mysql
export const BUILT_MYSQL = {

}
