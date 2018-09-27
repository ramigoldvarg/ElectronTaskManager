<template>
    <div>
        <div>
            <button @click="$router.push('/')" class="fa fa-angle-right"></button>
            <button @click="submitTask" class="fa fa-check"></button>
        </div>
        <div class="container">
            <span>מה יש לך לעשות?</span>
            <input placeholder="שם המשימה" :value="task.fetch('description')" name="description" @input="updateValue" />
            <span class="error">{{task.fetchError('description')}}</span>
            <span>למתי זה?</span>
            <p>
                <input dir="rtl" timezone="GMT+3" placeholder="!תבחר תאריך. לא חובה" :value="task.fetch('deadline')" name="deadline" onfocus="this.type='date'" @input="updateValue"/> 
                <i onclick="document.querySelector('p>input').type='date';this.display='none'" class="fa fa-calendar-alt"></i>
            </p>
        </div>
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
    .error {
        color: red
    }
    .container {
        display: grid;
        font-size: 16pt
    }
    span,input {
        margin: 3px 15px;
    }
    span {
        font-weight: bold;
        opacity: 0.7
    }
    input {
        padding: 2px 5px;
        opacity: 0.8;
        font-size: 14pt;
        width: 85%
    }
    p {
        margin: 0;
        padding: 0
    }
    p>input {
        position: absolute
    }
    i {
        position: relative;
        z-index: 20;
        float: left;
        margin: 8px 35px;
    }
  </style>
  