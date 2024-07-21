import { LoaderFunctionArgs } from '@remix-run/node'
import { isNumber } from 'lodash-es'
import { eventStream } from 'remix-utils/sse/server'
import { getStocks } from '~/services/stocks-service.server'

export const DEFAULT_INTERVAL = 1000

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)

  const interval = Number(url.searchParams.get('interval'))

  if (isNumber(interval)) {
    if (interval < 1000) {
      return new Response('Interval must be at least 1000', { status: 400 })
    }
  } else {
    return new Response('Invalid interval', { status: 400 })
  }

  return eventStream(request.signal, (send) => {
    const event = () => send({ data: JSON.stringify(getStocks()) })

    const timer = setInterval(event, interval ?? DEFAULT_INTERVAL)

    return () => clearInterval(timer)
  })
}
