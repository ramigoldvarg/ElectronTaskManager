<template>
        <li :class="{ 'done-task': task.done }" :draggable="!task.done" @dragstart="drag" @dragover="tryToAllowDrop" @drop="drop">
            <span class="task-content">
                <input type="checkbox" :checked="task.done" @click="updateTask"/>
                <span>
                    <span class="task-text" v-if="!editMode">
                        {{task.description}}
                    </span>
                    <input v-else type="text" :value="task.description" @input="updateTaskText" @focusout="editMode = false"/>
                </span>
                <span class="edit" @click="editMode = !editMode">
                    <span v-if="editMode">
                        done
                    </span>
                </span>
            </span>
            <span class="task-manage">
                <option-menu :options="options"></option-menu>
                <span v-if="!task.done" class="drag-item fa fa-bars">
                </span>
            </span>
        </li>
      </template>
      
<script>
import OptionMenu from './OptionMenu.vue'
import {mapActions} from 'vuex'
import {urgentFactor} from '../store/index.js'
import moment from 'moment'

export default {
    name: 'SingleTask',
    data() {
        return {
            editMode: false,
            options: [
                {
                    "title": "עריכה",
                    "action": this.setEditMode
                },
                {
                    "title": "מחיקה",
                    "action": this.removeTask
                }
            ]
        }
    },
    props: ['task'],
    components: {
        "option-menu": OptionMenu
    },
    methods: {
        ...mapActions(["switchTasks"]),
        removeTask() {
            this.$emit("removeTask", this.task.id)
        },
        setEditMode() {
            this.editMode = !this.editMode
        },
        updateTask() {
            this.$emit("updateTask", this.task.id);
        },
        updateTaskText(event) {
            if (event.keyCode == 27) {
                this.editMode = false;
                return;
            }

            this.$emit("updateText", {id:this.task.id, text:event.target.value})
        },
        tryToAllowDrop(event) {
            if (!this.task.done) {
                event.preventDefault();
            }
        },
        drag(event) {
            event.dataTransfer.setData("task", JSON.stringify(this.task));
        },
        drop(event) {
            event.preventDefault();
            const sourceTask = JSON.parse(event.dataTransfer.getData("task"))

            if (this.task.id != sourceTask.id) {
                if ((new moment(this.task.deadline).diff(new moment(), "days") > -urgentFactor && 
                     new moment(sourceTask.deadline).diff(new moment(), "days") > -urgentFactor) || 
                    (new moment(this.task.deadline).diff(new moment(), "days") <= -urgentFactor && 
                     new moment(sourceTask.deadline).diff(new moment(), "days") <= -urgentFactor))  {
                    this.switchTasks({"src": {...JSON.parse(event.dataTransfer.getData("task"))}, "dest": {...this.task}})
                }
            }
        }
    }
}
</script>

<style scoped>
    li {
        display: grid;
        grid-template-columns: 80% 20%;
        grid-template-rows: 100%;
        padding: 0.5em 1em;
    }
    li .task-content {
        grid-column: 1;
        text-align: right;
        font-size: 16pt
    }
    li .task-manage {
        grid-column: 2;
        text-align: left;
        display: grid;
        grid-template-columns: 50% 50%
    }
    .done-task .task-text {
        opacity: 0.5;
        color: gray;
        text-decoration: line-through;
    }
    .drag-item {
        width: 2em;
        height: 0.1em;
        opacity: 0.5;
    }
    .drag-item:hover {
        cursor: -webkit-grab
    }
    input[type='checkbox'] {
        /* opacity: 0; */
        -webkit-appearance: checkbox;
        box-sizing: border-box;
    }
</style>
