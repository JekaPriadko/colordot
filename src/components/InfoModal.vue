<script setup lang="ts">
import { ref, watch } from 'vue'
import { mdiInformationOutline, mdiBookEdit, mdiCash100 } from '@mdi/js'

const props = defineProps({
  openDialog: {
    type: Boolean
  }
})

const showDialog = ref(false)

watch(
  () => props.openDialog,
  (newVal) => {
    showDialog.value = newVal
  }
)
</script>

<template>
  <div>
    <v-btn icon class="info" @click="showDialog = true">
      <v-icon :icon="mdiInformationOutline" />
    </v-btn>

    <v-dialog
      v-model="showDialog"
      max-width="520"
      scrim="black"
      transition="dialog-bottom-transition"
      @afterLeave="$emit('closedModal')"
    >
      <v-card :color="'blue-grey-darken-4'">
        <div class="info-card">
          <div class="info-card__line">
            <p class="text">
              <v-icon :icon="mdiBookEdit" class="mr-2" />
              <span
                >Книга скарг і пропозицій знаходиться у
                <a href="https://t.me/Jeka_Pr">нього</a>.</span
              >
              <v-icon :icon="mdiBookEdit" class="ml-2" />
            </p>
            Тому, якщо є якісь ідеї щодо покращення гри, звертайтеся.
          </div>
          <div class="info-card__line">
            Також, якщо є бажання підтримайте автора <br />

            <a href="https://send.monobank.ua/jar/5uFq2zNxES" class="text">
              <v-icon :icon="mdiCash100" class="mr-2" :color="'light-blue'" />закинувши пару шекелів
              <v-icon :icon="mdiCash100" :color="'light-blue'" class="ml-2"
            /></a>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.info {
  position: fixed;
  bottom: 12px;
  left: 30px;
}
.info-card {
  padding: 25px;
  .info-card__line {
    font-size: 18px;
    line-height: 22px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 24px;
    &:last-child {
      margin-bottom: 0;
    }
    a {
      color: #03a9f4;
      text-decoration: none;
    }
  }
}
.text {
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
