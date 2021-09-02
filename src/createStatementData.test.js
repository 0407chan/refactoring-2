const invoices = require('./invoices.json')
const plays = require('./plays.json')
import createStatementData from './createStatementData'

test('createStatementData로 데이터 생성 ', () => {
  expect(JSON.stringify(createStatementData(invoices[0], plays))).toBe(
    JSON.stringify({
      customer: 'BigCo',
      performances: [
        {
          playID: 'hamlet',
          audience: 55,
          play: {
            name: 'Hamlet',
            type: 'tragedy',
          },
          amount: 65000,
          volumnCredits: 25,
        },
        {
          playID: 'as-like',
          audience: 35,
          play: {
            name: 'As You Like It',
            type: 'comedy',
          },
          amount: 58000,
          volumnCredits: 12,
        },
        {
          playID: 'othello',
          audience: 40,
          play: {
            name: 'Othello',
            type: 'tragedy',
          },
          amount: 50000,
          volumnCredits: 10,
        },
      ],
      totalAmount: 173000,
      totalVolumnCredits: 47,
    })
  )
})
