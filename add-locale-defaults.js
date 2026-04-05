const fs = require('fs');
const path = require('path');

// For each calculator: insert code after the currencyConfig block
// We find the line "const currentCurrency = currencyConfig[pathLang] || currencyConfig['en'];"
// and insert locale defaults right after it.

const insertAfterMarker = `const currentCurrency = currencyConfig[pathLang] || currencyConfig['en'];`;

const configs = [
  {
    file: 'loan-calculator/loan-calculator.html',
    code: `
        // Locale-appropriate default values
        const localeDefaults = {
            en: { loanAmount: '10000', interestRate: '7.5', loanTerm: '5' },
            ko: { loanAmount: '10000000', interestRate: '5.5', loanTerm: '3' },
            ja: { loanAmount: '1000000', interestRate: '2.5', loanTerm: '5' },
            zh: { loanAmount: '100000', interestRate: '4.35', loanTerm: '5' },
            es: { loanAmount: '15000', interestRate: '8.0', loanTerm: '5' }
        };
        const defaults = localeDefaults[pathLang] || localeDefaults['en'];
        document.getElementById('loanAmount').value = defaults.loanAmount;
        document.getElementById('interestRate').value = defaults.interestRate;
        document.getElementById('loanTerm').value = defaults.loanTerm;`
  },
  {
    file: 'Mortgage-Qualification-Calculator/mortgage-qualification.html',
    code: `
        // Locale-appropriate default values
        const localeDefaults = {
            en: { monthlyIncome: '6000', monthlyDebts: '500', loanTerm: '30', interestRate: '7.0', downPayment: '50000' },
            ko: { monthlyIncome: '5000000', monthlyDebts: '500000', loanTerm: '30', interestRate: '4.5', downPayment: '50000000' },
            ja: { monthlyIncome: '500000', monthlyDebts: '50000', loanTerm: '35', interestRate: '1.5', downPayment: '5000000' },
            zh: { monthlyIncome: '25000', monthlyDebts: '2000', loanTerm: '30', interestRate: '4.2', downPayment: '300000' },
            es: { monthlyIncome: '3000', monthlyDebts: '300', loanTerm: '30', interestRate: '7.5', downPayment: '30000' }
        };
        const defaults = localeDefaults[pathLang] || localeDefaults['en'];
        const miEl = document.getElementById('monthlyIncome');
        const mdEl = document.getElementById('monthlyDebts');
        const ltEl = document.getElementById('loanTerm');
        const irEl = document.getElementById('interestRate');
        const dpEl = document.getElementById('downPayment');
        if (miEl) miEl.value = defaults.monthlyIncome;
        if (mdEl) mdEl.value = defaults.monthlyDebts;
        if (ltEl) ltEl.value = defaults.loanTerm;
        if (irEl) irEl.value = defaults.interestRate;
        if (dpEl) dpEl.value = defaults.downPayment;`
  },
  {
    file: 'paycheck-calculator/paycheck-calculator.html',
    code: `
        // Locale-appropriate default values
        const localeDefaults = {
            en: { hourlyRate: '25', regularHours: '40' },
            ko: { hourlyRate: '12000', regularHours: '40' },
            ja: { hourlyRate: '1200', regularHours: '160' },
            zh: { hourlyRate: '25', regularHours: '176' },
            es: { hourlyRate: '20', regularHours: '40' }
        };
        const defaults = localeDefaults[pathLang] || localeDefaults['en'];
        const hrEl = document.getElementById('hourlyRate');
        const rhEl = document.getElementById('regularHours');
        if (hrEl) hrEl.value = defaults.hourlyRate;
        if (rhEl) rhEl.value = defaults.regularHours;`
  },
  {
    file: 'payoff-calculator/payoff-calculator.html',
    code: `
        // Locale-appropriate default values
        const localeDefaults = {
            en: { debtAmount: '15000', interestRate: '18.0', monthlyPayment: '500' },
            ko: { debtAmount: '15000000', interestRate: '12.0', monthlyPayment: '500000' },
            ja: { debtAmount: '500000', interestRate: '15.0', monthlyPayment: '20000' },
            zh: { debtAmount: '50000', interestRate: '18.0', monthlyPayment: '2000' },
            es: { debtAmount: '10000', interestRate: '25.0', monthlyPayment: '400' }
        };
        const defaults = localeDefaults[pathLang] || localeDefaults['en'];
        const daEl = document.getElementById('debtAmount');
        const irEl = document.getElementById('interestRate');
        const mpEl = document.getElementById('monthlyPayment');
        if (daEl) daEl.value = defaults.debtAmount;
        if (irEl) irEl.value = defaults.interestRate;
        if (mpEl) mpEl.value = defaults.monthlyPayment;`
  },
  {
    file: 'compound-interest-calculator/compound-interest.html',
    code: `
        // Locale-appropriate default values
        const localeDefaults = {
            en: { initialInvestment: '5000', contributionAmount: '200', interestRate: '7.0', investmentLength: '10' },
            ko: { initialInvestment: '5000000', contributionAmount: '200000', interestRate: '5.0', investmentLength: '10' },
            ja: { initialInvestment: '500000', contributionAmount: '20000', interestRate: '4.0', investmentLength: '10' },
            zh: { initialInvestment: '50000', contributionAmount: '2000', interestRate: '4.5', investmentLength: '10' },
            es: { initialInvestment: '5000', contributionAmount: '200', interestRate: '7.0', investmentLength: '10' }
        };
        const defaults = localeDefaults[pathLang] || localeDefaults['en'];
        const iiEl = document.getElementById('initialInvestment');
        const caEl = document.getElementById('contributionAmount');
        const irEl = document.getElementById('interestRate');
        const ilEl = document.getElementById('investmentLength');
        if (iiEl) iiEl.value = defaults.initialInvestment;
        if (caEl) caEl.value = defaults.contributionAmount;
        if (irEl) irEl.value = defaults.interestRate;
        if (ilEl) ilEl.value = defaults.investmentLength;`
  },
  {
    file: 'investment-return-calculator/investment-return.html',
    code: `
        // Locale-appropriate default values
        const localeDefaults = {
            en: { initialInvestment: '10000', finalValue: '15000', investmentPeriod: '5' },
            ko: { initialInvestment: '10000000', finalValue: '15000000', investmentPeriod: '5' },
            ja: { initialInvestment: '1000000', finalValue: '1500000', investmentPeriod: '5' },
            zh: { initialInvestment: '100000', finalValue: '150000', investmentPeriod: '5' },
            es: { initialInvestment: '10000', finalValue: '14000', investmentPeriod: '5' }
        };
        const defaults = localeDefaults[pathLang] || localeDefaults['en'];
        const iiEl = document.getElementById('initialInvestment');
        const fvEl = document.getElementById('finalValue');
        const ipEl = document.getElementById('investmentPeriod');
        if (iiEl) iiEl.value = defaults.initialInvestment;
        if (fvEl) fvEl.value = defaults.finalValue;
        if (ipEl) ipEl.value = defaults.investmentPeriod;`
  },
  {
    file: 'dividend-calculator/dividend-calculator.html',
    code: `
        // Locale-appropriate default values
        const localeDefaults = {
            en: { stockPrice: '50', dividendAmount: '1.50', numberOfShares: '100' },
            ko: { stockPrice: '50000', dividendAmount: '1500', numberOfShares: '100' },
            ja: { stockPrice: '3000', dividendAmount: '90', numberOfShares: '100' },
            zh: { stockPrice: '30', dividendAmount: '0.90', numberOfShares: '100' },
            es: { stockPrice: '50', dividendAmount: '2.00', numberOfShares: '100' }
        };
        const defaults = localeDefaults[pathLang] || localeDefaults['en'];
        const spEl = document.getElementById('stockPrice');
        const daEl = document.getElementById('dividendAmount');
        const nsEl = document.getElementById('numberOfShares');
        if (spEl) spEl.value = defaults.stockPrice;
        if (daEl) daEl.value = defaults.dividendAmount;
        if (nsEl) nsEl.value = defaults.numberOfShares;`
  },
  {
    file: 'stock-return-calculator/stock-return.html',
    code: `
        // Locale-appropriate default values
        const localeDefaults = {
            en: { initialPrice: '50', currentPrice: '75', numberOfShares: '100', investmentPeriod: '3' },
            ko: { initialPrice: '50000', currentPrice: '75000', numberOfShares: '100', investmentPeriod: '3' },
            ja: { initialPrice: '1500', currentPrice: '2500', numberOfShares: '100', investmentPeriod: '3' },
            zh: { initialPrice: '30', currentPrice: '45', numberOfShares: '100', investmentPeriod: '3' },
            es: { initialPrice: '50', currentPrice: '70', numberOfShares: '100', investmentPeriod: '3' }
        };
        const defaults = localeDefaults[pathLang] || localeDefaults['en'];
        const ipEl = document.getElementById('initialPrice');
        const cpEl = document.getElementById('currentPrice');
        const nsEl = document.getElementById('numberOfShares');
        const periodEl = document.getElementById('investmentPeriod');
        if (ipEl) ipEl.value = defaults.initialPrice;
        if (cpEl) cpEl.value = defaults.currentPrice;
        if (nsEl) nsEl.value = defaults.numberOfShares;
        if (periodEl) periodEl.value = defaults.investmentPeriod;`
  }
];

configs.forEach(({ file, code }) => {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf8');

  if (html.includes('localeDefaults')) {
    console.log(`  ${file} — already has localeDefaults, skipping`);
    return;
  }

  const idx = html.indexOf(insertAfterMarker);
  if (idx === -1) {
    console.log(`✗ ${file} — marker NOT FOUND`);
    return;
  }

  const insertPos = idx + insertAfterMarker.length;
  html = html.slice(0, insertPos) + code + html.slice(insertPos);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ ${file} — added locale defaults`);
});

console.log('\nDone!');
