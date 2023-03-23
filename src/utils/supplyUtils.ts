import { BigDecimal } from '@graphprotocol/graph-ts'
import { DailyTokenSupply, HourlyTokenSupply, TokenSupply } from '../types/schema'
import { splitAmount } from './coinUtils'
import { SEC_IN_DAY, SEC_IN_HOUR, ZERO_BD } from './consts'

export function updateTokenMetrics(time: i32, amount: string, mint: boolean): void {
  let amount_split = splitAmount(amount)
  let value = BigDecimal.fromString(amount_split[0])
  let denom = amount_split[1]
  if (denom == '') {
    return
  }

  updateTokenSupply(value, denom, mint)
  updateHourlyTokenSupply(time, value, denom, mint)
  updateDailyTokenSupply(time, value, denom, mint)
}

function updateTokenSupply(value: BigDecimal, denom: string, mint: boolean): void {
  let tokenSupply = TokenSupply.load(denom)
  if (tokenSupply === null) {
    tokenSupply = new TokenSupply(denom)
    tokenSupply.totalSupply = ZERO_BD
    tokenSupply.totalMinted = ZERO_BD
    tokenSupply.totalBurned = ZERO_BD
  }

  if (mint) {
    tokenSupply.totalSupply = tokenSupply.totalSupply.plus(value)
    tokenSupply.totalMinted = tokenSupply.totalMinted.plus(value)
  } else {
    tokenSupply.totalSupply = tokenSupply.totalSupply.minus(value)
    tokenSupply.totalBurned = tokenSupply.totalBurned.plus(value)
  }

  tokenSupply.save()
}

function updateHourlyTokenSupply(
  time: i32,
  value: BigDecimal,
  denom: string,
  mint: boolean,
): void {
  let hourId = time / SEC_IN_HOUR
  let hourStartTimestamp = hourId * SEC_IN_HOUR

  let hourlyTokenSupplyId = denom.concat('-').concat(hourStartTimestamp.toString())
  let hourlyTokenSupply = HourlyTokenSupply.load(hourlyTokenSupplyId)
  if (hourlyTokenSupply === null) {
    hourlyTokenSupply = new HourlyTokenSupply(hourlyTokenSupplyId)
    hourlyTokenSupply.hour = hourStartTimestamp
    hourlyTokenSupply.totalSupply = ZERO_BD
    hourlyTokenSupply.totalMinted = ZERO_BD
    hourlyTokenSupply.totalBurned = ZERO_BD
  }

  if (mint) {
    hourlyTokenSupply.totalSupply = hourlyTokenSupply.totalSupply.plus(value)
    hourlyTokenSupply.totalMinted = hourlyTokenSupply.totalMinted.plus(value)
  } else {
    hourlyTokenSupply.totalSupply = hourlyTokenSupply.totalSupply.minus(value)
    hourlyTokenSupply.totalBurned = hourlyTokenSupply.totalBurned.plus(value)
  }

  hourlyTokenSupply.save()
}

function updateDailyTokenSupply(
  time: i32,
  value: BigDecimal,
  denom: string,
  mint: boolean,
): void {
  let dayId = time / SEC_IN_DAY
  let dayStartTimestamp = dayId * SEC_IN_DAY

  let dailyTokenSupplyId = denom.concat('-').concat(dayStartTimestamp.toString())
  let dailyTokenSupply = DailyTokenSupply.load(dailyTokenSupplyId)
  if (dailyTokenSupply === null) {
    dailyTokenSupply = new DailyTokenSupply(dailyTokenSupplyId)
    dailyTokenSupply.date = dayStartTimestamp
    dailyTokenSupply.totalSupply = ZERO_BD
    dailyTokenSupply.totalMinted = ZERO_BD
    dailyTokenSupply.totalBurned = ZERO_BD
  }

  if (mint) {
    dailyTokenSupply.totalSupply = dailyTokenSupply.totalSupply.plus(value)
    dailyTokenSupply.totalMinted = dailyTokenSupply.totalMinted.plus(value)
  } else {
    dailyTokenSupply.totalSupply = dailyTokenSupply.totalSupply.minus(value)
    dailyTokenSupply.totalBurned = dailyTokenSupply.totalBurned.plus(value)
  }

  dailyTokenSupply.save()
}
