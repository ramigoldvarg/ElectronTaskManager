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
            const movedTasks = state.tasks.slice(Math.min(tasks[0].id, tasks[1].id), Math.max(tasks[0].id, tasks[1].id) + 1).map((curr) => {
                const factor = (tasks[0].id - tasks[1].id) / Math.abs(tasks[0].id - tasks[1].id)
                const currTask = {...curr}

                if (currTask.id == tasks[0].id) {
                    currTask.id = tasks[1].id - factor
                }

                currTask.id += factor

                return currTask
            })

            state.tasks = [...state.tasks.slice(0, Math.min(tasks[0].id, tasks[1].id)), ...movedTasks, ...state.tasks.slice(Math.max(tasks[0].id, tasks[1].id) + 1)].sort((first, second) => first.id - second.id)
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
        switchTasks({state, commit}, payload) {
            const newSrc = {...payload.src}
            const newDest = {...payload.dest}
            let amountOfTasks = 0
            const tryMutationCall = () => {
                amountOfTasks++;
                
                // After all the files are written commit a mutation to the state 
                if (amountOfTasks === Math.abs(newSrc.id - newDest.id) + 1) {
                    commit('switchTasks', [newSrc, newDest])  
                }
            }

            // Finding hthe factor to know by which to add to  the index whether to add or to decrease from the index
            const factor = (newSrc.id - newDest.id) / Math.abs(newSrc.id - newDest.id)

            for (let index = Math.min(newSrc.id, newDest.id); index <= Math.max(newSrc.id, newDest.id); index++) {
                const currTask = {...state.tasks.find((curr) => curr.id == index)}
                
                // Special treatment to the source because the source should be switched with the destination
                if (index == newSrc.id) {
                    currTask.id = newDest.id - factor
                }

                if (currTask) {
                    currTask.id += factor;
                    fs.writeFile(`${saveRoute}/${currTask.id}`, JSON.stringify(currTask), (err) => {
                        if (err) {
                            throw err
                        }

                        tryMutationCall()
                    })
                }
            }
        }
    }
});