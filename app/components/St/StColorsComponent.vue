<script setup lang="ts">
  const copied = ref('')
  const showToast = ref(false)
  const copiedText = ref('')

  function copyValue(text: string) {
    navigator.clipboard.writeText(text)
    copiedText.value = text
    copied.value = text
    showToast.value = true
    setTimeout(() => {
      copied.value = ''
      showToast.value = false
    }, 1500)
  }

  const customColors = [
    {
      group: 'Accent',
      description: 'Primary brand color used for buttons, links, and interactive elements.',
      colors: [
        { name: 'accent-light', tailwind: 'bg-accent-light', textClass: 'text-accent-light', css: '--accent-color-light', hex: '#4a90ff' },
        { name: 'accent', tailwind: 'bg-accent', textClass: 'text-accent', css: '--accent-color', hex: '#2463eb' },
        { name: 'accent-dark', tailwind: 'bg-accent-dark', textClass: 'text-accent-dark', css: '--accent-color-dark', hex: '#1a4bb8' },
      ],
    },
    {
      group: 'Text',
      description: 'Typography colors for body text and secondary content.',
      colors: [
        { name: 'text', tailwind: 'bg-text', textClass: 'text-text', css: '--text-color', hex: '#333333' },
        { name: 'text-light', tailwind: 'bg-text-light', textClass: 'text-text-light', css: '--text-color-light', hex: '#777777' },
      ],
    },
  ]

  const tailwindColors = [
    {
      group: 'Gray',
      colors: [
        { shade: '50', class: 'bg-gray-50', hex: '#f9fafb' },
        { shade: '100', class: 'bg-gray-100', hex: '#f3f4f6' },
        { shade: '200', class: 'bg-gray-200', hex: '#e5e7eb' },
        { shade: '300', class: 'bg-gray-300', hex: '#d1d5db' },
        { shade: '400', class: 'bg-gray-400', hex: '#9ca3af' },
        { shade: '500', class: 'bg-gray-500', hex: '#6b7280' },
        { shade: '600', class: 'bg-gray-600', hex: '#4b5563' },
        { shade: '700', class: 'bg-gray-700', hex: '#374151' },
        { shade: '800', class: 'bg-gray-800', hex: '#1f2937' },
        { shade: '900', class: 'bg-gray-900', hex: '#111827' },
      ],
    },
    {
      group: 'Blue',
      colors: [
        { shade: '50', class: 'bg-blue-50', hex: '#eff6ff' },
        { shade: '100', class: 'bg-blue-100', hex: '#dbeafe' },
        { shade: '200', class: 'bg-blue-200', hex: '#bfdbfe' },
        { shade: '300', class: 'bg-blue-300', hex: '#93c5fd' },
        { shade: '400', class: 'bg-blue-400', hex: '#60a5fa' },
        { shade: '500', class: 'bg-blue-500', hex: '#3b82f6' },
        { shade: '600', class: 'bg-blue-600', hex: '#2563eb' },
        { shade: '700', class: 'bg-blue-700', hex: '#1d4ed8' },
        { shade: '800', class: 'bg-blue-800', hex: '#1e40af' },
        { shade: '900', class: 'bg-blue-900', hex: '#1e3a8a' },
      ],
    },
    {
      group: 'Green',
      colors: [
        { shade: '50', class: 'bg-green-50', hex: '#f0fdf4' },
        { shade: '100', class: 'bg-green-100', hex: '#dcfce7' },
        { shade: '200', class: 'bg-green-200', hex: '#bbf7d0' },
        { shade: '300', class: 'bg-green-300', hex: '#86efac' },
        { shade: '400', class: 'bg-green-400', hex: '#4ade80' },
        { shade: '500', class: 'bg-green-500', hex: '#22c55e' },
        { shade: '600', class: 'bg-green-600', hex: '#16a34a' },
        { shade: '700', class: 'bg-green-700', hex: '#15803d' },
        { shade: '800', class: 'bg-green-800', hex: '#166534' },
        { shade: '900', class: 'bg-green-900', hex: '#14532d' },
      ],
    },
    {
      group: 'Red',
      colors: [
        { shade: '50', class: 'bg-red-50', hex: '#fef2f2' },
        { shade: '100', class: 'bg-red-100', hex: '#fee2e2' },
        { shade: '200', class: 'bg-red-200', hex: '#fecaca' },
        { shade: '300', class: 'bg-red-300', hex: '#fca5a5' },
        { shade: '400', class: 'bg-red-400', hex: '#f87171' },
        { shade: '500', class: 'bg-red-500', hex: '#ef4444' },
        { shade: '600', class: 'bg-red-600', hex: '#dc2626' },
        { shade: '700', class: 'bg-red-700', hex: '#b91c1c' },
        { shade: '800', class: 'bg-red-800', hex: '#991b1b' },
        { shade: '900', class: 'bg-red-900', hex: '#7f1d1d' },
      ],
    },
    {
      group: 'Yellow',
      colors: [
        { shade: '50', class: 'bg-yellow-50', hex: '#fefce8' },
        { shade: '100', class: 'bg-yellow-100', hex: '#fef9c3' },
        { shade: '200', class: 'bg-yellow-200', hex: '#fef08a' },
        { shade: '300', class: 'bg-yellow-300', hex: '#fde047' },
        { shade: '400', class: 'bg-yellow-400', hex: '#facc15' },
        { shade: '500', class: 'bg-yellow-500', hex: '#eab308' },
        { shade: '600', class: 'bg-yellow-600', hex: '#ca8a04' },
        { shade: '700', class: 'bg-yellow-700', hex: '#a16207' },
        { shade: '800', class: 'bg-yellow-800', hex: '#854d0e' },
        { shade: '900', class: 'bg-yellow-900', hex: '#713f12' },
      ],
    },
    {
      group: 'Cyan',
      colors: [
        { shade: '50', class: 'bg-cyan-50', hex: '#ecfeff' },
        { shade: '100', class: 'bg-cyan-100', hex: '#cffafe' },
        { shade: '200', class: 'bg-cyan-200', hex: '#a5f3fc' },
        { shade: '300', class: 'bg-cyan-300', hex: '#67e8f9' },
        { shade: '400', class: 'bg-cyan-400', hex: '#22d3ee' },
        { shade: '500', class: 'bg-cyan-500', hex: '#06b6d4' },
        { shade: '600', class: 'bg-cyan-600', hex: '#0891b2' },
        { shade: '700', class: 'bg-cyan-700', hex: '#0e7490' },
        { shade: '800', class: 'bg-cyan-800', hex: '#155e75' },
        { shade: '900', class: 'bg-cyan-900', hex: '#164e63' },
      ],
    },
  ]

  const buttonColors = [
    { name: 'btn-info', class: 'btn btn-info', label: 'Info', description: 'bg-cyan-600' },
    { name: 'btn-danger', class: 'btn btn-danger', label: 'Danger', description: 'bg-red-600' },
    { name: 'btn-success', class: 'btn btn-success', label: 'Success', description: 'bg-green-600' },
    { name: 'btn-warning', class: 'btn btn-warning', label: 'Warning', description: 'bg-yellow-600' },
    { name: 'btn-outline', class: 'btn btn-outline', label: 'Outline', description: 'border-gray-300' },
  ]
</script>

<template>
  <div class="relative">
    <!-- Toast -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-1 opacity-0"
    >
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-3 text-sm text-white shadow-lg"
      >
        <font-awesome-icon :icon="['fas', 'check']" class="text-green-400" />
        <span>Copied <code class="rounded bg-gray-700 px-1.5 py-0.5 text-xs">{{ copiedText }}</code></span>
      </div>
    </Transition>

    <!-- Header -->
    <div class="mb-10">
      <h2 class="m-0 mb-5 text-[28px] font-normal text-[#1f2f3d]">Colors</h2>
      <p class="m-0 text-sm leading-[1.5em] text-[#5e6d82]">
        Project color system. Custom colors are defined as CSS variables in
        <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700">variables.scss</code>
        and extended in
        <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700">tailwind.config.js</code>.
        Click any swatch to copy its Tailwind class.
      </p>
    </div>

    <!-- Custom project colors -->
    <div v-for="group in customColors" :key="group.group" class="mb-10">
      <h3 class="mb-1 text-lg font-medium text-gray-900">{{ group.group }}</h3>
      <p class="mb-4 text-sm text-gray-500">{{ group.description }}</p>
      <div class="grid grid-cols-3 gap-4 sm:grid-cols-1">
        <button
          v-for="color in group.colors"
          :key="color.name"
          class="cursor-pointer overflow-hidden rounded-xl border border-gray-200 transition-all hover:shadow-md"
          :class="copied === color.tailwind ? 'ring-2 ring-green-400' : ''"
          @click="copyValue(color.tailwind)"
        >
          <div class="h-20" :class="color.tailwind"></div>
          <div class="bg-white p-3 text-left">
            <p class="text-sm font-semibold text-gray-900">{{ color.name }}</p>
            <p class="mt-0.5 text-xs text-gray-500">{{ color.hex }}</p>
            <div class="mt-1.5 flex flex-wrap gap-1">
              <code class="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">{{ color.tailwind }}</code>
              <code class="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">{{ color.textClass }}</code>
            </div>
            <p class="mt-1 text-[10px] text-gray-400">{{ color.css }}</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Button variant colors -->
    <div class="mb-10">
      <h3 class="mb-1 text-lg font-medium text-gray-900">Button variants</h3>
      <p class="mb-4 text-sm text-gray-500">
        Custom button classes defined in
        <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">tailwind.scss</code>
        utilities layer.
      </p>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="btn in buttonColors"
          :key="btn.name"
          class="cursor-pointer"
          :class="[btn.class, copied === btn.name ? 'ring-2 ring-green-400' : '']"
          @click="copyValue(btn.name)"
        >
          {{ btn.label }}
        </button>
      </div>
      <div class="mt-3 flex flex-wrap gap-2">
        <div v-for="btn in buttonColors" :key="btn.name" class="text-xs text-gray-500">
          <code class="rounded bg-gray-100 px-1.5 py-0.5 text-gray-600">{{ btn.name }}</code>
          <span class="ml-1">{{ btn.description }}</span>
        </div>
      </div>
    </div>

    <!-- Tailwind palette -->
    <div class="mb-10">
      <h3 class="mb-1 text-lg font-medium text-gray-900">Tailwind palette</h3>
      <p class="mb-4 text-sm text-gray-500">Standard Tailwind colors used across the project. Click to copy the class.</p>

      <div v-for="palette in tailwindColors" :key="palette.group" class="mb-6">
        <h4 class="mb-2 text-sm font-medium text-gray-700">{{ palette.group }}</h4>
        <div class="flex overflow-hidden rounded-xl border border-gray-200">
          <button
            v-for="color in palette.colors"
            :key="color.shade"
            class="group relative flex-1 cursor-pointer border-none p-0 transition-all hover:flex-[1.5]"
            :class="copied === color.class ? 'ring-2 ring-inset ring-green-400' : ''"
            @click="copyValue(color.class)"
          >
            <div class="h-16" :class="color.class"></div>
            <div class="bg-white px-1 py-1.5 text-center">
              <p class="text-[10px] font-medium text-gray-700">{{ color.shade }}</p>
              <p class="hidden text-[9px] text-gray-400 group-hover:block">{{ color.hex }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
