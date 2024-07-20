import { faker } from '@faker-js/faker'
import { capitalize } from 'lodash-es'

function generateFakeStockName() {
  const includeNumbers = Math.random() > 0.5

  if (includeNumbers) {
    const roundNumbers = [30, 35, 50, 100, 500]

    const number = roundNumbers[Math.floor(Math.random() * roundNumbers.length)]

    return `${capitalize(faker.word.adjective())} ${capitalize(
      faker.word.noun()
    )} ${Math.round(number)}`
  } else {
    return `${capitalize(faker.word.adjective())} ${capitalize(
      faker.word.noun()
    )}`
  }
}

const stockListBlueprint = Array.from({ length: 10 }, () => ({
  name: generateFakeStockName(),
  priceRange: {
    min: faker.finance.amount({ min: 10, max: 500, dec: 0 }),
    max: faker.finance.amount({ min: 501, max: 1000, dec: 0 }),
  },
}))

export function getStocks() {
  return stockListBlueprint.map((stock) => ({
    name: stock.name,
    price: faker.finance.amount({
      min: Number(stock.priceRange.min),
      max: Number(stock.priceRange.max),
      dec: 2,
    }),
  }))
}
