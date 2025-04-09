document.addEventListener('DOMContentLoaded', function() {
    // Initialize chart
    const ctx = document.getElementById('payBreakdownChart').getContext('2d');
    const payBreakdownChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Take-Home Pay', 'Federal Tax', 'Medicare', 'Social Security'],
            datasets: [{
                data: [1000, 50, 15, 70],
                backgroundColor: [
                    '#4CAF50',
                    '#F44336',
                    '#2196F3',
                    '#FF9800'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Event Listeners
    document.getElementById('calculateBtn').addEventListener('click', calculatePaycheck);
    document.getElementById('addEarningBtn').addEventListener('click', addEarningItem);
    document.getElementById('addOvertimeBtn').addEventListener('click', addOvertimeItem);

    // Add remove button event listeners to existing items
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.earnings-item, .overtime-item').remove();
        });
    });

    // Set current date if field exists
    const today = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('ko-KR', options);
    document.querySelector('.date-format').textContent = formattedDate;

    // Initial calculation
    calculatePaycheck();

    // Functions
    function addEarningItem() {
        const newItem = document.createElement('div');
        newItem.className = 'earnings-item';
        newItem.innerHTML = `
            <select class="pay-type-select">
                <option value="hourly" selected>Hourly</option>
                <option value="salary">Salary</option>
                <option value="commission">Commission</option>
            </select>
            <div class="form-group" style="flex: 1;">
                <input type="number" placeholder="Hours" value="0" min="0" step="0.5">
            </div>
            <div class="form-group" style="flex: 1;">
                <div class="input-group">
                    <span class="currency-symbol">$</span>
                    <input type="number" placeholder="Rate" value="0.00" min="0" step="0.01">
                </div>
            </div>
            <button type="button" class="remove-btn">-</button>
        `;
        
        document.getElementById('earningsItems').appendChild(newItem);
        
        // Add event listener to the new remove button
        newItem.querySelector('.remove-btn').addEventListener('click', function() {
            this.closest('.earnings-item').remove();
        });
    }

    function addOvertimeItem() {
        const newItem = document.createElement('div');
        newItem.className = 'overtime-item';
        newItem.innerHTML = `
            <select class="pay-type-select">
                <option value="time-and-half" selected>Time and a Half</option>
                <option value="double-time">Double Time</option>
            </select>
            <div class="form-group" style="flex: 1;">
                <input type="number" placeholder="Hours" value="0" min="0" step="0.5">
            </div>
            <div class="form-group" style="flex: 1;">
                <div class="input-group">
                    <span class="currency-symbol">$</span>
                    <input type="number" placeholder="Rate" value="0.00" min="0" step="0.01">
                </div>
            </div>
            <button type="button" class="remove-btn">-</button>
        `;
        
        document.getElementById('overtimeItems').appendChild(newItem);
        
        // Add event listener to the new remove button
        newItem.querySelector('.remove-btn').addEventListener('click', function() {
            this.closest('.overtime-item').remove();
        });
    }

    function calculatePaycheck() {
        // Get all earnings items
        const earningsItems = document.querySelectorAll('#earningsItems .earnings-item');
        let regularPay = 0;
        
        earningsItems.forEach(item => {
            const payType = item.querySelector('.pay-type-select').value;
            const hoursInput = item.querySelectorAll('input')[0];
            const rateInput = item.querySelectorAll('input')[1];
            
            const hours = parseFloat(hoursInput.value) || 0;
            const rate = parseFloat(rateInput.value) || 0;
            
            if (payType === 'hourly') {
                regularPay += hours * rate;
            } else if (payType === 'salary' || payType === 'commission') {
                regularPay += rate;  // For salary/commission, we just use the rate value directly
            }
        });

        // Get all overtime items
        const overtimeItems = document.querySelectorAll('#overtimeItems .overtime-item');
        let overtimePay = 0;
        
        overtimeItems.forEach(item => {
            const overtimeType = item.querySelector('.pay-type-select').value;
            const hoursInput = item.querySelectorAll('input')[0];
            const rateInput = item.querySelectorAll('input')[1];
            
            const hours = parseFloat(hoursInput.value) || 0;
            const rate = parseFloat(rateInput.value) || 0;
            
            if (overtimeType === 'time-and-half') {
                overtimePay += hours * rate * 1.5;
            } else if (overtimeType === 'double-time') {
                overtimePay += hours * rate * 2;
            }
        });

        // Calculate gross pay
        const grossPay = regularPay + overtimePay;
        
        // Calculate taxes
        const federalTaxRate = parseFloat(document.getElementById('federalTaxRate').value) / 100 || 0;
        const medicareTaxRate = 0.0145;  // 1.45%
        const socialSecurityTaxRate = 0.062;  // 6.2%
        
        const federalTax = grossPay * federalTaxRate;
        const medicareTax = grossPay * medicareTaxRate;
        const socialSecurityTax = grossPay * socialSecurityTaxRate;
        
        const totalTaxes = federalTax + medicareTax + socialSecurityTax;
        
        // Calculate take-home pay
        const totalBenefits = 0;  // We'll set this to 0 for now, could be expanded later
        const takeHomePay = grossPay - totalTaxes - totalBenefits;
        
        // Update results
        document.getElementById('regularPay').textContent = formatCurrency(regularPay);
        document.getElementById('overtimePay').textContent = formatCurrency(overtimePay);
        document.getElementById('grossPay').textContent = formatCurrency(grossPay);
        
        document.getElementById('federalTax').textContent = formatCurrency(federalTax);
        document.getElementById('medicareTax').textContent = formatCurrency(medicareTax);
        document.getElementById('socialSecurityTax').textContent = formatCurrency(socialSecurityTax);
        document.getElementById('totalTaxes').textContent = formatCurrency(totalTaxes);
        
        document.getElementById('totalBenefits').textContent = formatCurrency(totalBenefits);
        document.getElementById('takeHomePay').textContent = formatCurrency(takeHomePay);
        
        // Update chart
        updateChart(payBreakdownChart, takeHomePay, federalTax, medicareTax, socialSecurityTax);
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    function updateChart(chart, takeHomePay, federalTax, medicareTax, socialSecurityTax) {
        chart.data.datasets[0].data = [takeHomePay, federalTax, medicareTax, socialSecurityTax];
        chart.update();
    }
}); 