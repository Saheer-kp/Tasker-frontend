<script setup>
import { register } from '@/api/auth';
import { useAuthStore } from '@/stores/auth';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

const authStore = useAuthStore();
const router = useRouter();
const submitting = ref(false);
const errors = ref({});

const form = reactive({
    name: '',    
    email: '',    
    password: '',    
    password_confirmation: '',    
});

const submitForm = async () => {
    submitting.value = true;
    
    try {
        const { data } =  await register(form);
        authStore.setAuth(data.user, data.token);
        toast.success(`Welcome ${data.user.name}!!`);
        router.push('/dashboard');
    } catch (error) {
        errors.value = error.errors;
    }finally {
        submitting.value = false;
    }
}




</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-white px-4 py-10">
    <div class="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

      <!-- Logo -->
      <div class="mb-6 flex justify-center">
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg">
          T
        </div>
      </div>

      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-slate-800">
          Create Account
        </h1>

        <p class="mt-2 text-slate-500">
          Create your Tasker workspace account
        </p>
      </div>

      <form class="space-y-5" @submit.prevent="submitForm">

        <!-- Name -->
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">
            Full Name
          </label>

         <input
            type="text"
            v-model="form.name"
            placeholder="Enter your full name"
            class="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4"
            :class="errors?.name
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'"
            />
          <p
            v-if="errors.name"
            class="mt-2 text-sm text-red-600"
          >
            {{ errors.name[0] }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            v-model="form.email"
            placeholder="Enter your email"
            class="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4"
            :class="errors?.email
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'"
          >
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
            type="password"
            v-model="form.password"
            placeholder="Enter your password"
            class="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4"
            :class="errors?.password
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'"
          >
          <p
            v-if="errors.password"
            class="mt-2 text-sm text-red-600"
          >
            {{ errors.password[0] }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">
            Confirm Password
          </label>

          <input
            type="password"
            v-model="form.password_confirmation"
            placeholder="Confirm your password"
            class="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4"
            :class="errors?.password_confirmation
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'"
          >
          <p
            v-if="errors.password_confirmation"
            class="mt-2 text-sm text-red-600"
          >
            {{ errors.password_confirmation[0] }}
          </p>
        </div>

        <button
          :disabled="submitting"
          class="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
        <svg
            v-if="submitting"
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
          <!-- {{ submitting ? 'Creating Account..' : 'Create Account' }} -->
             <Transition name="fade" mode="out-in">
                <span :key="submitting">
                {{ submitting ? 'Creating Account...' : 'Create Account' }}
                </span>
            </Transition>
        </button>   

      </form>

      <div class="mt-8 text-center text-sm text-slate-600">
        Already have an account?

        <RouterLink
          to="/"
          class="font-semibold text-blue-600 hover:text-blue-700"
        >
          Sign In
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>