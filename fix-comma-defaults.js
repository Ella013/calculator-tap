const fs = require('fs');
const path = require('path');

// Replace localeDefaults blocks with comma-formatted values
// Only type="text" amount fields need commas; type="number" fields stay as plain numbers

const fixes = [
  {
    file: 'loan-calculator/loan-calculator.html',
    find: `const localeDefaults = {
            en: { loanAmount: '10000', interestRate: '7.5', loanTerm: '5' },
            ko: { loanAmount: '10000000', interestRate: '5.5', loanTerm: '3' },
            ja: { loanAmount: '1000000', interestRate: '2.5', loanTerm: '5' },
            zh: { loanAmount: '100000', interestRate: '4.35', loanTerm: '5' },
            es: { loanAmount: '15000', interestRate: '8.0', loanTerm: '5' }
        };`,
    replace: `const localeDefaults = {
            en: { loanAmount: '10,000', interestRate: '7.5', loanTerm: '5' },
            ko: { loanAmount: '10,000,000', interestRate: '5.5', loanTerm: '3' },
            ja: { loanAmount: '1,000,000', interestRate: '2.5', loanTerm: '5' },
            zh: { loanAmount: '100,000', interestRate: '4.35', loanTerm: '5' },
            es: { loanAmount: '15,000', interestRate: '8.0', loanTerm: '5' }
        };`
  },
  {
    file: 'Mortgage-Qualification-Calculator/mortgage-qualification.html',
    find: `const localeDefaults = {
            en: { monthlyIncome: '6000', monthlyDebts: '500', loanTerm: '30', interestRate: '7.0', downPayment: '50000' },
            ko: { monthlyIncome: '5000000', monthlyDebts: '500000', loanTerm: '30', interestRate: '4.5', downPayment: '50000000' },
            ja: { monthlyIncome: '500000', monthlyDebts: '50000', loanTerm: '35', interestRate: '1.5', downPayment: '5000000' },
            zh: { monthlyIncome: '25000', monthlyDebts: '2000', loanTerm: '30', interestRate: '4.2', downPayment: '300000' },
            es: { monthlyIncome: '3000', monthlyDebts: '300', loanTerm: '30', interestRate: '7.5', downPayment: '30000' }
        };`,
    replace: `const localeDefaults = {
            en: { monthlyIncome: '6,000', monthlyDebts: '500', loanTerm: '30', interestRate: '7.0', downPayment: '50,000' },
            ko: { monthlyIncome: '5,000,000', monthlyDebts: '500,000', loanTerm: '30', interestRate: '4.5', downPayment: '50,000,000' },
            ja: { monthlyIncome: '500,000', monthlyDebts: '50,000', loanTerm: '35', interestRate: '1.5', downPayment: '5,000,000' },
            zh: { monthlyIncome: '25,000', monthlyDebts: '2,000', loanTerm: '30', interestRate: '4.2', downPayment: '300,000' },
            es: { monthlyIncome: '3,000', monthlyDebts: '300', loanTerm: '30', interestRate: '7.5', downPayment: '30,000' }
        };`
  },
  {
    file: 'paycheck-calculator/paycheck-calculator.html',
    find: `const localeDefaults = {
            en: { hourlyRate: '25', regularHours: '40' },
            ko: { hourlyRate: '12000', regularHours: '40' },
            ja: { hourlyRate: '1200', regularHours: '160' },
            zh: { hourlyRate: '25', regularHours: '176' },
            es: { hourlyRate: '20', regularHours: '40' }
        };`,
    replace: `const localeDefaults = {
            en: { hourlyRate: '25', regularHours: '40' },
            ko: { hourlyRate: '12,000', regularHours: '40' },
            ja: { hourlyRate: '1,200', regularHours: '160' },
            zh: { hourlyRate: '25', regularHours: '176' },
            es: { hourlyRate: '20', regularHours: '40' }
        };`
  },
  {
    file: 'payoff-calculator/payoff-calculator.html',
    find: `const localeDefaults = {
            en: { debtAmount: '15000', interestRate: '18.0', monthlyPayment: '500' },
            ko: { debtAmount: '15000000', interestRate: '12.0', monthlyPayment: '500000' },
            ja: { debtAmount: '500000', interestRate: '15.0', monthlyPayment: '20000' },
            zh: { debtAmount: '50000', interestRate: '18.0', monthlyPayment: '2000' },
            es: { debtAmount: '10000', interestRate: '25.0', monthlyPayment: '400' }
        };`,
    replace: `const localeDefaults = {
            en: { debtAmount: '15,000', interestRate: '18.0', monthlyPayment: '500' },
            ko: { debtAmount: '15,000,000', interestRate: '12.0', monthlyPayment: '500,000' },
            ja: { debtAmount: '500,000', interestRate: '15.0', monthlyPayment: '20,000' },
            zh: { debtAmount: '50,000', interestRate: '18.0', monthlyPayment: '2,000' },
            es: { debtAmount: '10,000', interestRate: '25.0', monthlyPayment: '400' }
        };`
  },
  {
    file: 'compound-interest-calculator/compound-interest.js',
    find: `    const localeDefaults = {
        en: { initialInvestment: '5000', contributionAmount: '200', interestRate: '7.0', investmentLength: '10' },
        ko: { initialInvestment: '5000000', contributionAmount: '200000', interestRate: '5.0', investmentLength: '10' },
        ja: { initialInvestment: '500000', contributionAmount: '20000', interestRate: '4.0', investmentLength: '10' },
        zh: { initialInvestment: '50000', contributionAmount: '2000', interestRate: '4.5', investmentLength: '10' },
        es: { initialInvestment: '5000', contributionAmount: '200', interestRate: '7.0', investmentLength: '10' }
    };`,
    replace: `    const localeDefaults = {
        en: { initialInvestment: '5,000', contributionAmount: '200', interestRate: '7.0', investmentLength: '10' },
        ko: { initialInvestment: '5,000,000', contributionAmount: '200,000', interestRate: '5.0', investmentLength: '10' },
        ja: { initialInvestment: '500,000', contributionAmount: '20,000', interestRate: '4.0', investmentLength: '10' },
        zh: { initialInvestment: '50,000', contributionAmount: '2,000', interestRate: '4.5', investmentLength: '10' },
        es: { initialInvestment: '5,000', contributionAmount: '200', interestRate: '7.0', investmentLength: '10' }
    };`
  },
  {
    file: 'investment-return-calculator/investment-return.js',
    find: `    const localeDefaults = {
        en: { initialInvestment: '10000', finalValue: '15000', investmentPeriod: '5' },
        ko: { initialInvestment: '10000000', finalValue: '15000000', investmentPeriod: '5' },
        ja: { initialInvestment: '1000000', finalValue: '1500000', investmentPeriod: '5' },
        zh: { initialInvestment: '100000', finalValue: '150000', investmentPeriod: '5' },
        es: { initialInvestment: '10000', finalValue: '14000', investmentPeriod: '5' }
    };`,
    replace: `    const localeDefaults = {
        en: { initialInvestment: '10,000', finalValue: '15,000', investmentPeriod: '5' },
        ko: { initialInvestment: '10,000,000', finalValue: '15,000,000', investmentPeriod: '5' },
        ja: { initialInvestment: '1,000,000', finalValue: '1,500,000', investmentPeriod: '5' },
        zh: { initialInvestment: '100,000', finalValue: '150,000', investmentPeriod: '5' },
        es: { initialInvestment: '10,000', finalValue: '14,000', investmentPeriod: '5' }
    };`
  },
  {
    file: 'dividend-calculator/dividend-calculator.js',
    find: `    const localeDefaults = {
        en: { stockPrice: '50', dividendAmount: '1.50', numberOfShares: '100' },
        ko: { stockPrice: '50000', dividendAmount: '1500', numberOfShares: '100' },
        ja: { stockPrice: '3000', dividendAmount: '90', numberOfShares: '100' },
        zh: { stockPrice: '30', dividendAmount: '0.90', numberOfShares: '100' },
        es: { stockPrice: '50', dividendAmount: '2.00', numberOfShares: '100' }
    };`,
    replace: `    const localeDefaults = {
        en: { stockPrice: '50', dividendAmount: '1.50', numberOfShares: '100' },
        ko: { stockPrice: '50,000', dividendAmount: '1,500', numberOfShares: '100' },
        ja: { stockPrice: '3,000', dividendAmount: '90', numberOfShares: '100' },
        zh: { stockPrice: '30', dividendAmount: '0.90', numberOfShares: '100' },
        es: { stockPrice: '50', dividendAmount: '2.00', numberOfShares: '100' }
    };`
  },
  {
    file: 'stock-return-calculator/stock-return.js',
    find: `const localeDefaults = {
    en: { initialPrice: '50', currentPrice: '75', numberOfShares: '100', investmentPeriod: '3' },
    ko: { initialPrice: '50000', currentPrice: '75000', numberOfShares: '100', investmentPeriod: '3' },
    ja: { initialPrice: '1500', currentPrice: '2500', numberOfShares: '100', investmentPeriod: '3' },
    zh: { initialPrice: '30', currentPrice: '45', numberOfShares: '100', investmentPeriod: '3' },
    es: { initialPrice: '50', currentPrice: '70', numberOfShares: '100', investmentPeriod: '3' }
};`,
    replace: `const localeDefaults = {
    en: { initialPrice: '50', currentPrice: '75', numberOfShares: '100', investmentPeriod: '3' },
    ko: { initialPrice: '50,000', currentPrice: '75,000', numberOfShares: '100', investmentPeriod: '3' },
    ja: { initialPrice: '1,500', currentPrice: '2,500', numberOfShares: '100', investmentPeriod: '3' },
    zh: { initialPrice: '30', currentPrice: '45', numberOfShares: '100', investmentPeriod: '3' },
    es: { initialPrice: '50', currentPrice: '70', numberOfShares: '100', investmentPeriod: '3' }
};`
  }
];

fixes.forEach(({ file, find, replace }) => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(find)) {
    content = content.replace(find, replace);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ ${file} — pattern not found`);
  }
});

console.log('\nDone!');
