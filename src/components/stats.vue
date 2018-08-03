<template>
        <span>
          <h1>Stats</h1>
          <div>
              completed: {{completedTasks.length}}
          </div>
          <div>
                not completed yet: {{uncompletedTasks.length}}
            </div>
        </span>
</template>
      
<script>
    import {mapGetters} from 'vuex';
export default {
    name: 'Stat',
    computed: {
        ...mapGetters(['uncompletedTasks', 'completedTasks'])
    }
}
</script>