<script setup>
import { onMounted } from 'vue'
import { me } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

onMounted(async () => {

  if (!auth.token) {
    return
  }

  try {
    const { data } = await me()
    
    auth.setUser(data)
  } catch {
    auth.logout()
  }

})
</script>


<template>
  <RouterView />

  <Toaster
    position="top-right"
    close-button
    :toast-options="{
      classNames: {
        success: 'tasker-success-toast'
      }
    }"
  />
</template>

<style scoped></style>
