import Cookies from 'js-cookie'
import { Cache } from '@/utils'

const TokenKey = 'Admin-Token'
const cache = new Cache()

export function getToken() {
  return cache.get('token')
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
