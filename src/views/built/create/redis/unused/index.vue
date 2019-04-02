<!--
  @author:  lzc
  @date:    2019-01-24
  @desc:    创建MySQL实例
  @require:
-->
<template>
  <div class="create-wrapper">
    <cloud-back
      title="新建MySQL实例"
    />
    <div class="content-wrapper">
      <div class="create-box">
        <CreateForm />
      </div>
      
      <CloudAffix :offset-top="130">
        <div class="view-box">
          <div class="title-text">当前配置</div>
          <div class="info-box">
            <ViewInfo />
          </div>
          <div class="btn-box">
            <el-button
              type="primary"
              class="confirm-btn"
              @click="confirm"
            >提交订单</el-button>
          </div>
        </div>
      </CloudAffix>
    </div>
  </div>
</template>

<script src="./create.js" />

<style
  src="./create.scss"
  lang="scss"
  scoped
/>
