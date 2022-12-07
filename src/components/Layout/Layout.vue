<template>
  <TopBar></TopBar>

  <div class="content">
    <RouterView/>
  </div>
</template>

<script lang="ts" setup>
import TopBar from '@/components/Topbar/TopBar.vue'
</script>

<style>
.content {
  width: 100%;
}
</style>