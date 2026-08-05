<script setup>

defineProps({
  task: Object,
})

function priorityClass(priority) {

  switch (priority) {

    case 'High':
      return 'bg-red-100 text-red-700'

    case 'Medium':
      return 'bg-yellow-100 text-yellow-700'

    default:
      return 'bg-green-100 text-green-700'

  }

}

function statusClass(status) {

  switch (status) {

    case 'Completed':
      return 'bg-green-100 text-green-700'

    case 'In Progress':
      return 'bg-blue-100 text-blue-700'

    default:
      return 'bg-slate-100 text-slate-700'

  }

}
</script>

<template>

<div
class="border-b border-slate-100 p-4 last:border-0">

    <div
    class="flex items-center justify-between">

        <div>

            <h4
            class="font-medium text-slate-800">

                {{ task.name }}

            </h4>

            <p
            class="mt-1 text-sm text-slate-500">

                {{ task.assignee?.name ?? 'Unassigned' }}

            </p>

        </div>

        <div
        class="flex gap-2">

            <span

                class="rounded-full px-3 py-1 text-xs"

                :class="priorityClass(task.priority)"

            >

                {{ task.priority }}

            </span>

            <span

                class="rounded-full px-3 py-1 text-xs"

                :class="statusClass(task.status)"

            >

                {{ task.status }}

            </span>

        </div>

    </div>

</div>

</template>