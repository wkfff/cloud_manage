/**
 * @file:   工单详情,列表和配置项
 * @author: lzc
 * @date:   2019-02-23
 */
const STATUS = {
  1: '成功',
  2: '失败',
  3: '执行中'
}
const STATUS_COLOR = {
  1: 'text-success',
  2: 'text-error',
  3: 'text-success'
}

const fn = scope => {
  const config = {
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
          },
          {
            label: '当前执行状态/结果',
            prop: 'status',
            render(h, { row }) {
              return (
                <span class={ `${STATUS_COLOR[row.status]} point` }>{ STATUS[row.status] }</span>
              )
            }
          },
          {
            label: '操作',
            render: (h, { row }) => {
              return (
                <el-button
                  type="text"
                  onClick={ scope.restartExecute.bind(scope, row) }
                >
                  { row.is_retry === 1 && row.status === 2 ? '重新执行' : '-' }
                </el-button>
              )
            }
          }
        ]
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
          },
          {
            label: '当前执行状态/结果',
            prop: 'status',
            render(h, { row }) {
              return (
                <span class={ `${STATUS_COLOR[row.status]} point` }>{ STATUS[row.status] }</span>
              )
            }
          },
          {
            label: '操作',
            render: (h, { row }) => {
              return (
                <el-button
                  type="text"
                  onClick={ scope.restartExecute.bind(scope, row) }
                >
                  { row.is_retry === 1 && row.status === 2 ? '重新执行' : '-' }
                </el-button>
              )
            }
          }
        ]
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
          },
          {
            label: '当前执行状态/结果',
            prop: 'status',
            render(h, { row }) {
              return (
                <span class={ `${STATUS_COLOR[row.status]} point` }>{ STATUS[row.status] }</span>
              )
            }
          },
          {
            label: '操作',
            render(h, { row }) {
              console.log('this------>', this)
              return (
                <el-button
                  type="text"
                  onClick={ scope.restartExecute.bind(scope, row) }
                >
                  { row.is_retry === 1 && row.status === 2 ? '重新执行' : '-' }
                </el-button>
              )
            }
          }
        ]
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
          },
          {
            label: '当前执行状态/结果',
            prop: 'status',
            render(h, { row }) {
              return (
                <span class={ `${STATUS_COLOR[row.status]} point` }>{ STATUS[row.status] }</span>
              )
            }
          },
          {
            label: '操作',
            render: (h, { row }) => {
              return (
                <el-button
                  type="text"
                  onClick={ scope.restartExecute.bind(scope, row) }
                >
                  { row.is_retry === 1 && row.status === 2 ? '重新执行' : '-' }
                </el-button>
              )
            }
          }
        ]
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
          },
          {
            label: '当前执行状态/结果',
            prop: 'status',
            render(h, { row }) {
              return (
                <span class={ `${STATUS_COLOR[row.status]} point` }>{ STATUS[row.status] }</span>
              )
            }
          },
          {
            label: '操作',
            render: (h, { row }) => {
              return (
                <el-button
                  type="text"
                  onClick={ scope.restartExecute.bind(scope, row) }
                >
                  { row.is_retry === 1 && row.status === 2 ? '重新执行' : '-' }
                </el-button>
              )
            }
          }
        ]
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
          },
          {
            label: '当前执行状态/结果',
            prop: 'status',
            render(h, { row }) {
              return (
                <span class={ `${STATUS_COLOR[row.status]} point` }>{ STATUS[row.status] }</span>
              )
            }
          },
          {
            label: '操作',
            render: (h, { row }) => {
              return (
                <el-button
                  type="text"
                  onClick={ scope.restartExecute.bind(scope, row) }
                >
                  { row.is_retry === 1 && row.status === 2 ? '重新执行' : '-' }
                </el-button>
              )
            }
          }
        ]
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
          },
          {
            label: '当前执行状态/结果',
            prop: 'status',
            render(h, { row }) {
              return (
                <span class={ `${STATUS_COLOR[row.status]} point` }>{ STATUS[row.status] }</span>
              )
            }
          },
          {
            label: '操作',
            render: (h, { row }) => {
              return (
                <el-button
                  type="text"
                  onClick={ scope.restartExecute.bind(scope, row) }
                >
                  { row.is_retry === 1 && row.status === 2 ? '重新执行' : '-' }
                </el-button>
              )
            }
          }
        ]
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
          },
          {
            label: '当前执行状态/结果',
            prop: 'status',
            render(h, { row }) {
              return (
                <span class={ `${STATUS_COLOR[row.status]} point` }>{ STATUS[row.status] }</span>
              )
            }
          },
          {
            label: '操作',
            render: (h, { row }) => {
              return (
                <el-button
                  type="text"
                  onClick={ scope.restartExecute.bind(scope, row) }
                >
                  { row.is_retry === 1 && row.status === 2 ? '重新执行' : '-' }
                </el-button>
              )
            }
          }
        ]
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
          },
          {
            label: '当前执行状态/结果',
            prop: 'status',
            render(h, { row }) {
              return (
                <span class={ `${STATUS_COLOR[row.status]} point` }>{ STATUS[row.status] }</span>
              )
            }
          },
          {
            label: '操作',
            render: (h, { row }) => {
              return (
                <el-button
                  type="text"
                  onClick={ scope.restartExecute.bind(scope, row) }
                >
                  { row.is_retry === 1 && row.status === 2 ? '重新执行' : '-' }
                </el-button>
              )
            }
          }
        ]
      }
      
    }
  }
  return config
}

export default fn
