<template>
  <el-dialog title="编辑调度任务" :visible.sync="dialogProps.visible" @closed="closeDialog" width="550px">
    <el-form :model="formProps" ref="scheduleForm" :rules="formRules" label-width="70px">
      <el-form-item label="任务名称"  prop="job_desc">
        <el-input v-model="formProps.job_desc" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="Cron"  prop="job_cron">
        <el-input v-model="formProps.job_cron"></el-input>
      </el-form-item>
      <el-form-item label="任务类型" prop="executor_handler">
        <el-select v-model="formProps.executor_handler" placeholder="请选择任务类型" style="width: 100%">
          <el-option label="实例监控" value="instanceMonitorJobHandler"></el-option>
          <el-option label="清理日志" value="clearJobLogHandler"></el-option>
          <el-option label="工单监控" value="workOrderMonitorHandler"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="comment">
        <el-input type="textarea" v-model="formProps.comment"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import { GET_SCHEDULE_JOB_DETAIL, UPDATE_SCHEDULE_JOB,ADD_SCHEDULE_JOB} from '@/api/schedule'
    export default {
      name: "DialogForm",
      data () {
        let formProps = this.resetFields();
        let validateJobDesc = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('任务名称不能为空'));
          } else {
            callback();
          }
        };

        const dialogProps = {
          visible:false
        };
        const formRules = {
          job_desc: [
            { validator: validateJobDesc, trigger: 'blur' }
          ],
        }
        return {
          formProps,
          dialogProps,
          formRules
        }
      },
      methods: {
        closeDialog(scheduleForm) {
          this.formProps = this.resetFields();
        },
        cancel(){
          this.dialogProps.visible = false;
        },
        resetFields() {
          return {
            id:'',
            job_desc: '',
            job_cron: '',
            executor_handler:'instanceMonitorJobHandler',
            executor_param:'',
            comment: '',
            classify: 2
          }
        },
        async getScheduleDetail(jobCode,operate) {
          if(operate == 'update') {
            const res = await this.$ajax.get(GET_SCHEDULE_JOB_DETAIL, '', [jobCode]);
            this.formProps = res.data;
          }
          this.dialogProps.visible = true;
        },
        async confirm() {
          let id = this.formProps.id;
          if(id) {
            const res = await this.$ajax.patch(UPDATE_SCHEDULE_JOB, this.formProps, [id]);
            this.dialogProps.visible = false;
            this.$emit("handle-reload");
          } else {
            const res = await this.$ajax.post(ADD_SCHEDULE_JOB, this.formProps, [id]);
            this.dialogProps.visible = false;
            this.$emit("handle-reload");
          }
        }
      }
    }
</script>
