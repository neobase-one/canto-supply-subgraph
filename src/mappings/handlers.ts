import { BigDecimal, cosmos, log } from '@graphprotocol/graph-ts'
import { updateTokenMetrics } from '../utils/supplyUtils'

/* * * * * *
 * MINT
 * * * * * */
export function handleCoinbase(eventData: cosmos.EventData): void {
  /* EXPLORING DS
  log.warning('{} {} {} {}', [
    'handleCoinbase',
    eventData.block.header.height.toString(),
    eventData.block.header.appHash.toHexString(),
    eventData.event.attributes.length.toString(),
  ])

  for (var i = 0; i < eventData.event.attributes.length; i++) {
    let att = eventData.event.attributes[i]
    log.warning('{} {} {} {}', [
      att.index.toString(),
      att.key,
      att.value,
    ])
  }
  // */

  //
  updateTokenMetrics(
    eventData.block.header.time.seconds as i32,
    eventData.event.getAttributeValue('amount'),
    true,
  )
}

export function handleCoinReceived(eventData: cosmos.EventData): void {
  /* EXPLORING DS
  log.warning('{} {} {} {}', [
    'handleCoinReceived',
    eventData.block.header.height.toString(),
    eventData.block.header.appHash.toHexString(),
    eventData.event.attributes.length.toString(),
  ])

  for (var i = 0; i < eventData.event.attributes.length; i++) {
    let att = eventData.event.attributes[i]
    log.warning('{} {} {}', [att.index.toString(), att.key, att.value])
    if (att.value == '') {
      log.warning('LOL [{}] [{}]', [att.value, BigDecimal.fromString('0').toString()])
    }
  }

  eventData.event.getAttribute('amount')
  log.warning('TIME {} {}', [
    eventData.block.header.time.nanos.toString(),
    eventData.block.header.time.seconds.toString(),
  ])
  // */

  //
  updateTokenMetrics(
    eventData.block.header.time.seconds as i32,
    eventData.event.getAttributeValue('amount'),
    true,
  )
}

/* * * * * *
 * BURN
 * * * * * */
export function handleBurn(eventData: cosmos.EventData): void {
  /* EXPLORING DS
  log.warning('{} {} {} {}', [
    'handleBurn',
    eventData.block.header.height.toString(),
    eventData.block.header.appHash.toHexString(),
    eventData.event.attributes.length.toString(),
  ])

  for (var i = 0; i < eventData.event.attributes.length; i++) {
    let att = eventData.event.attributes[i]
    log.warning('{} {} {}', [att.index.toString(), att.key, att.value])
  }
  // */

  //
  updateTokenMetrics(
    eventData.block.header.time.seconds as i32,
    eventData.event.getAttributeValue('amount'),
    false,
  )
}

export function handleCoinSpent(eventData: cosmos.EventData): void {
  /** EXPLORING DS
  log.warning('{} {} {} {}', [
    'handleCoinSpent',
    eventData.block.header.height.toString(),
    eventData.block.header.appHash.toHexString(),
    eventData.event.attributes.length.toString(),
  ])

  for (var i = 0; i < eventData.event.attributes.length; i++) {
    let att = eventData.event.attributes[i]
    log.warning('{} {} {}', [att.index.toString(), att.key, att.value])
  }
  // **/

  //
  updateTokenMetrics(
    eventData.block.header.time.seconds as i32,
    eventData.event.getAttributeValue('amount'),
    false,
  )
}
