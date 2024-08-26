<script setup lang="ts">
import { ref, watch, computed } from 'vue'

import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/gameStore/gameStore'
import { useUserStore } from '@/stores/userStore'

import type { User } from '@/type/TypeUser'

const storeUser = useUserStore()
const { getUserById } = storeUser
const { users } = storeToRefs(storeUser)

const storeGame = useGameStore()
const { gameSetup } = storeToRefs(storeGame)

let currentPlayer = ref({} as User)
watch(
  () => gameSetup.value.currentPlayer,
  (newCurrentPlayer) => {
    if (newCurrentPlayer) {
      const currentUser = getUserById(newCurrentPlayer)
      if (currentUser) {
        currentPlayer.value = currentUser
      }
    }
  },
  { immediate: true }
)

const orderedUser = computed(() => {
  return (users.value as User[]).slice().sort((a, b) => b.progress - a.progress)
})
</script>

<template>
  <v-slide-y-transition>
    <div class="users" v-if="gameSetup.isGameStart">
      <div class="user__col">
        <div
          class="user__item"
          v-for="user in orderedUser"
          :key="user.id"
          :class="[`bg-${user.color}`]"
        >
          <span class="user__name">{{ user.name }}</span>
          <v-progress-linear
            v-model="user.progress"
            :max="gameSetup.countColorsForUser"
            height="15"
            striped
            bg-opacity="0.5"
            color="teal-lighten-1"
            bg-color="black"
            class="user__progress"
          >
            <template v-slot:default>
              <strong>{{ user.progress }}/{{ gameSetup.countColorsForUser }}</strong>
            </template>
          </v-progress-linear>
        </div>
      </div>
      <div class="user__col">
        <div class="user__item user__item--active" :class="[`bg-${currentPlayer.color}`]">
          Хід: {{ currentPlayer.name }}
        </div>
      </div>
    </div>
  </v-slide-y-transition>
</template>

<style scoped lang="scss">
.users {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 47px;

  .user__col {
    width: 350px;
    height: 100%;
    padding: 0 30px 12px;
    display: flex;
    flex-direction: column;
  }

  .user__item {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 10px;
    display: flex;
    align-items: center;

    &:last-of-type {
      margin-bottom: 0;
    }
    &--active {
      font-size: 28px;
      line-height: 28px;
      justify-content: center;
    }
  }
  .user__name {
    font-weight: bold;
    margin-right: 8px;
    width: 100%;
    text-align: center;
  }
  .user__progress {
    width: 70%;
    flex-shrink: 0;
    margin-left: auto;
    border-radius: 8px;
    color: #fff !important;
  }
}
</style>
