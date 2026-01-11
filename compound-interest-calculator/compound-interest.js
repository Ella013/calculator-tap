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
    
    // Get references to result elements
    const futureValueEl = document.getElementById('futureValue');
    const totalPrincipalEl = document.getElementById('totalPrincipal');
    const totalInterestEl = document.getElementById('totalInterest');
    
    // Chart reference
    let growthChart = null;
    
    // Update year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
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
    
    // Event Listeners
    calculateBtn.addEventListener('click', calculateCompoundInterest);
    
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
        
        // Update chart
        updateGrowthChart(labels, principalData, interestData);
        
        // Update growth table
        updateGrowthTable(yearlyData);
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
                        backgroundColor: 'rgba(52, 152, 219, 0.7)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 1,
                        barPercentage: 0.8,
                        categoryPercentage: 0.9
                    },
                    {
                        label: 'Interest',
                        data: interestData,
                        backgroundColor: 'rgba(46, 204, 113, 0.7)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 1,
                        barPercentage: 0.8,
                        categoryPercentage: 0.9
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
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
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Time Period'
                        },
                        ticks: {
                            maxRotation: 0,
                            autoSkip: true,
                            autoSkipPadding: 10
                        }
                    },
                    y: {
                        stacked: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        title: {
                            display: true,
                            text: 'Amount ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value, false);
                            },
                            maxTicksLimit: 8
                        },
                        beginAtZero: true
                    }
                },
                layout: {
                    padding: {
                        top: 20,
                        right: 25,
                        bottom: 20,
                        left: 25
                    }
                }
            }
        });
    }
    
    function updateGrowthTable(yearlyData) {
        const tableBody = document.getElementById('growthTableBody');
        tableBody.innerHTML = ''; // Clear existing rows
        
        // Add rows to table
        yearlyData.forEach(data => {
            const row = document.createElement('tr');
            
            const yearCell = document.createElement('td');
            yearCell.textContent = data.year;
            row.appendChild(yearCell);
            
            const principalCell = document.createElement('td');
            principalCell.textContent = formatCurrency(data.principal);
            row.appendChild(principalCell);
            
            const interestCell = document.createElement('td');
            interestCell.textContent = formatCurrency(data.interest);
            row.appendChild(interestCell);
            
            const balanceCell = document.createElement('td');
            balanceCell.textContent = formatCurrency(data.balance);
            row.appendChild(balanceCell);
            
            tableBody.appendChild(row);
        });
    }
    
    // Helper Functions
    function getCompoundPeriods(frequency) {
        const periods = {
            'daily': 365,
            'monthly': 12,
            'quarterly': 4,
            'semiannually': 2,
            'annually': 1
        };
        return periods[frequency] || 12;
    }
    
    function getContributionPeriods(frequency) {
        const periods = {
            'monthly': 12,
            'quarterly': 4,
            'annually': 1
        };
        return periods[frequency] || 12;
    }
    
    function formatCurrency(value, includeSymbol = true) {
        return (includeSymbol ? '$' : '') + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
}); 