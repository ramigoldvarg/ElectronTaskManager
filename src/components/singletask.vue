<template>
        <li :class="{ 'done-task': task.done }">
            <input type="checkbox" :checked="task.done" @click="updateTask"/>
            <span>
                <span v-if="!editMode">
                    {{task.description}}
                </span>
                <input v-else type="text" :value="task.description" @input="updateTaskText"/>
            </span>
            <span class="edit" @click="editMode = !editMode">
                <span v-if="editMode">
                    done
                </span>
                <span v-else>
                    edit
                </span>
            </span>
            <span class="btn-remove" @click="removeTask">
                X
            </span>
            <span class="drag-item">
                <hr/>
                <hr/>
                <hr/>
            </span>
        </li>
      </template>
      
<script>

export default {
    name: 'TaskList',
    data() {
        return {
            editMode: false,
        }
    },
    props: ['task'],
    methods: {
        removeTask() {
            this.$emit("removeTask", this.task.id)
        },
        updateTask() {
            this.$emit("updateTask", this.task.id);
        },
        updateTaskText(event) {
            this.$emit("updateText", {id:this.task.id, text:event.target.value})
        }
    }
}
</script>

<style scoped>
    .btn-remove {
        color: #ff0000
    }
    span {
        display: inline-block
    }
    .btn-remove:hover {
        cursor: pointer;
    }
    .edit {
        color: blue;
        border-bottom: 1px;
    }
    .done-task {
        opacity: 0.5;
        color: gray
    }
    .drag-item {
        width: 2em;
        height: 0.5em
    }
    .drag-item:hover {
        cursor: -webkit-grab
    }
</style>