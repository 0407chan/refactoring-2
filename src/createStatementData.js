class PerformanceCalculator {
  constructor(aPerformance) {
    this.performance = aPerformance
  }
}

export default function createStatementData(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerfomance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumnCredits = totalVolumnCredits(statementData)
  return statementData

  function enrichPerfomance(aPerformance) {
    const calculator = new PerformanceCalculator(aPerformance)
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumnCredits = volumnCreditsFor(result)
    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function amountFor(aPerformance) {
    let result = 0

    switch (aPerformance.play.type) {
      case 'tragedy':
        result = 40000
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break
      case 'comedy':
        result = 30000
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience
        break
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
    }
    return result
  }

  function volumnCreditsFor(perf) {
    let result = 0
    result += Math.max(perf.audience - 30, 0)
    if ('comedy' === perf.play.type) {
      result += Math.floor(perf.audience / 5)
    }
    return result
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }

  function totalVolumnCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumnCredits, 0)
  }
}
