<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import GameBoard from '@/components/GameBoard.vue'
import TimerProgress from '@/components/TimerProgress.vue'
import UsersAtGame from '@/components/UsersAtGame.vue'
import ResetBtn from '@/components/ResetBtn.vue'
import InfoModal from '@/components/InfoModal.vue'

import { useGameStore } from '@/stores/gameStore/gameStore'

const storeGame = useGameStore()
const { gameSetup } = storeToRefs(storeGame)

const openDialog = ref(false)
const onClosedLastModal = () => {
  setTimeout(() => {
    openDialog.value = true
  }, 1500)
}
</script>

<template>
  <div class="game">
    <div class="w-100 my-4 px-4 game__timer" :class="{ 'opacity-0': !gameSetup.showGamePreview }">
      <TimerProgress />
    </div>
    <UsersAtGame />
    <GameBoard @closedLastModal="onClosedLastModal" />
    <v-slide-y-transition>
      <ResetBtn class="reset" v-if="gameSetup.isGameStart" />
    </v-slide-y-transition>
    <InfoModal
      v-if="!gameSetup.showGamePreview"
      :openDialog="openDialog"
      @closedModal="openDialog = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.game {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .game__timer {
    transition: all 0.35s ease;
  }
}
.reset {
  width: 290px;
  position: absolute;
  bottom: 12px;
  right: 30px;
  margin-top: auto;
  font-weight: bold;
}
</style>
