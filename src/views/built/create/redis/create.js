import CloudBack from '@/components/CloudBack'
import CloudForm from '@/components/CloudForm'
import DelayButton from '@/components/DelayButton/index.vue'
import CloudAffix from '@/components/CloudAffix'
import ViewInfo from './components/ViewInfo'
import { mapMutations } from 'vuex'
import { INSTANCE_MYSQL } from '@/utils/constant'
import { cloneDeep } from 'lodash'
import {
  GET_MYSQL_INSTANCE_TYPE,
  POST_MYSQL_INSTANCE,
  GET_LEADER,
  RECOMMEND_DBA,
  GET_SYSTEM_LIST,
  GET_PROJECT_LIST,
  POST_COMMIT_INSTANCE
} from '@/api/instance'

export default {
  name: 'CreateRedisInstance',
  
  components: {
    CloudBack,
    DelayButton,
    CloudForm,
    CloudAffix,
    ViewInfo
  },
  
  data() {
    const rtoObj = {
      '15min': '15分钟',
      '30min': '30分钟',
      '1h': '1小时',
      '2h': '2小时',
      '3h': '3小时',
      '6h': '6小时',
      '24h': '24小时'
    }
    const rpoObj = {
      '1min': '1分钟',
      '5min': '5分钟',
      '30min': '30分钟',
      '1h': '1小时',
      '12h': '12小时',
      '24h': '24小时',
      '7Day': '7天'
    }
    return {
      rtoObj,
      rpoObj,
      instanceType: [], // 实例类型
      formConfig: {
        tipsIndent: true,
        store: true, // 存储在vuex中
        storeModule: 'built',
        storeMutation: 'UPDATE_MYSQL_FORM_DATA',
        storeFormType: 'createMysqlFormData',
        storeFormGetter: 'createMysqlFormData'
      },
      dialogVisible: false,
      isSave: false,
      smartSystemLeader: true, // 智能推荐系统管理员
      smartDbLeader: true, // 智能推荐数据库管理员
      smartDbLeaderPeople: '',
      leaders: {},
      dbVersion: {
        'MySQL 5.6': 'MySQL 5.6',
        'MySQL 5.7': 'MySQL 5.7'
      },
      systemLists: [],
      projectLists: []
    }
  },
  
  computed: {
    formFields() {
      const _this = this
      const dbSpec1 = {}
      const dbSpec2 = {}
      Object.keys(INSTANCE_MYSQL.INSTANCE_SPEC).forEach((key, i) => {
        if (i < 4) {
          dbSpec1[key] = INSTANCE_MYSQL.INSTANCE_SPEC[key]
        } else {
          dbSpec2[key] = INSTANCE_MYSQL.INSTANCE_SPEC[key]
        }
      })
      
      return [
        {
          title: '实例信息',
          fields: [
            {
              type: 'radio',
              label: '区域',
              prop: 'city',
              options: {
                type: 'button',
                className: 'cloud-radio',
                radioOptions: {
                  '深圳': '深圳',
                  '上海': '上海'
                }
              },
              rules: [{ required: true, message: '请选择区域', trigger: 'change' }]
            },
            {
              type: 'input',
              label: '实例名',
              prop: 'instance_name',
              options: {
                clearable: true
              },
              tipsRender(h) {
                return (
                  <div>
                    <div>要求：</div>
                    <div>全局唯一，2-8个字符；</div>
                    <div>由英文字母或数字组成，且首字符不允许为数字；</div>
                    <div>不允许包含下划线及其他特殊符号。</div>
                  </div>
                )
              },
              rules: [{ required: true, message: '请输入实例信息', trigger: 'change' }
              ]
            },
            {
              type: 'textarea',
              label: '描述',
              prop: 'instance_desc',
              options: {
                clearable: true
              }
            },
            {
              type: 'select',
              label: '所属业务系统/子系统',
              prop: 'business_name',
              options: {
                filterable: true,
                remote: true,
                clearable: true,
                'remote-method': _this.getSystemList,
                selectOptions: _this.systemLists
              },
              rules: [{ required: true, message: '请选择所属业务系统/子系统', trigger: 'change' }]
            },
            {
              type: 'select',
              label: '所属项目',
              prop: 'project_name',
              options: {
                filterable: true,
                remote: true,
                clearable: true,
                'remote-method': _this.getProjectList,
                selectOptions: _this.projectLists
              },
              rules: [{ required: true, message: '请选择所属项目', trigger: 'change' }]
            }
          ]
        },
        {
          title: '基本配置',
          fields: [
            {
              type: 'radio',
              label: '架构类型',
              prop: 'instance_type_name',
              options: {
                type: 'button',
                radioOptions: _this.instanceType
              },
              events: {
                change(val) {
                  if (val === 'MGR集群') {
                    _this.dbVersion = {
                      'MySQL 5.6': 'MySQL 5.6'
                    }
                  } else {
                    _this.dbVersion = {
                      'MySQL 5.6': 'MySQL 5.6',
                      'MySQL 5.7': 'MySQL 5.7'
                    }
                  }
                  _this.UPDATE_MYSQL_FORM_DATA({ db_version: 'MySQL 5.6' })
                }
              },
              rules: [{ required: true, message: '请选择架构类型', trigger: 'change' }]
            },
            {
              type: 'radio',
              label: '数据库版本',
              prop: 'db_version',
              options: {
                type: 'button',
                radioOptions: _this.dbVersion
              },
              rules: [{ required: true, message: '请选择数据库版本', trigger: 'change' }]
            },
            {
              type: 'radio',
              label: '计算规格',
              prop: 'db_spec',
              options: {
                type: 'button',
                multiple: true,
                radioOptions: [dbSpec1, dbSpec2]
              },
              rules: [{ required: true, message: '请选择计算规格', trigger: 'change' }]
            },
            {
              type: 'slider',
              label: '数据存储容量',
              prop: 'disk',
              options: {
                step: 100,
                max: 1000,
                min: 0,
                showStep: 200,
                'show-input': true
              },
              rules: [{ required: true, message: '请选择数据存储容量', trigger: 'change' }]
            },
            {
              type: 'slider',
              label: '日志存储容量',
              prop: 'disk_log_size',
              options: {
                step: 100,
                max: 1000,
                min: 0,
                showStep: 200,
                'show-input': true
              },
              rules: [{ required: true, message: '请选择日志存储容量', trigger: 'change' }]
            },
            {
              type: 'input',
              label: '数据库用户名',
              prop: 'root_name',
              options: {
                clearable: true
              },
              tipsRender(h) {
                return (
                  <div>
                    <div>1、要求:</div>
                    <div>全局唯一，2-8个字符；</div>
                    <div>由英文字母或数字组成，且首字符不允许为数字；</div>
                    <div>不允许包含下划线及其他特殊符号。</div>
                    <div>2、说明：该用户为访问数据库的普通用户</div>
                  </div>
                )
              },
              rules: [{ required: true, message: '请输入数据库用户名', trigger: 'change' }]
            },
            {
              type: 'input',
              label: '数据库密码',
              prop: 'root_password',
              options: {
                clearable: true
              },
              tipsRender(h) {
                return (
                  <div>
                    <div>要求：</div>
                    <div>8-12个字符，必须由大写字母、小写字母、数字和特殊字符组成，特数字符包括#$%。</div>
                  </div>
                )
              },
              rules: [{ required: true, message: '请输入数据库密码', trigger: 'change' }]
            },
            {
              type: 'select',
              label: '字符集',
              prop: 'character_set',
              options: {
                clearable: true,
                selectOptions: {
                  'UTF8': 'UTF8',
                  'GBK': 'GBK'
                }
              },
              rules: [{ required: true, message: '请选择字符集', trigger: 'change' }]
            },
            {
              type: 'input',
              label: '最大连接数',
              prop: 'max_connections',
              options: {
                clearable: true,
                valueType: 'number'
              },
              rules: [{ required: true, message: '请输入最大连接数', trigger: 'change' }]
            },
            {
              type: 'input',
              label: '申请数量',
              prop: 'apply_num',
              options: {
                clearable: true,
                valueType: 'number'
              },
              extendRender(h) {
                return (
                  <div style="display: inline-block;">
                    套
                    <span style="margin-left: 10px; color: #999;">支持10套以内</span>
                  </div>
                )
              },
              tipsRender(h) {
                return (
                  <div>
                    表示以上同样配置的数据库实例需求数量
                  </div>
                )
              },
              rules: [{ required: true, message: '请输入申请数量', trigger: 'change' }]
            }
          ]
        },
        {
          title: '维护配置',
          fields: [
            {
              type: 'select',
              label: '备份策略',
              prop: 'backup_policy',
              options: {
                clearable: true,
                selectOptions: {
                  '每日全备': '每日全备',
                  '每月全备': '每月全备',
                  '每天增备': '每天增备'
                }
              },
              rules: [{ required: true, message: '请选择架构类型', trigger: 'change' }]
            },
            {
              type: 'radio',
              label: '业务服务时间',
              prop: 'service_time',
              options: {
                type: 'button',
                radioOptions: {
                  '5*8': '5*8',
                  '7*8': '7*8',
                  '7*24': '7*24'
                }
              },
              rules: [{ required: true, message: '请选择业务服务时间', trigger: 'change' }]
            },
            {
              type: 'time',
              label: '维护时间',
              prop: 'maintain_work_day',
              options: {
                'is-range': true,
                format: 'HH:mm',
                'value-format': 'HH:mm'
              },
              extendFrontRender(h) {
                return (
                  <span>工作日</span>
                )
              },
              rules: [{ required: true, message: '请选择工作日维护时间', trigger: 'change' }]
            },
            {
              type: 'time',
              label: '',
              prop: 'maintain_weekend',
              options: {
                'is-range': true,
                format: 'HH:mm',
                'value-format': 'HH:mm'
              },
              extendFrontRender(h) {
                return (
                  <span>节假日</span>
                )
              },
              rules: [{ required: true, message: '请选择节假日维护时间', trigger: 'change' }]
            },
            {
              type: 'radio',
              label: 'RTO',
              prop: 'rto',
              options: {
                type: 'button',
                radioOptions: _this.rtoObj
              },
              tipsRender(h) {
                return (
                  <div>
                    RTO：（RecoveryTime Object）是指灾难发生后，从IT系统宕机导致业务停顿之刻开始，到IT系统恢复至可以支持各部门运作，业务恢复运营之时，此两点之间的时间段。
                  </div>
                )
              },
              rules: [{ required: true, message: '请选择RTO', trigger: 'change' }]
            },
            {
              type: 'radio',
              label: 'RPO',
              prop: 'rpo',
              options: {
                type: 'button',
                radioOptions: _this.rpoObj
              },
              tipsRender(h) {
                return (
                  <div>
                    RPO（Recovery Point Object），即恢复点目标。是指灾难发生后，容灾系统能把数据恢复到灾难发生前时间点的数据。
                  </div>
                )
              },
              rules: [{ required: true, message: '请选择RPO', trigger: 'change' }]
            }
          ]
        },
        {
          title: '相关负责人',
          fields: [
            {
              type: 'select',
              label: '业务负责人',
              prop: 'app_owner',
              options: {
                filterable: true,
                clearable: true,
                selectOptions: _this.leaders
              },
              rules: [{ required: true, message: '请选择业务负责人', trigger: 'change' }]
            },
            {
              type: 'select',
              label: '开发负责人',
              prop: 'dev_leader_name',
              options: {
                filterable: true,
                clearable: true,
                selectOptions: _this.leaders
              },
              rules: [{ required: true, message: '请选择开发负责人', trigger: 'change' }]
            },
            {
              type: 'select',
              label: '开发室经理',
              prop: 'dev_manager_name',
              options: {
                filterable: true,
                clearable: true,
                selectOptions: _this.leaders
              },
              rules: [{ required: true, message: '请选择开发室经理', trigger: 'change' }]
            },
            {
              type: 'select',
              label: '系统管理员',
              prop: 'sys_owner',
              render(h, { data }, change) {
                return (
                  <div style="margin-left: 19px">
                    {
                      _this.smartSystemLeader
                        ? <el-select
                          filterable={ true }
                          clearable={ true }
                          value={ data.sys_owner }
                          onChange={ val => change(val) }
                        >
                          {
                            Object.keys(_this.leaders).map(key => {
                              return (
                                <el-option
                                  label={ key }
                                  value={ key }
                                />
                              )
                            })
                          }
                        </el-select>
                        : <span
                          style="display: inline-block; width: 280px"
                        >这个吗</span>
                    }
                    <el-button
                      type="text"
                      style="margin-left: 10px"
                      disabled={ true }
                      onClick={ _this.smartRecommendSystem.bind(_this, change) }
                    >{ _this.smartSystemLeader ? '智能推荐' : '撤销智能推荐' }
                    </el-button>
                  </div>
                )
              },
              rules: [{ required: true, message: '请选择推荐系统管理员', trigger: 'change' }]
            },
            {
              type: 'select',
              label: '数据库管理员',
              prop: 'recommend_db_leader',
              render(h, { data }, change) {
                return (
                  <div style="margin-left: 19px">
                    {
                      _this.smartDbLeader
                        ? <el-select
                          filterable={ true }
                          clearable={ true }
                          value={ data.recommend_db_leader }
                          onChange={ val => change(val) }
                        >
                          {
                            Object.keys(_this.leaders).map(key => {
                              return (
                                <el-option
                                  label={ key }
                                  value={ key }
                                />
                              )
                            })
                          }
                        </el-select>
                        : <span
                          style="display: inline-block; width: 280px"
                        >{ _this.smartDbLeaderPeople }</span>
                    }
                    <el-button
                      type="text"
                      style="margin-left: 10px"
                      onClick={ _this.smartRecommendDb.bind(_this, change) }
                    >{ _this.smartDbLeader ? '智能推荐' : '撤销智能推荐' }
                    </el-button>
                  </div>
                )
              },
              rules: [{ required: true, message: '请选择推荐数据库管理员', trigger: 'change' }]
            }
          ]
        }
      ]
    }
  },
  
  created() {
    this.__getInstanceType()
    this.__getLeaders()
  },
  
  methods: {
    ...mapMutations('built', ['UPDATE_MYSQL_FORM_DATA', 'RESTART_FROM_DATA']),
    
    /**
     * 架构类型
     * @return {Promise<void>}
     * @private
     */
    async __getInstanceType() {
      const res = await this.$ajax.get(GET_MYSQL_INSTANCE_TYPE, { dbType: 2 })
      this.instanceType = []
      res.data.forEach(v => {
        const { name } = v
        this.instanceType.push({
          label: name,
          value: name
        })
      })
      if (this.instanceType.length) this.UPDATE_MYSQL_FORM_DATA({ instance_type_name: this.instanceType[0].value })
    },
    
    /**
     * 获取相关负责人
     * @return {Promise<void>}
     * @private
     */
    async __getLeaders() {
      try {
        const res = await this.$ajax.get(GET_LEADER)
        if (res.data && Array.isArray(res.data)) {
          this.leaders = {}
          res.data.forEach(v => {
            this.leaders[v] = v
          })
        }
      } catch (e) {
        console.error(e)
      }
    },
    
    /**
     * 智能推荐管理员
     * @param change
     */
    smartRecommendSystem(change) {
      this.smartSystemLeader = !this.smartSystemLeader
    },
    
    /**
     * 智能推荐数据库管理员
     * @param change
     */
    async smartRecommendDb(change) {
      try {
        this.smartDbLeader = !this.smartDbLeader
        if (this.smartDbLeader) {
          change('')
        } else {
          const city = this.$store.state.built.createMysqlFormData.city
          const obj = {
            '深圳': 'sz',
            '上海': 'sh'
          }
          const res = await this.$ajax.get(RECOMMEND_DBA, { city: obj[city], product: 'MYSQL' })
          if (res.data) {
            this.smartDbLeaderPeople = res.data.dba
            change(res.data.dba)
          }
        }
      } catch (e) {
        console.error(e)
      }
    },
    
    async getSystemList(name) {
      try {
        const res = await this.$ajax.get(GET_SYSTEM_LIST, { name })
        if (res.data) {
          const arr = []
          res.data.forEach(v => {
            const { code, name } = v
            arr.push({
              label: name,
              value: code
            })
          })
          this.systemLists = arr
        }
      } catch (e) {
        throw new Error(e)
      }
    },
    
    async getProjectList(name) {
      try {
        const res = await this.$ajax.get(GET_PROJECT_LIST, { name })
        if (res.data) {
          const arr = []
          res.data.forEach(v => {
            const { code, name } = v
            arr.push({
              label: name,
              value: code
            })
          })
          this.projectLists = arr
        }
      } catch (e) {
        throw new Error(e)
      }
    },
    
    /**
     * 保存订单
     */
    saveForm() {
      this.isSave = true
      this.dialogVisible = true
    },
    
    /**
     * 提交订单
     */
    submitForm() {
      this.isSave = false
      this.dialogVisible = true
    },
    
    /**
     * 确定提交
     * @return {Promise<void>}
     */
    async confirmSubmitForm() {
      try {
        const valid = await this.$refs['createForm'].validate()
        if (valid) {
          const commitData = cloneDeep(this.$store.state.built.createMysqlFormData)
          commitData.maintain_weekend = commitData.maintain_weekend.join('-')
          commitData.maintain_work_day = commitData.maintain_work_day.join('-')
          console.log('提交数据', commitData)
          
          const res = await this.$ajax.post(POST_MYSQL_INSTANCE, commitData)
          if (!this.isSave) { // 提交订单
            await this.$ajax.post(POST_COMMIT_INSTANCE, '', [res.data.orderId])
          }
          const tip = this.isSave ? '订单保存成功' : '新建成功'
          this.$message.success(tip)
          
          // 重置store
          this.RESTART_FROM_DATA('createMysqlFormData')
          this.$router.go(-1)
        }
      } catch (e) {
        this.$refs.confirmBtn.clear()
      }
    }
  }
}
