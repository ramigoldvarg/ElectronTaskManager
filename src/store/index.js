import Vuex, {Store} from 'vuex';
import Vue from 'vue';
import moment from 'moment';
import fs from 'fs'
import os from 'os'

Vue.use(Vuex)

const user = os.userInfo().username
const saveRoute = `d:/${user}-taskmanager`

export default new Store({
    state: {
        tasks: [
        ]
    },
    getters: {
        completedTasks: ({tasks}) => tasks.filter(curr => curr.done),
        uncompletedTasks: ({tasks}) => tasks.filter(curr => !curr.done),
        notUrgent: ({tasks}) => tasks.filter(curr => !curr.done && new moment(curr.deadline).diff(new moment(), "days") > -3),
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
        loadTasks(state, loadedTasks) {
            state.tasks = loadedTasks
        }
    },
    actions: {
        loadTasks({commit}) {
            const data = fs.readFileSync(`${saveRoute}/tasks.txt`)

            const result = data.toString().split('\n').map(fileName => {
                if (fileName !== "") {
                    const a = fs.readFileSync(`${saveRoute}/${fileName.toString()}`).toString()
                    return JSON.parse(a);
                }
            })
            
            result.pop()
            commit('loadTasks', result)
        },
        addTaskToList({commit, state}, payload) {
            const id = state.tasks.map(curr => curr.id).reduce((prev, next) => prev = next + 1, 0);
            const taskToAdd = {...payload, done: false, id}
            
            fs.appendFile(`${saveRoute}/tasks.txt`, `${id}\n`, (err) => {
                if (err) {
                    throw err
                }
                
                fs.writeFile(`${saveRoute}/${id}`, JSON.stringify(taskToAdd), (err) => {
                    if (err) {
                        throw err
                    }

                    commit('addTaskToList', taskToAdd)
                })
            })
        },
        removeTask({state, commit}, payload) {
            const newId = state.tasks.map(curr => curr.id).reduce((acu, curr) => curr != payload ? acu = `${acu}${curr}\n` : acu, "")

            fs.writeFile(`${saveRoute}/tasks.txt`, newId, (err) => {
                if (err) {
                    throw err;
                }

                commit('removeTask', payload);
            })
        },
        updateTask({commit}, payload) {
            commit('updateTask', payload)
        },
        updateTaskText({commit}, payload) {
            commit('updateTaskText', payload);
        }
    }
});