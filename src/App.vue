<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  
}
html{
  margin: 0px;
  padding: 0px;
  /* background-image:url('../public/imgs/login_bg.jpg') */
  /* height: auto!important; */
}
body{
  width:100%;
  height:100%;
  /* height: 800px; */
}
*{
  padding: 0px;
  margin: 0px;
}
</style>
