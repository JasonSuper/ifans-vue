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

      <div class="flex-grow"/>

      <el-menu-item index="3">fans商城</el-menu-item>
      <el-menu-item index="4">消息</el-menu-item>
      <el-menu-item index="5">会员中心</el-menu-item>

      <li class="li-wapper" index="6">
        <AvatarPopover v-if="userStore.token != null && userStore.token != ''"></AvatarPopover>
        <el-button v-else @click="openDialog" color="#ffe250" style="color: #fb7299"><span style="font-weight: bold">注册登录</span></el-button>
      </li>
    </el-menu>
  </el-affix>

  <LoginDialog ref="sonLoginDialog"></LoginDialog>
</template>

<script lang="ts" setup>
import LoginDialog from '@/components/login/LoginDialog.vue'
import AvatarPopover from '@/components/avatar/AvatarPopover.vue'

import {ref, onMounted, getCurrentInstance} from 'vue'
import useUserStore from "@/stores/user";
const userStore = useUserStore()

// 调用函数，获取当前组件的实例proxy，这里的proxy类似于vue2中的this
const {proxy}: any = getCurrentInstance()

const activeIndex = ref()
const handleSelect = (key: String, keyPath: String[]) => {
  console.log(key, keyPath)
}

const openDialog = () => proxy.$refs['sonLoginDialog'].open()
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.li-wapper {
  display: flex;
  place-items: center;
  margin: 0 2rem 0 1rem;
}

.li-wapper button {
  margin: 0 10px 0 10px;
}
</style>