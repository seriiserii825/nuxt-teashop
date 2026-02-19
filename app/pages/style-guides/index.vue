<script setup lang="ts">
  definePageMeta({
    layout: 'style-guides',
  })
</script>

<template>
  <div>
    <!-- Hero -->
    <div class="mb-12">
      <h1 class="mb-3 text-3xl font-bold text-gray-900">Style Guide</h1>
      <p class="max-w-2xl text-lg text-gray-500">
        A living reference for every reusable UI component in the project.
        Browse interactive demos, copy code snippets, and check available props — all in one place.
      </p>
    </div>

    <!-- Quick links -->
    <div class="mb-12 grid grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
      <NuxtLink
        :to="$routes.style_guides_icons()"
        class="group rounded-xl border border-gray-200 p-5 transition-all hover:border-blue-300 hover:shadow-md"
      >
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-500 transition-colors group-hover:bg-purple-100">
          <font-awesome-icon :icon="['fas', 'icons']" class="text-lg" />
        </div>
        <h3 class="mb-1 font-semibold text-gray-900">Icons</h3>
        <p class="text-sm text-gray-500">FontAwesome icon gallery. Click to copy the full tag.</p>
      </NuxtLink>

      <NuxtLink
        :to="$routes.style_guides_components()"
        class="group rounded-xl border border-gray-200 p-5 transition-all hover:border-blue-300 hover:shadow-md"
      >
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500 transition-colors group-hover:bg-blue-100">
          <font-awesome-icon :icon="['fas', 'hand-pointer']" class="text-lg" />
        </div>
        <h3 class="mb-1 font-semibold text-gray-900">Buttons</h3>
        <p class="text-sm text-gray-500">Variants, types, loading and disabled states.</p>
      </NuxtLink>

      <NuxtLink
        :to="$routes.style_guides_components_breadcrumbs()"
        class="group rounded-xl border border-gray-200 p-5 transition-all hover:border-blue-300 hover:shadow-md"
      >
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500 transition-colors group-hover:bg-amber-100">
          <font-awesome-icon :icon="['fas', 'ellipsis']" class="text-lg" />
        </div>
        <h3 class="mb-1 font-semibold text-gray-900">Breadcrumbs</h3>
        <p class="text-sm text-gray-500">Navigation breadcrumbs with custom separators.</p>
      </NuxtLink>

      <NuxtLink
        :to="$routes.style_guides_components_inputs()"
        class="group rounded-xl border border-gray-200 p-5 transition-all hover:border-blue-300 hover:shadow-md"
      >
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500 transition-colors group-hover:bg-green-100">
          <font-awesome-icon :icon="['fas', 'keyboard']" class="text-lg" />
        </div>
        <h3 class="mb-1 font-semibold text-gray-900">Inputs</h3>
        <p class="text-sm text-gray-500">Text, password, number, email inputs with v-model.</p>
      </NuxtLink>

      <NuxtLink
        :to="$routes.style_guides_components_selects()"
        class="group rounded-xl border border-gray-200 p-5 transition-all hover:border-blue-300 hover:shadow-md"
      >
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-500 transition-colors group-hover:bg-cyan-100">
          <font-awesome-icon :icon="['fas', 'caret-down']" class="text-lg" />
        </div>
        <h3 class="mb-1 font-semibold text-gray-900">Selects</h3>
        <p class="text-sm text-gray-500">Native select with label, options, and validation.</p>
      </NuxtLink>

      <NuxtLink
        :to="$routes.style_guides_components_select_complex()"
        class="group rounded-xl border border-gray-200 p-5 transition-all hover:border-blue-300 hover:shadow-md"
      >
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-500 transition-colors group-hover:bg-rose-100">
          <font-awesome-icon :icon="['fas', 'caret-down']" class="text-lg" />
        </div>
        <h3 class="mb-1 font-semibold text-gray-900">Select Complex</h3>
        <p class="text-sm text-gray-500">Dropdown with search, icons, and create action.</p>
      </NuxtLink>
    </div>

    <!-- How to use -->
    <div class="mb-12">
      <h2 class="mb-4 text-xl font-semibold text-gray-900">How to use</h2>
      <div class="space-y-4 text-sm leading-relaxed text-gray-600">
        <div class="flex gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">1</span>
          <p><span class="font-medium text-gray-900">Browse</span> — pick a component from the sidebar or the cards above.</p>
        </div>
        <div class="flex gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">2</span>
          <p><span class="font-medium text-gray-900">Try</span> — interact with live demos to see how each component behaves.</p>
        </div>
        <div class="flex gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">3</span>
          <p><span class="font-medium text-gray-900">Copy</span> — expand the code block under any demo and copy the snippet into your page.</p>
        </div>
        <div class="flex gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">4</span>
          <p><span class="font-medium text-gray-900">Check props</span> — switch to the Attributes tab to see every available prop, its type, and default value.</p>
        </div>
      </div>
    </div>

    <!-- Architecture note -->
    <div class="rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h2 class="mb-2 text-base font-semibold text-gray-900">Powered by Nuxt Layers</h2>
      <p class="text-sm leading-relaxed text-gray-500">
        All UI components live in <code class="rounded bg-gray-200 px-1.5 py-0.5 text-xs text-gray-700">layers/ui</code>
        and the style guide itself in <code class="rounded bg-gray-200 px-1.5 py-0.5 text-xs text-gray-700">layers/styleguide</code>.
        Copy either layer into any Nuxt project, add it to
        <code class="rounded bg-gray-200 px-1.5 py-0.5 text-xs text-gray-700">extends</code>
        in <code class="rounded bg-gray-200 px-1.5 py-0.5 text-xs text-gray-700">nuxt.config.ts</code>,
        and everything works out of the box — auto-imports, pages, and layouts included.
      </p>
    </div>
  </div>
</template>
