import { Cache } from '@/utils'
const cache = new Cache()

export default {
  sidebar: {
    opened: !+cache.get('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop',
  user_name: '',
  nick_name: '',
  permissions: [],
  role_list: [],
  // phone: '',
  // email: ''
}
