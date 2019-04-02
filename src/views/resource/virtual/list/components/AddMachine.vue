<!--
  @author:  lzc
  @date:    2019-01-18
  @desc:    添加机器
  @require:
-->
<template>
  <el-dialog
    title="添加虚拟机"
    :visible.sync="show"
    :close-on-click-modal="false"
    width="600px">
    
    <div class="content">
      <div class="tip">
        请点击
        <a
          class="text-active"
          href="/excels/virtual_machine_template.xlsx"
          type="ghost">下载模板</a>，填写后上传导入。
      </div>
      <div class="upload-box">
        <el-upload
          ref="upload"
          drag
          class="upload"
          action="*"
          :file-list="fileList"
          :multiple="false"
          :auto-upload="false"
          :http-request="upload"
          :on-change="changeUpload"
          :accept="'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'">
          <i class="icon-upload el-icon-upload"/>
          <div class="el-upload__text">将文件拖到此处，或
            <a class="text-active" href="#">点击上传</a>
          </div>
        </el-upload>
      </div>
    </div>
    
    <div
      slot="footer"
      class="dialog-footer">
      <DelayButton
        ref="confirmBtn"
        :disabled="fileList.length === 0"
        type="primary"
        delayPlaceholder="提交中"
        @click="confirm">
        确 定
      </DelayButton>
      <el-button
        @click="show = false">取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import DialogMixin from '@/mixins/DialogMixin'
import DelayButton from '@/components/DelayButton/index.vue'
import { UPLOAD_VIRTUAL_IMPORT } from '@/api/resource'

export default {
  name: 'AddMachine',
  
  components: {
    DelayButton
  },
  
  mixins: [DialogMixin],
  
  props: {},
  
  data() {
    return {
      fileList: [],
      file: null
    }
  },
  
  computed: {},
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    confirm() {
      this.$refs.upload.submit()
    },
    
    async upload({ file }) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await this.$ajax.upload(UPLOAD_VIRTUAL_IMPORT, formData)
        this.$message({
          message: '导入成功',
          type: 'success'
        })
        this.$emit('success')
        this.show = false
      } catch (e) {
        this.$refs.confirmBtn.clear()
        console.error(e)
      }
    },
    /**
     * 上传一个
     * @param file
     * @param fileList
     */
    changeUpload(file, fileList) {
      this.fileList = fileList.slice(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-box {
  padding-top: 15px;
  /deep/ .el-upload {
    width: 100%;
  }
  /deep/ .el-upload-dragger {
    width: 100%;
  }
  /deep/ .el-upload-dragger:hover {
    .el-icon-upload {
      color: $textRunning;
    }
  }
}

.upload {
  width: 100%;
  /deep/ .el-upload-dragger {
    height: 100px;
  }
  /deep/ .el-upload-dragger .el-icon-upload {
    margin: 0;
    font-size: 28px;
    margin-top: 5px;
  }
  /deep/ .el-upload-list__item {
    outline: none;
  }
}
</style>
