<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import ResultModal from '@/components/ResultModal.vue'
import CheckLooser from '@/components/CheckLooser.vue'

import { useGameStore } from '@/stores/gameStore/gameStore'
import { useUserStore } from '@/stores/userStore'

import type { User } from '@/type/TypeUser'

let showDialog = ref(false)
let isCorrectChoose = ref<boolean>(false)
let userForDialog = ref({} as User)
let userLooser = ref({} as User)

const storeGame = useGameStore()
const { gameSetup, gameBoard } = storeToRefs(storeGame)
const { setCurrentPlayer, addChoosenCell, isCellChosen } = storeGame

const storeUser = useUserStore()
const { users, getNextUserById, getUserById, getUserByColor } = storeUser
const userColor = computed(() => getUserById(gameSetup.value.currentPlayer ?? '')?.color)

const sizeCell = computed(() => {
  const sizeMap = { 5: 120, 6: 105, 7: 90 }
  return sizeMap[gameSetup.value.size]
})

const chooseColor = (rowIndex: number, cellIndex: number) => {
  if (!gameSetup.value.isGameStart) return
  if (isCellChosen(cellIndex, rowIndex)) return
  if (!gameSetup.value.currentPlayer) return

  const choosenCellColor = gameBoard.value[rowIndex][cellIndex].color

  if (choosenCellColor === userColor.value) {
    userForDialog.value = { color: userColor.value } as User
    isCorrectChoose.value = true
  } else {
    userForDialog.value = getUserByColor(choosenCellColor) ?? ({ color: 'white' } as User)
    isCorrectChoose.value = false
  }

  showDialog.value = true

  addChoosenCell(cellIndex, rowIndex)

  const choosenUserByColor = getUserByColor(choosenCellColor)
  if (choosenUserByColor) {
    choosenUserByColor.progress++
  }
}

const resetModal = () => {
  setCurrentPlayer(getNextUserById(gameSetup.value.currentPlayer as string)?.id)
  ;(isCorrectChoose.value = false), (showDialog.value = false), (userLooser.value = {} as User)
  checkLooser()
}

const checkLooser = () => {
  const usersWithMaxProgress = users.filter(
    (user) => user.progress === gameSetup.value.countColorsForUser
  )

  if (usersWithMaxProgress.length + 1 == users.length) {
    setLooser()
  }
}

const setLooser = () => {
  const userWithMinProgress = users.find(
    (user) => user.progress != gameSetup.value.countColorsForUser
  )
  userLooser.value = userWithMinProgress as User
}
</script>

<template>
  <div class="board" :class="{ 'game-start': gameSetup.isGameStart }">
    <div class="board__row" v-for="(row, rowIndex) in gameBoard" :key="rowIndex">
      <template v-for="(cell, cellIndex) in row" :key="cellIndex">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-sheet
              v-bind="props"
              @click="chooseColor(rowIndex, cellIndex)"
              class="board__cell"
              :width="sizeCell"
              :height="sizeCell"
              :rounded="'circle'"
              :color="
                gameSetup.showGamePreview || isCellChosen(cellIndex, rowIndex)
                  ? cell.color
                  : 'trnasparent'
              "
            >
              <template v-if="gameSetup.isGameStart">
                <div
                  class="board__cell-wrap"
                  :class="[
                    isHovering && !isCellChosen(cellIndex, rowIndex) ? `bg-${userColor}` : ''
                  ]"
                ></div>
                <div class="board__cell-count">{{ cell.count }}</div>
              </template>
            </v-sheet>
          </template>
        </v-hover>
      </template>
    </div>
    <div v-if="!gameSetup.showGamePreview && !gameSetup.isGameStart" class="board__start">
      <v-btn block color="teal" size="x-large" @click="gameSetup.isGameStart = true">
        Почати
      </v-btn>
    </div>
    <ResultModal
      :showDialog="showDialog"
      :isCorrectChoose="isCorrectChoose"
      :choosenUser="userForDialog"
      @closedModal="resetModal"
    />

    <CheckLooser :userLooser="userLooser" @closedModal="$emit('closedLastModal')" />
  </div>
</template>

<style scoped lang="scss">
.board {
  background: rgba(255, 255, 255, 0.2);
  width: 800px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  .board__row {
    display: flex;
    justify-content: space-between;
    align-items: space-between;
    width: 100%;
  }
  .board__cell {
    margin: 10px;
    transition: all 0.35s ease;
    cursor: pointer;
    position: relative;

    .board__cell-count {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .board__cell-wrap {
      position: absolute;
      z-index: -1;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      transform: translate(-2px, -2px);
      border-radius: 50%;
      transition: all 0.35s ease;
    }
  }
  .board__start {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
