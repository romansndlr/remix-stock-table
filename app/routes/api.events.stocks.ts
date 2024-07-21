import { LoaderFunctionArgs } from '@remix-run/node'
import { isNumber } from 'lodash-es'
import { eventStream } from 'remix-utils/sse/server'
import { emitter } from '~/lib/events.server'
import { getSession } from '~/lib/session.server'
import { getStocks } from '~/services/stocks-service.server'

export const DEFAULT_INTERVAL = 1000

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request)

  const interval = session.get('interval') ?? DEFAULT_INTERVAL

  return eventStream(request.signal, (send) => {
    const event = () => send({ data: JSON.stringify(getStocks()) })

    let timer = setInterval(event, interval)

    emitter.on('update-interval', (newInterval) => {
      if (isNumber(newInterval)) {
        clearInterval(timer)

        timer = setInterval(event, newInterval)
      }
    })

    return () => clearInterval(timer)
  })
}
