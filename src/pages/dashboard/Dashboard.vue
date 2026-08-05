<script setup>
import { computed, onMounted, ref } from 'vue'
import { getProjects } from '@/api/project'
import ProjectCard from '@/components/project/ProjectCard.vue'

const loading = ref(false)

const projects = ref([])

const search = ref('')

const filteredProjects = computed(() => {

    if (!search.value) {
        return projects.value
    }

    return projects.value.filter(project =>
        project.name
            .toLowerCase()
            .includes(search.value.toLowerCase())
    )

})

async function loadProjects() {

    loading.value = true

    try {

        const { data } = await getProjects()

        projects.value = data.data

    } 
    catch (error) {

        toast.error(error.message || 'Failed to load projects.')

    }
    finally {

        loading.value = false

    }

}

onMounted(loadProjects)

</script>

<template>

<div class="p-8">

    <div
        class="mb-8 flex items-center justify-between">

        <div>

            <h1
                class="text-3xl font-bold text-slate-800">

                My Projects

            </h1>

            <p
                class="mt-2 text-slate-500">

                Manage all your workspace projects.

            </p>

        </div>

        <button
            class="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">

            + New Project

        </button>

    </div>

    <div
        class="mb-8">

        <input

            v-model="search"

            type="text"

            placeholder="Search projects..."

            class="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"

        >

    </div>

    <!-- Loading -->

    <div

        v-if="loading"

        class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"

    >

        <div

            v-for="i in 6"

            :key="i"

            class="h-56 animate-pulse rounded-2xl bg-white"

        />

    </div>

    <!-- Empty -->

    <div

        v-else-if="filteredProjects.length===0"

        class="rounded-2xl bg-white p-20 text-center"

    >

        <h2
            class="text-xl font-semibold">

            No Projects Found

        </h2>

        <p
            class="mt-2 text-slate-500">

            Create your first project.

        </p>

    </div>

    <!-- Cards -->

    <div

        v-else

        class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"

    >

        <ProjectCard

            v-for="project in filteredProjects"

            :key="project.id"

            :project="project"

        />

    </div>

</div>

</template>