<script setup lang="ts">
  import { ref } from 'vue'

  import { fileService } from '~/api/services/fileService'
  import type { IFileUpload } from '~/interfaces/IFileUpload'

  const emits = defineEmits(['emitUploaded'])

  defineProps({
    label: {
      type: String,
      default: 'Upload Images',
    },
    name: {
      type: String,
      default: 'images',
    },
  })

  const files = ref<File[]>([])
  const previews = ref<string[]>([])

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

    try {
      const formData = new FormData()

      // Append all files
      files.value.forEach((file) => {
        formData.append('files', file)
      })

      try {
        const response: IFileUpload[] = await fileService.upload(
          formData,
          'products'
        )
        emits('emitUploaded', response)
      } catch (error) {
        handleAxiosError(error)
      }
      clearAll()
    } catch (error) {
      console.error(error)
    }
  }

  function clearAll() {
    files.value = []
    previews.value = []
  }
</script>

<template>
  <div class="file-upload">
    <label v-if="label" class="mb-2 block font-medium">
      {{ label }}
    </label>
    <input
      type="file"
      accept="image/*"
      :name="name"
      multiple
      class="file-input"
      @change="onFileChanged($event)"
    />

    <div v-if="previews.length > 0" class="preview-grid">
      <div
        v-for="(preview, index) in previews"
        :key="index"
        class="preview-item"
      >
        <img :src="preview" :alt="`Preview ${index + 1}`" />
        <button class="remove-btn" type="button" @click="removeImage(index)">
          ×
        </button>
      </div>
    </div>

    <div v-if="files.length > 0" class="actions">
      <p>{{ files.length }} image(s) selected</p>
      <button type="button" class="save-btn" @click="saveImages">
        Upload Images
      </button>
      <button type="button" class="clear-btn" @click="clearAll">
        Clear All
      </button>
    </div>
  </div>
</template>
