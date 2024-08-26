<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  userLooser: {
    type: Object,
    default: () => ({})
  }
})

const showDialog = ref(false)

watch(
  () => props.userLooser,
  (newVal) => {
    showDialog.value = Object.keys(newVal).length > 0
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
    <v-card :color="userLooser?.color ?? 'white'">
      <div class="result">
        <img src="../assets/looser.gif" class="result_img" alt="" />
        <div class="result_text">
          {{ userLooser?.name }} ти програв. <br />
          Випий полтішок
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
.result_img {
  width: 100%;
  height: auto;
  min-width: 480px;
  min-height: 320px;
}
.result_text {
  font-size: 28px;
  line-height: 32px;
  text-align: center;
  padding: 6px 0 10px;
  font-weight: bold;
}
</style>
