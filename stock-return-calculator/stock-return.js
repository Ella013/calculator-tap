// Select DOM Elements
const initialPriceInput = document.getElementById('initialPrice');
const currentPriceInput = document.getElementById('currentPrice');
const numberOfSharesInput = document.getElementById('numberOfShares');
const investmentPeriodSelect = document.getElementById('investmentPeriod');
const investmentTimeInput = document.getElementById('investmentTime');
const includeDividendsCheckbox = document.getElementById('includeDividends');
const dividendAmountGroup = document.getElementById('dividendAmountGroup');
const dividendAmountInput = document.getElementById('dividendAmount');
const accountForSplitsCheckbox = document.getElementById('accountForSplits');
const splitRatioGroup = document.getElementById('splitRatioGroup');
const splitRatioInput = document.getElementById('splitRatio');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');

// Result elements
const totalReturnAmount = document.getElementById('totalReturnAmount');
const initialInvestmentDisplay = document.getElementById('initialInvestmentDisplay');
const currentValueDisplay = document.getElementById('currentValueDisplay');
const totalGainLossDisplay = document.getElementById('totalGainLossDisplay');
const totalReturnDisplay = document.getElementById('totalReturnDisplay');
const annualizedReturnDisplay = document.getElementById('annualizedReturnDisplay');
const dividendReturnDisplay = document.getElementById('dividendReturnDisplay');
const dividendReturnRow = document.getElementById('dividendReturnRow');
const priceReturnDisplay = document.getElementById('priceReturnDisplay');
const periodDisplay = document.getElementById('periodDisplay');
const chartPlaceholder = document.querySelector('.chart-placeholder');

// Chart context
const returnChart = document.getElementById('returnChart').getContext('2d');
let chart;

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// Format percentage
function formatPercentage(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value / 100);
}

// Add currency symbol to input fields
initialPriceInput.addEventListener('focus', function() {
    if (!this.value) {
        this.value = '';
    }
});

initialPriceInput.addEventListener('blur', function() {
    if (this.value) {
        const numValue = parseFloat(this.value.replace(/[^0-9.-]+/g, ''));
        if (!isNaN(numValue)) {
            this.value = formatCurrency(numValue).replace('$', '');
        }
    }
});

currentPriceInput.addEventListener('focus', function() {
    if (!this.value) {
        this.value = '';
    }
});

currentPriceInput.addEventListener('blur', function() {
    if (this.value) {
        const numValue = parseFloat(this.value.replace(/[^0-9.-]+/g, ''));
        if (!isNaN(numValue)) {
            this.value = formatCurrency(numValue).replace('$', '');
        }
    }
});

dividendAmountInput.addEventListener('focus', function() {
    if (!this.value) {
        this.value = '';
    }
});

dividendAmountInput.addEventListener('blur', function() {
    if (this.value) {
        const numValue = parseFloat(this.value.replace(/[^0-9.-]+/g, ''));
        if (!isNaN(numValue)) {
            this.value = formatCurrency(numValue).replace('$', '');
        }
    }
});

// Toggle visibility of dividend and split fields
includeDividendsCheckbox.addEventListener('change', function() {
    dividendAmountGroup.style.display = this.checked ? 'block' : 'none';
});

accountForSplitsCheckbox.addEventListener('change', function() {
    splitRatioGroup.style.display = this.checked ? 'block' : 'none';
});

// Initialize empty chart
function initializeChart() {
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(returnChart, {
        type: 'bar',
        data: {
            labels: ['Initial Investment', 'Current Value'],
            datasets: [{
                label: 'Investment Value',
                data: [0, 0],
                backgroundColor: [
                    '#3498db',
                    '#27ae60'
                ],
                borderColor: [
                    '#2980b9',
                    '#1e8449'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return formatCurrency(context.parsed.y);
                        }
                    }
                }
            }
        }
    });
}

// Initialize chart on page load
initializeChart();

// Set default values and show initial chart
function setDefaultValues() {
    initialPriceInput.value = '100.00';
    currentPriceInput.value = '120.00';
    numberOfSharesInput.value = '100';
    investmentTimeInput.value = '1';
    investmentPeriodSelect.value = 'years';
    
    // Trigger calculation with default values
    handleCalculation();
}

// Call setDefaultValues when the page is loaded
document.addEventListener('DOMContentLoaded', setDefaultValues);

// Handle calculation
calculateBtn.addEventListener('click', handleCalculation);

function handleCalculation() {
    // Parse input values
    const initialPrice = parseFloat(initialPriceInput.value.replace(/[^0-9.-]+/g, ''));
    const currentPrice = parseFloat(currentPriceInput.value.replace(/[^0-9.-]+/g, ''));
    const numberOfShares = parseInt(numberOfSharesInput.value);
    const investmentPeriod = investmentPeriodSelect.value;
    const investmentTime = parseInt(investmentTimeInput.value);
    const includeDividends = includeDividendsCheckbox.checked;
    const dividendAmount = includeDividends ? parseFloat(dividendAmountInput.value.replace(/[^0-9.-]+/g, '')) || 0 : 0;
    const accountForSplits = accountForSplitsCheckbox.checked;
    const splitRatio = accountForSplits ? parseFloat(splitRatioInput.value) : 1;

    // Validate inputs
    if (isNaN(initialPrice) || initialPrice <= 0) {
        alert('Please enter a valid initial share price.');
        initialPriceInput.focus();
        return;
    }

    if (isNaN(currentPrice) || currentPrice <= 0) {
        alert('Please enter a valid current share price.');
        currentPriceInput.focus();
        return;
    }

    if (isNaN(numberOfShares) || numberOfShares <= 0) {
        alert('Please enter a valid number of shares.');
        numberOfSharesInput.focus();
        return;
    }

    if (isNaN(investmentTime) || investmentTime <= 0) {
        alert('Please enter a valid investment time period.');
        investmentTimeInput.focus();
        return;
    }

    if (includeDividends && (isNaN(dividendAmount) || dividendAmount < 0)) {
        alert('Please enter a valid dividend amount.');
        dividendAmountInput.focus();
        return;
    }

    if (accountForSplits && (isNaN(splitRatio) || splitRatio < 1)) {
        alert('Please enter a valid split ratio (must be 1 or greater).');
        splitRatioInput.focus();
        return;
    }

    // Calculate returns
    calculateInvestmentReturn(initialPrice, currentPrice, numberOfShares, investmentPeriod, investmentTime, dividendAmount, splitRatio);
}

function calculateInvestmentReturn(initialPrice, currentPrice, numberOfShares, investmentPeriod, investmentTime, dividendAmount, splitRatio) {
    // Adjust for splits if applicable
    const adjustedInitialPrice = accountForSplitsCheckbox.checked ? initialPrice * splitRatio : initialPrice;
    
    // Calculate initial and current values
    const initialInvestment = initialPrice * numberOfShares;
    const currentValue = currentPrice * numberOfShares;
    
    // Calculate total gain/loss
    const totalGainLoss = currentValue - initialInvestment + dividendAmount;
    
    // Calculate returns
    const totalReturn = (totalGainLoss / initialInvestment) * 100;
    
    // Calculate price return (without dividends)
    const priceReturn = ((currentValue - initialInvestment) / initialInvestment) * 100;
    
    // Calculate dividend return
    const dividendReturn = (dividendAmount / initialInvestment) * 100;
    
    // Calculate annualized return (CAGR)
    let yearFraction;
    if (investmentPeriod === 'days') {
        yearFraction = investmentTime / 365;
    } else if (investmentPeriod === 'months') {
        yearFraction = investmentTime / 12;
    } else {
        yearFraction = investmentTime;
    }
    
    const annualizedReturn = (Math.pow((1 + totalReturn / 100), 1 / yearFraction) - 1) * 100;
    
    // Format period display text
    let periodText;
    if (investmentTime === 1) {
        periodText = `1 ${investmentPeriod.slice(0, -1)}`;
    } else {
        periodText = `${investmentTime} ${investmentPeriod}`;
    }
    
    // Update chart
    updateChart(initialInvestment, currentValue, dividendAmount);
    
    // Update display
    totalReturnAmount.textContent = formatPercentage(totalReturn).replace('%', '') + '%';
    totalReturnAmount.className = totalReturn >= 0 ? 'return-amount' : 'return-amount negative';
    
    // Update legend color based on return value
    const legendFinalColor = document.querySelector('.legend-color.final');
    if (legendFinalColor) {
        if (totalReturn < 0) {
            legendFinalColor.style.backgroundColor = '#e74c3c';
        } else {
            legendFinalColor.style.backgroundColor = '#27ae60';
        }
    }
    
    initialInvestmentDisplay.textContent = formatCurrency(initialInvestment);
    currentValueDisplay.textContent = formatCurrency(currentValue);
    
    totalGainLossDisplay.textContent = formatCurrency(totalGainLoss);
    totalGainLossDisplay.className = totalGainLoss >= 0 ? 'result-value positive' : 'result-value negative';
    
    totalReturnDisplay.textContent = formatPercentage(totalReturn);
    totalReturnDisplay.className = totalReturn >= 0 ? 'result-value positive' : 'result-value negative';
    
    annualizedReturnDisplay.textContent = formatPercentage(annualizedReturn);
    annualizedReturnDisplay.className = annualizedReturn >= 0 ? 'result-value positive' : 'result-value negative';
    
    if (includeDividendsCheckbox.checked && dividendAmount > 0) {
        dividendReturnRow.style.display = 'flex';
        dividendReturnDisplay.textContent = formatPercentage(dividendReturn);
        dividendReturnDisplay.className = 'result-value positive';
    } else {
        dividendReturnRow.style.display = 'none';
    }
    
    priceReturnDisplay.textContent = formatPercentage(priceReturn);
    priceReturnDisplay.className = priceReturn >= 0 ? 'result-value positive' : 'result-value negative';
    
    periodDisplay.textContent = periodText;
    
    // Hide placeholder
    chartPlaceholder.style.display = 'none';
}

function updateChart(initialInvestment, currentValue, dividendAmount) {
    if (chart) {
        chart.destroy();
    }
    
    let labels, data, backgroundColor, borderColor;
    
    if (includeDividendsCheckbox.checked && dividendAmount > 0) {
        // If dividends are included, show them as part of the current value in a stacked bar
        labels = ['Initial Investment', 'Current Value'];
        const priceGain = currentValue - initialInvestment;
        
        data = {
            labels: labels,
            datasets: [
                {
                    label: 'Initial Investment',
                    data: [initialInvestment, initialInvestment],
                    backgroundColor: '#3498db',
                    borderColor: '#2980b9',
                    borderWidth: 1
                },
                {
                    label: 'Price Growth',
                    data: [0, priceGain > 0 ? priceGain : 0],
                    backgroundColor: '#27ae60',
                    borderColor: '#1e8449',
                    borderWidth: 1
                },
                {
                    label: 'Price Loss',
                    data: [0, priceGain < 0 ? Math.abs(priceGain) : 0],
                    backgroundColor: '#e74c3c',
                    borderColor: '#c0392b',
                    borderWidth: 1
                },
                {
                    label: 'Dividends',
                    data: [0, dividendAmount],
                    backgroundColor: '#f39c12',
                    borderColor: '#d35400',
                    borderWidth: 1
                }
            ]
        };
    } else {
        // Simple two-bar chart for initial vs current without dividends
        labels = ['Initial Investment', 'Current Value'];
        data = {
            labels: labels,
            datasets: [{
                label: 'Investment Value',
                data: [initialInvestment, currentValue],
                backgroundColor: [
                    '#3498db',
                    currentValue >= initialInvestment ? '#27ae60' : '#e74c3c'
                ],
                borderColor: [
                    '#2980b9',
                    currentValue >= initialInvestment ? '#1e8449' : '#c0392b'
                ],
                borderWidth: 1
            }]
        };
    }
    
    chart = new Chart(returnChart, {
        type: includeDividendsCheckbox.checked && dividendAmount > 0 ? 'bar' : 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: includeDividendsCheckbox.checked && dividendAmount > 0
                },
                y: {
                    stacked: includeDividendsCheckbox.checked && dividendAmount > 0,
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: includeDividendsCheckbox.checked && dividendAmount > 0,
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                        }
                    }
                }
            }
        }
    });
}

// Reset calculator
resetBtn.addEventListener('click', function() {
    // Clear input fields
    initialPriceInput.value = '';
    currentPriceInput.value = '';
    numberOfSharesInput.value = '';
    investmentTimeInput.value = '1';
    investmentPeriodSelect.value = 'years';
    dividendAmountInput.value = '';
    splitRatioInput.value = '2';
    
    // Uncheck checkboxes
    includeDividendsCheckbox.checked = false;
    accountForSplitsCheckbox.checked = false;
    dividendAmountGroup.style.display = 'none';
    splitRatioGroup.style.display = 'none';
    
    // Reset results
    totalReturnAmount.textContent = '0.00%';
    totalReturnAmount.className = 'return-amount';
    initialInvestmentDisplay.textContent = '$0.00';
    currentValueDisplay.textContent = '$0.00';
    totalGainLossDisplay.textContent = '$0.00';
    totalGainLossDisplay.className = 'result-value';
    totalReturnDisplay.textContent = '0.00%';
    totalReturnDisplay.className = 'result-value';
    annualizedReturnDisplay.textContent = '0.00%';
    annualizedReturnDisplay.className = 'result-value';
    dividendReturnDisplay.textContent = '0.00%';
    dividendReturnRow.style.display = 'none';
    priceReturnDisplay.textContent = '0.00%';
    priceReturnDisplay.className = 'result-value';
    periodDisplay.textContent = '0 years';
    
    // Reset chart
    initializeChart();
    chartPlaceholder.style.display = 'flex';
}); 