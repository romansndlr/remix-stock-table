import React from 'react'
import { json, useLoaderData } from '@remix-run/react'
import { useEventSource } from 'remix-utils/sse/react'
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { z } from 'zod'
import { getClientLocales } from 'remix-utils/locales/server'
import { getStocks } from '~/services/stocks-service.server'
import { Table } from '~/components/table'
import { commitSession, getSession } from '~/lib/session.server'
import { DEFAULT_INTERVAL } from '../api.events.stocks'
import { StockPercentageChangeCell } from './table-cells/stock-percentage-change-cell'
import { StockNetChangeCell } from './table-cells/stock-net-change-cell'
import { StockLowValueCell } from './table-cells/stock-low-value-cell'
import { StockHighValueCell } from './table-cells/stock-high-value-cell'
import { StocksUpdateIntervalModal } from './stocks-update-interval-modal'
import { emitter } from '~/lib/events.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request)

  const interval = session.get('interval') ?? DEFAULT_INTERVAL

  return json({ stocks: getStocks(), interval })
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const interval = formData.get('interval')

  const session = await getSession(request)

  const currentInterval = session.get('interval')

  const StockUpdateEventConfigurationSchema = z
    .object({
      interval: z
        .number({ coerce: true })
        .min(1000, { message: "Interval can't be faster than 1s" })
        .max(10000, { message: "Interval can't be slower than 10s" }),
    })
    .superRefine((data, ctx) => {
      if (data.interval === currentInterval) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Interval is already set to this value',
          path: ['interval'],
        })
      }
    })

  try {
    const validated = await StockUpdateEventConfigurationSchema.parseAsync({
      interval,
    })

    session.set('interval', validated.interval)
    emitter.emit('update-interval', validated.interval)

    const locales = getClientLocales(request)

    session.flash(
      'message',
      `Interval updated to ${validated.interval.toLocaleString(locales)} ms`
    )

    return json(
      { ok: true },
      { headers: { 'Set-Cookie': await commitSession(session) } }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json(
        { ok: false, errors: error.flatten().fieldErrors },
        { status: 422 }
      )
    }

    throw error
  }
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>()
  const stocksEventData = useEventSource('/api/events/stocks')

  const stocks = React.useMemo(() => {
    if (!stocksEventData) return loaderData.stocks

    return JSON.parse(stocksEventData) as (typeof loaderData)['stocks']
  }, [loaderData.stocks, stocksEventData])

  return (
    <div className="flex flex-col gap-5">
      <StocksUpdateIntervalModal />
      <Table aria-label="Stocks">
        <Table.Header>
          <Table.Column id="name" isRowHeader>
            Name
          </Table.Column>
          <Table.Column align="right" id="last">
            Last
          </Table.Column>
          <Table.Column align="right" id="high">
            High
          </Table.Column>
          <Table.Column align="right" id="low">
            Low
          </Table.Column>
          <Table.Column align="right" id="net-change">
            Net change
          </Table.Column>
          <Table.Column align="right" id="percentage-change">
            % Change
          </Table.Column>
        </Table.Header>
        <Table.Body items={stocks}>
          {({ name, price }) => (
            <Table.Row id={name}>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{price}</Table.Cell>
              <StockHighValueCell price={Number(price)} />
              <StockLowValueCell price={Number(price)} />
              <StockNetChangeCell price={price} />
              <StockPercentageChangeCell price={price} />
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}
