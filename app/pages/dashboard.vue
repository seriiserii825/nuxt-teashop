<script setup lang="ts">
  import { setAccessToken } from '~/api/api_tokens'

  const route = useRoute()
  const accessToken = route.query.accessToken as string
  setAccessToken(accessToken)
</script>

<template>
  <div class="p-4">
    <h1 class="mb-4 text-2xl font-bold">Dashboard</h1>
    <p>Welcome to your dashboard!</p>
  </div>
</template>
