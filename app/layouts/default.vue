<script setup lang="ts"></script>

<template>
  <div class="roboto min-h-screen bg-slate-900 text-white">
    <AppHeader class="z-10 relative" />
    <div class="container">
      <slot ></slot>
    </div>
  </div>
</template>
