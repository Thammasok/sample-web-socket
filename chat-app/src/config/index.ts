export const config = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  globalService: import.meta.env.VITE_GLOBAL_CHAT_URL ?? 'ws://localhost:3210',
}
