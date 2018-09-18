<template>
  <div id="app">
    <div class="header">
      <h1>
        יום {{dayOfTheWeek}} 
      </h1>
      <h3>
        {{dateOfMonth}} ב{{displayMonth}}
      </h3>
      </hr>
    </div>
    <router-view class="app-body"/>
  </div>
</template>

<script>
  import moment from 'moment'
  import { mapActions } from 'vuex'

  export default {
    name: 'App',
    data() {
      return {
        today: new moment(),
      }
    },
    created() {
      this.loadTasks()
    },
    mounted() {
      window.addEventListener("keydown", this.goBack)
    },
    methods: {
      ...mapActions(['loadTasks']),
      goBack(e) {
        e.keyCode == 27 && this.$router.push("/")
      }
    },
    computed: {
      dayOfTheWeek() {
        let currentDay = ""
        switch (this.today.day()) {
          case 0:
            currentDay = "ראשון"
            break;
          case 1:
            currentDay = "שני"
            break;
          case 2:
            currentDay = "שלישי"
            break;
          case 3:
            currentDay = "רביעי"
            break;
          case 4:
            currentDay = "חמישי"
            break;
          case 5:
            currentDay = "שישי"
            break;
          case 6:
            currentDay = "שבת"
            break;
        }

        return currentDay
      },
      displayMonth() {
        let currentMonth = ""

        switch (this.today.month()) {
          case 0:
            currentMonth = "ינואר"
            break;
          case 1:
            currentMonth = "פברואר"
            break;
          case 2:
            currentMonth = "מרץ"
            break;
          case 3:
            currentMonth = "אפריל"
            break;
          case 4:
            currentMonth = "מאי"
            break;
          case 5:
            currentMonth = "יוני"
            break;
          case 6:
            currentMonth = "יולי"
            break;
          case 7:
            currentMonth = "אוגוסט"
            break;
          case 8:
            currentMonth = "ספטמבר"
            break;
          case 9:
            currentMonth = "אוקטובר"
            break;
          case 10:
            currentMonth = "נובמבר"
            break;
          case 11:
            currentMonth = "דצמבר"
            break;
        }

        return currentMonth
      },
      dateOfMonth() {
        return this.today.date()
      }
    }
  }
</script>

<style>
  .header {
    background-color: #a0a0a0;
    width: 100%;
    margin: 0
  }
  div {
    direction: rtl
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0
}

.app-body {

}
body,h1 {
  margin: 0
}
li {
  list-style-type: none
}
</style>
