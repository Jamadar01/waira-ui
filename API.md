# Waira — backend API

The frontend talks to one agent endpoint. Everything about Wajid — background,
skills, availability, scheduling — is answered by the agent, so there is no
separate profile API and nothing about him is duplicated in the frontend.

Base URL comes from `VITE_API_URL`. In development that is `/api`, proxied to
the backend by the Vite dev server (`vite.config.js`) so requests stay
same-origin.

Backend today: FastAPI (`WAIRA` 0.1.0) on `http://127.0.0.1:8000`.

| Endpoint | Status | Purpose |
|----------|--------|---------|
| `POST /api/agent` | **live, wired** | Every visitor message |
| `GET /api/health` | **live**, client has `checkHealth()` but no UI uses it | Liveness |

---

## `POST /api/agent`

**Request**

```json
{ "question": "Is he open to remote work?" }
```

**Response**

```json
{ "response": "Markdown. Bold, lists, and code fences all render." }
```

Called from `askAgent()` in `src/lib/api.js`. The client requires `response` to
be a string; anything else is reported to the visitor as a malformed response.

### Known gaps

- **No conversation history.** The request carries a bare `question`, so each
  turn is answered with no knowledge of the previous ones. Follow-ups like
  "and where is he based?" cannot resolve. Fix by accepting a `history` array
  of `{ role, content }` — the frontend already has the thread and can send it
  in one small change.
- **Scope limiting lives here.** The frontend no longer holds any refusal
  copy. If Waira should decline anything outside profile and scheduling, the
  agent's prompt must enforce it.
- **Scheduling is not implemented.** The agent can talk about availability but
  cannot book anything or deliver a message. See below.

## `GET /api/health`

```json
{ "status": "ok", "database": "test" }
```

---

## Still to build

**Taking a message.** Waira tells recruiters it will pass a note to Wajid, and
right now nothing is delivered anywhere. Either the agent gains a tool that
records `{ name, company, email, message }`, or add `POST /api/notes`.

**Booking.** Same shape of problem — either an agent tool that reads real
availability and writes an event, or `POST /api/meetings` plus
`GET /api/availability`. Simplest interim: have the agent hand out a booking
link.

---

## CORS

The backend currently sends **no CORS headers** — `OPTIONS /api/agent` returns
405. Browser calls from another origin are blocked; curl works because curl
does not preflight. The dev proxy sidesteps this by keeping requests
same-origin.

**Production will need it.** Add to the FastAPI app:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-deployed-frontend"],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)
```

Or serve the built frontend from the same origin as the API, and the question
disappears.

## Other cross-cutting

- **No auth** — the page is public, so nothing here should return data you
  would not put on a public page.
- **Rate limiting** on `/agent`: it is open to the internet and every call
  costs an LLM request.
- **Timeouts** are client-side at 60s per request, via `AbortController`.
- **Error bodies are ignored.** Any non-2xx shows a generic message built from
  the status code; FastAPI's `detail` is not displayed. Change `request()` in
  `src/lib/api.js` if you want server-written error copy to reach the visitor.
