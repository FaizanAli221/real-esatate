// api/calculate-mortgage.js
// POST /api/calculate-mortgage
// Body: { principal, interestRate, downPayment, tenureYears }
// principal     -> total property price
// interestRate  -> annual interest rate as a percentage, e.g. 6.5
// downPayment   -> upfront amount paid, subtracted from principal
// tenureYears   -> loan term in years

const { withCors } = require("./_lib/cors");

function validate(body) {
  const errors = [];
  const { principal, interestRate, downPayment, tenureYears } = body;

  if (typeof principal !== "number" || principal <= 0) {
    errors.push("principal must be a positive number.");
  }
  if (typeof interestRate !== "number" || interestRate < 0) {
    errors.push("interestRate must be a non-negative number.");
  }
  if (typeof downPayment !== "number" || downPayment < 0) {
    errors.push("downPayment must be a non-negative number.");
  }
  if (typeof tenureYears !== "number" || tenureYears <= 0) {
    errors.push("tenureYears must be a positive number.");
  }
  if (
    typeof principal === "number" &&
    typeof downPayment === "number" &&
    downPayment >= principal
  ) {
    errors.push("downPayment must be less than principal.");
  }

  return errors;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function calculateAmortization({ loanAmount, monthlyRate, months, emi }) {
  let balance = loanAmount;
  const yearly = [];
  let yearInterest = 0;
  let yearPrincipal = 0;

  for (let month = 1; month <= months; month++) {
    const interestPortion = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principalPortion = emi - interestPortion;
    balance = Math.max(0, balance - principalPortion);

    yearInterest += interestPortion;
    yearPrincipal += principalPortion;

    if (month % 12 === 0 || month === months) {
      yearly.push({
        year: Math.ceil(month / 12),
        principalPaid: round2(yearPrincipal),
        interestPaid: round2(yearInterest),
        remainingBalance: round2(balance),
      });
      yearInterest = 0;
      yearPrincipal = 0;
    }
  }

  return yearly;
}

async function handler(req, res) {
  const body = req.body || {};
  const errors = validate(body);

  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: "Validation failed.", details: errors });
  }

  const { principal, interestRate, downPayment, tenureYears } = body;

  const loanAmount = principal - downPayment;
  const monthlyRate = interestRate / 12 / 100;
  const months = Math.round(tenureYears * 12);

  const emi =
    monthlyRate === 0
      ? loanAmount / months
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  const amortizationByYear = calculateAmortization({ loanAmount, monthlyRate, months, emi });

  return res.status(200).json({
    success: true,
    input: { principal, interestRate, downPayment, tenureYears },
    data: {
      loanAmount: round2(loanAmount),
      monthlyEMI: round2(emi),
      totalMonths: months,
      totalPayment: round2(totalPayment),
      totalInterest: round2(totalInterest),
      amortizationByYear,
    },
  });
}

module.exports = withCors(handler, ["POST"]);
