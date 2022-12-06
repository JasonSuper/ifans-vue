<template>
  <StoreTopBar ref="stb"></StoreTopBar>

  <router-view></router-view>
</template>

<script lang="ts" setup>
import StoreTopBar from '@/components/Topbar/StoreTopBar.vue';
</script>