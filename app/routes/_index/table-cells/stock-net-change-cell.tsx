import { StockValueChangeCell } from './stock-value-change-cell'
import { useStockValueChange } from '../use-stock-value-change'

export function StockNetChangeCell({ price }: { price: string }) {
  const { isGoingDown, isGoingUp, change } = useStockValueChange(Number(price))

  return (
    <StockValueChangeCell isGoingDown={isGoingDown} isGoingUp={isGoingUp}>
      {change}
    </StockValueChangeCell>
  )
}
