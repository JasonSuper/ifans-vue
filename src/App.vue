<template>
  <TopBar></TopBar>
  <div id="all">
    <div class="topbox">
      <img alt="ifans logo" class="logo" src="https://www.hjxsuper.top/img/ifans.png"/>
    </div>

    <header>
      <div class="wrapper">
        <HelloWorld msg="可乐要加冰，fans要用心"/>

        <nav>
          <RouterLink to="/">应援</RouterLink>
          <RouterLink to="/about">PK战斗</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView/>
  </div>
</template>


<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TopBar from './components/topbar/TopBar.vue'
</script>


<style scoped>
.topbox {
  display: flex;
  place-items: center;
  width: 100%;
  grid-area: topbox;
  height: 15rem;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  margin: 0 auto 2rem;
  padding-left: 1%;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  /*.logo {
    margin: 0 0rem 0 0;
  }*/
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
