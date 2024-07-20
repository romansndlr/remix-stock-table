import { useStockValueChange } from '../use-stock-value-change'
import { StockValueChangeCell } from './stock-value-change-cell'

export function StockPercentageChangeCell({ price }: { price: string }) {
  const { isGoingDown, isGoingUp, percentage } = useStockValueChange(
    Number(price)
  )

  return (
    <StockValueChangeCell isGoingDown={isGoingDown} isGoingUp={isGoingUp}>
      {percentage}%
    </StockValueChangeCell>
  )
}
