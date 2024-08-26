import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'

import { generateHash } from '@/helpers/generateHash'
import { loadFromLocalStorage, saveToLocalStorage } from '@/helpers/localeStorage'

import type { StateGameStore } from '@/type/TypeGame'
import type { User } from '@/type/TypeUser'
import { useUserStore } from '@/stores/userStore'

import { defaultGameSetup, defaultGameBoard } from '@/stores/gameStore/defaultStore'
import { generateColorsData } from '@/stores/gameStore/helpersStore'

const NAME_LOCAL_STORAGE = 'game'

export const useGameStore = defineStore('game', () => {
  const storeUser = useUserStore()
  const { users, getListUserColor } = storeUser
  // ===================================================== //

  const state = ref<StateGameStore>({
    usersHash: '',
    gameSetup: defaultGameSetup(),
    gameBoard: defaultGameBoard()
  })

  watch(
    state,
    (newState) => {
      saveToLocalStorage(NAME_LOCAL_STORAGE, newState)
    },
    { deep: true }
  )

  function initBoard() {
    setGameSizeBoard(users.length)
    setGameColorsBoard(getListUserColor())
    createGameBoard()
    setCurrentPlayer(users[0]?.id)
    state.value.gameSetup.choosenCells = []
    ;(state.value.gameSetup.showGamePreview = true), (state.value.gameSetup.isGameStart = false)
  }
  const getHashUsers = (users: User[]) => {
    const idNewUsers = users.map((item) => item.id)
    const jsonData = JSON.stringify(idNewUsers)
    return generateHash(jsonData)
  }

  watch(
    users,
    async (newUsers) => {
      try {
        const storedGame = loadFromLocalStorage(NAME_LOCAL_STORAGE)
        let savedUsersHash: string = ''

        if (storedGame) {
          savedUsersHash = storedGame.usersHash
        }

        const currentUsersHash = await getHashUsers(newUsers)

        if (savedUsersHash === currentUsersHash) {
          state.value = storedGame ?? {}
        } else {
          initBoard()
        }
        state.value.usersHash = currentUsersHash
      } catch (err) {
        console.error('Помилка при обчисленні хеша:', err)
      }
    },
    { immediate: true, deep: false }
  )

  // ===================================================== //

  const setCurrentPlayer = (userId: User['id']): void => {
    state.value.gameSetup.currentPlayer = userId
  }

  const setGamePlayers = (userCount: number): void => {
    state.value.gameSetup.players = userCount

    if (state.value.gameSetup.players === 7) {
      state.value.gameSetup.countColorsForUser = 4
    }

    if (state.value.gameSetup.players === 5) {
      state.value.gameSetup.countColorsForUser = 6
    }

    if ([4, 6, 8, 9].includes(state.value.gameSetup.players ?? -1)) {
      state.value.gameSetup.countColorsForUser = 5
    }
  }

  const setGameSizeBoard = (userCount: number): void => {
    setGamePlayers(userCount)
    if (userCount <= 4) {
      state.value.gameSetup.size = 5
    } else if (userCount <= 7) {
      state.value.gameSetup.size = 6
    } else if (userCount >= 8) {
      state.value.gameSetup.size = 7
    }
  }

  const setGameColorsBoard = (colors: string[]): void => {
    state.value.gameSetup.colors = colors
  }

  const createGameBoard = (): void => {
    const shuffledColors = generateColorsData(state.value.gameSetup)

    if (!shuffledColors) {
      return
    }

    const size = state.value.gameSetup.size

    let counter = 1
    let colorIndex = 0

    state.value.gameBoard = []

    for (let i = 0; i < size; i++) {
      const row = []
      for (let j = 0; j < size; j++) {
        row.push({ count: counter++, color: shuffledColors[colorIndex++] })
      }
      state.value.gameBoard.push(row)
    }
  }

  function addChoosenCell(x: number, y: number) {
    if (isCellChosen(x, y)) return
    state.value.gameSetup.choosenCells.push([x, y])
  }

  function isCellChosen(x: number, y: number): boolean {
    return state.value.gameSetup.choosenCells.some((cell) => cell[0] === x && cell[1] === y)
  }

  function $reset() {
    initBoard()
  }

  const gameSetup = computed(() => state.value.gameSetup)
  const gameBoard = computed(() => state.value.gameBoard)
  return {
    gameSetup,
    gameBoard,
    addChoosenCell,
    isCellChosen,
    setCurrentPlayer,
    initBoard,
    $reset
  }
})
