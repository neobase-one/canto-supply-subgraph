import { BigDecimal } from '@graphprotocol/graph-ts'

export function splitAmount(amount: string): string[] {
  // find index where value ends & denom begins
  let i = 0
  for (i = 0; i < amount.length; i++) {
    if (isNaN(parseInt(amount[i]))) {
      break
    }
  }

  // split value
  let value = getBigDecimalFromValue(amount.substring(0, i)).toString()
  let denom = amount.substring(i)

  return [value, denom]
}

function getBigDecimalFromValue(value: string): BigDecimal {
  if (value == '') {
    value = '0'
  }

  return BigDecimal.fromString(value)
}
