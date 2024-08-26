<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false
  },
  isCorrectChoose: {
    type: Boolean,
    default: false
  },
  choosenUser: {
    type: Object
  }
})

const showDialog = ref(props.showDialog)

watch(
  () => props.showDialog,
  (newVal) => {
    showDialog.value = newVal
  },
  {
    immediate: true
  }
)
</script>

<template>
  <v-dialog
    v-model="showDialog"
    @afterLeave="$emit('closedModal')"
    max-width="480"
    scrim="black"
    transition="dialog-top-transition"
  >
    <v-card :color="choosenUser?.color ?? 'white'">
      <div class="result">
        <div v-if="isCorrectChoose" class="result_true">
          <video autoplay class="result_video">
            <source src="../assets/oh_no.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div class="result_text">
            Ви вгадали. <br />
            Виберіть гравця який пьє.
          </div>
        </div>
        <div v-else class="result_false">
          <div v-if="choosenUser?.color === 'white'">
            <video autoplay loop class="result_video">
              <source src="../assets/all.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div class="result_text">
              Ви вибрали білий. <br />
              Яка сумна новина. <br />
              Це просто свято якесь. <br />
              Пьють всі.
            </div>
          </div>
          <div v-else>
            <video autoplay loop class="result_video">
              <source src="../assets/wrong_choose.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div class="result_text">Ви вибрали колір гравця {{ choosenUser?.name }}.</div>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.result_video {
  width: 100%;
  height: auto;
}
.result_text {
  font-size: 28px;
  line-height: 32px;
  text-align: center;
  padding: 6px 0 10px;
  font-weight: bold;
}
</style>
