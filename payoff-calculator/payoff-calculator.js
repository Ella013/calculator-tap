document.addEventListener('DOMContentLoaded', () => {
    const loanAmountInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    const monthlyPaymentInput = document.getElementById('monthlyPayment');
    const startDateInput = document.getElementById('startDate');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const totalInterestElement = document.getElementById('totalInterest');
    const paymentPeriodElement = document.getElementById('paymentPeriod');
    const payoffDateElement = document.getElementById('payoffDate');

    // Set default date to today
    startDateInput.valueAsDate = new Date();

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Calculate loan payoff
    const calculatePayoff = () => {
        try {
            const loanAmount = parseFloat(loanAmountInput.value);
            const annualInterestRate = parseFloat(interestRateInput.value);
            const monthlyPayment = parseFloat(monthlyPaymentInput.value);
            const startDate = startDateInput.value ? new Date(startDateInput.value) : new Date();

            // Validate inputs
            if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(monthlyPayment)) {
                alert('Please enter valid numbers for all required fields');
                return;
            }

            if (monthlyPayment <= 0) {
                alert('Monthly payment must be greater than 0');
                return;
            }

            // Convert annual interest rate to monthly
            const monthlyInterestRate = (annualInterestRate / 100) / 12;
            let remainingBalance = loanAmount;
            let totalInterest = 0;
            let months = 0;

            // Calculate months until payoff
            while (remainingBalance > 0 && months < 360) { // 30 years maximum
                months++;
                const interestPayment = remainingBalance * monthlyInterestRate;
                const principalPayment = Math.min(monthlyPayment - interestPayment, remainingBalance);
                
                totalInterest += interestPayment;
                remainingBalance -= principalPayment;

                if (monthlyPayment <= interestPayment) {
                    alert('Monthly payment is too low to pay off the loan');
                    return;
                }
            }

            // Calculate payoff date
            const payoffDate = new Date(startDate);
            payoffDate.setMonth(payoffDate.getMonth() + months);

            // Update results
            totalInterestElement.textContent = formatCurrency(totalInterest);
            paymentPeriodElement.textContent = formatPaymentPeriod(months);
            payoffDateElement.textContent = formatDate(payoffDate);

            // Show results
            resultsContainer.style.display = 'block';
        } catch (error) {
            console.error('Calculation error:', error);
            alert('An error occurred while calculating. Please check your inputs and try again.');
        }
    };

    // Format payment period
    const formatPaymentPeriod = (months) => {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    };

    // Format date
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    // Add event listeners
    calculateBtn.addEventListener('click', calculatePayoff);

    // Allow calculation on Enter key
    [loanAmountInput, interestRateInput, monthlyPaymentInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculatePayoff();
            }
        });
    });

    // Input validation
    [loanAmountInput, interestRateInput, monthlyPaymentInput].forEach(input => {
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