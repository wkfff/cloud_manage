/**
 * @file:   文件描述
 * @author: lzc
 * @date:   2019-03-12
 */
import { createHelpers } from '@/plugins/vuex-fields'

const { mapFields } = createHelpers({
  getterType: 'built/getCreateMysqlFormData',
  mutationType: 'built/UPDATE_CREATE_MYSQL_FORM_DATA'
})

export default {
  ...mapFields([
    'instance_name',
    'instance_desc',
    'business',
    'app_code',
    'project_name',
    'architecture',
    'db_version',
    'db_spec',
    'disk',
    'instance_chart'
  ])
}
