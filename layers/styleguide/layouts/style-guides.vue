<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen">
    <StSidebar name="Burduja Sergiu" />

    <!-- Main content -->
    <main class="flex-1 p-8">
      <slot></slot>
    </main>
    <StStyleButton />
  </div>
</template>
