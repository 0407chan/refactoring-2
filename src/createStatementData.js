function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay)
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay)
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`)
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get amount() {
    throw new Error(`서브클래스에서 처리하도록 설계되었습니다.`)
  }

  get volumnCredits() {
    return Math.max(this.performance.audience - 30, 0)
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30)
    }
    return result
  }
}
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20)
    }
    result += 300 * this.performance.audience
    return result
  }

  get volumnCredits() {
    return super.volumnCredits + Math.floor(this.performance.audience / 5)
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
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    )
    const result = Object.assign({}, aPerformance)
    result.play = calculator.play
    result.amount = calculator.amount
    result.volumnCredits = calculator.volumnCredits
    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }

  function totalVolumnCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumnCredits, 0)
  }
}
