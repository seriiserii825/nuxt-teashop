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
    <div class="mb-6 text-center">
      <h3 class="mb-3 text-2xl font-bold">Sign in to your account</h3>
      <p class="text-md text-text-light">
        Sign in or create an account<br />
        to place orders!
      </p>
    </div>
    <div class="mb-4">
      <FormInput
        v-if="is_reg"
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
    <Btn :loading="pending" class="mb-4 w-full" @click="send()">
      {{ is_reg ? 'Register' : 'Sign In' }}
    </Btn>
    <Btn variant="btn-outline" class="w-full gap-2 mb-4">
      <img src="/images/google.png" alt="Google" class="inline h-4 w-4" />
      Continue with Google
    </Btn>
    <div v-if="!is_reg" class="text-center text-xs">
      No account?
      <span
        class="cursor-pointer text-accent-dark hover:underline"
        @click="is_reg = true"
        >Create</span
      >
    </div>
    <div v-else class="text-center text-xs">
      Have an account?
      <span
        class="cursor-pointer text-accent-dark hover:underline"
        @click="is_reg = false"
        >Sign in</span
      >
    </div>
  </div>
</template>
