<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useGameStore } from '@/stores/gameStore/gameStore'
import { storeToRefs } from 'pinia'
import { colors } from '@/const/colors'
import type { VForm } from 'vuetify/components'
import InfoModal from '@/components/InfoModal.vue'

const storeUser = useUserStore()
const { addUser, removeUser } = storeUser
const { users } = storeToRefs(storeUser)

const storeGame = useGameStore()

const sizeBoard = computed(() => storeGame.gameSetup.size)
const timePreview = computed(() => storeGame.gameSetup.timeForRemember)

const form = ref<VForm | null>(null)
const nameInput = ref('')

const validationRule = {
  required: (value: string) => !!value || 'Обовязкове поле.',
  maxUser: () => !(users.value.length === colors.length) || 'Максимальна кількість гравці.'
}

async function addUserHandler() {
  if (!form.value) {
    console.error('Form reference is null.')
    return
  }

  const { valid } = await form.value.validate()
  if (!valid) return

  addUser(nameInput.value)
  form.value.reset()
}

function removeUserHandler(id: string) {
  if (!form.value) {
    console.error('Form reference is null.')
    return
  }

  if (!id) return

  removeUser(id)
  form.value.resetValidation()
}

const disabledAddUser = computed(() => {
  return !nameInput.value
})
</script>

<template>
  <div class="reg">
    <v-container class="mb-2">
      <h1 class="rule">
        Після початку з`явиться кольорове поле
        <span class="teal">[{{ sizeBoard }}x{{ sizeBoard }}]</span> і у вас буде
        <span class="teal">{{ timePreview }}</span>
        секунд щоб їх запамятати
      </h1>
      <v-row justify="center">
        <v-chip
          v-for="user in users"
          :key="user.id"
          @click="removeUserHandler(user.id)"
          size="x-large"
          color="teal"
          class="mx-1"
          >{{ user.name }}</v-chip
        >
      </v-row>
    </v-container>
    <v-form ref="form" @submit.prevent="addUserHandler" validate-on="submit" class="reg__form">
      <v-text-field
        v-model="nameInput"
        label="Гравець"
        :rules="[validationRule.required, validationRule.maxUser]"
      ></v-text-field>
      <v-btn
        class="mt-4"
        type="submit"
        block
        color="teal"
        variant="tonal"
        :disabled="disabledAddUser"
      >
        Додати
      </v-btn>
    </v-form>

    <v-btn
      :to="{ name: 'game' }"
      size="x-large"
      rounded="xs"
      :color="users.length < 4 ? 'error' : 'success'"
      class="welcome__link mt-10"
      :disabled="users.length < 4"
    >
      Пооооооїхали
    </v-btn>
  </div>
  <InfoModal />
</template>

<style scoped lang="scss">
.reg {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .reg__form {
    width: 400px;
    margin-top: 30px;
  }
}
.rule {
  width: 800px;
  text-align: center;
  margin: 0 auto 50px;
}
.teal {
  color: #009688;
}
</style>
