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

      <el-menu-item index="1">首页</el-menu-item>
      <el-sub-menu index="2">
        <template #title>偶像专区</template>
        <el-menu-item index="2-1">男星区</el-menu-item>
        <el-menu-item index="2-2">女星区</el-menu-item>
        <el-menu-item index="2-3">素人区</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="3">排行榜</el-menu-item>

      <div class="flex-grow"/>

      <el-menu-item index="4">fans商城</el-menu-item>
      <el-menu-item index="5">消息</el-menu-item>
      <el-menu-item index="6">会员中心</el-menu-item>

      <li class="li-wapper" index="7">
        <AvatarPopover v-if="userStore.token != null && userStore.token != ''"></AvatarPopover>
        <el-button v-else @click="handleLogin" color="#ffe250" style="color: #fb7299"><span style="font-weight: bold">注册登录</span>
        </el-button>
      </li>
    </el-menu>
  </el-affix>
</template>

<script lang="ts" setup>
import AvatarPopover from '@/components/Avatar/AvatarPopover.vue'

import {getCurrentInstance, inject, ref, watch} from 'vue'
import useUserStore from "@/stores/user";
import {useRoute, useRouter} from "vue-router";

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

// 调用函数，获取当前组件的实例proxy，这里的proxy类似于vue2中的this
const {proxy}: any = getCurrentInstance()

const activeIndex = ref()
const handleSelect = (key: String, keyPath: String[]) => {
  switch (key) {
    case '1':
      router.push({path: '/'})
      break;
    case '3':
      router.push({path: '/rank'})
      break;
    case '4':
      router.push({path: '/store/home'})
      break;
    default:
      break;
  }
}

function handleLogin() {
  router.replace({
    name: "login",
    query: {
      redirect: router.currentRoute.value.fullPath // router对象自带的属性
    }
  })
}
</script>

<style>
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

.el-menu--horizontal > .el-menu-item.is-active {
  color: #fff !important;
  border-bottom: 0 !important;
}
</style>