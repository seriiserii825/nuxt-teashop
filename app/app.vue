<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style>
  .layout-enter-active,
  .layout-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .layout-enter-from,
  .layout-leave-to {
    filter: grayscale(1) blur(1px);
    opacity: 0.9;
  }

  .page-enter-active,
  .page-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .page-enter-from {
    transform: translateX(20px);
    opacity: 0;
  }
  .page-leave-to {
    transform: translateX(-20px);
    opacity: 0;
  }

  * {
    --p-transition-duration: 0.4s;
  }
</style>
