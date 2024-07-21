import {
  ClientLoaderFunctionArgs,
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import './tailwind.css'
import React from 'react'
import { useToastQueue } from '@react-stately/toast'
import { toastQueue, ToastRegion } from './components/toast'
import { commitSession, getSession } from './lib/session.server'
import { json, LoaderFunctionArgs } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix stocks' },
    {
      name: 'description',
      content: 'A live updating stocks table built with Remix',
    },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request)

  const message = session.get('message')

  return json(
    { message },
    { headers: { 'Set-Cookie': await commitSession(session) } }
  )
}

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const { message } = await serverLoader<typeof loader>()

  if (message) {
    toastQueue.add({ title: message }, { timeout: 5000 })
  }

  return null
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gradient-to-r from-indigo-500 to-violet-500">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const state = useToastQueue(toastQueue)

  return (
    <>
      <main className="flex items-center justify-center h-full p-6">
        <Outlet />
      </main>
      <ToastRegion state={state} />
    </>
  )
}
