document.addEventListener('DOMContentLoaded', () => {
    const loanAmountInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    const loanTermInput = document.getElementById('loanTerm');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const monthlyPaymentElement = document.getElementById('monthlyPayment');
    const totalInterestElement = document.getElementById('totalInterest');
    const totalPaymentElement = document.getElementById('totalPayment');

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Calculate loan
    const calculateLoan = () => {
        const loanAmount = parseFloat(loanAmountInput.value);
        const annualInterestRate = parseFloat(interestRateInput.value);
        const loanTermYears = parseFloat(loanTermInput.value);

        // Validate inputs
        if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(loanTermYears)) {
            alert('Please enter valid numbers for all fields');
            return;
        }

        // Convert annual interest rate to monthly and percentage to decimal
        const monthlyInterestRate = (annualInterestRate / 100) / 12;
        const numberOfPayments = loanTermYears * 12;

        // Calculate monthly payment using the formula: P * (r(1+r)^n) / ((1+r)^n - 1)
        const monthlyPayment = loanAmount * 
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        // Calculate total payment and interest
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - loanAmount;

        // Update results
        monthlyPaymentElement.textContent = formatCurrency(monthlyPayment);
        totalInterestElement.textContent = formatCurrency(totalInterest);
        totalPaymentElement.textContent = formatCurrency(totalPayment);

        // Show results container
        resultsContainer.style.display = 'block';
    };

    // Add event listeners
    calculateBtn.addEventListener('click', calculateLoan);

    // Allow calculation on Enter key
    [loanAmountInput, interestRateInput, loanTermInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateLoan();
            }
        });
    });

    // Input validation
    [loanAmountInput, interestRateInput, loanTermInput].forEach(input => {
        input.addEventListener('input', () => {
            // Remove any non-numeric characters except decimal point
            input.value = input.value.replace(/[^0-9.]/g, '');
            
            // Ensure only one decimal point
            if ((input.value.match(/\./g) || []).length > 1) {
                input.value = input.value.slice(0, -1);
            }
        });
    });
}); 