<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { login } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

import { toast } from 'vue-sonner'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const errors = ref({})
const invalidCredentials = ref('')

const form = reactive({
  email: '',  
  password: '',
})

const submit = async () => {
  loading.value = true

  try {
    const { data } = await login(form)

    authStore.setAuth(data.user, data.token)
    toast.success('Welcome back data.user.name!!')
    router.push('/dashboard')
  } catch (error) {
    errors.value = error.errors
    invalidCredentials.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-slate-100 px-4"
  >
    <!-- Background Blur -->
    <div
      class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"
    ></div>

    <div
      class="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl"
    ></div>

    <!-- Card -->
    <div
      class="relative w-full max-w-md rounded-3xl border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur"
    >
      <!-- Logo -->
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg"
        >
          T
        </div>

        <h1 class="text-3xl font-bold text-slate-800">Welcome Back</h1>

        <p class="mt-2 text-sm text-slate-500">
          Sign in to continue to Tasker
        </p>
      </div>

      <!-- Invalid Credentials -->
      <div
        v-if="invalidCredentials"
        class="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
      >
        {{ invalidCredentials }}
      </div>

      <form @submit.prevent="submit" class="space-y-5">
        <!-- Email -->
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>

          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
          />

          <p
            v-if="errors.email"
            class="mt-2 text-sm text-red-600"
          >
            {{ errors.email[0] }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
          />

          <p
            v-if="errors.password"
            class="mt-2 text-sm text-red-600"
          >
            {{ errors.password[0] }}
          </p>
        </div>

        <!-- Remember -->
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              class="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Remember me
          </label>

          <a
            href="#"
            class="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </a>
        </div>

        <!-- Button -->
        <button
          type="submit"
          :disabled="loading"
          class="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            v-if="loading"
            class="mr-2 h-5 w-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />

            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>

          {{ loading ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-8 text-center text-sm text-slate-500">
        Don't have an account?

        <RouterLink
          to="/register"
          class="font-semibold text-blue-600 hover:text-blue-700"
        >
          Create Account
        </RouterLink>
      </div>
    </div>
  </div>
</template>