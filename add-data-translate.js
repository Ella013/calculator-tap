const fs = require('fs');
const path = require('path');

const files = [
  { file: 'loan-calculator/loan-calculator.html', key: 'loan', tag: 'section', class: 'explanation-section' },
  { file: 'Mortgage-Qualification-Calculator/mortgage-qualification.html', key: 'mortgage', tag: 'section', class: 'explanation-section' },
  { file: 'paycheck-calculator/paycheck-calculator.html', key: 'paycheck', tag: 'section', class: 'explanation-section' },
  { file: 'payoff-calculator/payoff-calculator.html', key: 'payoff', tag: 'section', class: 'explanation-section' },
  { file: 'compound-interest-calculator/compound-interest.html', key: 'compound', tag: 'div', class: 'calculator-explanation' },
  { file: 'investment-return-calculator/investment-return.html', key: 'investment', tag: 'section', class: 'explanation-section' },
  { file: 'dividend-calculator/dividend-calculator.html', key: 'dividend', tag: 'section', class: 'explanation-section' },
  { file: 'stock-return-calculator/stock-return.html', key: 'stock', tag: 'section', class: 'explanation-section' },
];

files.forEach(({ file, key, tag, class: cls }) => {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Pattern: <section class="explanation-section"> or <div class="calculator-explanation">
  const searchStr = `<${tag} class="${cls}">`;
  const replaceStr = `<${tag} class="${cls}" data-translate="calculators.${key}.explanation">`;

  if (html.includes(searchStr)) {
    html = html.replace(searchStr, replaceStr);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ ${file} — added data-translate`);
  } else if (html.includes(`data-translate="calculators.${key}.explanation"`)) {
    console.log(`  ${file} — already has data-translate, skipping`);
  } else {
    console.log(`✗ ${file} — tag "${searchStr}" NOT FOUND`);
  }
});

console.log('\nDone!');
