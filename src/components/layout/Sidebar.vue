<template>

<aside
class="flex w-64 flex-col border-r border-slate-200 bg-white">

    <div
    class="border-b p-6">

        <h2
        class="text-xl font-bold">

            Workspace

        </h2>

    </div>

    <nav
    class="space-y-2 p-4">

        <RouterLink

            to="/dashboard"

            class="block rounded-lg px-4 py-3 transition"

            active-class="bg-blue-50 text-blue-700 font-semibold"

        >

            My Projects

        </RouterLink>

        <RouterLink

            to="/invitations"

            class="block rounded-lg px-4 py-3 transition"

            active-class="bg-blue-50 text-blue-700 font-semibold"

        >

            Invitations

        </RouterLink>

        <RouterLink

            to="/settings"

            class="block rounded-lg px-4 py-3 transition"

            active-class="bg-blue-50 text-blue-700 font-semibold"

        >

            Settings

        </RouterLink>

    </nav>

</aside>

</template>