document.addEventListener('DOMContentLoaded', () => {
    // Get all input elements
    const monthlyIncomeInput = document.getElementById('monthlyIncome');
    const monthlyDebtsInput = document.getElementById('monthlyDebts');
    const loanTermInput = document.getElementById('loanTerm');
    const interestRateInput = document.getElementById('interestRate');
    const downPaymentInput = document.getElementById('downPayment');
    const taxesInsuranceInput = document.getElementById('taxesInsurance');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsContainer = document.getElementById('resultsContainer');

    // Get result elements
    const maxMortgageElement = document.getElementById('maxMortgage');
    const monthlyPaymentElement = document.getElementById('monthlyPayment');
    const dtiRatioElement = document.getElementById('dtiRatio');

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    // Format percentage
    const formatPercentage = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).format(value / 100);
    };

    // Calculate maximum mortgage amount
    const calculateMaxMortgage = () => {
        try {
            // Get input values
            const monthlyIncome = parseFloat(monthlyIncomeInput.value) || 0;
            const monthlyDebts = parseFloat(monthlyDebtsInput.value) || 0;
            const loanTerm = parseInt(loanTermInput.value) || 30;
            const annualInterestRate = parseFloat(interestRateInput.value) || 0;
            const downPayment = parseFloat(downPaymentInput.value) || 0;
            const taxesInsurance = parseFloat(taxesInsuranceInput.value) || 0;

            // Validate inputs
            if (monthlyIncome <= 0) {
                alert('Please enter a valid monthly income');
                return;
            }

            // Calculate DTI ratio (maximum 43%)
            const maxDTIRatio = 0.43;
            const currentDTIRatio = (monthlyDebts / monthlyIncome) * 100;
            
            // Calculate maximum monthly payment available for mortgage
            const maxMonthlyDebt = monthlyIncome * maxDTIRatio;
            const availableForMortgage = maxMonthlyDebt - monthlyDebts;

            // Adjust available amount for taxes and insurance
            const availableForPrincipalAndInterest = availableForMortgage - taxesInsurance;

            // Calculate maximum mortgage amount using the monthly payment formula
            const monthlyInterestRate = (annualInterestRate / 100) / 12;
            const numberOfPayments = loanTerm * 12;

            let maxMortgage = 0;
            if (monthlyInterestRate > 0) {
                // Using the standard mortgage payment formula solved for principal
                maxMortgage = availableForPrincipalAndInterest * 
                    ((1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)) / monthlyInterestRate);
            } else {
                // For 0% interest
                maxMortgage = availableForPrincipalAndInterest * numberOfPayments;
            }

            // Add down payment to get total house price
            const totalHousePrice = maxMortgage + downPayment;

            // Calculate monthly mortgage payment
            const monthlyPayment = availableForPrincipalAndInterest;

            // Update results
            maxMortgageElement.textContent = formatCurrency(totalHousePrice);
            monthlyPaymentElement.textContent = formatCurrency(monthlyPayment + taxesInsurance);
            dtiRatioElement.textContent = formatPercentage(currentDTIRatio);

            // Show results
            resultsContainer.style.display = 'block';

        } catch (error) {
            console.error('Calculation error:', error);
            alert('An error occurred while calculating. Please check your inputs and try again.');
        }
    };

    // Add event listeners
    calculateBtn.addEventListener('click', calculateMaxMortgage);

    // Allow calculation on Enter key
    [monthlyIncomeInput, monthlyDebtsInput, loanTermInput, 
     interestRateInput, downPaymentInput, taxesInsuranceInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateMaxMortgage();
            }
        });
    });

    // Input validation
    [monthlyIncomeInput, monthlyDebtsInput, interestRateInput, 
     downPaymentInput, taxesInsuranceInput].forEach(input => {
        input.addEventListener('input', () => {
            // Remove any non-numeric characters except decimal point
            input.value = input.value.replace(/[^0-9.]/g, '');
            
            // Ensure only one decimal point
            if ((input.value.match(/\./g) || []).length > 1) {
                input.value = input.value.slice(0, -1);
            }
        });
    });

    // Loan term validation (whole numbers only)
    loanTermInput.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-9]/g, '');
        const value = parseInt(input.value);
        if (value > 30) input.value = '30';
        if (value < 1) input.value = '1';
    });
}); 