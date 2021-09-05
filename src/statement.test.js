const invoices = require('./invoices.json')
const plays = require('./plays.json')
import { htmlStatement, statement, usd } from './statement'

test('statement로 invoice 출력', () => {
  expect(statement(invoices[0], plays)).toBe(
    `청구 내역 (고객명: BigCo)\n Hamlet: $650.00 (55석)\n As You Like It: $580.00 (35석)\n Othello: $500.00 (40석)\n총액: $1,730.00\n적립 포인트: 47점\n`
  )
})

test('usd 출력', () => {
  expect(usd(1000)).toBe('$10.00')
})

test('statement로 html 출력', () => {
  expect(htmlStatement(invoices[0], plays)).toBe(
    `<h1>청구 내역 (고객명: BigCo)</h1>\n<table>\n<tr><th>연극</th><th>좌석 수</th><th>금액</th>\n  <tr><td>Hamlet</td><td>(55석)</td><td>$650.00</td></tr>\n  <tr><td>As You Like It</td><td>(35석)</td><td>$580.00</td></tr>\n  <tr><td>Othello</td><td>(40석)</td><td>$500.00</td></tr>\n</table>\n<p>총액: <em>$1,730.00</em></p>\n<p>적립 포인트: <em>47</em>점</p>\n`
  )
})
