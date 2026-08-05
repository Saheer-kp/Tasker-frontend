<script setup>
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
</script>

<template>

<div class="flex h-screen bg-slate-100">

    <Sidebar />

    <div class="flex flex-1 flex-col overflow-hidden">

        <Header />

        <main class="flex-1 overflow-y-auto">

            <RouterView />

        </main>

    </div>

</div>

</template>