import Vuex, {Store} from 'vuex';
import Vue from 'vue';
import moment from 'moment';

Vue.use(Vuex)

export default new Store({
    state: {
        tasks: [
            {
                id: 0,
                text: 'learn vue',
                done: false,
                startdate: new Date(),
                deadline: new Date(1534720907601)
            },
            {
                id: 2,
                text: 'learn react',
                done: false,
                startdate: new Date(-1),
                deadline: new Date(1530720907601)
            },
            {
                id: 3,
                text: 'learn moment',
                done: true,
                startdate: new Date(-1),
                deadline: new Date()
            },
        ]
    },
    getters: {
        completedTasks: ({tasks}) => tasks.filter(curr => curr.done),
        uncompletedTasks: ({tasks}) => tasks.filter(curr => !curr.done && new moment(curr.deadline).diff(new moment(), "days") > -3),
        urgent: ({tasks}) => tasks.filter(curr => !curr.done && new moment(curr.deadline).diff(new moment(), "days") < -3),
    },
    mutations: {
        addTaskToList({tasks}, task) {
            tasks.push(task)
        },
        removeTask(state, taskId) {
            state.tasks = state.tasks.filter(curr => curr.id != taskId);
        },
        updateTask({tasks}, taskId) {
            tasks.map(curr=> { curr.id === taskId && (curr.done = !curr.done) })
        },
        updateTaskText({tasks}, task) {
            tasks.map(curr=> { curr.id === task.id && (curr.text = task.text) })
        },
    },
    actions: {
        addTaskToList({commit, state}, payload) {
            const id = state.tasks.map(curr => curr.id).reduce((prev, next) => prev = next + 1);
            commit('addTaskToList', {...payload, id})
        },
        removeTask({commit}, payload) {
            commit('removeTask', payload);
        },
        updateTask({commit}, payload) {
            commit('updateTask', payload)
        },
        updateTaskText({commit}, payload) {
            commit('updateTaskText', payload);
        }
    }
});