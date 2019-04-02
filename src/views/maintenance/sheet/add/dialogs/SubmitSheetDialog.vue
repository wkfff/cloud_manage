<!--
  @author:  Daniel
  @date:    2019-01-24
  @desc:    提交工单
  @require:
-->
<template>
  <el-dialog title="提交工单" :visible.sync="show" :close-on-click-modal="false" width="600px">
    <div class="content">
      <div class="mgb-20">确定提交工单吗？</div>
      <div class="mgb-20">提示：</div>
      <ol>
        <li>请确保工单信息的准确性，以免影响运维处理进度。</li>
        <li>提交订单后，可前往“查询工单”，查看工单处理情况。</li>
      </ol>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="show = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import DialogMixin from "@/mixins/DialogMixin";
import { ADD_WORK_ORDER, SAVE_WORK_ORDER } from "@/api/worksheet";
import { mapMutations } from "vuex";

export default {
  name: "SubmitSheetDialog",

  components: {},

  mixins: [DialogMixin],

  props: {},

  data() {
    return {};
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapMutations("worksheet", ["RESET", "UPDATE_FORMDATA_OTHER"]),
    async handleSubmit() {
      const { p_id, m_id } = this.$route.query;
      const values = {
        ...this.$store.state.worksheet.formData,
        product: p_id,
        handle_type: m_id
      };

      const res = await this.$ajax.post(SAVE_WORK_ORDER, values);
      if (res.code === 0) {
        const { orderId = 0 } = res.data;
        // 如果保存成功记录IDx下次就不用了继续调接口了
        this.UPDATE_FORMDATA_OTHER({
          type: "id",
          payload: {
            id: orderId
          }
        });
        const res1 = await this.$ajax.post(ADD_WORK_ORDER, {}, [orderId]);
        if (res1.code === 0) {
          this.$message({
            message: "工单提交成功！",
            type: "success"
          });
        }
      }
      this.$router.push("/maintenance/search/list");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  padding: 0 20px;
  .zhushi {
    color: $textLevelD;
  }
}
</style>
