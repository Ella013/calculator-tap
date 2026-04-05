// Search functionality
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchSuggestions = document.getElementById('searchSuggestions');

// Calculator data
const calculators = [
    { name: 'Loan Calculator', url: 'loan-calculator/loan-calculator.html', keywords: ['loan', 'payment', 'interest', 'borrow', 'finance'] },
    { name: 'Payoff Calculator', url: 'payoff-calculator/payoff-calculator.html', keywords: ['payoff', 'debt', 'payment', 'clear', 'balance'] },
    { name: 'Mortgage Qualification Calculator', url: 'Mortgage-Qualification-Calculator/mortgage-qualification.html', keywords: ['mortgage', 'home', 'qualification', 'house', 'property'] },
    { name: 'Compound Interest Calculator', url: 'compound-interest-calculator/compound-interest.html', keywords: ['compound', 'interest', 'savings', 'growth', 'invest'] },
    { name: 'Investment Return Calculator', url: 'investment-return-calculator/investment-return.html', keywords: ['investment', 'return', 'roi', 'profit', 'portfolio'] },
    { name: 'Dividend Calculator', url: 'dividend-calculator/dividend-calculator.html', keywords: ['dividend', 'stock', 'income', 'yield', 'shares'] },
    { name: 'Stock Return Calculator', url: 'stock-return-calculator/stock-return.html', keywords: ['stock', 'return', 'shares', 'equity', 'market'] },
    { name: 'Paycheck Calculator', url: 'paycheck-calculator/paycheck-calculator.html', keywords: ['paycheck', 'salary', 'income', 'tax', 'wage', 'net pay'] },
];

// Search function
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm.length < 2) {
        searchSuggestions.style.display = 'none';
        return;
    }

    const matches = calculators.filter(calc => 
        calc.name.toLowerCase().includes(searchTerm) ||
        calc.keywords.some(keyword => keyword.includes(searchTerm))
    );

    if (matches.length > 0) {
        searchSuggestions.innerHTML = matches.map(calc =>
            `<div class="suggestion-item">
                <a href="${calc.url}">${calc.name}</a>
            </div>`
        ).join('');
        searchSuggestions.style.display = 'block';
    } else {
        searchSuggestions.style.display = 'none';
    }
}

// Navigate to first match on search button click
function handleSearchButtonClick() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm.length < 2) return;

    const matches = calculators.filter(calc =>
        calc.name.toLowerCase().includes(searchTerm) ||
        calc.keywords.some(keyword => keyword.includes(searchTerm))
    );

    if (matches.length > 0) {
        window.location.href = matches[0].url;
    }
}

// Event listeners
searchInput.addEventListener('input', handleSearch);
searchInput.addEventListener('focus', handleSearch);
searchButton.addEventListener('click', handleSearchButtonClick);

// Handle Enter key press
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearchButtonClick();
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target) && !searchButton.contains(e.target)) {
        searchSuggestions.style.display = 'none';
    }
}); 