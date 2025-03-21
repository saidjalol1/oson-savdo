<script setup>
</script>
<template>
    <div class="loader-container">
        <div class="loader"></div>
    </div>
</template>
<style scoped>
/* Loader Fullscreen Container */
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.9); /* Light overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* CSS Loader (Beautiful Spinning Animation) */
.loader {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #007BFF; /* Primary Blue */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Loader Animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>