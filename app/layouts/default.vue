<script setup lang="ts">
  import { authService } from '~/api/services/authService'

  async function logout() {
    await authService.logout()
    navigateTo('/login')
  }
</script>

<template>
  <div class="roboto min-h-screen bg-slate-100 text-text">
    <ul>
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/categories">Catetories</NuxtLink>
      </li>
      <li class="cursor-pointer" @click="logout">logout</li>
    </ul>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>
