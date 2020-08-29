<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.05);
}
@import '@/assets/scss/init.scss';
@import '@/assets/scss/init-element.scss'
</style>
