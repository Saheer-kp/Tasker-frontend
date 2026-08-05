<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

import { getSections } from '@/api/project'
import SectionCard from '@/components/project/SectionCard.vue'

const route = useRoute()

const scrollContainer = ref(null)

const projectId = route.params.id

const loading = ref(false)

const sections = ref([])

const search = ref('')

const nextCursor = ref(null)

const hasMore = ref(false)

const loadMoreRef = ref(null)

let observer = null

const filteredSections = computed(() => {

    if (!search.value) {
        return sections.value
    }

    return sections.value.filter(section =>
        section.name.toLowerCase().includes(search.value.toLowerCase())
    )

})

async function loadSections(cursor = null) {

    if (loading.value) return

    loading.value = true

    try {

        const { data } = await getSections(projectId, cursor)

        sections.value.push(...data.data)

        nextCursor.value = data.meta.next_cursor

        hasMore.value = !!data.meta.next_cursor

    } catch ({ message }) {

        toast.error(message)

    } finally {

        loading.value = false

    }

}

function createObserver() {

    if (observer) {
        observer.disconnect()
    }

    observer = new IntersectionObserver(

        async ([entry]) => {

            if (
                entry.isIntersecting &&
                hasMore.value &&
                !loading.value
            ) {

                await loadSections(nextCursor.value)

            }

        },

        {
            root: scrollContainer.value,
            threshold: 0.2,
        }

    )

    if (loadMoreRef.value) {

        observer.observe(loadMoreRef.value)

    }

}

onMounted(async () => {

    await loadSections()

    createObserver()

})

watch(loadMoreRef, () => {

    createObserver()

})

onBeforeUnmount(() => {

    observer?.disconnect()

})
</script>

<template>

<div class="flex h-full flex-col">

    <div class="border-b bg-white p-8">

        <RouterLink
            to="/dashboard"
            class="text-sm font-medium text-blue-600 hover:underline">

            ← Back to Projects

        </RouterLink>

        <h1 class="mt-4 text-3xl font-bold">

            Project Sections

        </h1>

        <input
            v-model="search"
            type="text"
            placeholder="Search sections..."
            class="mt-6 w-full rounded-xl border border-slate-300 px-5 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >

    </div>

    <div ref="scrollContainer" class="flex-1 overflow-y-auto bg-slate-100 p-8">

        <SectionCard
            v-for="section in filteredSections"
            :key="section.id"
            :section="section"
        />

        <div
            ref="loadMoreRef"
            class="flex h-16 items-center justify-center"
        >

            <span
                v-if="loading"
                class="text-sm text-slate-500"
            >
                Loading...
            </span>

            <span
                v-else-if="!hasMore && sections.length"
                class="text-sm text-slate-400"
            >
                No more sections
            </span>
            <span
                v-else-if="!sections.length"
                class="text-sm text-slate-400"
            >
                No Tasks Defined for This Project
            </span>

        </div>

    </div>

</div>

</template>