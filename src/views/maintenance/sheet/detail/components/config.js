/**
 * @file:   工单详情,列表和配置项
 * @author: lzc
 * @date:   2019-02-23
 */
const CONFIG_FIELDS = {
  AUTHORIZATION: [
    {
      label: '所属项目',
      prop: 'project'
    },
    {
      label: '工单类型',
      prop: 'priority',
      options: {
        1: '服务单',
        2: '标准变更 ',
        3: '极简变更'
      }
    },
    {
      label: '执行时间',
      separator: ' - ', // 分隔符
      prop: ['schedule_begin_time', 'schedule_end_time']
    },
    {
      label: '紧急执行原因',
      prop: 'reason'
    },
    {
      label: '手机号',
      prop: 'phone'
    },
    {
      label: '邮箱',
      prop: 'email'
    },
    {
      label: '数据库用户持有人',
      prop: 'undefined' // 待定
    }
  ],
  
  WHITELIST: [
    {
      label: '所属项目',
      prop: 'project'
    },
    {
      label: '工单类型',
      prop: 'priority',
      options: {
        1: '服务单',
        2: '标准变更 ',
        3: '极简变更'
      }
    },
    {
      label: '执行时间',
      separator: ' - ', // 分隔符
      prop: ['schedule_begin_time', 'schedule_end_time']
    },
    {
      label: '计划使用时长',
      prop: 'undefined'
    },
    {
      label: '紧急执行原因',
      prop: 'reason'
    },
    {
      label: '手机号',
      prop: 'phone'
    },
    {
      label: '邮箱',
      prop: 'email'
    },
    {
      label: '数据库用户持有人',
      prop: 'undefined'
    }
  ],
  
  PARAMETER: [
    {
      label: 'TOP系统',
      prop: 'top_system'
    },
    {
      label: '所属项目',
      prop: 'project'
    },
    {
      label: '工单类型',
      prop: 'priority',
      options: {
        1: '服务单',
        2: '标准变更 ',
        3: '极简变更'
      }
    },
    {
      label: '执行时间',
      separator: ' - ', // 分隔符
      prop: ['schedule_begin_time', 'schedule_end_time']
    },
    {
      label: '紧急执行原因',
      prop: 'reason'
    },
    {
      label: '手机号',
      prop: 'phone'
    },
    {
      label: '邮箱',
      prop: 'email'
    },
    {
      label: '数据库用户持有人',
      prop: 'undefined'
    }
  ]
}

export default {
  // MySQL产品
  MYSQL_PRODUCT: {
    // MySQL 一键用户授权
    AUTHORIZATION: {
      
      TABLE_FIELDS: [
        {
          label: '实例名',
          prop: 'instance_name'
        },
        {
          label: '主机信息',
          render(h, { row }) {
            return (
              <span>{ row.host_ip ? `${row.host}（${row.host_ip}）` : row.host }</span>
            )
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
              render(h, { row }) {
                return (
                  <span>{ row.is_create_user ? '是' : '否' }</span>
                )
              }
            },
            {
              label: '用户（帐号）名',
              prop: 'account'
            },
            {
              label: '初始密码',
              prop: 'password'
            }
          ]
        }
      ],
      
      CONFIG_FIELDS: CONFIG_FIELDS.AUTHORIZATION
    },
    
    // MySQL 白名单提取
    WHITELIST: {
      TABLE_FIELDS: [
        {
          label: '实例名',
          prop: 'instance_name'
        },
        {
          label: '主机信息',
          render(h, { row }) {
            return (
              <span>{ row.host_ip ? `${row.host}（${row.host_ip}）` : row.host }</span>
            )
          }
        },
        {
          label: 'Schema名',
          prop: 'object_owner'
        },
        {
          label: '提权类型',
          prop: 'authority'
        }
      ],
      CONFIG_FIELDS: CONFIG_FIELDS.WHITELIST
    },
    
    // MySQL参数修改
    PARAMETER: {
      TABLE_FIELDS: [
        {
          label: '实例名',
          prop: 'instance_name'
        },
        {
          label: '主机信息',
          render(h, { row }) {
            return (
              <span>{ row.host_ip ? `${row.host}（${row.host_ip}）` : row.host }</span>
            )
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
      ],
      CONFIG_FIELDS: CONFIG_FIELDS.PARAMETER
    }
  },
  
  // oracle产品
  ORACLE_PRODUCT: {
    
    // oracle 一键用户授权
    AUTHORIZATION: {
      TABLE_FIELDS: [
        {
          label: '实例名',
          prop: 'instance_name'
        },
        {
          label: '主机信息',
          render(h, { row }) {
            return (
              <span>{ row.host_ip ? `${row.host}（${row.host_ip}）` : row.host }</span>
            )
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
          label: '权限类型',
          prop: 'authority_type'
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
              render(h, { row }) {
                return (
                  <span>{ row.is_create_user ? '是' : '否' }</span>
                )
              }
            },
            {
              label: '用户（帐号）名',
              prop: 'account'
            },
            {
              label: '初始密码',
              prop: 'password'
            }
          ]
        }
      ],
      CONFIG_FIELDS: CONFIG_FIELDS.AUTHORIZATION
    },
    
    // oracle白名单提取
    WHITELIST: {
      TABLE_FIELDS: [
        {
          label: '实例名',
          prop: 'instance_name'
        },
        {
          label: '主机信息',
          render(h, { row }) {
            return (
              <span>{ row.host_ip ? `${row.host}（${row.host_ip}）` : row.host }</span>
            )
          }
        },
        {
          label: '数据库名',
          prop: 'object_owner'
        },
        {
          label: '提权类型',
          prop: 'authority_type'
        }
      ],
      CONFIG_FIELDS: CONFIG_FIELDS.WHITELIST
    },
    
    // oracle参数修改
    PARAMETER: {
      TABLE_FIELDS: [
        {
          label: '实例名',
          prop: 'instance_name'
        },
        {
          label: '主机信息',
          render(h, { row }) {
            return (
              <span>{ row.host_ip ? `${row.host}（${row.host_ip}）` : row.host }</span>
            )
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
      ],
      CONFIG_FIELDS: CONFIG_FIELDS.PARAMETER
    }
  },
  
  // DB2产品
  DB2_PRODUCT: {
    
    // DB2一键用户授权
    AUTHORIZATION: {
      TABLE_FIELDS: [
        {
          label: '实例名',
          prop: 'instance_name'
        },
        {
          label: '主机信息',
          render(h, { row }) {
            return (
              <span>{ row.host_ip ? `${row.host}（${row.host_ip}）` : row.host }</span>
            )
          }
        },
        {
          label: '数据库名',
          prop: 'object_owner'
        },
        {
          label: 'Schema名',
          render(h, { row }) {
            const arr = `${row.object_name}`.split('.')
            return (
              <span>{ arr[0] }</span>
            )
          }
        },
        {
          label: '对象名',
          render(h, { row }) {
            const arr = `${row.object_name}`.split('.')
            return (
              <span>{ arr[1] || '-' }</span>
            )
          }
        },
        {
          label: '权限名',
          prop: 'authority'
        },
        {
          label: '被授权用户名（帐号名）',
          prop: 'grantee'
        }
      ],
      CONFIG_FIELDS: CONFIG_FIELDS.AUTHORIZATION
    },
    
    // DB2白名单提取
    WHITELIST: {
      TABLE_FIELDS: [
        {
          label: '实例名',
          prop: 'instance_name'
        },
        {
          label: '主机信息',
          render(h, { row }) {
            return (
              <span>{ row.host_ip ? `${row.host}（${row.host_ip}）` : row.host }</span>
            )
          }
        },
        {
          label: '数据库名',
          prop: 'object_owner'
        },
        {
          label: '用户名',
          prop: 'account'
        }
      ],
      CONFIG_FIELDS: CONFIG_FIELDS.WHITELIST
    },
    
    // DB2参数修改
    PARAMETER: {
      TABLE_FIELDS: [
        {
          label: '实例名',
          prop: 'instance_name'
        },
        {
          label: '主机信息',
          render(h, { row }) {
            return (
              <span>{ row.host_ip ? `${row.host}（${row.host_ip}）` : row.host }</span>
            )
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
      ],
      CONFIG_FIELDS: CONFIG_FIELDS.PARAMETER
    }
    
  }
}
