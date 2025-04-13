// Investment Return Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const initialInvestmentInput = document.getElementById('initialInvestment');
    const finalValueInput = document.getElementById('finalValue');
    const investmentPeriodInput = document.getElementById('investmentPeriod');
    const additionalContributionsInput = document.getElementById('additionalContributions');
    const contributionFrequencySelect = document.getElementById('contributionFrequency');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultsSection = document.getElementById('resultsSection');
    const chartPlaceholder = document.querySelector('.chart-placeholder');
    
    // Results elements
    const annualizedReturnElement = document.getElementById('annualizedReturn');
    const annualizedReturnDetailElement = document.getElementById('annualizedReturnDetail');
    const totalReturnPercentageElement = document.getElementById('totalReturnPercentage');
    const totalReturnAmountElement = document.getElementById('totalReturnAmount');
    const initialInvestmentDisplay = document.getElementById('initialInvestmentDisplay');
    const contributionsDisplay = document.getElementById('contributionsDisplay');
    const totalInvestedDisplay = document.getElementById('totalInvestedDisplay');
    const finalValueDisplay = document.getElementById('finalValueDisplay');
    const investmentPeriodDisplay = document.getElementById('investmentPeriodDisplay');
    
    // Investment chart
    let investmentChart;
    
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
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            signDisplay: 'exceptZero'
        }).format(value) + '%';
    };
    
    // Parse currency input
    const parseCurrencyInput = (value) => {
        return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
    };
    
    // Create initial chart
    function createInitialChart() {
        const ctx = document.getElementById('investmentChart').getContext('2d');
        
        // Sample data for initial chart
        const labels = ['Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
        const principalData = [10000, 10000, 10000, 10000, 10000, 10000];
        const growthData = [0, 700, 1445, 2239, 3084, 3984];
        
        investmentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Value',
                        data: principalData.map((val, i) => val + growthData[i]),
                        backgroundColor: 'rgba(46, 204, 113, 0.2)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 2,
                        pointRadius: 3,
                        fill: true,
                        tension: 0.1
                    },
                    {
                        label: 'Principal',
                        data: principalData,
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 2,
                        pointRadius: 3,
                        fill: true,
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += formatCurrency(context.raw);
                                return label;
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    }
                }
            }
        });
        
        // Hide placeholder once chart is created
        chartPlaceholder.style.display = 'none';
    }
    
    // Update chart with calculated data
    function updateChart(initialInvestment, finalValue, investmentPeriod, additionalContributions, contributionFrequency, annualizedReturn, totalInvested) {
        if (!investmentChart) {
            createInitialChart();
            return;
        }
        
        // Calculate contribution frequency multiplier
        let contributionsPerYear = 0;
        if (contributionFrequency === 'monthly') {
            contributionsPerYear = 12;
        } else if (contributionFrequency === 'quarterly') {
            contributionsPerYear = 4;
        } else if (contributionFrequency === 'semi-annually') {
            contributionsPerYear = 2;
        } else if (contributionFrequency === 'annually') {
            contributionsPerYear = 1;
        }
        
        // Create year labels based on investment period
        const years = Math.ceil(investmentPeriod);
        const labels = Array.from({ length: years + 1 }, (_, i) => `Year ${i}`);
        
        // Calculate annual rate from annualized return percentage
        const annualRate = annualizedReturn / 100;
        
        // Initialize data arrays
        const principalData = [];
        const totalValueData = [];
        
        // Calculate total value at each year
        let currentPrincipal = initialInvestment;
        let currentValue = initialInvestment;
        
        for (let i = 0; i <= years; i++) {
            if (i === 0) {
                // Starting point
                principalData.push(initialInvestment);
                totalValueData.push(initialInvestment);
            } else {
                // Add contributions for the year
                const yearlyContributions = additionalContributions * contributionsPerYear;
                currentPrincipal += yearlyContributions;
                
                // Calculate growth for the year
                if (i === years && investmentPeriod % 1 !== 0) {
                    // Handle partial year at the end
                    const partialYear = investmentPeriod % 1;
                    currentValue = currentValue * Math.pow(1 + annualRate, partialYear) + 
                                  yearlyContributions * partialYear;
                } else {
                    // Full year calculation
                    currentValue = currentValue * (1 + annualRate) + yearlyContributions;
                }
                
                principalData.push(currentPrincipal);
                totalValueData.push(currentValue);
            }
        }
        
        // Adjust final value to match input (accounting for approximation)
        totalValueData[totalValueData.length - 1] = finalValue;
        
        // Determine if the investment had positive or negative return
        const isNegativeReturn = finalValue < totalInvested;
        
        // Set colors based on positive/negative return
        const growthColor = isNegativeReturn ? 'rgba(231, 76, 60, 1)' : 'rgba(46, 204, 113, 1)';
        const growthBackgroundColor = isNegativeReturn ? 'rgba(231, 76, 60, 0.2)' : 'rgba(46, 204, 113, 0.2)';
        
        // Update chart data and colors
        investmentChart.data.labels = labels;
        investmentChart.data.datasets[0].data = totalValueData;
        investmentChart.data.datasets[0].borderColor = growthColor;
        investmentChart.data.datasets[0].backgroundColor = growthBackgroundColor;
        investmentChart.data.datasets[1].data = principalData;
        investmentChart.update();
        
        // Update legend color
        const growthLegendColor = document.querySelector('.legend-color.growth');
        if (growthLegendColor) {
            growthLegendColor.style.backgroundColor = growthColor;
        }
        
        // Hide placeholder
        chartPlaceholder.style.display = 'none';
    }
    
    // Initialize chart on page load
    try {
        createInitialChart();
    } catch (e) {
        console.error('Error creating chart:', e);
        if (chartPlaceholder) {
            chartPlaceholder.textContent = '차트 초기화 오류';
        }
    }
    
    // Calculate investment return
    const calculateInvestmentReturn = () => {
        // Get input values
        const initialInvestment = parseCurrencyInput(initialInvestmentInput.value);
        const finalValue = parseCurrencyInput(finalValueInput.value);
        const investmentPeriod = parseFloat(investmentPeriodInput.value) || 0;
        const additionalContributions = parseCurrencyInput(additionalContributionsInput.value);
        const contributionFrequency = contributionFrequencySelect.value;
        
        // Validate inputs
        if (isNaN(initialInvestment) || isNaN(finalValue) || isNaN(investmentPeriod)) {
            alert('Please enter valid numbers for all fields');
            return;
        }
        
        if (initialInvestment <= 0 || finalValue <= 0 || investmentPeriod <= 0) {
            alert('Please enter positive values for Initial Investment, Final Value, and Investment Period');
            return;
        }
        
        // Calculate number of contributions per year based on frequency
        let contributionsPerYear = 0;
        if (contributionFrequency === 'monthly') {
            contributionsPerYear = 12;
        } else if (contributionFrequency === 'quarterly') {
            contributionsPerYear = 4;
        } else if (contributionFrequency === 'semi-annually') {
            contributionsPerYear = 2;
        } else if (contributionFrequency === 'annually') {
            contributionsPerYear = 1;
        }
        
        // Calculate total contributions
        const totalContributions = additionalContributions * contributionsPerYear * investmentPeriod;
        
        // Calculate total invested
        const totalInvested = initialInvestment + totalContributions;
        
        // Calculate total return amount
        const totalReturn = finalValue - totalInvested;
        
        // Calculate total return percentage
        const totalReturnPercentage = (totalReturn / totalInvested) * 100;
        
        // Calculate CAGR (Compound Annual Growth Rate)
        let annualizedReturn;
        
        if (additionalContributions === 0) {
            // Simple CAGR calculation when no additional contributions
            annualizedReturn = (Math.pow(finalValue / initialInvestment, 1 / investmentPeriod) - 1) * 100;
        } else {
            // Approximate CAGR with regular contributions (simplified approach)
            // For perfect accuracy, an iterative method would be better
            
            // Simplified estimate based on weighted average time
            const totalPeriods = contributionsPerYear * investmentPeriod;
            
            // Calculate weighted average time of all investments
            const initialWeight = initialInvestment * investmentPeriod;
            let contributionsWeight = 0;
            
            for (let i = 1; i <= totalPeriods; i++) {
                // Calculate time remaining for each contribution (in years)
                const timeRemaining = investmentPeriod - (i / contributionsPerYear);
                contributionsWeight += additionalContributions * timeRemaining;
            }
            
            const totalWeight = initialWeight + contributionsWeight;
            const averageTime = totalWeight / totalInvested;
            
            // Use the average time for CAGR calculation
            annualizedReturn = (Math.pow(finalValue / totalInvested, 1 / averageTime) - 1) * 100;
        }
        
        // Update results with appropriate colors
        annualizedReturnElement.textContent = formatPercentage(annualizedReturn);
        annualizedReturnElement.style.color = annualizedReturn < 0 ? '#e74c3c' : '#2ecc71';
        
        if (annualizedReturnDetailElement) {
            annualizedReturnDetailElement.textContent = formatPercentage(annualizedReturn);
            annualizedReturnDetailElement.style.color = annualizedReturn < 0 ? '#e74c3c' : '#2c3e50';
        }
        
        totalReturnPercentageElement.textContent = formatPercentage(totalReturnPercentage);
        totalReturnPercentageElement.style.color = totalReturnPercentage < 0 ? '#e74c3c' : '#2c3e50';
        
        totalReturnAmountElement.textContent = formatCurrency(totalReturn);
        totalReturnAmountElement.style.color = totalReturn < 0 ? '#e74c3c' : '#2c3e50';
        
        initialInvestmentDisplay.textContent = formatCurrency(initialInvestment);
        contributionsDisplay.textContent = formatCurrency(totalContributions);
        totalInvestedDisplay.textContent = formatCurrency(totalInvested);
        finalValueDisplay.textContent = formatCurrency(finalValue);
        investmentPeriodDisplay.textContent = investmentPeriod + (investmentPeriod === 1 ? " year" : " years");
        
        // Update chart
        updateChart(initialInvestment, finalValue, investmentPeriod, additionalContributions, contributionFrequency, annualizedReturn, totalInvested);
    };
    
    // Reset function
    const resetCalculator = () => {
        initialInvestmentInput.value = '';
        finalValueInput.value = '';
        investmentPeriodInput.value = '';
        additionalContributionsInput.value = '';
        contributionFrequencySelect.value = 'monthly';
        
        // Reset results
        annualizedReturnElement.textContent = '0.00%';
        annualizedReturnElement.style.color = '#2ecc71';
        
        if (annualizedReturnDetailElement) {
            annualizedReturnDetailElement.textContent = '0.00%';
            annualizedReturnDetailElement.style.color = '#2c3e50';
        }
        
        totalReturnPercentageElement.textContent = '0.00%';
        totalReturnPercentageElement.style.color = '#2c3e50';
        
        totalReturnAmountElement.textContent = '$0.00';
        totalReturnAmountElement.style.color = '#2c3e50';
        
        initialInvestmentDisplay.textContent = '$0.00';
        contributionsDisplay.textContent = '$0.00';
        totalInvestedDisplay.textContent = '$0.00';
        finalValueDisplay.textContent = '$0.00';
        investmentPeriodDisplay.textContent = '0 years';
        
        // Reset chart to initial state
        if (investmentChart) {
            createInitialChart();
        }
    };
    
    // Add event listeners
    calculateBtn.addEventListener('click', calculateInvestmentReturn);
    resetBtn.addEventListener('click', resetCalculator);
    
    // Allow calculation on Enter key
    [initialInvestmentInput, finalValueInput, investmentPeriodInput, additionalContributionsInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateInvestmentReturn();
            }
        });
    });
    
    // Input validation and formatting
    [initialInvestmentInput, finalValueInput, additionalContributionsInput].forEach(input => {
        input.addEventListener('input', (e) => {
            // Remove any non-numeric characters except decimal point
            let value = e.target.value.replace(/[^0-9.]/g, '');
            
            // Ensure only one decimal point
            const decimalPoints = value.match(/\./g);
            if (decimalPoints && decimalPoints.length > 1) {
                value = value.substring(0, value.lastIndexOf('.'));
            }
            
            // Add commas for thousands
            if (value) {
                const parts = value.split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                value = parts.join('.');
            }
            
            e.target.value = value;
        });
    });
    
    // Automatically format inputs when user leaves the field
    [initialInvestmentInput, finalValueInput, additionalContributionsInput].forEach(input => {
        input.addEventListener('blur', () => {
            const value = parseCurrencyInput(input.value);
            if (value > 0) {
                // Format as currency but without the $ (handled by CSS)
                input.value = new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                }).format(value);
            }
        });
    });
}); 