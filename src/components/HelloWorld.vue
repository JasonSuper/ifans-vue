<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="flag">{{ msg }}</h1>
    <h3>
      世界上有三种美，外在美，内在美，还有只因你太美。
      <a href="javascript:void(0)" rel="noopener">早上好</a> +
      <a href="javascript:void(0)" rel="noopener">晚上好</a>. 还有全民制作人们大家好!
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.flag {
  background: linear-gradient(to left, #d37a83, #93de8c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
