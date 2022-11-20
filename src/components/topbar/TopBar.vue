<template>
  <el-affix style="" :offset="0" :style="{width: '100%', boxShadow: `var(--el-box-shadow)`}">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#fb7299"
        text-color="#fff"
        active-text-color="#FFDD72FF"
        :ellipsis="false"
        @select="handleSelect"
    >
      <el-sub-menu index="1">
        <template #title>偶像专区</template>
        <el-menu-item index="1-1">男星区</el-menu-item>
        <el-menu-item index="1-2">女星区</el-menu-item>
        <el-menu-item index="1-3">素人区</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="2">体育区</el-menu-item>

      <div class="flex-grow" />

      <el-menu-item index="3">fans商城</el-menu-item>
      <el-menu-item index="4">消息</el-menu-item>
      <el-menu-item index="5">会员中心</el-menu-item>
      <li class="li-wapper" index="6">
        <el-button @click="dialogTableVisible = true" color="#ffe250" style="color: #fb7299"><span style="font-weight: bold">注册登录</span></el-button>
      </li>
    </el-menu>
  </el-affix>

  <el-dialog v-model="dialogTableVisible" width="620" style="border-radius: 8px">
    <Register></Register>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import Register from '../login'

let dialogTableVisible = ref(false);

const activeIndex = ref()
const handleSelect = (key: String, keyPath: String[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.li-wapper {
  display: flex;
  place-items: center;
}

.li-wapper button {
  margin: 0 10px 0 10px;
}

.el-dialog__body {
  padding: 0 0 25px 0 !important;
}
</style>