import clsx from 'clsx'
import { Table } from '~/components/table'

export function StockValueChangeCell({
  children,
  isGoingUp,
  isGoingDown,
}: {
  children: React.ReactNode
  isGoingUp: boolean
  isGoingDown: boolean
}) {
  return (
    <Table.Cell>
      <span
        className={clsx(
          'flex items-center gap-x-1 truncate transition-colors w-24 text-right',
          isGoingUp && 'text-green-500',
          isGoingDown && 'text-red-500',
          isGoingDown || isGoingUp ? 'justify-between' : 'justify-end'
        )}
      >
        {(isGoingUp || isGoingDown) && (
          <div
            className={clsx(
              'transition-transform',
              isGoingDown && 'rotate-[65deg]'
            )}
          >
            <ArrowTrendingUp />
          </div>
        )}
        {children}
      </span>
    </Table.Cell>
  )
}

export function ArrowTrendingUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
      />
    </svg>
  )
}
