<script setup lang="ts">
  import { authService } from '~/api/services/authService'
  import type { ILoginPayload } from '~/interfaces/ILoginPayload'
  import type { ILoginResponse } from '~/interfaces/ILoginResonse'

  const initialData: ILoginPayload = {
    email: '',
    password: '',
  }

  const { form, send, pending } = useForm<ILoginPayload, ILoginResponse>(
    authService.login,
    initialData,
    () => {
      useSweetAlert('success', 'Logged in successfully!')
      navigateTo('/')
    }
  )
</script>

<template>
  <div class="rounded border p-8">
    <div class="mb-6 text-center">
      <h3 class="mb-3 text-2xl font-bold">Sign in to your account</h3>
      <p class="text-md text-text-light">
        Sign in to account<br />
        to place orders!
      </p>
    </div>
    <div class="mb-4">
      <FormInput
        v-model="form.email"
        name="form_email"
        type="email"
        placeholder="Enter your email"
      />
      <FormInput
        v-model="form.password"
        name="form_password"
        type="password"
        placeholder="Enter your password"
      />
    </div>
    <Btn :loading="pending" class="mb-4 w-full" @click="send()">Login</Btn>
    <BtnGoogle class="mb-4" />
    <div class="text-center text-xs">
      Don't have an account?
      <NuxtLink
        to="/register"
        class="cursor-pointer text-accent-dark hover:underline"
        >Create</NuxtLink
      >
    </div>
  </div>
</template>
