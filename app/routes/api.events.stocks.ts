import { LoaderFunctionArgs } from '@remix-run/node'
import { eventStream } from 'remix-utils/sse/server'
import { getStocks } from '~/services/stocks-service.server'

export const DEFAULT_INTERVAL = 1000

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)

  const interval = url.searchParams.get('interval')

  return eventStream(request.signal, (send) => {
    const event = () => send({ data: JSON.stringify(getStocks()) })

    const timer = setInterval(
      event,
      interval ? Number(interval) : DEFAULT_INTERVAL
    )

    return () => clearInterval(timer)
  })
}
