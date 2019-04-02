import request from '@/utils/request'

export function login (params) {
    return request('/login', {
      method: 'post',
      data: params
    })
}

export function logout () {
  return request('/logout', {
    method: 'post'
  })
}