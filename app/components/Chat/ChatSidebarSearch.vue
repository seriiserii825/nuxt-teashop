<script setup lang="ts"></script>

<template>
  <div class="chat-sidebar-search">
    <div class="border-b border-gray-200 px-4 py-4">
      <h2 class="text-lg font-semibold text-[var(--text-color)]">Chats</h2>
      <div
        class="mt-3 flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2"
      >
        <font-awesome-icon
          :icon="['fas', 'magnifying-glass']"
          class="text-sm text-gray-400"
        />
        <input
          type="text"
          placeholder="Search..."
          class="w-full bg-transparent text-sm text-[var(--text-color)] outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  </div>
</template>
