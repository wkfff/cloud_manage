<!--
  @author:  lzc
  @date:    2019-01-24
  @desc:    创建MySQL实例, 未封装完成，时间不够，后续优化
  @require:
-->
<template>
  <div class="create-wrapper">
    <cloud-back
      title="新建MySQL实例"
    />
    <div class="content-wrapper">
      <div class="create-box">
        <div class="create-form-box">
          <CloudForm
            ref="createForm"
            :fields="formFields"
            :config="formConfig"
          />
        </div>
      </div>
      <CloudAffix :offset-top="110">
        <div class="view-box">
          <div class="title-text">当前配置</div>
          <div class="info-box">
            <ViewInfo
              :instance-type="instanceType"
              :rpo-obj="rpoObj"
              :rto-obj="rtoObj"
              :system-lists="systemLists"
              :project-lists="projectLists"
            />
          </div>
          <div class="btn-box">
            <el-button
              type="primary"
              class="confirm-btn"
              @click="submitForm"
            >提交订单
            </el-button>
            <el-button
              class="confirm-btn"
              @click="saveForm"
            >保存订单
            </el-button>
          </div>
        </div>
      </CloudAffix>
    </div>
    
    <!--确定提交提示-->
    <el-dialog
      :title="isSave ? '保存订单信息' : '提交订单'"
      :visible.sync="dialogVisible"
      width="500px">
      <div class="content">
        <div v-if="isSave">
          <p>确定仅保存订单信息，暂不提交订单吗？</p>
          <p>温馨提示：保存后，前往“查询订单”，可查看并继续填写订单。</p>
        </div>
        <div v-else>
          <p>确定提交订单吗？</p>
          <p>温馨提醒：提交订单后，前往“查询订单”页面，可查看订单情况。</p>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogVisible = false">取 消
        </el-button>
        <DelayButton
          ref="confirmBtn"
          type="primary"
          delayPlaceholder="提交中"
          @click="confirmSubmitForm">
          确 定
        </DelayButton>
      </div>
    </el-dialog>
  </div>
</template>

<script
  src="./create.js"
  type="text/jsx"
/>

<style
  src="./create.scss"
  lang="scss"
  scoped
/>
