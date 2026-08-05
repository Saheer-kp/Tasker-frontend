<script setup>

const props = defineProps({

    section: Object

})

</script>

<template>

<div
class="mb-5 rounded-xl border border-slate-200 bg-white shadow-sm">

    <button

        class="flex w-full items-center justify-between p-5"

    >

        <div>

            <h2

                class="text-lg font-semibold"

            >

                {{ section.name }}

            </h2>

        </div>

        <svg

            class="h-5 w-5"

            fill="none"

            stroke="currentColor"

            viewBox="0 0 24 24">

            <path

                stroke-linecap="round"

                stroke-linejoin="round"

                stroke-width="2"

                d="M19 9l-7 7-7-7"

            />

        </svg>

    </button>

</div>

</template>