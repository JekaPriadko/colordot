import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@//type/TypeUser'

import generateSecureRandomId from '@/helpers/generateId'
import { getRandomColor, filterColorsFree } from '@/helpers/colors'
import { loadFromLocalStorage, saveToLocalStorage } from '@/helpers/localeStorage'
import { colors } from '@/const/colors'

const NAME_LOCAL_STORAGE = 'users'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const colorsFree = ref([...colors])

  // ===================================================== //

  const loadUsersFromLocalStorage = () => {
    const storedUsers = loadFromLocalStorage(NAME_LOCAL_STORAGE)

    if (storedUsers) {
      users.value = storedUsers
      colorsFree.value = filterColorsFree(getListUserColor())
    }
  }
  loadUsersFromLocalStorage()

  watch(
    users,
    (newUsers) => {
      saveToLocalStorage(NAME_LOCAL_STORAGE, newUsers)
    },
    { deep: true }
  )

  // ===================================================== //

  function getListUserColor() {
    return users.value.map((user) => user.color)
  }

  const resetProgressUsers = () => {
    users.value.forEach((user: User) => {
      user.progress = 0
    })
  }

  function addUser(nameUser: string) {
    const assignedColor = getRandomColor(colorsFree.value)
    if (!assignedColor) return false

    const newUser = {
      id: generateSecureRandomId(),
      name: nameUser,
      color: assignedColor,
      progress: 0
    }
    users.value.push(newUser)
    resetProgressUsers()
  }

  function removeUser(id: string) {
    const userIndex = users.value.findIndex((user) => user.id === id)
    if (userIndex !== -1) {
      const [removedUser] = users.value.splice(userIndex, 1)
      colorsFree.value.push(removedUser.color)
    }
  }

  const getUserById = (userId: User['id']): User | undefined => {
    return users.value.find((user) => user.id === userId)
  }
  const getUserByColor = (userColor: User['color']): User | undefined => {
    return users.value.find((user) => user.color === userColor)
  }

  const getNextUserById = (userId: User['id']): User => {
    const index = users.value.findIndex((user) => user.id === userId)
    if (index === -1) return users.value[0]
    const nextIndex = (index + 1) % users.value.length
    return users.value[nextIndex]
  }

  function $reset() {
    resetProgressUsers()
  }

  return {
    users,
    addUser,
    removeUser,
    getListUserColor,
    getUserByColor,
    getUserById,
    getNextUserById,
    resetProgressUsers,
    $reset
  }
})
