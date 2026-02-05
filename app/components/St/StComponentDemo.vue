<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      required: true,
    },
    componentProps: {
      type: Array,
      default: () => [],
    },
  })

  const activeTab = ref('demo')
  const showCode = ref(false)
  const copied = ref(false)

  const copyCode = () => {
    navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
</script>

<template>
  <div
    class="mb-6 rounded border border-[#dcdfe6] bg-white transition-all duration-200 hover:shadow-[0_2px_12px_0_rgba(0,0,0,0.1)]"
  >
    <!-- Header -->
    <div class="px-6 pb-0 pt-6">
      <h3 class="m-0 mb-2 text-lg font-medium text-[#1f2d3d]">{{ title }}</h3>
      <p
        v-if="description"
        class="m-0 mb-4 text-sm leading-[1.5] text-[#5e6d82]"
      >
        {{ description }}
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-[#dcdfe6] px-6">
      <button
        :class="[
          '-mb-px cursor-pointer border-b-2 border-none bg-transparent px-5 py-3 text-sm text-[#303133] transition-all duration-300',
          activeTab === 'demo'
            ? 'border-b-[#409eff] text-[#409eff]'
            : 'border-b-transparent hover:text-[#409eff]',
        ]"
        @click="activeTab = 'demo'"
      >
        Demo
      </button>
      <button
        v-if="componentProps.length > 0"
        :class="[
          '-mb-px cursor-pointer border-b-2 border-none bg-transparent px-5 py-3 text-sm text-[#303133] transition-all duration-300',
          activeTab === 'props'
            ? 'border-b-[#409eff] text-[#409eff]'
            : 'border-b-transparent hover:text-[#409eff]',
        ]"
        @click="activeTab = 'props'"
      >
        Props
      </button>
    </div>

    <!-- Content -->
    <div class="min-h-[200px]">
      <!-- Demo Tab -->
      <div v-show="activeTab === 'demo'" class="p-0">
        <!-- Example -->
        <div class="px-6 pb-10 pt-10">
          <slot></slot>
        </div>

        <!-- Control -->
        <div
          class="flex h-11 items-center justify-center overflow-hidden rounded-b border-t border-[#ebeef5] bg-[#fafafa]"
        >
          <button
            class="flex cursor-pointer items-center gap-1.5 border-none bg-transparent px-4 py-2 text-sm text-[#909399] transition-all duration-300 hover:text-[#409eff]"
            @click="showCode = !showCode"
          >
            <svg
              v-if="!showCode"
              viewBox="0 0 1024 1024"
              width="16"
              height="16"
              class="transition-transform duration-300"
            >
              <path
                d="M342.528 512l287.232-287.232a32 32 0 1 0-45.248-45.248L266.24 497.792a32 32 0 0 0 0 45.248l318.272 318.272a32 32 0 1 0 45.248-45.248L342.528 512z"
                fill="currentColor"
              />
            </svg>
            <svg
              v-else
              viewBox="0 0 1024 1024"
              width="16"
              height="16"
              class="transition-transform duration-300"
            >
              <path
                d="M512 342.528L224.768 629.76a32 32 0 1 0 45.248 45.248L588.288 356.736a32 32 0 0 0 0-45.248L270.016 93.216a32 32 0 1 0-45.248 45.248L512 342.528z"
                fill="currentColor"
              />
            </svg>
            <span>{{ showCode ? 'Hide' : 'Show' }} Code</span>
          </button>
        </div>

        <!-- Code Section -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-[500px] opacity-100"
          leave-from-class="max-h-[500px] opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div
            v-show="showCode"
            class="relative overflow-hidden border-t border-[#ebeef5] bg-[#fafafa]"
          >
            <!-- Copy Button -->
            <div class="absolute right-2 top-2 z-10">
              <button
                class="flex cursor-pointer items-center rounded border border-[#dcdfe6] bg-white/90 px-2 py-1.5 text-[#606266] transition-all duration-300 hover:border-[#409eff] hover:bg-white hover:text-[#409eff]"
                :title="copied ? 'Copied!' : 'Copy code'"
                @click="copyCode"
              >
                <!-- Copy Icon -->
                <svg
                  v-if="!copied"
                  viewBox="0 0 1024 1024"
                  width="14"
                  height="14"
                  class="block"
                >
                  <path
                    d="M768 832a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64V320a64 64 0 0 1 64-64h512a64 64 0 0 1 64 64v512z m64-640v512a64 64 0 0 1-64 64h-64V320a128 128 0 0 0-128-128H256v-64a64 64 0 0 1 64-64h512a64 64 0 0 1 64 64z"
                    fill="currentColor"
                  />
                </svg>
                <!-- Check Icon -->
                <svg
                  v-else
                  viewBox="0 0 1024 1024"
                  width="14"
                  height="14"
                  class="block"
                >
                  <path
                    d="M406.016 707.84l-230.4-230.4-76.8 76.8 307.2 307.2 614.4-614.4-76.8-76.8z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <!-- Code Block -->
            <pre
              class="m-0 overflow-x-auto rounded-b bg-[#fafafa] px-6 pb-4 pt-4 font-mono text-[13px] leading-[1.6] text-[#303133]"
            ><code class="bg-transparent p-0 font-[inherit] text-[inherit]">{{ code }}</code></pre>
          </div>
        </transition>
      </div>

      <!-- Props Tab -->
      <div v-show="activeTab === 'props'" class="p-6">
        <table class="w-full border-collapse text-sm leading-[1.5]">
          <thead>
            <tr>
              <th
                class="whitespace-nowrap border-b border-[#ebeef5] bg-[#fafafa] px-2.5 py-3 text-left font-medium text-[#1f2d3d]"
              >
                Name
              </th>
              <th
                class="whitespace-nowrap border-b border-[#ebeef5] bg-[#fafafa] px-2.5 py-3 text-left font-medium text-[#1f2d3d]"
              >
                Type
              </th>
              <th
                class="whitespace-nowrap border-b border-[#ebeef5] bg-[#fafafa] px-2.5 py-3 text-left font-medium text-[#1f2d3d]"
              >
                Default
              </th>
              <th
                class="whitespace-nowrap border-b border-[#ebeef5] bg-[#fafafa] px-2.5 py-3 text-left font-medium text-[#1f2d3d]"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in componentProps" :key="prop.name">
              <td
                class="border-b border-[#ebeef5] px-2.5 py-3 text-[#5e6d82] last:border-b-0"
              >
                <code
                  class="rounded-[3px] bg-[#f5f7fa] px-1.5 py-0.5 font-mono text-xs text-[#5e6d82]"
                >
                  {{ prop.name }}
                </code>
              </td>
              <td
                class="border-b border-[#ebeef5] px-2.5 py-3 text-[#5e6d82] last:border-b-0"
              >
                <code
                  class="rounded-[3px] bg-[#f5f7fa] px-1.5 py-0.5 font-mono text-xs text-[#409eff]"
                >
                  {{ prop.type }}
                </code>
              </td>
              <td
                class="border-b border-[#ebeef5] px-2.5 py-3 text-[#5e6d82] last:border-b-0"
              >
                <code
                  v-if="prop.default !== undefined"
                  class="rounded-[3px] bg-[#f5f7fa] px-1.5 py-0.5 font-mono text-xs text-[#5e6d82]"
                >
                  {{ prop.default }}
                </code>
                <span v-else>—</span>
              </td>
              <td
                class="border-b border-[#ebeef5] px-2.5 py-3 text-[#5e6d82] last:border-b-0"
              >
                {{ prop.description }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
