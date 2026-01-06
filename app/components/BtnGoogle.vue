<script setup lang="ts">
  function goToGoogle() {
    const config = useRuntimeConfig()
    const serverUrl = config.public.serverUrl
    const google_url = `${serverUrl}/auth/google`
    console.log('google_url', google_url)
    window.location.href = google_url
  }
</script>
<template>
  <Btn variant="btn-outline" class="mb-4 w-full gap-2" @click="goToGoogle">
    <img src="/images/google.png" alt="Google" class="inline h-4 w-4" />
    Continue with Google
  </Btn>
</template>
