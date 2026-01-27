<script setup lang="ts">
  const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-gray-200 bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <p class="text-center text-gray-600">
        teashop.com &copy; {{ currentYear }} All rights reserved.
      </p>
    </div>
  </footer>
</template>
