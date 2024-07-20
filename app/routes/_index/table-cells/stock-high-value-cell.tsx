import { Table } from '~/components/table'
import { useStockValueChange } from '../use-stock-value-change'

export function StockHighValueCell({ price }: { price: number }) {
  const { highest } = useStockValueChange(price)

  return <Table.Cell>{highest}</Table.Cell>
}
