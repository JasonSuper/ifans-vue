<template>
  <el-popover
      :width="200"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
  >
    <template #reference>
      <el-avatar shape="square" :src="userStore.avatar"/>
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
import {useRouter} from "vue-router";

const router = useRouter();

const userStore = useUserStore()

function logout() {
  console.log(userStore.avatar)
  userStore.logOut().then(() => {
    ElMessage.success("已登出");
    router.push({path: "/yingyuan"});
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