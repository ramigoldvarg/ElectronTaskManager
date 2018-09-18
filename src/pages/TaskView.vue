<template>
    <div>
      <div>
        <b>{{uncompletedTasks.length}}</b> משימות
      </div>
      <button class="btn-add" @click="navigate">+</button>
      <div>
        <p v-if="uncompletedTasks.length === 0">וואו אין משימות, בטח משעמם לך..</p>
        <task-list :tasks="urgent" class="urgent" :updateTextHandler='updateTaskText' :removehandler="removeTask" :updatehandler="updateTask"></task-list>
        <task-list :tasks="notUrgent" :updateTextHandler='updateTaskText' :removehandler="removeTask" :updatehandler="updateTask"></task-list>
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
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: inline-block;
      margin: 0 10px;
    }

    .btn-add {
      border-radius: 50%;
      color: white;
      background-color: red 
    }
  </style>
  <style>
    .urgent .task-text {
      color: red;
    }
  </style>