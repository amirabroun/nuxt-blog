<template>
  <div class="loading-overlay">
    <v-progress-circular
      :size="70"
      indeterminate
      color="#3573FD"
    ></v-progress-circular>
  </div>
</template>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0000002b;
  z-index: 9999;
}
</style>
