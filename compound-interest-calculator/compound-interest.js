// Compound Interest Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get references to form elements
    const initialInvestmentInput = document.getElementById('initialInvestment');
    const contributionAmountInput = document.getElementById('contributionAmount');
    const contributionFrequencySelect = document.getElementById('contributionFrequency');
    const interestRateInput = document.getElementById('interestRate');
    const compoundFrequencySelect = document.getElementById('compoundFrequency');
    const investmentLengthInput = document.getElementById('investmentLength');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Get references to result elements
    const futureValueEl = document.getElementById('futureValue');
    const totalPrincipalEl = document.getElementById('totalPrincipal');
    const totalInterestEl = document.getElementById('totalInterest');
    const growthTableBody = document.getElementById('growthTable').querySelector('tbody');
    
    // Chart reference
    let growthChart = null;
    
    // Update year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile menu functionality
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const closeMenu = document.getElementById('closeMenu');
    
    hamburgerMenu.addEventListener('click', function() {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeMenu.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Event Listeners
    calculateBtn.addEventListener('click', calculateCompoundInterest);
    resetBtn.addEventListener('click', resetCalculator);
    
    // Initialize with default calculation
    calculateCompoundInterest();
    
    function calculateCompoundInterest() {
        // Get input values
        const initialInvestment = parseFloat(initialInvestmentInput.value) || 0;
        const contributionAmount = parseFloat(contributionAmountInput.value) || 0;
        const contributionFrequency = contributionFrequencySelect.value;
        const annualInterestRate = parseFloat(interestRateInput.value) / 100 || 0;
        const compoundFrequency = compoundFrequencySelect.value;
        const investmentYears = parseInt(investmentLengthInput.value) || 0;
        
        // Validate inputs
        if (initialInvestment < 0 || contributionAmount < 0 || annualInterestRate < 0 || investmentYears <= 0) {
            alert('Please enter valid positive values for all inputs.');
            return;
        }
        
        // Convert compound frequency to number of times per year
        const compoundPeriodsPerYear = getCompoundPeriods(compoundFrequency);
        
        // Convert contribution frequency to number of times per year
        const contributionsPerYear = getContributionPeriods(contributionFrequency);
        
        // Calculate interest rate per compound period
        const interestRatePerPeriod = annualInterestRate / compoundPeriodsPerYear;
        
        // Calculate total number of compound periods
        const totalCompoundPeriods = compoundPeriodsPerYear * investmentYears;
        
        // Calculate contribution amount per compound period
        const contributionPerCompoundPeriod = (contributionAmount * contributionsPerYear) / compoundPeriodsPerYear;
        
        // Perform calculations
        let balance = initialInvestment;
        let totalContributions = initialInvestment;
        let yearlyData = [];
        
        // Arrays for chart data
        const labels = [];
        const principalData = [];
        const interestData = [];
        const balanceData = [];
        
        // Calculate data for each period
        for (let period = 1; period <= totalCompoundPeriods; period++) {
            // Add contribution
            balance += contributionPerCompoundPeriod;
            totalContributions += contributionPerCompoundPeriod;
            
            // Apply interest
            const interestEarned = balance * interestRatePerPeriod;
            balance += interestEarned;
            
            // If this is the last period of a year, or the final period
            const currentYear = Math.ceil(period / compoundPeriodsPerYear);
            if (period % compoundPeriodsPerYear === 0 || period === totalCompoundPeriods) {
                labels.push(`Year ${currentYear}`);
                principalData.push(totalContributions);
                interestData.push(balance - totalContributions);
                balanceData.push(balance);
                
                // Save year data for the table
                yearlyData.push({
                    year: currentYear,
                    principal: totalContributions,
                    interest: balance - totalContributions,
                    balance: balance
                });
            }
        }
        
        // Update result elements
        futureValueEl.textContent = formatCurrency(balance);
        totalPrincipalEl.textContent = formatCurrency(totalContributions);
        totalInterestEl.textContent = formatCurrency(balance - totalContributions);
        
        // Update table
        updateGrowthTable(yearlyData);
        
        // Update chart
        updateGrowthChart(labels, principalData, interestData);
    }
    
    function resetCalculator() {
        // Reset to default values
        initialInvestmentInput.value = 10000;
        contributionAmountInput.value = 100;
        contributionFrequencySelect.value = 'monthly';
        interestRateInput.value = 7;
        compoundFrequencySelect.value = 'monthly';
        investmentLengthInput.value = 10;
        
        // Recalculate
        calculateCompoundInterest();
    }
    
    function updateGrowthTable(data) {
        // Clear existing table rows
        growthTableBody.innerHTML = '';
        
        // Create table rows
        data.forEach(yearData => {
            const row = document.createElement('tr');
            
            const yearCell = document.createElement('td');
            yearCell.textContent = yearData.year;
            
            const principalCell = document.createElement('td');
            principalCell.textContent = formatCurrency(yearData.principal);
            
            const interestCell = document.createElement('td');
            interestCell.textContent = formatCurrency(yearData.interest);
            
            const balanceCell = document.createElement('td');
            balanceCell.textContent = formatCurrency(yearData.balance);
            
            row.appendChild(yearCell);
            row.appendChild(principalCell);
            row.appendChild(interestCell);
            row.appendChild(balanceCell);
            
            growthTableBody.appendChild(row);
        });
    }
    
    function updateGrowthChart(labels, principalData, interestData) {
        const ctx = document.getElementById('growthChart').getContext('2d');
        
        // If chart already exists, destroy it
        if (growthChart) {
            growthChart.destroy();
        }
        
        // Create new chart
        growthChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Principal',
                        data: principalData,
                        backgroundColor: 'rgba(52, 152, 219, 0.6)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Interest',
                        data: interestData,
                        backgroundColor: 'rgba(46, 204, 113, 0.6)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Time Period'
                        }
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Amount ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value, false);
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + formatCurrency(context.raw);
                            },
                            footer: function(tooltipItems) {
                                const totalValue = tooltipItems.reduce((total, item) => total + item.raw, 0);
                                return 'Total: ' + formatCurrency(totalValue);
                            }
                        }
                    },
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Investment Growth Over Time'
                    }
                }
            }
        });
    }
    
    // Helper functions
    function getCompoundPeriods(frequency) {
        switch (frequency) {
            case 'daily': return 365;
            case 'monthly': return 12;
            case 'quarterly': return 4;
            case 'semiannually': return 2;
            case 'annually': return 1;
            default: return 12;
        }
    }
    
    function getContributionPeriods(frequency) {
        switch (frequency) {
            case 'monthly': return 12;
            case 'quarterly': return 4;
            case 'annually': return 1;
            default: return 12;
        }
    }
    
    function formatCurrency(value, includeSymbol = true) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: includeSymbol ? 'currency' : 'decimal',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        return formatter.format(value);
    }
}); 