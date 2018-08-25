<template>
    <div>
        <div>
            <button @click="submitTask"> V </button>
        </div>
        <center>
            <span>מה יש לך לעשות?</span>
            <input placeholder="שם המשימה" :value="task.fetch('description')" name="description" @input="updateValue" />
            <span class="error">{{task.fetchError('description')}}</span>
            <span>למתי זה?</span>
            <input placeholder="!תבחר תאריך. לא חובה" :value="task.fetch('deadline')" name="deadline" onfocus="this.type='date'" @input="updateValue"/> 
        </center>
    </div>
  </template>
  
  <script>
  import form from '../common/Form.js'
  import { mapActions } from 'vuex'

  export default {
    name: 'TaskView',
    data() {
        return {
            task: new form({description: '', deadline: undefined}),
        }
    },
    methods: {
        ...mapActions(['addTaskToList']),
        submitTask() {
            if (this.task.fetch('description')) {
                this.addTaskToList(this.task.fetchData())
                this.$router.push('/')
            } else {
                this.task.updateError('description', 'שכחת למלא את המשימה');
            }
        },
        updateValue(event) {
            this.task.updateValue(event.target.name, event.target.value);
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    span,input {
        display: block;
        margin: 5px
    }
    .error {
        color: red
    }
  </style>
  