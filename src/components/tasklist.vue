<template>
        <span>
          <slot class="heading"> </slot>
          <ul>
              <single-task class="task-item" v-for="task in tasks" :key="task.id" :task="task" @updateText='onUpdateText' @removeTask='onRemove' @updateTask='onUpdate'>

              </single-task>
          </ul>
        </span>
</template>
      
<script>

    import SingleTask from './SingleTask.vue'

export default {
    name: 'TaskList',
    props: ['tasks', 'removehandler', 'updatehandler', 'updateTextHandler'],
    components: {
        'single-task': SingleTask,
    },
    methods: {
        onRemove(payload) {
            this.removehandler(payload);
        },
        onUpdate(payload) {
            this.updatehandler(payload)
        },
        onUpdateText(payload) {
            this.updateTextHandler(payload);
        }
    }
}
</script>

<style>
    .heading {
        position: static
    }
    ul {
        padding: 0;
        margin: 0
    }
    .task-item {
        border-bottom: 1px black
    }
</style>
      