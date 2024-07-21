import { createCookieSessionStorage, Session } from '@remix-run/node'
import invariant from 'tiny-invariant'

type SessionData = {
  interval: number
}

type SessionFlashData = {
  message: string
}

invariant(process.env.SESSION_SECRET, 'You must set the SESSION_SECRET env var')

const sessionStorage = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 60,
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    secure: true,
  },
})

export function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get('Cookie'))
}

export function commitSession(session: Session<SessionData, SessionFlashData>) {
  return sessionStorage.commitSession(session)
}
