import React from 'react'

export function useStockValueChange(value: number) {
  const [change, setChange] = React.useState(0)
  const currentValueRef = React.useRef(value)
  const lowestValueRef = React.useRef(value)
  const highestValueRef = React.useRef(value)

  const isGoingUp = React.useMemo(() => change > 0, [change])
  const isGoingDown = React.useMemo(() => change < 0, [change])

  const percentage = React.useMemo(
    () => ((change / currentValueRef.current) * 100).toFixed(2),
    [change]
  )

  React.useEffect(() => {
    const currentPrice = currentValueRef.current
    const diff = value - currentPrice

    setChange(diff)

    if (value < lowestValueRef.current) {
      lowestValueRef.current = value
    }

    if (value > highestValueRef.current) {
      highestValueRef.current = value
    }

    currentValueRef.current = value
  }, [value])

  return {
    percentage,
    isGoingUp,
    isGoingDown,
    change: change.toFixed(2),
    lowest: lowestValueRef.current,
    highest: highestValueRef.current,
  }
}
