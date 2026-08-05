<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>

<header
class="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">

    <div>

        <h1
        class="text-xl font-bold text-slate-800">

            Tasker

        </h1>

    </div>

    <div
    class="flex items-center gap-3">

        <button
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">

            + Project

        </button>

        <RouterLink
        to="/invitations"
        class="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50">

            Invitations

        </RouterLink>

        <button
        class="flex items-center gap-3 rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">

            <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">

                {{ auth.user?.name?.charAt(0) }}

            </div>

            <div class="text-left">

                <p
                class="text-sm font-semibold">

                    {{ auth.user?.name }}

                </p>

                <p
                class="text-xs text-slate-500">

                    {{ auth.user?.email }}

                </p>

            </div>

        </button>

    </div>

</header>

</template>