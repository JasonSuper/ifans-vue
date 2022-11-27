<template>
  <TopBar></TopBar>

  <div class="content">
    <RouterView/>
  </div>
</template>

<script lang="ts" setup>
import TopBar from '@/components/topbar/TopBar.vue'
</script>

<style>
.content {
  margin-top: 1.5rem;
}
</style>