import Vue from 'vue'
import Router from 'vue-router'
import TaskView from '../pages/TaskView.vue'
import Stat from '../pages/NewTask.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'TaskView',
    component: TaskView,
  },
  {
    path: '/Statistics',
    name: 'Stats',
    component: Stat
  }
]

export const routesconfig = routes;

export default new Router({
  routes
})
