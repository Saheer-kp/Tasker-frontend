<script setup>
import { useAiChatStore } from '@/stores/aiChat'
import { useAuthStore } from '@/stores/auth'
// import { sendAiPrompt } from '@/api/aiChat'
import { streamAiPrompt } from '@/api/aiChat'
import { nextTick, ref, watch } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const aiChatStore = useAiChatStore()
const authStore = useAuthStore()

const prompt = ref('')
const loading = ref(false)
const chatBody = ref(null)

watch(
  () => aiChatStore.messages.map((message) => message.content).join(''),
  async () => {
    await nextTick()

    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight
    }
  },
)

const sendPrompt = async () => {
  const message = prompt.value.trim()

  if (!message || loading.value) return

  aiChatStore.messages.push({
    role: 'user',
    content: message,
  })

  aiChatStore.messages.push({
    role: 'assistant',
    content: '',
  })

  const assistantMessage = aiChatStore.messages[aiChatStore.messages.length - 1]

  prompt.value = ''
  loading.value = true

  try {
    await streamAiPrompt(message, async (chunk) => {
      const words = chunk.match(/\S+|\s+/g) || []

      for (const word of words) {
        assistantMessage.content += word

        await new Promise((resolve) => setTimeout(resolve, 40))
      }
    })
  } catch (err) {
    if (err.status === 503) {
      assistantMessage.content = 'Service is temporarily unavailable. Please try again later.'
    } else {
      assistantMessage.content = 'Something went wrong. Please try again later.'
    }
  } finally {
    loading.value = false
  }
}

const renderMarkdown = (content) => {
  const html = marked.parse(content)
  return DOMPurify.sanitize(html)
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Window -->
    <div
      v-if="aiChatStore.isOpen"
      class="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl"
    >
      <!-- Header -->
      <div class="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
        <div>
          <h3 class="font-semibold">Tasker AI</h3>
          <p class="text-xs text-indigo-100">Your AI assistant</p>
        </div>

        <button @click="aiChatStore.isOpen = false" class="text-xl hover:text-gray-200">
          &times;
        </button>
      </div>

      <!-- Chat Body -->
      <div ref="chatBody" class="flex flex-1 flex-col gap-3 overflow-y-auto bg-gray-50 p-4">
        <div
          v-if="aiChatStore.messages.length === 0"
          class="flex flex-1 flex-col items-center justify-center gap-2 bg-gray-50 p-4 text-center"
        >
          <h3 class="font-semibold text-gray-700">Hello {{ authStore.user?.name ?? '' }}</h3>
          <p class="text-sm text-gray-500">
            I'm your Tasker AI assistant. How can I help you today?
          </p>
        </div>

        <div
          v-for="(message, index) in aiChatStore.messages"
          class="flex"
          :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            v-if="message.content"
            class="max-w-[85%] break-words rounded-xl px-3 py-2 text-sm"
            :class="
              message.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 shadow-sm'
            "
          >
            <div
              v-if="message.role === 'assistant'"
              class="markdown-content"
              v-html="renderMarkdown(message.content)"
            ></div>

            <div v-else class="whitespace-pre-wrap">
              {{ message.content }}
            </div>
          </div>

          <div
            v-else-if="
              loading && message.role === 'assistant' && index === aiChatStore.messages.length - 1
            "
            class="flex items-center gap-1 rounded-xl bg-white px-4 py-3 shadow-sm"
          >
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <form @submit.prevent="sendPrompt" class="flex gap-2 border-t border-gray-200 bg-white p-3">
        <input
          v-model.trim="prompt"
          type="text"
          placeholder="Ask anything..."
          class="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
        />

        <button
          :disabled="loading"
          class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>

    <!-- Floating Toggle Button -->
    <div class="flex justify-end">
      <button
        @click="aiChatStore.isOpen = !aiChatStore.isOpen"
        class="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg transition hover:bg-blue-700"
      >
        <!-- {{ aiChatStore.isOpen ? '×' : '💬' }} -->
        <svg
          v-if="!aiChatStore.isOpen"
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"
          />
        </svg>

        <span v-else class="flex h-7 w-7 items-center justify-center text-3xl leading-none"
          >&times;</span
        >
      </button>
    </div>
  </div>
</template>

<style scoped>
.markdown-content :deep(p) {
  margin-bottom: 0.5rem;
}

.markdown-content :deep(strong) {
  font-weight: 700;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  font-weight: 700;
  margin: 0.75rem 0 0.5rem;
}

.markdown-content :deep(ul) {
  list-style: disc;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.markdown-content :deep(ol) {
  list-style: decimal;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.markdown-content :deep(li) {
  margin-bottom: 0.25rem;
}

.markdown-content :deep(code) {
  background: #f3f4f6;
  padding: 2px 4px;
  border-radius: 4px;
}

.markdown-content :deep(pre) {
  overflow-x: auto;
  background: #1f2937;
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
}

.typing-dot {
  width: 7px;
  height: 7px;
  background-color: #9ca3af;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }

  30% {
    transform: translateY(-5px);
    opacity: 1;
  }
}
</style>
