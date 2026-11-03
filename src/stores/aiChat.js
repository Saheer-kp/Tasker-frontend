import { defineStore } from 'pinia'

export const useAiChatStore = defineStore('aiChatStore', {
  state: () => ({
    isOpen: false,
    messages: [],
  }),
})
