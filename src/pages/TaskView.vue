<template>
    <div>
      <div>
        <b>{{uncompletedTasks.length}}</b> משימות
      </div>
      <router-link to="/NewTask">+</router-link>
      <span> {{files}} </span>
      <div>
        <task-list :tasks="uncompletedTasks" :updateTextHandler='updateTaskText' :removehandler="removeTask" :updatehandler="updateTask"></task-list>
        <task-list :tasks="completedTasks" :updateTextHandler='updateTaskText' :removehandler="removeTask" :updatehandler="updateTask"></task-list>
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
    },
    computed: {
      ...mapState(['tasks']),
      ...mapGetters(['completedTasks', 'uncompletedTasks', 'urgent', 'files']),
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .btn-add {
      color: green
    }
    .btn-add:hover {
      cursor: pointer
    }
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
      color: red
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
  </style>
  