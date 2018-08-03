<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link v-for="route in routesconfig" :to="route.path" :key="route.path">{{route.name}}</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import {routesconfig} from './router/index.js'

  export default {
    name: 'App',
    data() {
      return {
        routesconfig
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

li {
  list-style-type: none
}
</style>
