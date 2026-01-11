// Dividend Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const stockPriceInput = document.getElementById('stockPrice');
    const stockPriceYieldInput = document.getElementById('stockPriceYield');
    const dividendAmountInput = document.getElementById('dividendAmount');
    const dividendYieldInput = document.getElementById('dividendYield');
    const numberOfSharesInput = document.getElementById('numberOfShares');
    const dividendFrequencySelect = document.getElementById('dividendFrequency');
    const investmentPeriodInput = document.getElementById('investmentPeriod');
    const reinvestDividendsCheckbox = document.getElementById('reinvestDividends');
    const dividendGrowthRateInput = document.getElementById('dividendGrowthRate');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultsSection = document.getElementById('resultsSection');
    const chartPlaceholder = document.querySelector('.chart-placeholder');
    
    // Results elements
    const annualDividendIncomeElement = document.getElementById('annualDividendIncome');
    const stockPriceDisplay = document.getElementById('stockPriceDisplay');
    const dividendPerShareDisplay = document.getElementById('dividendPerShareDisplay');
    const dividendYieldDisplay = document.getElementById('dividendYieldDisplay');
    const sharesDisplay = document.getElementById('sharesDisplay');
    const initialInvestmentDisplay = document.getElementById('initialInvestmentDisplay');
    const monthlyDividendDisplay = document.getElementById('monthlyDividendDisplay');
    const quarterlyDividendDisplay = document.getElementById('quarterlyDividendDisplay');
    const annualDividendDisplay = document.getElementById('annualDividendDisplay');
    const totalDividendsDisplay = document.getElementById('totalDividendsDisplay');
    const finalValueDisplay = document.getElementById('finalValueDisplay');
    
    // Dividend chart
    let dividendChart;
    
    // URL 경로에서 locale 감지
    const currentPath = window.location.pathname;
    const pathLang = currentPath.split('/').find(p => ['en', 'es', 'zh', 'ko', 'ja'].includes(p)) || 'en';
    
    // Locale별 통화 설정
    const currencyConfig = {
        en: { symbol: '$', currency: 'USD', locale: 'en-US' },
        ko: { symbol: '₩', currency: 'KRW', locale: 'ko-KR' },
        zh: { symbol: '¥', currency: 'CNY', locale: 'zh-CN' },
        es: { symbol: '$', currency: 'USD', locale: 'es-US' },
        ja: { symbol: '¥', currency: 'JPY', locale: 'ja-JP' }
    };
    
    const currentCurrency = currencyConfig[pathLang] || currencyConfig['en'];
    
    // 모든 통화 기호 요소 업데이트
    const currencySymbolElements = document.querySelectorAll('.currency-symbol');
    currencySymbolElements.forEach(el => {
        el.textContent = currentCurrency.symbol;
    });
    
    // Format currency with locale
    const formatCurrency = (amount) => {
        const formatOptions = {
            style: 'currency',
            currency: currentCurrency.currency,
            minimumFractionDigits: currentCurrency.currency === 'KRW' || currentCurrency.currency === 'JPY' ? 0 : 2,
            maximumFractionDigits: currentCurrency.currency === 'KRW' || currentCurrency.currency === 'JPY' ? 0 : 2
        };
        return new Intl.NumberFormat(currentCurrency.locale, formatOptions).format(amount);
    };
    
    // Format percentage
    const formatPercentage = (value) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            signDisplay: 'exceptZero'
        }).format(value) + '%';
    };
    
    // Format number with commas
    const formatNumber = (value) => {
        if (!value) return '';
        const numValue = value.toString().replace(/[^0-9.-]+/g, '');
        if (!numValue) return '';
        const num = parseFloat(numValue);
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };
    
    // Parse number from formatted string
    const parseNumber = (value) => {
        if (!value) return 0;
        const numValue = value.toString().replace(/[^0-9.-]+/g, '');
        return parseFloat(numValue) || 0;
    };
    
    // Parse currency input (backward compatibility)
    const parseCurrencyInput = (value) => {
        return parseNumber(value);
    };
    
    // Parse percentage input
    const parsePercentageInput = (value) => {
        return parseNumber(value);
    };
    
    // Format input on input event
    const formatInput = (input) => {
        const cursorPosition = input.selectionStart;
        const oldValue = input.value;
        const formattedValue = formatNumber(oldValue);
        input.value = formattedValue;
        
        // Adjust cursor position
        const newCursorPosition = cursorPosition + (formattedValue.length - oldValue.length);
        input.setSelectionRange(Math.max(0, Math.min(newCursorPosition, formattedValue.length)), Math.max(0, Math.min(newCursorPosition, formattedValue.length)));
    };
    
    // Format input fields with commas and sync stock price between tabs
    stockPriceInput.addEventListener('input', () => {
        formatInput(stockPriceInput);
        stockPriceYieldInput.value = stockPriceInput.value;
    });
    
    stockPriceYieldInput.addEventListener('input', () => {
        formatInput(stockPriceYieldInput);
        stockPriceInput.value = stockPriceYieldInput.value;
    });
    
    dividendAmountInput.addEventListener('input', () => {
        formatInput(dividendAmountInput);
    });
    
    // Calculate dividend amount from yield
    dividendYieldInput.addEventListener('input', () => {
        if (stockPriceYieldInput.value && dividendYieldInput.value) {
            const stockPrice = parseNumber(stockPriceYieldInput.value);
            const dividendYield = parsePercentageInput(dividendYieldInput.value) / 100;
            const calculatedDividendAmount = stockPrice * dividendYield;
            dividendAmountInput.value = formatNumber(calculatedDividendAmount.toFixed(2));
        }
    });
    
    // Calculate yield from dividend amount (on blur to avoid conflicts)
    dividendAmountInput.addEventListener('blur', () => {
        if (stockPriceInput.value && dividendAmountInput.value) {
            const stockPrice = parseNumber(stockPriceInput.value);
            const dividendAmount = parseNumber(dividendAmountInput.value);
            if (stockPrice > 0) {
                const calculatedYield = (dividendAmount / stockPrice) * 100;
                dividendYieldInput.value = calculatedYield.toFixed(2);
            }
        }
    });
    
    // Create initial chart
    function createInitialChart() {
        const ctx = document.getElementById('dividendChart').getContext('2d');
        
        // Sample data for initial chart
        const labels = Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`);
        const initialInvestmentData = Array(10).fill(10000);
        const dividendData = [400, 812, 1236, 1674, 2125, 2591, 3071, 3567, 4079, 4608];
        
        dividendChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Initial Investment',
                        data: initialInvestmentData,
                        backgroundColor: 'rgba(52, 152, 219, 0.6)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Dividend Income',
                        data: dividendData,
                        backgroundColor: 'rgba(39, 174, 96, 0.6)',
                        borderColor: 'rgba(39, 174, 96, 1)',
                        borderWidth: 1
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
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
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
    function updateChart(years, initialInvestment, dividendsByYear, reinvested) {
        if (!dividendChart) {
            createInitialChart();
            return;
        }
        
        // Create year labels
        const labels = Array.from({ length: years }, (_, i) => `Year ${i + 1}`);
        
        // Prepare data for chart
        const initialInvestmentData = Array(years).fill(initialInvestment);
        const dividendData = dividendsByYear;
        
        if (reinvested) {
            // For reinvestment, show cumulative dividends
            dividendChart.config.type = 'line';
            dividendChart.options.scales.x.stacked = false;
            dividendChart.options.scales.y.stacked = false;
        } else {
            // For no reinvestment, show stacked bar chart
            dividendChart.config.type = 'bar';
            dividendChart.options.scales.x.stacked = true;
            dividendChart.options.scales.y.stacked = true;
        }
        
        // Update chart data
        dividendChart.data.labels = labels;
        dividendChart.data.datasets[0].data = initialInvestmentData;
        dividendChart.data.datasets[1].data = dividendData;
        dividendChart.update();
        
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
    
    // Calculate dividend information
    const calculateDividends = () => {
        // Determine which tab is active
        const isAmountTabActive = document.getElementById('amountTabContent').classList.contains('active');
        
        // Get input values
        const stockPrice = isAmountTabActive ? 
            parseCurrencyInput(stockPriceInput.value) : 
            parseCurrencyInput(stockPriceYieldInput.value);
        
        let dividendPerShare;
        
        if (isAmountTabActive) {
            dividendPerShare = parseCurrencyInput(dividendAmountInput.value);
        } else {
            const dividendYield = parsePercentageInput(dividendYieldInput.value) / 100;
            dividendPerShare = stockPrice * dividendYield;
        }
        
        const numberOfShares = parseInt(numberOfSharesInput.value) || 0;
        const dividendFrequency = dividendFrequencySelect.value;
        const investmentPeriod = parseInt(investmentPeriodInput.value) || 1;
        const reinvestDividends = reinvestDividendsCheckbox.checked;
        const dividendGrowthRate = parsePercentageInput(dividendGrowthRateInput.value) / 100;
        
        // Validate inputs
        if (stockPrice <= 0 || dividendPerShare <= 0 || numberOfShares <= 0) {
            alert('Please enter valid positive values for Stock Price, Dividend Amount/Yield, and Number of Shares.');
            return;
        }
        
        // Calculate basic dividend metrics
        const initialInvestment = stockPrice * numberOfShares;
        const dividendYield = (dividendPerShare / stockPrice) * 100;
        
        // Calculate dividend amounts based on frequency
        let paymentsPerYear;
        if (dividendFrequency === 'annually') {
            paymentsPerYear = 1;
        } else if (dividendFrequency === 'semi-annually') {
            paymentsPerYear = 2;
        } else if (dividendFrequency === 'quarterly') {
            paymentsPerYear = 4;
        } else if (dividendFrequency === 'monthly') {
            paymentsPerYear = 12;
        }
        
        const annualDividend = dividendPerShare * numberOfShares;
        const paymentAmount = annualDividend / paymentsPerYear;
        const monthlyDividend = annualDividend / 12;
        const quarterlyDividend = annualDividend / 4;
        
        // Calculate dividends over time with potential growth and reinvestment
        let currentShares = numberOfShares;
        let currentDividendPerShare = dividendPerShare;
        let totalDividends = 0;
        let finalValue = initialInvestment;
        
        // Array to store dividends by year for chart
        const dividendsByYear = [];
        
        for (let year = 1; year <= investmentPeriod; year++) {
            // Apply dividend growth for this year (except year 1)
            if (year > 1) {
                currentDividendPerShare *= (1 + dividendGrowthRate);
            }
            
            // Calculate annual dividend for this year
            let yearlyDividend = currentDividendPerShare * currentShares;
            totalDividends += yearlyDividend;
            
            // Add to chart data
            dividendsByYear.push(yearlyDividend);
            
            // If reinvesting, buy more shares
            if (reinvestDividends) {
                const newShares = yearlyDividend / stockPrice;
                currentShares += newShares;
                finalValue = currentShares * stockPrice;
            }
        }
        
        // If not reinvesting, final value is just the initial investment
        if (!reinvestDividends) {
            finalValue = initialInvestment;
        }
        
        // Update results display
        annualDividendIncomeElement.textContent = formatCurrency(annualDividend);
        stockPriceDisplay.textContent = formatCurrency(stockPrice);
        dividendPerShareDisplay.textContent = formatCurrency(dividendPerShare);
        dividendYieldDisplay.textContent = formatPercentage(dividendYield);
        sharesDisplay.textContent = formatNumber(numberOfShares);
        initialInvestmentDisplay.textContent = formatCurrency(initialInvestment);
        monthlyDividendDisplay.textContent = formatCurrency(monthlyDividend);
        quarterlyDividendDisplay.textContent = formatCurrency(quarterlyDividend);
        annualDividendDisplay.textContent = formatCurrency(annualDividend);
        totalDividendsDisplay.textContent = formatCurrency(totalDividends);
        finalValueDisplay.textContent = formatCurrency(finalValue);
        
        // Update chart
        updateChart(investmentPeriod, initialInvestment, dividendsByYear, reinvestDividends);
    };
    
    // Reset function
    const resetCalculator = () => {
        // Reset all inputs
        stockPriceInput.value = '';
        stockPriceYieldInput.value = '';
        dividendAmountInput.value = '';
        dividendYieldInput.value = '';
        numberOfSharesInput.value = '';
        investmentPeriodInput.value = '10';
        dividendGrowthRateInput.value = '3';
        dividendFrequencySelect.value = 'quarterly';
        reinvestDividendsCheckbox.checked = true;
        
        // Reset results
        annualDividendIncomeElement.textContent = formatCurrency(0);
        stockPriceDisplay.textContent = formatCurrency(0);
        dividendPerShareDisplay.textContent = formatCurrency(0);
        dividendYieldDisplay.textContent = '0.00%';
        sharesDisplay.textContent = '0';
        initialInvestmentDisplay.textContent = formatCurrency(0);
        monthlyDividendDisplay.textContent = formatCurrency(0);
        quarterlyDividendDisplay.textContent = formatCurrency(0);
        annualDividendDisplay.textContent = formatCurrency(0);
        totalDividendsDisplay.textContent = formatCurrency(0);
        finalValueDisplay.textContent = formatCurrency(0);
        
        // Reset chart to initial state
        if (dividendChart) {
            createInitialChart();
        }
    };
    
    // Add event listeners
    calculateBtn.addEventListener('click', calculateDividends);
    resetBtn.addEventListener('click', resetCalculator);
    
    // Percentage input formatting
    [dividendYieldInput, dividendGrowthRateInput].forEach(input => {
        input.addEventListener('input', (e) => {
            // Remove any non-numeric characters except decimal point
            let value = e.target.value.replace(/[^0-9.]/g, '');
            
            // Ensure only one decimal point
            const decimalPoints = value.match(/\./g);
            if (decimalPoints && decimalPoints.length > 1) {
                value = value.substring(0, value.lastIndexOf('.'));
            }
            
            e.target.value = value;
        });
        
        // Format on blur
        input.addEventListener('blur', () => {
            const value = parsePercentageInput(input.value);
            if (value > 0) {
                input.value = value.toFixed(2);
            }
        });
    });
}); 