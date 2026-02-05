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
    examples: {
      type: Array,
      required: true,
      // Format: [{ title: String, code: String, slot: String }]
    },
    componentProps: {
      type: Array,
      default: () => [],
    },
  })

  const activeTab = ref('demo')
  const showCode = ref(false)
  const copiedIndex = ref(-1)

  const copyCode = (index) => {
    navigator.clipboard.writeText(props.examples[index].code)
    copiedIndex.value = index
    setTimeout(() => {
      copiedIndex.value = -1
    }, 2000)
  }
</script>

<template>
  <div class="mb-14">
    <!-- Header -->
    <div class="pb-5">
      <h2 class="m-0 mb-5 text-[28px] font-normal text-[#1f2f3d]">
        {{ title }}
      </h2>
      <p v-if="description" class="m-0 text-sm leading-[1.5em] text-[#5e6d82]">
        {{ description }}
      </p>
    </div>

    <!-- Tabs -->
    <div class="mb-0 flex border-b border-[#d3dce6]">
      <button
        :class="[
          '-mb-px cursor-pointer border-b-2 border-none bg-transparent px-5 py-2.5 text-sm font-medium transition-all duration-300',
          activeTab === 'demo'
            ? 'border-b-[#409eff] text-[#409eff]'
            : 'border-b-transparent text-[#8492a6] hover:text-[#409eff]',
        ]"
        @click="activeTab = 'demo'"
      >
        Demo
      </button>
      <button
        v-if="componentProps.length > 0"
        :class="[
          '-mb-px cursor-pointer border-b-2 border-none bg-transparent px-5 py-2.5 text-sm font-medium transition-all duration-300',
          activeTab === 'props'
            ? 'border-b-[#409eff] text-[#409eff]'
            : 'border-b-transparent text-[#8492a6] hover:text-[#409eff]',
        ]"
        @click="activeTab = 'props'"
      >
        Attributes
      </button>
    </div>

    <!-- Content -->
    <div class="bg-white">
      <!-- Demo Tab -->
      <div v-show="activeTab === 'demo'">
        <div
          v-for="(example, index) in examples"
          :key="index"
          class="mb-6 rounded-[3px] border border-[#ebebeb] transition-all duration-200 hover:shadow-[0_0_8px_0_rgba(232,237,250,0.6),0_2px_4px_0_rgba(232,237,250,0.5)]"
        >
          <!-- Example Header -->
          <div
            v-if="example.title"
            class="border-b border-[#ebebeb] bg-[#fafafa] px-6 py-5"
          >
            <h4 class="m-0 mb-2 text-base font-medium text-[#1f2d3d]">
              {{ example.title }}
            </h4>
            <p
              v-if="example.description"
              class="m-0 text-sm leading-[1.5] text-[#5e6d82]"
            >
              {{ example.description }}
            </p>
          </div>

          <!-- Example Content -->
          <div class="px-6 py-9">
            <slot :name="`example-${index}`"></slot>
          </div>

          <!-- Control Button -->
          <div
            class="-mt-px flex h-11 cursor-pointer items-center justify-center rounded-b-[4px] border-t border-[#eaeefb] bg-white text-center text-[#d3dce6] transition-all duration-200 hover:bg-[#f9fafc]"
          >
            <button
              class="inline-flex cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 text-sm leading-[44px] text-[#d3dce6] transition-all duration-300 hover:text-[#409eff]"
              @click="showCode = showCode === index ? -1 : index"
            >
              <!-- Chevron Right Icon (when code hidden) -->
              <svg
                v-if="showCode !== index"
                viewBox="0 0 1024 1024"
                width="16"
                height="16"
                class="rotate-90 transition-transform duration-300"
              >
                <path
                  d="M342.528 512l287.232-287.232a32 32 0 1 0-45.248-45.248L266.24 497.792a32 32 0 0 0 0 45.248l318.272 318.272a32 32 0 1 0 45.248-45.248L342.528 512z"
                  fill="currentColor"
                />
              </svg>
              <!-- Chevron Down Icon (when code visible) -->
              <svg
                v-else
                viewBox="0 0 1024 1024"
                width="16"
                height="16"
                class="rotate-90 transition-transform duration-300"
              >
                <path
                  d="M512 342.528L224.768 629.76a32 32 0 1 0 45.248 45.248L588.288 356.736a32 32 0 0 0 0-45.248L270.016 93.216a32 32 0 1 0-45.248 45.248L512 342.528z"
                  fill="currentColor"
                />
              </svg>
              <span>{{ showCode === index ? 'Hide' : 'Show' }} Code</span>
            </button>
          </div>

          <!-- Code Section -->
          <transition
            enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)]"
            leave-active-class="transition-all duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)]"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-[800px] opacity-100"
            leave-from-class="max-h-[800px] opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div
              v-show="showCode === index"
              class="relative overflow-hidden border-t border-[#eaeefb] bg-[#fafafa]"
            >
              <!-- Copy Button -->
              <div class="absolute right-2 top-2 z-10">
                <button
                  class="flex cursor-pointer items-center rounded border border-[#eaeefb] bg-white/90 px-2 py-1.5 text-[#606266] transition-all duration-300 hover:border-[#409eff] hover:bg-white hover:text-[#409eff]"
                  :title="copiedIndex === index ? 'Copied!' : 'Copy code'"
                  @click="copyCode(index)"
                >
                  <!-- Copy Icon -->
                  <svg
                    v-if="copiedIndex !== index"
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
                class="m-0 overflow-x-auto rounded-b-[3px] bg-[#fafafa] px-6 py-4 font-mono text-sm leading-[1.8] text-[#5e6d82]"
              ><code class="bg-transparent p-0 font-[inherit] text-[inherit]">{{ example.code }}</code></pre>
            </div>
          </transition>
        </div>
      </div>

      <!-- Props Tab -->
      <div
        v-show="activeTab === 'props'"
        class="rounded-b-[3px] border border-t-0 border-[#ebebeb] bg-white p-0"
      >
        <table
          class="w-full border-collapse border-spacing-0 text-sm leading-[1.5]"
        >
          <thead>
            <tr>
              <th
                class="whitespace-nowrap border-b border-[#ebeef5] bg-[#fafafa] px-2.5 py-4 text-left text-sm font-normal text-[#909399]"
              >
                Attribute
              </th>
              <th
                class="whitespace-nowrap border-b border-[#ebeef5] bg-[#fafafa] px-2.5 py-4 text-left text-sm font-normal text-[#909399]"
              >
                Type
              </th>
              <th
                class="whitespace-nowrap border-b border-[#ebeef5] bg-[#fafafa] px-2.5 py-4 text-left text-sm font-normal text-[#909399]"
              >
                Accepted Values
              </th>
              <th
                class="whitespace-nowrap border-b border-[#ebeef5] bg-[#fafafa] px-2.5 py-4 text-left text-sm font-normal text-[#909399]"
              >
                Default
              </th>
              <th
                class="whitespace-nowrap border-b border-[#ebeef5] bg-[#fafafa] px-2.5 py-4 text-left text-sm font-normal text-[#909399]"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in componentProps" :key="prop.name">
              <td
                class="border-b border-[#ebeef5] px-2.5 py-4 text-sm leading-[1.8] text-[#606266] last:border-b-0"
              >
                <code
                  class="rounded-[3px] bg-[#f5f7fa] px-2 py-0.5 font-mono text-xs leading-[1.8] text-[#5e6d82]"
                >
                  {{ prop.name }}
                </code>
              </td>
              <td
                class="border-b border-[#ebeef5] px-2.5 py-4 text-sm leading-[1.8] text-[#606266] last:border-b-0"
              >
                <code
                  class="rounded-[3px] bg-[#f5f7fa] px-2 py-0.5 font-mono text-xs leading-[1.8] text-[#c7254e]"
                >
                  {{ prop.type }}
                </code>
              </td>
              <td
                class="border-b border-[#ebeef5] px-2.5 py-4 text-sm leading-[1.8] text-[#606266] last:border-b-0"
              >
                {{ prop.values || '—' }}
              </td>
              <td
                class="border-b border-[#ebeef5] px-2.5 py-4 text-sm leading-[1.8] text-[#606266] last:border-b-0"
              >
                <code
                  v-if="prop.default !== undefined && prop.default !== '—'"
                  class="rounded-[3px] bg-[#f5f7fa] px-2 py-0.5 font-mono text-xs leading-[1.8] text-[#5e6d82]"
                >
                  {{ prop.default }}
                </code>
                <span v-else>—</span>
              </td>
              <td
                class="border-b border-[#ebeef5] px-2.5 py-4 text-sm leading-[1.8] text-[#606266] last:border-b-0"
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
