<script setup lang="ts">
  import { type PropType, ref } from 'vue'

  import { fileService } from '~/api/services/fileService'
  import type { IFileUpload } from '~/interfaces/IFileUpload'

  const emits = defineEmits(['emitUploaded'])

  const props = defineProps({
    label: {
      type: String,
      default: 'Upload Images',
    },
    name: {
      type: String,
      default: 'images',
    },
    images: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  })

  const files = ref<File[]>([])
  const previews = ref<string[]>([])
  const isUploading = ref(false)
  const uploadedFiles = ref<IFileUpload[]>([])

  function onFileChanged($event: Event) {
    const target = $event.target as HTMLInputElement
    if (target && target.files) {
      const newFiles = Array.from(target.files)
      files.value = [...files.value, ...newFiles]

      // Generate preview URLs
      newFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            previews.value.push(e.target.result as string)
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  function removeImage(index: number) {
    files.value.splice(index, 1)
    previews.value.splice(index, 1)
  }

  async function saveImages() {
    if (files.value.length === 0) return

    isUploading.value = true

    try {
      const formData = new FormData()

      // Append all files
      files.value.forEach((file) => {
        formData.append('files', file)
      })

      const response: IFileUpload[] = await fileService.upload(
        formData,
        'products'
      )

      uploadedFiles.value = [...uploadedFiles.value, ...response]
      emits('emitUploaded', response)
      clearAll()
    } catch (error) {
      handleAxiosError(error)
    } finally {
      isUploading.value = false
    }
  }

  function clearAll() {
    files.value = []
    previews.value = []

    // Reset file input
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  function removeUploadedFile(index: number) {
    uploadedFiles.value.splice(index, 1)
  }

  function truncateFileName(name: string, maxLength: number = 20): string {
    if (name.length <= maxLength) return name
    const extension = name.split('.').pop()
    const nameWithoutExt = name.substring(0, name.lastIndexOf('.'))
    const truncated = nameWithoutExt.substring(
      0,
      maxLength - extension!.length - 4
    )
    return `${truncated}...${extension}`
  }

  onMounted(() => {
    if (props.images && props.images.length > 0) {
      uploadedFiles.value = [...props.images].map((url) => ({
        name: url.split('/').pop() || 'image',
        url,
      }))
    }
  })
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="mb-2 block text-sm font-medium text-slate-700">
      {{ label }}
    </label>

    <div class="relative">
      <input
        type="file"
        accept="image/*"
        :name="name"
        multiple
        :disabled="isUploading"
        class="block w-full cursor-pointer rounded-lg border border-slate-300 text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
        @change="onFileChanged($event)"
      />
    </div>

    <div
      v-if="previews.length > 0"
      class="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3"
    >
      <div
        v-for="(preview, index) in previews"
        :key="index"
        class="group relative"
      >
        <div
          class="aspect-square overflow-hidden rounded-lg border-2 border-slate-200 bg-slate-50"
        >
          <img
            :src="preview"
            :alt="`Preview ${index + 1}`"
            class="h-full w-full object-cover"
          />
        </div>

        <!-- Image name overlay -->
        <div class="mt-2 px-2">
          <p
            class="truncate text-xs text-slate-600"
            :title="files[index]?.name"
          >
            {{ truncateFileName(files[index]?.name || '') }}
          </p>
          <p v-if="files[index]" class="text-xs text-slate-400">
            {{ (files[index]?.size / 1024).toFixed(1) }} KB
          </p>
        </div>

        <!-- Remove button -->
        <button
          type="button"
          :disabled="isUploading"
          class="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-lg transition-all duration-200 hover:bg-red-600 active:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 group-hover:opacity-100"
          @click="removeImage(index)"
        >
          <span class="text-lg leading-none">×</span>
        </button>
      </div>
    </div>

    <div
      v-if="files.length > 0"
      class="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
    >
      <p class="text-sm font-medium text-slate-700">
        {{ files.length }} image{{ files.length > 1 ? 's' : '' }} selected
      </p>

      <div class="ml-auto flex gap-2">
        <button
          type="button"
          :disabled="isUploading"
          class="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          @click="saveImages"
        >
          {{ isUploading ? 'Uploading...' : 'Upload Images' }}
        </button>

        <button
          type="button"
          :disabled="isUploading"
          class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          @click="clearAll"
        >
          Clear All
        </button>
      </div>
    </div>

    <!-- Uploaded Files List -->
    <div
      v-if="uploadedFiles.length > 0"
      class="mt-4 rounded-lg border border-slate-200 bg-white p-4"
    >
      <h3 class="mb-3 text-sm font-semibold text-slate-700">
        Uploaded Files ({{ uploadedFiles.length }})
      </h3>

      <div class="space-y-2">
        <div
          v-for="(file, index) in uploadedFiles"
          :key="index"
          class="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:bg-slate-100"
        >
          <div class="flex min-w-0 flex-1 items-center gap-3">
            <!-- Thumbnail -->
            <div
              class="h-12 w-12 flex-shrink-0 overflow-hidden rounded border border-slate-300"
            >
              <img
                :src="userGetServerUrl(file.url)"
                :alt="file.name"
                class="h-full w-full object-cover"
              />
            </div>

            <!-- File info -->
            <div class="min-w-0 flex-1">
              <p
                class="truncate text-sm font-medium text-slate-700"
                :title="file.name"
              >
                {{ file.name }}
              </p>
              <a
                :href="userGetServerUrl(file.url)"
                target="_blank"
                class="text-xs text-blue-600 hover:text-blue-800 hover:underline"
              >
                View file
              </a>
            </div>
          </div>

          <!-- Remove button -->
          <button
            type="button"
            class="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-100 hover:text-red-600"
            @click="removeUploadedFile(index)"
          >
            <span class="text-xl leading-none">×</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
