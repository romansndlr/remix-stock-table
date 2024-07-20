import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import './tailwind.css'
import React from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix stocks' },
    {
      name: 'description',
      content: 'A live updating stocks table built with Remix',
    },
  ]
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
        <main className="flex items-center justify-center h-full">
          {children}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
