<template>
  <RouterView/>
  <el-backtop :right="100" :bottom="100"/>
</template>


<script lang="ts" setup>
import {onUnmounted, ref} from "vue";
import { checkToken } from '@/api/login.js'
import useUserStore from '@/stores/user'

const userStore = useUserStore()

//刷新token锁
const refreshLock = ref(false);
//刷新token的时间
const refreshTime = ref();

onUnmounted(() => {
  clearInterval(refreshTime.value)
})

function refreshToken() {
  refreshTime.value = setInterval(() => {
    checkToken(refreshLock, userStore, refreshTime.value)
  }, 10000)
}

refreshToken();
</script>

<style>
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
  background: #ffe250;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
  border-radius: 10px;
  background: #ededed;
}
</style>