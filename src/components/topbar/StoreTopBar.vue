<template>
  <el-affix style="" :offset="0" :style="{width: '100%', boxShadow: `var(--el-box-shadow)`}">
    <div class="ifans-store-header-bar">

      <div class="ifans-store-header-item">
        <el-link href="/" type="info" :underline="false">主站</el-link>
      </div>

      <div>
        <el-input
            v-model="searchtext"
            placeholder="查找你的宝贝"
            class="input-with-select"
        >

          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>

      <div class="ifans-store-header-item">
        <AvatarPopover v-if="userStore.token != null && userStore.token != ''"></AvatarPopover>
        <div v-else class="ifans-store-header-item">
          <el-link @click="openDialog" :underline="false">注册|登录</el-link>
        </div>
      </div>

      <div class="ifans-store-header-item">
        <el-link :underline="false">订单中心</el-link>
      </div>
    </div>
  </el-affix>

  <LoginDialog ref="sonLoginDialog"></LoginDialog>
</template>

<script lang="ts" setup>
import LoginDialog from '@/components/login/LoginDialog.vue'
import AvatarPopover from '@/components/avatar/AvatarPopover.vue'
import { Search } from '@element-plus/icons-vue'
import {getCurrentInstance, ref} from 'vue'
import useUserStore from "@/stores/user";
import {useRouter} from "vue-router";

const userStore = useUserStore()
const router = useRouter()

// 调用函数，获取当前组件的实例proxy，这里的proxy类似于vue2中的this
const {proxy}: any = getCurrentInstance()

const openDialog = () => proxy.$refs['sonLoginDialog'].open()

const searchtext = ref("")
</script>

<style>
.ifans-store-header-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 59px;
  background: #fb7299;
}

.ifans-store-header-item {
  margin: 0 1rem 0 1rem;
}

.ifans-store-header-item a {
  color: #fff;
}

.el-link {
  --el-link-font-size: var(--el-font-size-base);
  --el-link-font-weight: var(--el-font-weight-primary);
  --el-link-text-color: var(--el-text-color-regular);
  --el-link-hover-text-color: #fff;
  --el-link-disabled-text-color: var(--el-text-color-placeholder);
}

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>