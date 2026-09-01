/**
 * The one place that talks to the backend.
 *
 * Point it at your server with `VITE_API_URL` (see `.env.example`). With
 * nothing configured the app makes no requests at all and says so.
 *
 * The agent answers everything — profile questions, availability, scheduling.
 * There is no separate profile endpoint by design.
 *
 *   GET  /health              → { status, ... }
 *   POST /agent  { question } → { response }
 */

const BASE = (import.meta.env.VITE_API_URL ?? '').trim().replace(/\/+$/, '')

/** False when no `VITE_API_URL` is set. */
export const isApiConfigured = BASE.length > 0

// Generous: the agent may be doing retrieval and an LLM call behind this.
const TIMEOUT_MS = 60000

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path, options = {}) {
  if (!isApiConfigured) throw new ApiError('No API URL configured.')

  // Every request gets its own timeout so a hung server can't freeze the UI.
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      ...options,
    })

    if (!response.ok) {
      throw new ApiError(`The server returned ${response.status}.`, response.status)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (error.name === 'AbortError') throw new ApiError('The request timed out.')
    throw new ApiError('Could not reach the server.')
  } finally {
    clearTimeout(timer)
  }
}

/** Liveness check. Not used by the UI yet — handy for a status indicator. */
export function checkHealth() {
  return request('/health')
}

/**
 * Ask the agent one question.
 *
 * The endpoint takes a bare question with no thread, so each turn is answered
 * without knowledge of the previous ones. Add a `history` field server-side
 * when follow-ups like "and where is he based?" need to resolve.
 */
export async function askAgent(question) {
  const data = await request('/agent', {
    method: 'POST',
    body: JSON.stringify({ question }),
  })

  if (typeof data?.response !== 'string') {
    throw new ApiError('The server sent a response we could not read.')
  }

  return data.response
}
