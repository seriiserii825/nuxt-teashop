<script setup lang="ts">
  import { authService } from '~/api/services/authService'
  import type {
    IRegisterPayload,
    IRegisterResponse,
  } from '~/interfaces/IRegister'

  const initialData: IRegisterPayload = {
    name: 'John Doe',
    email: '',
    password: '',
  }

  const { form, send, pending } = useForm<IRegisterPayload, IRegisterResponse>(
    authService.register,
    initialData,
    () => {
      useSweetAlert('success', 'Registered successfully!')
    }
  )
</script>

<template>
  <div class="rounded border p-8">
    <div class="mb-6 text-center">
      <h3 class="mb-3 text-2xl font-bold">Regiser new account</h3>
      <p class="text-md text-text-light">
        create an account<br />
        to place orders!
      </p>
    </div>
    <div class="mb-4">
      <FormInput
        v-model="form.name"
        name="form_name"
        placeholder="Enter your name"
      />
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
    <Btn :loading="pending" class="mb-4 w-full" @click="send()"> Register </Btn>
    <BtnGoogle class="mb-4" />
    <div class="text-center text-xs">
      Have an account?
      <NuxtLink
        to="/login"
        class="cursor-pointer text-accent-dark hover:underline"
        >Sign in</NuxtLink
      >
    </div>
  </div>
</template>
