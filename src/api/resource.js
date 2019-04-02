/**
 * @author: lzc
 * @date:   2019-01-16
 * @desc:   资源模块接口
 */
 
// 虚拟机列表、物理机列表 machine_type: 2 物理机 1 虚拟机
export const GET_MACHINE_LIST = `/cloud/machine`

// 导入物理机
export const UPLOAD_PHYSICAL_IMPORT = `/cloud/machine/physical/import`

// 导入虚拟机
export const UPLOAD_VIRTUAL_IMPORT = `/cloud/machine/virtual/import`

// 删除机器
export const DELETE_MACHINE = `/cloud/machine/{0}`
