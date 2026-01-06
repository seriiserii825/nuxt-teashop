<script setup lang="ts">
  import { authService } from '~/api/services/authService'
  import FormInput from '~/components/Form/FormInput.vue'

  const { form, send, pending } = useForm(
    authService.register,
    {
      name: 'John Doe',
      email: '',
      password: '',
    },
    () => {
      console.log('User registered successfully')
    }
  )
</script>

<template>
  <div>
    <div v-if="pending" class="loading mb-4">Loading...</div>
    <div v-else class="mb-4">
      <FormInput
        v-model="form.name"
        label="Name"
        name="name"
        placeholder="Enter your name"
      />
      <FormInput
        v-model="form.email"
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
      />
      <FormInput
        v-model="form.password"
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
      />
    </div>
    <div
      class="cursor-pointer rounded bg-blue-500 p-4 text-white"
      @click="send"
    >
      submit
    </div>
  </div>
</template>
