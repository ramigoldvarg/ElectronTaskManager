<template>
    <div @keydown.esc="goBack">
      
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'TaskView',
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
  