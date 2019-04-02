/**
 * @author: xuye0422
 * @date:   2019-01-16
 * @desc:   任务调度管理api
 */
// 调度任务列表
export const GET_SCHEDULE_JOB_LIST = `/task/job`
// jobCode
export const GET_SCHEDULE_JOB_DETAIL = `/task/job/{0}`

export const UPDATE_SCHEDULE_JOB = `/task/job/{0}`

export const ADD_SCHEDULE_JOB = `/task/job`

export const TRIGGER_SCHEDULE_JOB = `/task/job/trigger/{0}`

export const START_SCHEDULE_JOB = `/task/job/start/{0}`

export const PAUSE_SCHEDULE_JOB = `/task/job/pause/{0}`

export const DELETE_SCHEDULE_JOB = `/task/job/{0}`
