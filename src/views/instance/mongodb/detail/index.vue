<!--
  @author:  lzc
  @date:    2019-01-25
  @desc:    xx->xx
  @require:
-->
<template>
  <div>
    <cloud-back
      :title="instanceName"
    />
    <div class="cmp-wrapper">
      <div class="content-box">
        <!--基本信息-->
        <BasicInfo
          :fields-values="detailData"
          @update="getDetail"
        />
        
        <!--配置信息-->
        <ConfigInfo
          :fields-values="detailData"
        />
        
        <!--维护信息-->
        <MaintainInfo
          :fields-values="detailData"
          @update="getDetail"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CloudBack from '@/components/CloudBack'
import BasicInfo from './components/BasicInfo'
import ConfigInfo from './components/ConfigInfo'
import MaintainInfo from './components/MaintainInfo'
import { GET_MONGODB_DETAIL } from '@/api/instance'

export default {
  name: 'MongodbDetail',
  
  components: {
    CloudBack,
    BasicInfo,
    ConfigInfo,
    MaintainInfo
  },
  
  created() {
    this.getDetail()
  },
  
  data() {
    return {
      detailData: {},
      instanceName: '实例详情'
    }
  },
  
  methods: {
    async getDetail() {
      const { id } = this.$route.params
      const res = await this.$ajax.get(GET_MONGODB_DETAIL, '', [id])
      this.detailData = res.data
      this.instanceName = res.data && res.data.display_name
      console.log('详情==>', res)
    }
  }
}
</script>

<style lang="scss" scoped>
.cmp-wrapper {
  margin: 20px;
  .content-box {
    background-color: #fff;
    padding: 20px;
  }
}
</style>
