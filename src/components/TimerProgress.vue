<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useGameStore } from '@/stores/gameStore/gameStore'
import { storeToRefs } from 'pinia'

const storeGame = useGameStore()
const { gameSetup } = storeToRefs(storeGame)

let timerShow = ref<number>(0)
let intervalId: number | undefined = undefined

const startTimer = () => {
  const duration = gameSetup.value.timeForRemember * 1000 * 10
  const step = 100 / (duration / 1000)

  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }

  intervalId = setInterval(() => {
    if (timerShow.value < 100) {
      timerShow.value += step
    } else {
      gameSetup.value.showGamePreview = false
      clearInterval(intervalId)
      intervalId = undefined
      timerShow.value = 0
    }
  }, 100)
}

onMounted(() => {
  startTimer()
})

watch(
  () => gameSetup.value.showGamePreview,
  (show) => {
    if (show) startTimer()
  }
)

onBeforeUnmount(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <v-progress-linear
    v-model="timerShow"
    height="15"
    bg-color="teal-lighten-3"
    color="teal-lighten-1"
    striped
  />
</template>
