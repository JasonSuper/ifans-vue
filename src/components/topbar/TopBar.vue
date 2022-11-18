<template>
  <el-affix style="width: 100%;" :offset="0">
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
      <li class="li-wapper" index="6"><el-button type="warning" plain>注册登录</el-button></li>
    </el-menu>
  </el-affix>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'

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
</style>