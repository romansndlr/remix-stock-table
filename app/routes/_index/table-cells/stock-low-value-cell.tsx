import { Table } from '~/components/table'
import { useStockValueChange } from '../use-stock-value-change'

export function StockLowValueCell({ price }: { price: number }) {
  const { lowest } = useStockValueChange(price)

  return <Table.Cell>{lowest}</Table.Cell>
}
