<template>
  支付成功
  <el-button @click="goOrderIndex()">查看订单</el-button>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter();

function goOrderIndex() {
  router.push({path: '/store/order'})
}
</script>