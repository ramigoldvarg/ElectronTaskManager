import Vuex, {Store} from 'vuex';
import Vue from 'vue';
import moment from 'moment';
import fs from 'fs'
import os from 'os'

Vue.use(Vuex)

const user = os.userInfo().username
const saveRoute = `d:/${user}-taskmanager`

let saveFileSync = (fileName, data) => {
    fs.writeFileSync(fileName, data)
}

export const urgentFactor = 3

export default new Store({
    state: {
        tasks: [
        ],
        today: new moment()
    },
    getters: {
        completedTasks: ({tasks}) => tasks.filter(curr => curr.done),
        uncompletedTasks: ({tasks}) => tasks.filter(curr => !curr.done),
        notUrgent: ({tasks, today}) => tasks.filter(curr => !curr.done && new moment(curr.deadline).diff(today, "days") > -urgentFactor),
        urgent: ({tasks, today}) =>  tasks.filter(curr => !curr.done && new moment(curr.deadline).diff(today, "days") <= -urgentFactor),
    },
    mutations: {
        addTaskToList({tasks}, task) {
            tasks.push(task)
        },
        removeTask(state, taskId) {
            state.tasks = state.tasks.filter(curr => curr.id != taskId);
        },
        updateTask(state, taskInfo) {
            state.tasks.map(curr=> { curr.id === taskInfo.id && (curr[taskInfo.prop] = taskInfo.data) })
        },
        loadTasks(state, loadedTasks) {
            state.tasks = loadedTasks
        },
        updateDay(state) {
            state.today = new moment()
        },
        switchTasks(state, tasks) {
            state.tasks = state.tasks.filter(curr => {
                if (curr.id != tasks[0].id && curr.id != tasks[1].id) {
                    return curr;
                }
            }).concat(tasks).sort((first, second) => first.id - second.id)
        }
    },
    actions: {
        loadTasks({commit}) {
            const data = fs.readFileSync(`${saveRoute}/tasks.txt`).toString().split('\n')

            const result = data.slice(0, data.length - 1).sort((first, second) => first - second).map(fileName => {
                const a = fs.readFileSync(`${saveRoute}/${fileName.toString()}`).toString()
                return JSON.parse(a);
            })
            
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
        updateTask({state, commit}, payload) {
            const task = state.tasks.find((curr) => curr.id == payload)
            task.done = !task.done
            saveFileSync(`${saveRoute}/${payload}`, JSON.stringify(task));
            commit('updateTask', {
                "id": payload,
                "data": task.done,
                "prop": "done"
            })
        },
        updateTaskText({state, commit}, payload) {
            const task = state.tasks.find((curr) => curr.id == payload.id)
            task.description = payload.text
            saveFileSync(`${saveRoute}/${payload.id}`, JSON.stringify(task));
            commit('updateTask', {
                "id": payload.id,
                "data": payload.text,
                "prop": "description"
            });
        },
        updateDay({commit}) {
            commit('updateDay')
        },
        switchTasks({commit}, payload) {
            const newSrc = {...payload.src}
            const newDest = {...payload.dest}
            newSrc.id = newDest.id
            newDest.id = payload.src.id
            fs.writeFile(`${saveRoute}/${newSrc.id}`, JSON.stringify(newSrc), (err) => {
                if (err) {
                    throw err
                }

                fs.writeFile(`${saveRoute}/${newDest.id}`, JSON.stringify(newDest), (err) => {
                    if (err) {
                        throw err
                    }

                    commit('switchTasks', [newSrc, newDest])
                })
            })
        }
    }
});