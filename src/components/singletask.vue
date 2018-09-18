<template>
        <li :class="{ 'done-task': task.done }" draggable="true">
            <input type="checkbox" :checked="task.done" @click="updateTask"/>
            <span>
                <span class="task-text" v-if="!editMode">
                    {{task.description}}
                </span>
                <input v-else type="text" :value="task.description" @input="updateTaskText" @blur="editMode = false"/>
            </span>
            <span class="edit" @click="editMode = !editMode">
                <span v-if="editMode">
                    done
                </span>
            </span>
            <option-menu :options="options"></option-menu>
            <span v-if="!task.done" class="drag-item">
                <hr/>
                <hr/>
                <hr/>
            </span>
        </li>
      </template>
      
<script>
import OptionMenu from './OptionMenu.vue'

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
        }
    }
}
</script>

<style scoped>
    span {
        display: inline-block
    }
    .done-task .task-text {
        opacity: 0.5;
        color: gray;
        text-decoration: line-through;
    }
    .drag-item {
        width: 2em;
        height: 0.1em
    }
    .drag-item:hover {
        cursor: move
    }
    
</style>