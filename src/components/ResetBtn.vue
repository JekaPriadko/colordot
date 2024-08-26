<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore/gameStore'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()

const storeGame = useGameStore()
const storeUser = useUserStore()

const dialog = ref(false)

const resetGame = () => {
  storeUser.$reset()
  storeGame.$reset()
  dialog.value = false
  router.push({ name: 'registration' })
}
</script>

<template>
  <div>
    <v-btn block color="red-darken-3" size="x-large" @click="dialog = true"> Скинути </v-btn>

    <v-dialog v-model="dialog" width="auto" scrim="black">
      <v-card
        max-width="400"
        title="Ви впевнені?"
        text="Ваш прогрес буде очищено і почнеться нова гра"
      >
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Ok" @click="resetGame"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
