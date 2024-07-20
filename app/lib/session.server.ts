import { createCookieSessionStorage, Session } from '@remix-run/node'

type SessionData = {
  interval: number
}

type SessionFlashData = {
  message: string
}

const sessionStorage = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 60,
    sameSite: 'lax',
    secrets: ['s3cret1'],
    secure: true,
  },
})

export function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get('Cookie'))
}

export function commitSession(session: Session<SessionData, SessionFlashData>) {
  return sessionStorage.commitSession(session)
}
