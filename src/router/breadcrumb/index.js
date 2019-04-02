/**
 * @author: lzc
 * @date:   2019-01-15
 * @desc:   项目面包屑配置
 */
const BREAD_CONFIG = {
  // 首页
  dashboard: {
    title: '首页',
    path: '/dashboard'
  },
  // 实例管理模块
  instance: {
    title: '实例管理',
    path: '/instance',
    children: {
      mysql: {
        title: 'MySQL',
        path: '/instance/mysql/list',
        children: {
          create: {
            title: '新增',
            path: '/instance/mysql/create'
          },
          detail: {
            title: '详情',
            path: '/instance/mysql/detail/:id'
          }
        }
      },
      redis: {
        title: 'Redis',
        path: '/instance/redis/list',
        children: {
          create: {
            title: '新增Redis',
            path: 'instance/redis/create'
          },
          detail: {
            title: 'Redis详情',
            path: 'instance/redis/detail/:id'
          }
        }
      },
      mongodb: {
        title: 'Mongodb',
        path: '/instance/mongodb/list',
        children: {
          create: {
            title: '新增Mongodb',
            path: 'instance/mongodb/create'
          },
          detail: {
            title: 'Mongodb详情',
            path: 'instance/mongodb/detail/:id'
          }
        }
      }
    }
  },
  // 资源管理模块
  resource: {
    title: '资源管理',
    path: '/resource',
    children: {
      virtual: {
        title: '虚拟机',
        path: '/resource/virtual/list'
      },
      physical: {
        title: '物理机',
        path: '/resource/physical/list'
      }
    }
  },
  // 工单管理模块
  maintenance: {
    title: '自助式运维',
    path: '/maintenance',
    children: {
      sheet: {
        title: '查询工单',
        path: '/maintenance/search/list',
        children: {
          detail: {
            title: '概览',
            path: '/maintenance/sheet/detail/overview/:id'
          },
          logs: {
            title: '处理记录',
            path: '/maintenance/sheet/detail/logs/:id'
          }
        }
      },
      create: {
        title: '新建工单',
        path: '/maintenance/sheet',
        children: {
          first: {
            title: '第一步',
            path: '/maintenance/sheet/add'
          },
          second: {
            title: '第二步',
            path: '/maintenance/sheet/add/second'
          },
          third: {
            title: '第三步',
            path: '/maintenance/sheet/add/third'
          },
          continue: {
            title: '继续填单',
            path: '/maintenance/sheet/add/third/:id'
          }
        }
      },
      tasks: {
        title: '任务与事件',
        path: `/maintenance/tasks/index`,
        children: {
          task: {
            title: '任务列表',
            path: '/maintenance/tasks/index/list',
            children: {
              detail: {
                title: '任务详情',
                path: '/maintenance/tasks/list-detail/:id'
              }
            }
          },
          logs: {
            title: '执行日志',
            path: '/maintenance/tasks/index/logs'
          }
        }
      }
    }
  },
  // 系统管理模块
  system: {
    title: '系统管理',
    path: '/system',
    children: {
      business: {
        title: '业务管理',
        path: '/system/business/list'
      },
      task: {
        title: '任务管理',
        path: '/system/task/list'
      },
      schedule: {
        title: '任务调度',
        path: '/system/schedule/list'
      }
    }
  },
  // 权限管理模块
  permissions: {
    title: '权限管理',
    path: '/permissions',
    children: {
      user: {
        title: '用户管理',
        path: '/permissions/user/list'
      },
      group: {
        title: '用户组管理',
        path: '/permissions/group/list'
      },
      role: {
        title: '角色管理',
        path: '/permissions/role/list'
      }
    }
  },
  // 智能看板模块
  smart: {
    title: '智能看板',
    path: '/smart',
    children: {
      overview: {
        title: '全景视图',
        path: '/smart/overview'
      }
    }
  }
}

export default BREAD_CONFIG
