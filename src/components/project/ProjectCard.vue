<script setup>
defineProps({
    project: {
        type: Object,
        required: true,
    },
})
</script>

<template>

<RouterLink
    :to="`/projects/${project.id}`"
    class="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
>

    <div
        class="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">

        📁

    </div>

    <h2
        class="line-clamp-1 text-lg font-semibold text-slate-800">

        {{ project.name }}

    </h2>

    <p
        class="mt-2 text-sm text-slate-500">

        Workspace Project

    </p>

    <div
        class="mt-8 flex items-center justify-between">

        <span
            class="text-xs text-slate-400">

            Updated

        </span>

        <span
            class="text-sm font-medium text-blue-600 transition group-hover:translate-x-1">

            Open →

        </span>

    </div>

</RouterLink>

</template>