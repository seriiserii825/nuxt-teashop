<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen">
    <div class="flex w-1/2 items-center justify-center bg-accent">
      <img src="/images/logo.svg" alt="Logo" class="m-8" />
    </div>
    <div class="flex w-1/2 items-center justify-center">
      <div class="max-w-96">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
