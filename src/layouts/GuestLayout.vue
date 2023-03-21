<template>
  <div class="guest-layout">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.guest-layout {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color--background-gradient;

  @include responsive(xs) {
    align-items: flex-start;
  }
}
</style>
