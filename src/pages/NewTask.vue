<template>
    <div @keyup.esc="goBack">
      <button @click="submitTask"> V </button>
      <h1>new task</h1>
      <span>מה יש לך לעשות?</span>
      <input placeholder="שם המשימה" :value="task.fetch('description')" name="description" @input="updateValue" />
      <span class="error">{{task.fetchError('description')}}</span>
      <span>למתי זה?</span>
      <input placeholder="!תבחר תאריך. לא חובה" :value="task.fetch('deadline')" name="deadline" type="date" @input="updateValue"/> 
    </div>
  </template>
  
  <script>
  import form from '../common/Form.js'
  export default {
    name: 'TaskView',
    data() {
        return {
            task: new form({description: '', deadline: undefined}),
        }
    },
    methods: {
        submitTask() {
            if (this.task.fetch('description')) {
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
    span {
        display: inline-block;
    }
    .error {
        color: red
    }
  </style>
  