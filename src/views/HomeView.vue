<script setup lang="ts"></script>

<template>
  <div class="welcome">
    <div class="welcome__img">
      <img src="../assets/start.gif" alt="gif" />
      <p class="welcome__img-text">Да почнеться гра</p>
    </div>

    <VBtn
      :to="{ name: 'registration' }"
      size="x-large"
      rounded="xs"
      color="error"
      class="welcome__link mt-10"
    >
      Хто грає?
    </VBtn>
  </div>
</template>

<style scoped lang="scss">
.welcome {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .welcome__img {
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 40px rgba(255, 0, 0, 0.6);
    min-width: 480px;
    min-height: 320px;
  }

  .welcome__img-text {
    position: absolute;
    bottom: 20px;
    left: 0;
    color: #fff;
    font-size: 30px;
    line-height: 30px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    color: red;
  }

  .welcome__link {
    font-weight: bold;
  }
}
</style>
