import clsx from 'clsx'
import {
  Cell,
  CellProps,
  Column,
  ColumnProps,
  Row,
  RowProps,
  Table,
  TableBody,
  TableHeader,
  TableProps,
} from 'react-aria-components'

function _Table(props: TableProps) {
  return (
    <article className="overflow-auto relative bg-white rounded-lg shadow text-gray-600">
      <Table {...props} className="border-separate border-spacing-0" />
    </article>
  )
}

function _Row<T extends object>(props: RowProps<T>) {
  return (
    <Row
      {...props}
      className="even:bg-slate-100 selected:bg-slate-600 cursor-default group outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-600 focus-visible:-outline-offset-4"
    />
  )
}

function _Cell(props: CellProps) {
  return <Cell {...props} className="px-4 py-2 truncate" />
}

function _Column({
  align = 'left',
  ...props
}: ColumnProps & { align?: 'left' | 'right' | 'center' }) {
  return (
    <Column
      {...props}
      className={clsx(
        'px-4 py-2 border-0 border-b border-solid border-slate-300 bg-slate-200 font-bold cursor-default first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap outline-none',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right'
      )}
    />
  )
}

_Table.Row = _Row
_Table.Cell = _Cell
_Table.Column = _Column
_Table.Header = TableHeader
_Table.Body = TableBody

export { _Table as Table }
