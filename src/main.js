import { default as invoices } from './invoices.json'
import { default as plays } from './plays.json'
import { statement } from './statement.js'
console.log()
for (let invoice of invoices) {
  const result = statement(invoice, plays)
  console.log(result)
}
