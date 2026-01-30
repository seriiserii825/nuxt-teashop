<script setup lang="ts"></script>

<template>
  <!-- ProductGrid -->
  <div
    class="xl:grid-cols-4 grid grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2"
  >
    <ProductCard v-for="n in 6" :key="n" />
  </div>
</template>
