<template>
  <div>
    <h1>{{msg}}</h1>
    <input type="text" v-model="taskToAdd"/> 
    <input type="date" v-model="deadline" />
    <span class="btn-add" @click="onAdd">+</span>
    <div >
      <task-list class="tasklists" :tasks="completedTasks" :updateTextHandler='updateTaskText' :removehandler="removeTask" :updatehandler="updateTask"><h2 class="completed">completed</h2></task-list>
      <task-list class="tasklists" :tasks="uncompletedTasks" :updateTextHandler='updateTaskText' :removehandler="removeTask" :updatehandler="updateTask"><h2 class="not-completed">not completed</h2></task-list>
      <task-list class="tasklists" :tasks="urgent" :updateTextHandler='updateTaskText' :removehandler="removeTask" :updatehandler="updateTask"><h2 class="urgent">urgent</h2></task-list>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'
  import TaskList from './tasklist.vue'
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
    onAdd() {
      if (!this.taskToAdd) {
        alert("cannot be empty")
        return;
      }

      this.addTaskToList({
                text: this.taskToAdd,
                done: false,
                startdate: new moment(),
                deadline: this.deadline ? moment(this.deadline) : this.deadline
            });
      this.taskToAdd = '';
      this.deadline = new moment().format(momentFormat);
    }
  },
  computed: {
    ...mapState(['tasks']),
    ...mapGetters(['completedTasks', 'uncompletedTasks', 'urgent']),
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
