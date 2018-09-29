<template>
  <div id="app">
    <div class="header">
      <h1>
        יום {{dayOfTheWeek}} 
      </h1>
      <div>
        {{dateOfMonth}} ב{{displayMonth}}
      </div>
      </hr>
    </div>
    <router-view class="app-body"/>
  </div>
</template>

<script>
  import moment from 'moment'
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'App',
    created() {
      this.loadTasks();
    },
    mounted() {
      window.addEventListener("keydown", this.goBack)
      setTimeout(this.switchDay, moment([this.today.year(), this.today.month(), this.today.date() + 1]).diff(this.today))
    },
    methods: {
      ...mapActions(['loadTasks', 'updateDay']),
      goBack(e) {
        e.keyCode == 27 && this.$router.push("/")
      },
      switchDay() {
        this.updateDay()
        this.interval = setInterval(this.updateDay, 24 * 60 * 60 * 1000)
      }
    },
    destroyed() {
      this.interval && clearInterval(this.interval);
    },
    computed: {
      ...mapState(['today']),
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
    background-color: #eceff1;
    margin: 0;
    padding: 0 1em;
    grid-column: 1;
    grid-row-start: 1;
    display: grid;
    grid-template-columns: 80% 20%;
    grid-template-rows: 50% 50%;
    border-bottom: 2px solid #e0e0e0;
  }
  .header h1 {
    grid-row: 1;
    text-align: right;
    color: #651fff;
  }
  .header div {
    grid-row: 2;
    text-align: right;
    margin-top: 0;
    opacity: 0.7;
    font-size: 14pt
  }
  .app-body {
    grid-row: 2;
  }
  div {
    direction: rtl
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  margin: 0;
  display:  grid;
  grid-template-columns: 100%;
  grid-template-rows: 15% auto
}
body,h1 {
  margin: 0
}
li {
  list-style-type: none
}
</style>
