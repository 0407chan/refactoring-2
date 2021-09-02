export function statement(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerfomance)
  return renderPlainText(statementData, plays)

  function enrichPerfomance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    return result
  }
}

export function renderPlainText(data, plays) {
  let result = `청구 내역 (고객명: ${data.customer})\n`
  for (let perf of data.performances) {
    //청구 내역 출력
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`
  }
  result += `총액: ${usd(totalAmount())}\n`
  result += `적립 포인트: ${totalVolumnCredits()}점\n`
  return result

  function totalAmount() {
    let result = 0
    for (let perf of data.performances) {
      result += amountFor(perf)
    }
    return result
  }
  function totalVolumnCredits() {
    let result = 0
    for (let perf of data.performances) {
      result += volumnCreditsFor(perf)
    }
    return result
  }
  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100)
  }

  function volumnCreditsFor(perf) {
    let result = 0
    result += Math.max(perf.audience - 30, 0)
    if ('comedy' === playFor(perf).type) {
      result += Math.floor(perf.audience / 5)
    }
    return result
  }

  function amountFor(aPerformance) {
    let result = 0

    switch (playFor(aPerformance).type) {
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

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }
}
