// Search functionality
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchSuggestions = document.getElementById('searchSuggestions');

// Calculator data
const calculators = [
    { name: 'Loan Calculator', keywords: ['loan', 'payment', 'interest', 'finance'] },
    { name: 'Payoff Calculator', keywords: ['payoff', 'debt', 'payment', 'clear'] },
    { name: 'Mortgage Qualification Calculator', keywords: ['mortgage', 'home', 'qualification', 'house'] }
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
                <a href="${calc.name.toLowerCase().replace(/\s+/g, '-')}.html">${calc.name}</a>
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
        window.location.href = matches[0].name.toLowerCase().replace(/\s+/g, '-') + '.html';
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