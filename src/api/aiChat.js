export const streamAiPrompt = async (prompt, onChunk, onToolResult) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/ai-chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ prompt }),
  })

  if (!response.ok) {
    const error = new Error('Unable to get AI response')
    error.status = response.status
    throw error
  }

  const contentType = response.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    const result = await response.json()

    await onChunk(result.message)

    return
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()

    if (done) break

    buffer += decoder.decode(value, { stream: true })

    const events = buffer.split('\n\n')
    buffer = events.pop() ?? ''

    for (const event of events) {
      const dataLine = event.split('\n').find((line) => line.startsWith('data: '))

      if (!dataLine) continue

      const data = dataLine.slice(6)

      if (data === '[DONE]') return

      const payload = JSON.parse(data)

      if (payload.type === 'tool_result' && payload.successful) {
        const result = JSON.parse(payload.result)

        if (result.success) {
          await onToolResult?.(result)
        }
      }

      if (payload.type === 'text_delta') {
        await onChunk(payload.delta)
      }
    }
  }
}
