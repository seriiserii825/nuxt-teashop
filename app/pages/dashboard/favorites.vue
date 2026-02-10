<script setup lang="ts">
  const user_store = useAuthStore()
  const { user } = storeToRefs(user_store)
</script>

<template>
  <section class="bg-white py-16">
    <div class="container mx-auto px-4">
      <FrontHeaders
        title="Favorites"
        text="Our customers' favorite products."
      />
      <ProductGrid v-if="user && user.favorites" :products="user.favorites" />
    </div>
  </section>
</template>
