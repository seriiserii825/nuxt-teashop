<script setup lang="ts"></script>

<template>
  <div class="container mx-auto px-4 pb-14">
    <div class="flex gap-8 py-16">
      <!-- Left Column - Product Images -->
      <div class="flex-1/3">
        <ProductSlider />
      </div>

      <!-- Right Column - Product Info -->
      <div class="flex-1">
        <ProductContent />
      </div>
    </div>

    <!-- Similar Products Section -->
    <div class="mt-20">
      <FrontHeaders
        title="Similar Products"
        text="You may like these products also"
      />
      <ProductGrid />
    </div>

    <div class="mt-20">
      <ProductReviews />
    </div>
  </div>
</template>
