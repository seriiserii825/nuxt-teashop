<script setup lang="ts"></script>

<template>
  <div class="roboto min-h-screen bg-slate-100 text-text">
    <ul>
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/categories">Catetories</NuxtLink>
      </li>
    </ul>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>
