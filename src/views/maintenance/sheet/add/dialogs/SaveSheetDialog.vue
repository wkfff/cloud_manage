<!--
  @author:  Daniel
  @date:    2019-01-24
  @desc:    保存工单
  @require:
-->
<template>
  <el-dialog title="保存工单信息" :visible.sync="show" :close-on-click-modal="false" width="600px">
    <div class="content">
      <div class="mgb-20">确定仅保存工单信息，暂不提交工单吗？</div>
      <div class="mgb-20 zhushi">温馨提示：保存后，前往“查询工单”，可查看并继续填写工单。</div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="show = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import DialogMixin from "@/mixins/DialogMixin";
import { SAVE_WORK_ORDER } from "@/api/worksheet";
import { mapMutations } from "vuex";

export default {
  name: "SaveSheetDialog",

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
      try {
        const { p_id, m_id } = this.$route.query;
        const values = {
          ...this.$store.state.worksheet.formData,
          product: p_id,
          handle_type: m_id
        };
        const res = await this.$ajax.post(SAVE_WORK_ORDER, values);
        if (res.code === 0) {
          const { orderId = 0 } = res.data;
          this.UPDATE_FORMDATA_OTHER({
            type: "id",
            payload: {
              id: orderId
            }
          });
          this.$message({
            message: "工单保存成功！",
            type: "success"
          });
          this.$router.push("/maintenance/search/list");
          // this.RESET();
        }
      } catch (e) {
        console.log(e);
      }
    },
    handleAddItem() {}
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
