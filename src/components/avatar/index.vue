<template>
  <el-popover
      :width="200"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
  >
    <template #reference>
      <el-avatar shape="square" :src="userStore.avatar ? userStore.avatar : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"/>
    </template>

    <template #default>
      <div class="popover-box">
        <el-button @click="logout" type="" text="plain">退出登录</el-button>
      </div>
    </template>
  </el-popover>
</template>


<script lang="ts" setup>
import {ElMessage} from 'element-plus'
import useUserStore from "@/stores/user";

const userStore = useUserStore()

function logout() {
  userStore.logOut().then(() => {
    ElMessage.info("已登出")
  });
}
</script>


<style>
.popover-box {
  width: 100%;
}

.popover-box button {
  width: 100%;
}
</style>