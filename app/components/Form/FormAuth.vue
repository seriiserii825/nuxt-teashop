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

  const is_reg = ref(false)
</script>

<template>
  <div class="rounded border p-8">
    <div class="text-center">
      <h3 class="mb-3 text-2xl font-bold">Sign in to your account</h3>
      <p class="text-md text-text-light">
        Sign in or create an account<br />
        to place orders!
      </p>
    </div>
    <div class="mb-4">
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
    <div class="btn w-full" @click="send">Continue</div>
  </div>
</template>
