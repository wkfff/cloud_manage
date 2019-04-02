<!--
  @author:  lzc
  @date:    2019-03-12
  @file:    xx
  @require:
-->
<template>
  <el-form
    ref="cloudForm"
    class="cloud-form"
    :model="createMysqlFormData"
  >
    <!--实例信息-->
    <div class="section-box">
      <div class="section-title">
        <span class="block"/>
        <span class="text">实例信息</span>
      </div>
      
      <el-form-item
        :rules="[{ required: true, message: '请输入实例信息', trigger: 'change' }]"
        label="实例名"
        prop="instance_name"
      >
        <el-input
          v-model="instance_name"
          placeholder="请输入实例名"
        />
      </el-form-item>
      
      <el-form-item
        label="描述"
        prop="instance_desc"
      >
        <el-input
          v-model="instance_desc"
          type="textarea"
          placeholder="请输入描述"
        />
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择所属业务系统', trigger: 'change' }]"
        label="所属业务系统"
        prop="business"
      >
        <el-select
          v-model="business"
          placeholder="请选择"
        >
          <el-option
            label="测试系统一"
            value="2"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请输入架构办代码', trigger: 'change' }]"
        label="架构办代码"
        prop="app_code"
      >
        <el-input
          v-model="app_code"
          placeholder="请输入架构办代码"
        />
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请输入所属项目', trigger: 'change' }]"
        label="所属项目"
        prop="project_name"
      >
        <el-input
          v-model="project_name"
          placeholder="请输入项目编号"
        />
        <el-input
          v-model="project_name"
          placeholder="请输入项目名称"
        />
      </el-form-item>
    </div>
    
    <!--基本配置-->
    <div class="section-box">
      <div class="section-title">
        <span class="block"/>
        <span class="text">基本配置</span>
      </div>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择架构类型', trigger: 'change' }]"
        label="架构类型"
        prop="architecture"
      >
        <el-radio-group v-model="architecture" >
          <el-radio-button label="RHCS实例" />
          <el-radio-button label="MGR集群" />
        </el-radio-group>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择数据库版本', trigger: 'change' }]"
        label="数据库版本"
        prop="db_version"
      >
        <el-radio-group v-model="db_version" >
          <el-radio-button label="MySQL5.7" />
        </el-radio-group>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择计算规格', trigger: 'change' }]"
        label="计算规格"
        prop="db_spec"
      >
        <div>
          <el-radio-group v-model="db_version" >
            <el-radio-button label="2核4G" />
            <el-radio-button label="2核8G" />
            <el-radio-button label="4核8G" />
            <el-radio-button label="4核16G" />
          </el-radio-group>
        </div>
        <div>
          <el-radio-group v-model="db_version" >
            <el-radio-button label="8核16G" />
            <el-radio-button label="8核32G" />
            <el-radio-button label="16核32G" />
            <el-radio-button label="16核64G" />
          </el-radio-group>
        </div>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择数据存储容量', trigger: 'change' }]"
        label="数据存储容量"
        prop="disk"
        class="disk-item"
      >
        <el-slider
          v-model="disk"
          :max="1000"
          :min="0"
          :step="100"
          show-input
        />
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择日志存储容量', trigger: 'change' }]"
        label="日志存储容量"
        prop="disk"
        class="disk-item"
      >
        <el-slider
          v-model="disk"
          :max="1000"
          :min="0"
          :step="100"
          show-input
        />
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请输入数据库用户名', trigger: 'change' }]"
        label="数据库用户名"
        prop="instance_desc"
      >
        <el-input
          v-model="instance_desc"
          placeholder="请输入架构办代码"
        />
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请输入数据库密码', trigger: 'change' }]"
        label="数据库密码"
        prop="instance_desc"
      >
        <el-input
          v-model="instance_desc"
          placeholder="请输入数据库密码"
        />
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择字符集', trigger: 'change' }]"
        label="字符集"
        prop="instance_chart"
      >
        <el-select
          v-model="instance_chart"
          placeholder="请选择字符集"
        >
          <el-option
            label="UTF8"
            value="UTF8"
          />
          <el-option
            label="GBK"
            value="GBK"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请输入最大连接数', trigger: 'change' }]"
        label="最大连接数"
        prop="instance_desc"
      >
        <el-input
          v-model="instance_desc"
          placeholder="请输入数据库密码"
        />
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请输入申请数量', trigger: 'change' }]"
        label="申请数量"
        prop="instance_desc"
      >
        <el-input
          v-model="instance_desc"
          placeholder="请输入申请数量"
        />
      </el-form-item>
    </div>
    
    <!--维护配置-->
    <div class="section-box">
      <div class="section-title">
        <span class="block"/>
        <span class="text">维护配置</span>
      </div>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择备份策略', trigger: 'change' }]"
        label="备份策略"
        prop="instance_name"
      >
        <el-select
          v-model="business"
          placeholder="请选择"
        >
          <el-option
            label="测试系统一"
            value="2"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择业务服务时间', trigger: 'change' }]"
        label="业务服务时间"
        prop="instance_desc"
      >
        <el-radio-group v-model="db_version" >
          <el-radio-button label="5*8" />
          <el-radio-button label="7*8" />
          <el-radio-button label="7*24" />
        </el-radio-group>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择维护时间', trigger: 'change' }]"
        label="维护时间"
        prop="instance_desc"
      >
        <div class="form-item-box">
          <span>工作日</span>
          <el-date-picker
            v-model="date"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="form-item-box">
          <span>节假日</span>
          <el-date-picker
            v-model="date"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择RTO', trigger: 'change' }]"
        label="RTO"
        prop="instance_desc"
      >
        <el-radio-group v-model="db_version" >
          <el-radio-button label="15分钟" />
          <el-radio-button label="30分钟" />
          <el-radio-button label="1小时" />
          <el-radio-button label="2小时" />
          <el-radio-button label="3小时" />
          <el-radio-button label="6小时" />
          <el-radio-button label="24小时" />
        </el-radio-group>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择RPO', trigger: 'change' }]"
        label="RPO"
        prop="instance_desc"
      >
        <el-radio-group v-model="db_version" >
          <el-radio-button label="1分钟" />
          <el-radio-button label="5分钟" />
          <el-radio-button label="30分钟" />
          <el-radio-button label="1小时" />
          <el-radio-button label="12小时" />
          <el-radio-button label="24小时" />
          <el-radio-button label="7天" />
        </el-radio-group>
      </el-form-item>
    </div>
    
    <!--相关负责人-->
    <div class="section-box">
      <div class="section-title">
        <span class="block"/>
        <span class="text">相关负责人</span>
      </div>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择业务负责人', trigger: 'change' }]"
        label="业务负责人"
        prop="instance_name"
      >
        <el-select
          v-model="business"
          placeholder="请选择"
        >
          <el-option
            label="测试系统一"
            value="2"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择开发负责人', trigger: 'change' }]"
        label="开发负责人"
        prop="instance_desc"
      >
        <el-select
          v-model="business"
          placeholder="请选择"
        >
          <el-option
            label="测试系统一"
            value="2"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择开发室经理', trigger: 'change' }]"
        label="开发室经理"
        prop="instance_desc"
      >
        <el-select
          v-model="business"
          placeholder="请选择"
        >
          <el-option
            label="测试系统一"
            value="2"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择系统负责人', trigger: 'change' }]"
        label="系统负责人"
        prop="instance_desc"
      >
        <el-select
          v-model="business"
          placeholder="请选择"
        >
          <el-option
            label="测试系统一"
            value="2"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item
        :rules="[{ required: true, message: '请选择推荐管理员', trigger: 'change' }]"
        label="推荐管理员"
        prop="instance_desc"
      >
        <div class="form-item-box">
          <span>系统管理员</span>
          <el-select
            v-model="business"
            placeholder="请选择"
          >
            <el-option
              label="测试系统一"
              value="2"
            />
          </el-select>
        </div>
  
        <div class="form-item-box">
          <span>数据库管理员</span>
          <el-select
            v-model="business"
            placeholder="请选择"
          >
            <el-option
              label="测试系统一"
              value="2"
            />
          </el-select>
        </div>
      </el-form-item>
    </div>
  
  </el-form>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import fieldsConfig from '../fields-config'

export default {
  name: 'CreateForm',
  
  components: {},
  
  props: {},
  
  data() {
    return {
      date: ''
    }
  },
  
  computed: {
    ...fieldsConfig,
    ...mapGetters('built', ['createMysqlFormData'])
  },
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cloud-form {
  background: white;
  min-height: 190px;
  overflow-y: auto;
  padding: 15px 10px;
  /deep/ .el-form-item__label {
    color: $textLevelC;
    font-weight: 500;
  }
  /deep/ .el-form-item__content {
    color: $textLevelB;
  }
  .indent-error-form-item {
    /deep/ .el-form-item__error {
      left: 17px;
    }
  }
  .span-render {
    height: 20px;
    line-height: 20px;
    color: $textLevelD;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .input-render {
    margin-top: 20px;
  }
  .section-title {
    padding-bottom: 20px;
    font-weight: 600;
    padding-top: 30px;
    .block {
      display: inline-block;
      width: 4px;
      height: 14px;
      margin-right: 10px;
      background-color: $textNewChecked;
    }
  }
  .disk-item{
    width: 80%;
    /deep/ .el-input{
      width: auto;
    }
  }
  .form-item-box{
    margin-bottom: 20px;
  }
}
</style>
