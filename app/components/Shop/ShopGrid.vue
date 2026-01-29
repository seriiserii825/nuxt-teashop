<template>
  <div class="grid grid-cols-2 gap-8 lg:grid-cols-3 md:grid-cols-2">
    <ShopCard v-for="n in 6" :key="n" />
  </div>
</template>
