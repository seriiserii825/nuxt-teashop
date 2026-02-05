<script setup>
  const emits = defineEmits(['emit_update_current'])

  const props = defineProps({
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    window: { type: Number, default: 1 },
  })

  function goPrev() {
    if (props.currentPage > 1) {
      emits('emit_update_current', props.currentPage - 1)
    }
  }

  function goNext() {
    if (props.currentPage < props.totalPages) {
      emits('emit_update_current', props.currentPage + 1)
    }
  }

  function goTo(page) {
    if (typeof page === 'number' && page !== props.currentPage) {
      emits('emit_update_current', page)
    }
  }

  function buildPages(current, total, win = 1, edge = 2) {
    if (total <= 0) return []

    const cur = Math.max(1, Math.min(current, total))
    const set = new Set()

    for (let i = 1; i <= Math.min(edge, total); i++) set.add(i)
    for (let i = Math.max(1, cur - win); i <= Math.min(total, cur + win); i++)
      set.add(i)
    for (let i = Math.max(1, total - edge + 1); i <= total; i++) set.add(i)

    const sorted = [...set].sort((a, b) => a - b)

    const out = []
    let prev = 0
    for (const p of sorted) {
      if (prev && p - prev > 1) out.push('dots')
      out.push(p)
      prev = p
    }
    return out
  }
</script>

<template>
  <nav
    class="mx-auto flex max-w-[900px] flex-wrap items-center justify-center gap-2"
    role="navigation"
    aria-label="Pagination"
  >
    <!-- Prev -->
    <button
      :disabled="currentPage === 1"
      class="flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      aria-label="Previous page"
      @click="goPrev"
    >
      ‹
    </button>

    <!-- Pages -->
    <template
      v-for="(p, idx) in buildPages(currentPage, totalPages, window)"
      :key="idx"
    >
      <!-- Dots -->
      <span
        v-if="p === 'dots'"
        class="flex h-10 w-10 items-center justify-center text-slate-500"
        aria-hidden="true"
      >
        …
      </span>

      <!-- Page -->
      <button
        v-else
        :aria-current="p === currentPage ? 'page' : undefined"
        class="h-10 w-10 rounded-md border border-slate-700 text-sm font-semibold transition"
        :class="
          p === currentPage
            ? 'bg-slate-600 text-white'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        "
        @click="goTo(p)"
      >
        {{ p }}
      </button>
    </template>

    <!-- Next -->
    <button
      :disabled="currentPage === totalPages"
      class="flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      aria-label="Next page"
      @click="goNext"
    >
      ›
    </button>
  </nav>
</template>
