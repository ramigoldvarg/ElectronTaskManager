<template>
    <div class="wrapper">
      <div class="uncompleted-counter">
        <b>{{uncompletedTasks.length}}</b> משימות
      </div>
      <button class="btn-add" @click="navigate">+</button>
      <div class="task-lists">
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
    .task-lists {
      margin-top: 29px;
    }  
    li {
      display: inline-block;
      margin: 0 10px;
    }
    .btn-add {
      border-radius: 50%;
      color: white;
      background-color: #f44336;
      border-color: rgba(0,0,0,0);
      width: 50px;
      height: 50px;
      font-size: 30pt;
      position: relative;
      margin-top: -26px;
      float: left;
      margin-left: 10px;
    }
    .btn-add:hover {
      cursor: pointer;
      background-color: #e53935
    }
    .btn-add:focus {
      outline: transparent
    }
    .uncompleted-counter {
      position: relative;
      margin-top: -72px;
      float: left;
      margin-left: 10px;
      opacity: 0.7
    }
    .wrapper {
      position: relative;
    }
  </style>
  <style>
    .urgent .task-text {
      color: #b71c1c;
    }
    span:last-child .task-item:last-child {
        border-bottom: none
    }
  </style>