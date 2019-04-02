/**
 * @file:   工单详情,列表和配置项
 * @author: lzc
 * @date:   2019-02-23
 */
const STATUS = {
  0: '未执行',
  1: '成功',
  2: '失败',
  3: '执行中'
}
const STATUS_COLOR = {
  0: 'text-warn',
  1: 'text-success',
  2: 'text-error',
  3: 'text-success'
}
const SQL_AUTHORITY_TYPES = {
  'sa': '高权限'
}
/**
 *  根据类型返回对应类型的table列配置
 * @param scope 组件对象
 * @return {*} 返回对应类型的table列配置
 */
const fn = scope => {
  /**
   * render 函数
   * @param h
   * @param row
   * @param index
   * @return {*}
   */
  const render = (h, { row, index }) => {
    if (typeof scope.executeBtnStatus[`disable-${row.id}`] !== 'undefined') scope.executeBtnStatus[`disable-${row.id}`] = row.status === 3
    return (
      row.is_retry === 1
        ? (
          <el-button
            type="text"
            disabled={ scope.executeBtnStatus[`disable-${row.id}`] }
            onClick={ scope.restartExecute.bind(scope, row, index) }
          >
            重新执行
          </el-button>
        )
        : <span>-</span>
    )
  }
  
  /**
   * 状态render函数
   * @param h
   * @param row
   * @return {*}
   */
  const statusRender = (h, { row }) => {
    return (
      <span class={ row.status === 3 ? `${STATUS_COLOR[row.status]}` : `${STATUS_COLOR[row.status]} point` }>
        {
          row.status === 3
            ? (
              <i class="el-icon-loading" />
            ) : null
        }
        { STATUS[row.status] }
      </span>
    )
  }
  
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
                prop: 'grantee'
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
            render: statusRender
          },
          {
            label: '操作',
            fixed: 'right',
            render
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
            label: '提权类型',
            prop: 'authority_type'
          },
          {
            label: '当前执行状态/结果',
            prop: 'status',
            render: statusRender
          },
          {
            label: '操作',
            fixed: 'right',
            render
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
            render: statusRender
          },
          {
            label: '操作',
            fixed: 'right',
            render
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
                prop: 'grantee'
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
            render: statusRender
          },
          {
            label: '操作',
            fixed: 'right',
            render
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
            render: statusRender
          },
          {
            label: '操作',
            fixed: 'right',
            render
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
            render: statusRender
          },
          {
            label: '操作',
            fixed: 'right',
            render
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
            render: statusRender
          },
          {
            label: '操作',
            fixed: 'right',
            render
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
            render: statusRender
          },
          {
            label: '操作',
            fixed: 'right',
            render
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
            render: statusRender
          },
          {
            label: '操作',
            fixed: 'right',
            render
          }
        ]
      }
    },
    
    // SQL 产品
    SQLSERVER_PRODUCT: {
      // SQL白名单提取
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
            prop: 'authority_type',
            render(h, { row }) {
              return (
                <span>{ row.authority_type ? SQL_AUTHORITY_TYPES[row.authority_type] : '-' }</span>
              )
            }
          },
          {
            label: '当前执行状态/结果',
            prop: 'status',
            render: statusRender
          },
          {
            label: '操作',
            fixed: 'right',
            render
          }
        ]
      }
    }
  }
  return config
}

export default fn
