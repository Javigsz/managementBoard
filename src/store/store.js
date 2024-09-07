import { create } from 'zustand'
import { project as initialState } from '../mocks/project'

export const useStore = create((set, get) => ({
  project: initialState,
  setProjectName: (newName) =>
    set((state) => ({
      project: { ...state.project, name: newName }
    })),
  resetProject: () => set({ project: initialState }),

  // SECTIONS
  newSection: (section) => set((state) => ({ project: { ...state.project, sections: [...state.project.sections, section] } })),
  setSectionName: (name, sectionIndex) =>
    set((state) => {
      const newState = structuredClone(state.project)
      newState.sections[sectionIndex].name = name
      return { project: newState }
    }),
  deleteSection: (sectionId) =>
    set((state) => ({
      project: {
        ...state.project,
        sections: state.project.sections.filter((section) => section.id !== sectionId)
      }
    })),
  copySection: (section) =>
    set((state) => {
      const newState = structuredClone(state.project)
      const index = newState.sections.findIndex(sectionToCopy => sectionToCopy.id === section.id)
      const newTasks = section.tasks.map(task => ({ ...task, id: crypto.randomUUID() }))
      const newSection = { ...section, name: `Copy of ${section.name}`, id: crypto.randomUUID(), tasks: newTasks }
      newState.sections.splice(index + 1, 0, { ...newSection })
      console.log(newState)
      return { project: newState }
    }),
  moveSection: (sectionId) =>
    set((state) => {
      const index = state.project.sections.findIndex(section => section.id === sectionId)
      if (state.project.sections[index + 1]) {
        const newState = structuredClone(state.project)
        newState.sections.splice(index + 1, 0, newState.sections.splice(index, 1)[0])
        return { project: newState }
      } else {
        return { project: state.project }
      }
    }),
  updateSections: (newSections) =>
    set((state) => ({
      project: {
        ...state.project,
        sections: newSections
      }
    })),
  getSectionIndex: (sectionId) =>
    get((state) => {
      const sectionIndex = state.project.sections.findIndex((section) => section.id === sectionId)
      return sectionIndex
    }),

  // TASKS
  newTask: (sectionIndex, task) =>
    set((state) => {
      const newState = structuredClone(state.project)
      newState.sections[sectionIndex].tasks.push(task)
      return { project: newState }
    }),
  interchangeTasks: (task1, task2) => {
    set((state) => {
      const newState = structuredClone(state.project)
      const sectionIndex = newState.sections.findIndex(section => section.tasks.some(task => task.id === task1.id))
      const task2Index = newState.sections[sectionIndex].tasks.findIndex(task => task.id === task2.id)
      const task1Index = newState.sections[sectionIndex].tasks.findIndex(task => task.id === task1.id)
      newState.sections[sectionIndex].tasks.splice(task1Index, 1)
      newState.sections[sectionIndex].tasks.splice(task2Index, 0, task1)
      return { project: newState }
    })
  },
  deleteTask: (task) =>
    set((state) => {
      const newState = structuredClone(state.project)
      newState.sections.forEach(section => {
        section.tasks = section.tasks.filter(taskToDelete => taskToDelete.id !== task.id)
      })
      return { project: newState }
    }),
  setTaskName: (taskToEdit, name) =>
    set((state) => {
      const newState = structuredClone(state.project)
      const sectionIndex = newState.sections.findIndex(section => section.tasks.some(task => task.id === taskToEdit.id))
      const taskIndex = newState.sections[sectionIndex].tasks.findIndex(task => task.id === taskToEdit.id)
      newState.sections[sectionIndex].tasks[taskIndex].name = name
      return { project: newState }
    }),
  setTaskDesc: (taskToEdit, description) =>
    set((state) => {
      const newState = structuredClone(state.project)
      const sectionIndex = newState.sections.findIndex(section => section.tasks.some(task => task.id === taskToEdit.id))
      const taskIndex = newState.sections[sectionIndex].tasks.findIndex(task => task.id === taskToEdit.id)
      newState.sections[sectionIndex].tasks[taskIndex].desc = description
      return { project: newState }
    }),
  setEditTask: (taskToEdit, value) =>
    set((state) => {
      const newState = structuredClone(state.project)
      const sectionIndex = newState.sections.findIndex(section => section.tasks.some(task => task.id === taskToEdit.id))
      const taskIndex = newState.sections[sectionIndex].tasks.findIndex(task => task.id === taskToEdit.id)
      newState.sections[sectionIndex].tasks[taskIndex].editing = value
      return { project: newState }
    }),
  changeSizeTask: (taskToEdit) =>
    set((state) => {
      const newState = structuredClone(state.project)
      const sectionIndex = newState.sections.findIndex(section => section.tasks.some(task => task.id === taskToEdit.id))
      const taskIndex = newState.sections[sectionIndex].tasks.findIndex(task => task.id === taskToEdit.id)
      if (newState.sections[sectionIndex].tasks[taskIndex].size === 'large') {
        newState.sections[sectionIndex].tasks[taskIndex].size = 'small'
      } else {
        newState.sections[sectionIndex].tasks[taskIndex].size = 'large'
      }
      return { project: newState }
    }),
  changeColorTask: (taskToEdit, color) =>
    set((state) => {
      const newState = structuredClone(state.project)
      const sectionIndex = newState.sections.findIndex(section => section.tasks.some(task => task.id === taskToEdit.id))
      const taskIndex = newState.sections[sectionIndex].tasks.findIndex(task => task.id === taskToEdit.id)
      newState.sections[sectionIndex].tasks[taskIndex].color = color
      return { project: newState }
    }),
  moveTask: (task) =>
    set((state) => {
      const newState = structuredClone(state.project)
      const sectionIndex = newState.sections.findIndex((section, i) =>
        section.tasks.findIndex((taskToMove) => taskToMove.id === task.id) !== -1
          ? [i, section.tasks.findIndex((taskToMove) => taskToMove.id === task.id)]
          : null
      )
      if (sectionIndex > -1 && newState.sections[sectionIndex + 1]) {
        newState.sections[sectionIndex].tasks = newState.sections[sectionIndex].tasks.filter(taskToMove => taskToMove.id !== task.id)
        newState.sections[sectionIndex + 1].tasks.push(task)
        return { project: newState }
      } else {
        return { project: state.project }
      }
    }),
  setStartDateTask: (taskToEdit, date) =>
    set((state) => {
      const newState = structuredClone(state.project)
      const sectionIndex = newState.sections.findIndex(section => section.tasks.some(task => task.id === taskToEdit.id))
      const taskIndex = newState.sections[sectionIndex].tasks.findIndex(task => task.id === taskToEdit.id)
      const endDate = newState.sections[sectionIndex].tasks[taskIndex].end
      console.log(endDate)
      if (endDate && new Date(date) > new Date(endDate)) {
        window.alert('Start date cannot be after end date.')
        return { project: state.project }
      }
      newState.sections[sectionIndex].tasks[taskIndex].start = date
      return { project: newState }
    }),
  setEndDateTask: (taskToEdit, date) =>
    set((state) => {
      const newState = structuredClone(state.project)
      const sectionIndex = newState.sections.findIndex(section => section.tasks.some(task => task.id === taskToEdit.id))
      const taskIndex = newState.sections[sectionIndex].tasks.findIndex(task => task.id === taskToEdit.id)
      const startDate = newState.sections[sectionIndex].tasks[taskIndex].start
      if (startDate && new Date(date) < new Date(startDate)) {
        window.alert('End date cannot be before start date.')
        return { project: state.project }
      }
      newState.sections[sectionIndex].tasks[taskIndex].end = date
      return { project: newState }
    }),

  // USERS
  newUser: (user) => {
    if (user.avatar === '') {
      user.avatar = undefined
    }
    set((state) => ({ project: { ...state.project, users: [...state.project.users, user] } }))
  },
  deleteUser: (userId) => {
    set((state) => ({ project: { ...state.project, users: state.project.users.filter(user => user.id !== userId) } }))
  },
  addUserToTask: (taskId, userIndex) => {
    set((state) => {
      const newState = structuredClone(state.project)
      newState.users[userIndex].tasks.push(taskId)
      return { project: newState }
    })
  },
  removeUserFromTask: (taskId, userIndex) => {
    set((state) => {
      const newState = structuredClone(state.project)
      newState.users[userIndex].tasks = newState.users[userIndex].tasks.filter(task => task !== taskId)
      return { project: newState }
    })
  }
}))
