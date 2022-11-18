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
      <el-menu-item index="1">会员中心</el-menu-item>
      <el-sub-menu index="2">
        <template #title>偶像专区</template>
        <el-menu-item index="2-1">男星区</el-menu-item>
        <el-menu-item index="2-2">女星区</el-menu-item>
        <el-menu-item index="2-3">素人区</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3">消息</el-menu-item>
      <el-menu-item index="4">fans商城</el-menu-item>

      <div class="flex-grow" />

      <li class="li-wapper"><el-button type="warning" plain>注册登录</el-button></li>
    </el-menu>
  </el-affix>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'

const activeIndex = ref('1')
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