<script setup>
import { ref } from 'vue'
import { getTasks } from '@/api/project'
import TaskItem from './TaskItem.vue'

const props = defineProps({
  section: Object,
})

const expanded = ref(false)

const loading = ref(false)

const loaded = ref(false)

const tasks = ref([])

const nextCursor = ref(null)

const hasMore = ref(false)

async function toggle() {

  expanded.value = !expanded.value

  if (!expanded.value) {
    return
  }

  if (loaded.value) {
    return
  }

  await loadTasks()

}

async function loadTasks() {

  loading.value = true

  try {

    const { data } = await getTasks(
      props.section.id,
      nextCursor.value
    )

    tasks.value.push(...data.data)

    nextCursor.value = data.meta.next_cursor

    hasMore.value = !!data.meta.next_cursor

    loaded.value = true

  } finally {

    loading.value = false

  }

}

async function loadMore() {

  if (loading.value) return

  if (!hasMore.value) return

  await loadTasks()

}

function handleScroll(event) {

  const el = event.target

  if (
    el.scrollTop + el.clientHeight >=
    el.scrollHeight - 80
  ) {

    loadMore()

  }

}
</script>

<template>

<div
class="mb-5 rounded-xl border border-slate-200 bg-white shadow-sm">

    <!-- Header -->

    <button

        @click="toggle"

        class="flex w-full items-center justify-between p-5"

    >

        <span
        class="font-semibold">

            {{ section.name }}

        </span>

        <svg

            class="h-5 w-5 transition"

            :class="expanded ? 'rotate-180':''"

            fill="none"

            stroke="currentColor"

            viewBox="0 0 24 24">

            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"/>

        </svg>

    </button>

    <!-- Body -->

    <div
    v-if="expanded"
    class="border-t">

        <div

            @scroll="handleScroll"

            class="max-h-80 overflow-y-auto"

        >

            <div

                v-if="loading && !tasks.length"

                class="p-5 text-center text-slate-400"

            >

                Loading tasks...

            </div>

            <TaskItem

                v-for="task in tasks"

                :key="task.id"

                :task="task"

            />

            <div

                v-if="loading && tasks.length"

                class="p-3 text-center text-sm text-slate-400"

            >

                Loading more...

            </div>

        </div>

    </div>

</div>

</template>