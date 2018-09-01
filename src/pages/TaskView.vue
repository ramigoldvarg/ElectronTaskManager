<template>
    <div>
      <div>
        <b>{{uncompletedTasks.length}}</b> משימות
      </div>
      <button class="btn-add" @click="navigate">+</button>
      <div>
        <task-list :tasks="urgent" class="urgent" :updateTextHandler='updateTaskText' :removehandler="removeTask" :updatehandler="updateTask"></task-list>
        <task-list v-if="notUrgent.length != 0" :tasks="notUrgent" :updateTextHandler='updateTaskText' :removehandler="removeTask" :updatehandler="updateTask"></task-list>
        <task-list v-if="completedTasks.length != 0" :tasks="completedTasks" :updateTextHandler='updateTaskText' :removehandler="removeTask" :updatehandler="updateTask"></task-list>
      </div>
    </div>
  </template>
  
  <script>
    import {mapState, mapActions, mapGetters} from 'vuex'
    import TaskList from '../components/TaskList.vue'
    import moment from 'moment'
    
    const momentFormat = "MM/DD/YYYY";
  
  export default {
    name: 'TaskView',
    components: {
      'task-list': TaskList
    },
    data () {
      return {
        msg: 'Manage your tasks',
        taskToAdd: '',
        deadline: undefined,
      }
    },
    methods: {
      ...mapActions(['addTaskToList', 'removeTask', 'updateTask', 'updateTaskText']),
      navigate() {
        this.$router.push('/NewTask')
      }
    },
    computed: {
      ...mapState(['tasks']),
      ...mapGetters(['completedTasks', 'uncompletedTasks', 'urgent', 'notUrgent']),
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .tasklists {
      display: inline-block;
      vertical-align: top
    }
    .completed {
      color: green;
    }
    .not-completed {
      color: yellow
    }
  
    .urgent {
      color: red;
      font-weight: bold
    }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .btn-add {
    border-radius: 50%;
    color: white;
    background-color: red 
  }
  </style>
  