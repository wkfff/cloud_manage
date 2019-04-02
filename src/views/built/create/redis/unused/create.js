/**
 * @file:   文件描述
 * @author: lzc
 * @date:   2019-03-12
 */
import CloudBack from '@/components/CloudBack'
import DelayButton from '@/components/DelayButton/index.vue'
import CloudAffix from '@/components/CloudAffix'
import CreateForm from './components/CreateForm'
import ViewInfo from './components/ViewInfo'
import { INSTANCE_MYSQL, DATABASE_TYPE } from '@/utils/constant'
import {
  GET_MYSQL_INSTANCE_TYPE,
  GET_ARCHITECTURE_TYPE,
  GET_MYSQL_IMAGES,
  POST_MYSQL_INSTANCE
} from '@/api/instance'

export default {
  name: 'CreateMysqlInstance',
  
  components: {
    CloudBack,
    DelayButton,
    CreateForm,
    ViewInfo,
    CloudAffix
  },
  
  data() {
    return {
      INSTANCE_MYSQL,
      DATABASE_TYPE,
      formData: {
        city: '深圳',
        instance_type_id: 1,
        architecture_id: '',
        db_version: 'MySQL 5.6',
        image: null,
        db_spec: '2C8G',
        disk: 500,
        apply_num: 1,
        db_type: 1
      },
      instanceType: [], // 实例类型
      architectureType: [], // 所有实例架构
      showArchitectureType: [], // 需要显示的实例架构
      imagesVersion: [] // 镜像版本
    }
  },
  
  computed: {
  },
  
  watch: {
    'formData.instance_type_id'(val) {
      this.calcShowArchitectureType()
      if (val === 8) this.formData.image = this.imagesVersion[0] || ''
    }
  },
  
  created() {
    this.__getInstanceType()
    this.__getArchitectureType()
    this.__getMysqlImages()
  },
  
  methods: {
    /**
     * 获取实例类型
     * @return {Promise<void>}
     * @private
     */
    async __getInstanceType() {
      const res = await this.$ajax.get(GET_MYSQL_INSTANCE_TYPE, { dbType: 1 })
      this.instanceType = res.data || []
    },
    
    /**
     * 获取所有架构类型
     * @return {Promise<void>}
     * @private
     */
    async __getArchitectureType() {
      const res = await this.$ajax.get(GET_ARCHITECTURE_TYPE)
      this.architectureType = res.data
      this.calcShowArchitectureType()
    },
    
    /**
     * 根据当前选择的实例类型，筛选对应的实例架构
     */
    calcShowArchitectureType() {
      this.showArchitectureType = this.architectureType.filter(item => item.instance_type_id === this.formData.instance_type_id)
      this.formData.architecture_id = this.showArchitectureType[0] ? this.showArchitectureType[0].id : ''
    },
    
    /**
     * 获取镜像
     * @return {Promise<void>}
     * @private
     */
    async __getMysqlImages() {
      const res = await this.$ajax.get(GET_MYSQL_IMAGES)
      this.imagesVersion = res.data
    },
    
    async submitForm() {
      try {
        const valid = await this.$refs['createForm'].validate()
        if (valid) {
          await this.$ajax.post(POST_MYSQL_INSTANCE, this.formData)
          this.$message({
            message: '新建成功',
            type: 'success'
          })
          this.$router.go(-1)
        }
      } catch (e) {
        this.$refs.confirmBtn.clear()
      }
    },
    confirm() {
      this.$router.push({path: '/built/instance/entry/redis/list'})
    }
  }
}
