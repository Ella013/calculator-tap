'use strict';

const fs = require('fs');
const path = require('path');

// ============================================================
// ALL TRANSLATIONS: 8 calculators × 5 languages
// ============================================================

const translations = {

  // ===========================================================
  // ENGLISH
  // ===========================================================
  en: {
    localeDefaults: {
      loan:       { amount: '10000',  rate: '7.5',  term: '5' },
      mortgage:   { income: '6000',   debts: '500', term: '30', rate: '7.0', down: '50000' },
      paycheck:   { rate: '25',       hours: '40' },
      debt:       { amount: '15000',  rate: '18.0', payment: '500' },
      compound:   { initial: '5000',  contribution: '200', rate: '7.0', years: '10' },
      investment: { initial: '10000', final: '15000', period: '5' },
      dividend:   { price: '50',      dividend: '1.50', shares: '100', period: '5' },
      stock:      { initial: '50',    current: '75',    shares: '100', period: '3' }
    },
    calculators: {
      loan: {
        explanation: '<h2 class="explanation-title">Understanding Your Loan Calculations</h2><div class="explanation-text"><p>Our loan calculator helps you make informed financial decisions by providing accurate estimates of your loan payments. Whether you\'re planning to take out a personal loan, auto loan, or mortgage, this calculator gives you a clear picture of your financial commitment.</p><h3>Key Features of Our Loan Calculator</h3><ul><li>Calculate monthly payments quickly and accurately</li><li>See your total interest paid over the life of the loan</li><li>View total payment amount including principal and interest</li><li>Get instant results with no sign-up required</li><li>Mobile-friendly design works on any device</li></ul><h3>Understanding Loan Factors</h3><p>Understanding your monthly payments is crucial for budgeting and financial planning. Our calculator takes into account three main factors:</p><ul><li><strong>Principal Amount</strong> — the total amount you borrow</li><li><strong>Interest Rate</strong> — the annual rate charged by the lender</li><li><strong>Loan Term</strong> — the number of years to repay the loan</li></ul><p>By adjusting these variables, you can explore different scenarios and find a loan structure that fits your budget.</p></div>'
      },
      mortgage: {
        explanation: '<h2 class="explanation-title">Understanding Mortgage Qualification</h2><div class="explanation-text"><p>Our mortgage calculator helps you determine how much house you can afford by analyzing your income, existing debts, and desired loan terms. Getting a realistic picture of your qualification before speaking with a lender saves time and prevents disappointment.</p><h3>Key Factors in Mortgage Qualification</h3><ul><li><strong>Income</strong> — your gross monthly income is the foundation of qualification</li><li><strong>DTI Ratio</strong> — lenders typically require a debt-to-income ratio below 43%</li><li><strong>Down Payment</strong> — a larger down payment reduces your loan amount and monthly cost</li><li><strong>Interest Rate</strong> — even a small rate difference dramatically affects total cost</li></ul><h3>How DTI Ratio Affects Your Mortgage</h3><p>Your debt-to-income (DTI) ratio is one of the most important factors lenders evaluate. It compares your total monthly debt obligations — including the proposed mortgage payment — to your gross monthly income. Most conventional lenders prefer a DTI below 43%, and the lower the better. High DTI can limit the loan amount you qualify for or result in a higher interest rate.</p><h3>Tips for Better Mortgage Qualification</h3><ul><li>Pay down existing debts to lower your DTI ratio</li><li>Save for a larger down payment to reduce the required loan amount</li><li>Improve your credit score before applying for the best rates</li><li>Consider a longer loan term to reduce monthly payments</li></ul></div>'
      },
      paycheck: {
        explanation: '<h2 class="explanation-title">How Our Paycheck Calculator Works</h2><div class="explanation-text"><p>Our paycheck calculator helps you estimate your take-home pay after all taxes and deductions. Enter your hourly rate, hours worked, and applicable tax rates to see a detailed breakdown of your net income each pay period.</p><h3>Regular and Overtime Earnings</h3><p>The calculator supports multiple pay types. Enter your standard hourly rate and hours worked per period. For overtime, you can specify additional hours at common multipliers — 1.5× (time-and-a-half), 2× (double time), or 3× (triple time) — reflecting typical overtime pay structures.</p><h3>Taxes and Deductions</h3><ul><li><strong>Federal Income Tax</strong> — default 15%; adjust to match your bracket</li><li><strong>State Income Tax</strong> — default 5%; varies widely by state</li><li><strong>Social Security Tax</strong> — fixed at 6.2% of gross wages</li><li><strong>Medicare Tax</strong> — fixed at 1.45% of gross wages</li><li><strong>Retirement Contribution</strong> — enter your 401(k) or IRA contribution percentage</li><li><strong>Other Deductions</strong> — health insurance, FSA, or any flat-dollar deduction</li></ul><h3>Net Pay Calculation</h3><p>Your net pay (take-home pay) is calculated by subtracting all taxes and deductions from your gross earnings. Please note that these are estimates only. Actual withholding depends on your W-4 elections and specific state rules. Consult a tax professional for personalized advice.</p></div>'
      },
      debt: {
        explanation: '<h2 class="explanation-title">Understanding Debt Payoff</h2><div class="explanation-text"><p>Our debt payoff calculator helps you determine exactly when you\'ll be debt-free and how much interest you\'ll pay along the way. Enter your current balance, interest rate, and monthly payment to see a complete repayment timeline.</p><h3>Key Factors in Debt Payoff</h3><ul><li><strong>Debt Amount</strong> — your current outstanding balance</li><li><strong>Interest Rate</strong> — the annual percentage rate (APR) on your debt</li><li><strong>Monthly Payment</strong> — the fixed amount you pay each month</li><li><strong>Time to Debt-Free</strong> — calculated automatically based on the above inputs</li></ul><h3>Strategies for Faster Debt Payoff</h3><ul><li>Make larger monthly payments whenever possible to reduce principal faster</li><li>Explore debt consolidation to secure a lower interest rate</li><li>Use the debt snowball method (smallest balance first) to build momentum</li><li>Use the debt avalanche method (highest rate first) to minimize total interest paid</li></ul><h3>Benefits of Being Debt-Free</h3><ul><li>Improved credit score and financial profile</li><li>More disposable income for saving and investing</li><li>Significantly reduced financial stress</li><li>Greater financial flexibility for future goals</li></ul></div>'
      },
      compound: {
        explanation: '<h2 class="explanation-title">How Our Compound Interest Calculator Works</h2><div class="explanation-text"><p>Our compound interest calculator helps you estimate how your investments will grow over time. By factoring in your initial investment, regular contributions, interest rate, and compounding frequency, you can visualize the powerful effect of compounding on long-term wealth.</p><h3>Regular and Additional Contributions</h3><p>The calculator considers both your initial lump-sum investment and any recurring contributions you plan to make. Adding regular monthly or quarterly contributions — even small ones — can dramatically increase your final balance thanks to the compounding effect applied to each new contribution.</p><h3>Compound Frequency</h3><ul><li><strong>Daily</strong> — compounded 365 times per year (highest return)</li><li><strong>Monthly</strong> — compounded 12 times per year</li><li><strong>Quarterly</strong> — compounded 4 times per year</li><li><strong>Semi-annually</strong> — compounded 2 times per year</li><li><strong>Annually</strong> — compounded once per year (lowest return)</li></ul><p>The more frequently interest compounds, the higher your effective return. Over long time horizons, the difference between daily and annual compounding can be substantial.</p></div>'
      },
      investment: {
        explanation: '<h2 class="explanation-title">Understanding Investment Return Calculations</h2><div class="explanation-text"><p>Our investment return calculator helps you analyze the performance of your investments over a specified period. Whether you\'re reviewing a stock portfolio, mutual fund, or any other asset, this tool provides clear return metrics to guide your financial decisions.</p><h3>Key Features</h3><ul><li>Calculate total return percentage from start to finish</li><li>Compute the Compound Annual Growth Rate (CAGR) for annualized performance</li><li>Account for additional periodic contributions to your portfolio</li><li>Instant, easy-to-read results with no account required</li></ul><h3>Understanding Investment Return Metrics</h3><ul><li><strong>Total Return</strong> — the percentage gain or loss on your investment</li><li><strong>Annualized Return (CAGR)</strong> — the steady year-over-year growth rate equivalent</li><li><strong>Return Amount</strong> — the actual dollar gain or loss</li><li><strong>Total Invested</strong> — initial investment plus all additional contributions</li></ul><h3>How to Use This Calculator</h3><ul><li>Enter your initial investment amount</li><li>Enter the final value of the investment</li><li>Specify the investment period in years</li><li>Optionally add periodic contributions and their frequency</li></ul></div>'
      },
      dividend: {
        explanation: '<h2 class="explanation-title">Understanding Dividend Calculations</h2><div class="explanation-text"><p>Our dividend calculator helps you estimate the dividend income potential of your stock holdings. Whether you invest for income or are planning a dividend reinvestment strategy, this tool provides detailed projections of your dividend earnings over time.</p><h3>Key Features</h3><ul><li>Calculate dividends by entering a per-share amount or dividend yield percentage</li><li>View projected monthly, quarterly, and annual dividend income</li><li>Model a Dividend Reinvestment Plan (DRIP) to see compounding income growth</li><li>Factor in an annual dividend growth rate for realistic long-term projections</li></ul><h3>Understanding Dividend Metrics</h3><ul><li><strong>Dividend Yield</strong> — annual dividend income as a percentage of stock price</li><li><strong>Dividends Per Share (DPS)</strong> — the dollar amount paid per share each period</li><li><strong>Dividend Frequency</strong> — how often dividends are paid (monthly, quarterly, annually)</li><li><strong>Growth Rate</strong> — the expected annual rate of dividend increase</li><li><strong>DRIP</strong> — Dividend Reinvestment Plan; dividends buy additional shares automatically</li></ul><h3>How to Use This Calculator</h3><ul><li>Enter the dividend amount per share or dividend yield percentage</li><li>Input the current stock price and number of shares held</li><li>Select your dividend payment frequency and investment period</li><li>Enable DRIP if you plan to reinvest dividends</li></ul><p><em>Note: Dividends are not guaranteed and past performance does not indicate future results.</em></p></div>'
      },
      stock: {
        explanation: '<h2 class="explanation-title">Understanding Stock Returns</h2><div class="explanation-text"><p>Our stock return calculator helps you accurately measure the performance of your stock investments. By accounting for both price appreciation and dividend income, it delivers a comprehensive view of your total investment return.</p><h3>Key Features</h3><ul><li>Calculate total return including both price gains and dividends received</li><li>Compute CAGR (Compound Annual Growth Rate) for annualized performance</li><li>Adjust for stock splits to ensure accurate historical return calculations</li><li>See a breakdown of price return versus dividend return</li></ul><h3>Understanding Return Metrics</h3><ul><li><strong>Total Return</strong> — combined percentage return from price change and dividends</li><li><strong>CAGR</strong> — the annualized rate of growth over the investment period</li><li><strong>Price Return</strong> — return attributable solely to stock price movement</li><li><strong>Dividend Return</strong> — return attributable to dividends received</li><li><strong>Total Gain/Loss</strong> — the absolute dollar amount gained or lost</li></ul><h3>How to Use This Calculator</h3><ul><li>Enter the initial share price when you purchased the stock</li><li>Enter the current (or ending) share price</li><li>Input the number of shares held and the investment period</li><li>Optionally include total dividends received and any stock split ratio</li></ul></div>'
      }
    }
  },

  // ===========================================================
  // SPANISH
  // ===========================================================
  es: {
    localeDefaults: {
      loan:       { amount: '10000',  rate: '8.0',  term: '5' },
      mortgage:   { income: '5500',   debts: '450', term: '30', rate: '7.5', down: '40000' },
      paycheck:   { rate: '18',       hours: '40' },
      debt:       { amount: '12000',  rate: '20.0', payment: '400' },
      compound:   { initial: '5000',  contribution: '150', rate: '7.0', years: '10' },
      investment: { initial: '10000', final: '15000', period: '5' },
      dividend:   { price: '50',      dividend: '1.50', shares: '100', period: '5' },
      stock:      { initial: '50',    current: '75',    shares: '100', period: '3' }
    },
    calculators: {
      loan: {
        explanation: '<h2 class="explanation-title">Comprende el Cálculo de Tu Préstamo</h2><div class="explanation-text"><p>Nuestra calculadora de préstamos te ayuda a tomar decisiones financieras informadas al proporcionarte estimaciones precisas de tus pagos. Ya sea que estés planeando un préstamo personal, un préstamo para automóvil o una hipoteca, esta herramienta te ofrece una visión clara de tu compromiso financiero.</p><h3>Características Principales de Nuestra Calculadora</h3><ul><li>Calcula los pagos mensuales de forma rápida y precisa</li><li>Visualiza el total de intereses pagados durante la vida del préstamo</li><li>Consulta el importe total a pagar incluyendo capital e intereses</li><li>Resultados instantáneos sin necesidad de registro</li><li>Diseño adaptado a dispositivos móviles</li></ul><h3>Factores Clave del Préstamo</h3><p>Conocer tus pagos mensuales es fundamental para presupuestar y planificar tus finanzas. Nuestra calculadora tiene en cuenta tres factores principales:</p><ul><li><strong>Capital</strong> — el importe total que solicitas en préstamo</li><li><strong>Tasa de Interés</strong> — la tasa anual que cobra el prestamista</li><li><strong>Plazo del Préstamo</strong> — el número de años para devolver el préstamo</li></ul><p>Ajustando estas variables puedes explorar distintos escenarios y encontrar una estructura de préstamo que se adapte a tu presupuesto.</p></div>'
      },
      mortgage: {
        explanation: '<h2 class="explanation-title">Cómo Calificar para una Hipoteca</h2><div class="explanation-text"><p>Nuestra calculadora hipotecaria te ayuda a determinar cuánta vivienda puedes costear analizando tus ingresos, deudas existentes y los términos de préstamo deseados. Obtener una estimación realista antes de hablar con un banco te ahorra tiempo y evita decepciones.</p><h3>Factores Clave para Calificar a una Hipoteca</h3><ul><li><strong>Ingresos</strong> — tus ingresos brutos mensuales son la base de la calificación</li><li><strong>Ratio DTI</strong> — los prestamistas suelen exigir un ratio deuda-ingreso inferior al 43%</li><li><strong>Enganche</strong> — un mayor enganche reduce el monto del préstamo y el costo mensual</li><li><strong>Tasa de Interés</strong> — incluso una pequeña diferencia afecta significativamente el costo total</li></ul><h3>Cómo el Ratio DTI Afecta Tu Hipoteca</h3><p>El ratio deuda-ingreso (DTI) es uno de los factores más importantes que evalúan los prestamistas. Compara tus obligaciones mensuales de deuda totales — incluyendo el pago hipotecario propuesto — con tus ingresos brutos mensuales. La mayoría de los prestamistas convencionales prefieren un DTI inferior al 43%; mientras más bajo, mejor.</p><h3>Consejos para Mejorar Tu Calificación Hipotecaria</h3><ul><li>Reduce tus deudas actuales para bajar el ratio DTI</li><li>Ahorra para un enganche mayor y reducir el préstamo requerido</li><li>Mejora tu historial crediticio antes de solicitar la hipoteca</li><li>Considera un plazo más largo para reducir los pagos mensuales</li></ul></div>'
      },
      paycheck: {
        explanation: '<h2 class="explanation-title">Cómo Funciona Nuestra Calculadora de Nómina</h2><div class="explanation-text"><p>Nuestra calculadora de nómina te ayuda a estimar tu sueldo neto después de todos los impuestos y deducciones. Ingresa tu tarifa por hora, las horas trabajadas y las tasas impositivas aplicables para obtener un desglose detallado de tus ingresos netos cada período de pago.</p><h3>Ingresos Regulares y Horas Extra</h3><p>La calculadora admite múltiples tipos de pago. Ingresa tu tarifa horaria estándar y las horas trabajadas por período. Para las horas extra, puedes especificar horas adicionales con multiplicadores comunes: 1.5× (tiempo y medio), 2× (doble tiempo) o 3× (triple tiempo).</p><h3>Impuestos y Deducciones</h3><ul><li><strong>Impuesto Federal sobre la Renta</strong> — 15% por defecto; ajusta según tu tramo fiscal</li><li><strong>Impuesto Estatal sobre la Renta</strong> — 5% por defecto; varía según el estado</li><li><strong>Seguro Social</strong> — fijo al 6.2% del salario bruto</li><li><strong>Medicare</strong> — fijo al 1.45% del salario bruto</li><li><strong>Aportación a Jubilación</strong> — ingresa tu porcentaje de aportación al plan de pensiones</li><li><strong>Otras Deducciones</strong> — seguro médico, FSA u otras deducciones en cantidad fija</li></ul><h3>Cálculo del Salario Neto</h3><p>Tu salario neto se calcula restando todos los impuestos y deducciones de tus ingresos brutos. Ten en cuenta que estas son estimaciones. Los montos reales dependen de tu declaración W-4 y las normas estatales específicas. Consulta a un asesor fiscal para obtener orientación personalizada.</p></div>'
      },
      debt: {
        explanation: '<h2 class="explanation-title">Entendiendo el Pago de Deudas</h2><div class="explanation-text"><p>Nuestra calculadora de pago de deudas te ayuda a determinar exactamente cuándo estarás libre de deudas y cuántos intereses pagarás en el camino. Ingresa tu saldo actual, la tasa de interés y el pago mensual para ver un cronograma completo de amortización.</p><h3>Factores Clave en el Pago de Deudas</h3><ul><li><strong>Monto de la Deuda</strong> — tu saldo pendiente actual</li><li><strong>Tasa de Interés</strong> — la tasa porcentual anual (APR) de tu deuda</li><li><strong>Pago Mensual</strong> — el importe fijo que pagas cada mes</li><li><strong>Tiempo hasta Saldar la Deuda</strong> — calculado automáticamente según los datos ingresados</li></ul><h3>Estrategias para Pagar Deudas Más Rápido</h3><ul><li>Realiza pagos mensuales mayores siempre que sea posible para reducir el capital más rápido</li><li>Considera consolidar tus deudas para obtener una tasa de interés más baja</li><li>Usa el método bola de nieve (deuda más pequeña primero) para ganar impulso</li><li>Usa el método avalancha (tasa más alta primero) para minimizar los intereses totales</li></ul><h3>Beneficios de Estar Libre de Deudas</h3><ul><li>Mejora tu puntaje crediticio y perfil financiero</li><li>Mayor ingreso disponible para ahorrar e invertir</li><li>Reducción significativa del estrés financiero</li><li>Mayor flexibilidad financiera para metas futuras</li></ul></div>'
      },
      compound: {
        explanation: '<h2 class="explanation-title">Cómo Funciona Nuestra Calculadora de Interés Compuesto</h2><div class="explanation-text"><p>Nuestra calculadora de interés compuesto te ayuda a estimar cómo crecerán tus inversiones con el tiempo. Al considerar tu inversión inicial, contribuciones regulares, tasa de interés y frecuencia de capitalización, puedes visualizar el poderoso efecto del interés compuesto en la generación de riqueza a largo plazo.</p><h3>Aportaciones Regulares Adicionales</h3><p>La calculadora considera tanto tu inversión inicial de suma global como las aportaciones periódicas que planeas realizar. Agregar contribuciones regulares mensuales o trimestrales — incluso pequeñas — puede aumentar dramáticamente tu saldo final gracias al efecto de capitalización aplicado a cada nueva aportación.</p><h3>Frecuencia de Capitalización</h3><ul><li><strong>Diaria</strong> — capitalizada 365 veces al año (rendimiento más alto)</li><li><strong>Mensual</strong> — capitalizada 12 veces al año</li><li><strong>Trimestral</strong> — capitalizada 4 veces al año</li><li><strong>Semestral</strong> — capitalizada 2 veces al año</li><li><strong>Anual</strong> — capitalizada una vez al año (rendimiento más bajo)</li></ul><p>Cuanto más frecuente sea la capitalización, mayor será tu rendimiento efectivo. A lo largo de horizontes temporales largos, la diferencia entre capitalización diaria y anual puede ser sustancial.</p></div>'
      },
      investment: {
        explanation: '<h2 class="explanation-title">Entendiendo el Cálculo del Retorno de Inversión</h2><div class="explanation-text"><p>Nuestra calculadora de retorno de inversión te ayuda a analizar el rendimiento de tus inversiones durante un período determinado. Ya sea que estés revisando una cartera de acciones, un fondo mutuo u otro activo, esta herramienta proporciona métricas claras para guiar tus decisiones financieras.</p><h3>Características Principales</h3><ul><li>Calcula el porcentaje de retorno total de principio a fin</li><li>Calcula la Tasa de Crecimiento Anual Compuesta (CAGR) para el rendimiento anualizado</li><li>Considera aportaciones periódicas adicionales a tu cartera</li><li>Resultados instantáneos y fáciles de leer sin necesidad de cuenta</li></ul><h3>Métricas de Retorno de Inversión</h3><ul><li><strong>Retorno Total</strong> — el porcentaje de ganancia o pérdida sobre tu inversión</li><li><strong>Retorno Anualizado (CAGR)</strong> — la tasa de crecimiento anual equivalente constante</li><li><strong>Importe del Retorno</strong> — la ganancia o pérdida real en pesos/dólares</li><li><strong>Total Invertido</strong> — inversión inicial más todas las aportaciones adicionales</li></ul><h3>Cómo Usar Esta Calculadora</h3><ul><li>Ingresa tu importe de inversión inicial</li><li>Ingresa el valor final de la inversión</li><li>Especifica el período de inversión en años</li><li>Opcionalmente agrega aportaciones periódicas y su frecuencia</li></ul></div>'
      },
      dividend: {
        explanation: '<h2 class="explanation-title">Entendiendo el Cálculo de Dividendos</h2><div class="explanation-text"><p>Nuestra calculadora de dividendos te ayuda a estimar el potencial de ingresos por dividendos de tus acciones. Ya sea que inviertas por ingresos o estés planeando una estrategia de reinversión de dividendos, esta herramienta proporciona proyecciones detalladas de tus ganancias por dividendos a lo largo del tiempo.</p><h3>Características Principales</h3><ul><li>Calcula dividendos ingresando el monto por acción o el porcentaje de rendimiento</li><li>Visualiza los ingresos proyectados de dividendos mensual, trimestral y anualmente</li><li>Modela un Plan de Reinversión de Dividendos (DRIP) para ver el crecimiento compuesto</li><li>Considera una tasa de crecimiento anual de dividendos para proyecciones realistas</li></ul><h3>Métricas de Dividendos</h3><ul><li><strong>Rendimiento por Dividendo</strong> — ingresos anuales como porcentaje del precio de la acción</li><li><strong>Dividendo por Acción (DPA)</strong> — el importe en dólares pagado por acción cada período</li><li><strong>Frecuencia de Dividendos</strong> — con qué frecuencia se pagan dividendos</li><li><strong>Tasa de Crecimiento</strong> — la tasa anual esperada de aumento del dividendo</li><li><strong>DRIP</strong> — Plan de Reinversión de Dividendos; los dividendos compran acciones adicionales automáticamente</li></ul><h3>Cómo Usar Esta Calculadora</h3><ul><li>Ingresa el monto del dividendo por acción o el porcentaje de rendimiento</li><li>Ingresa el precio actual de la acción y el número de acciones en cartera</li><li>Selecciona la frecuencia de pago de dividendos y el período de inversión</li><li>Activa el DRIP si planeas reinvertir los dividendos</li></ul><p><em>Nota: Los dividendos no están garantizados y el rendimiento pasado no indica resultados futuros.</em></p></div>'
      },
      stock: {
        explanation: '<h2 class="explanation-title">Entendiendo los Retornos Bursátiles</h2><div class="explanation-text"><p>Nuestra calculadora de retorno de acciones te ayuda a medir con precisión el rendimiento de tus inversiones en bolsa. Al considerar tanto la apreciación del precio como los ingresos por dividendos, ofrece una visión integral de tu retorno total de inversión.</p><h3>Características Principales</h3><ul><li>Calcula el retorno total incluyendo ganancias de precio y dividendos recibidos</li><li>Calcula el CAGR (Tasa de Crecimiento Anual Compuesta) para el rendimiento anualizado</li><li>Ajusta los retornos históricos por desdoblamiento de acciones</li><li>Muestra el desglose entre retorno por precio y retorno por dividendos</li></ul><h3>Métricas de Retorno</h3><ul><li><strong>Retorno Total</strong> — porcentaje combinado de cambio de precio y dividendos</li><li><strong>CAGR</strong> — la tasa de crecimiento anualizada durante el período de inversión</li><li><strong>Retorno por Precio</strong> — retorno atribuible únicamente al movimiento del precio</li><li><strong>Retorno por Dividendos</strong> — retorno atribuible a los dividendos recibidos</li><li><strong>Ganancia/Pérdida Total</strong> — el importe absoluto en dólares ganado o perdido</li></ul><h3>Cómo Usar Esta Calculadora</h3><ul><li>Ingresa el precio inicial de la acción cuando compraste</li><li>Ingresa el precio actual (o final) de la acción</li><li>Ingresa el número de acciones y el período de inversión</li><li>Opcionalmente incluye los dividendos totales recibidos y el ratio de desdoblamiento</li></ul></div>'
      }
    }
  },

  // ===========================================================
  // CHINESE (SIMPLIFIED)
  // ===========================================================
  zh: {
    localeDefaults: {
      loan:       { amount: '100000',  rate: '4.5',  term: '5' },
      mortgage:   { income: '25000',   debts: '3000', term: '30', rate: '4.2', down: '300000' },
      paycheck:   { rate: '80',        hours: '40' },
      debt:       { amount: '50000',   rate: '15.0', payment: '2000' },
      compound:   { initial: '50000',  contribution: '2000', rate: '6.0', years: '10' },
      investment: { initial: '100000', final: '150000', period: '5' },
      dividend:   { price: '30',       dividend: '0.80', shares: '1000', period: '5' },
      stock:      { initial: '30',     current: '50',    shares: '1000', period: '3' }
    },
    calculators: {
      loan: {
        explanation: '<h2 class="explanation-title">了解您的贷款计算</h2><div class="explanation-text"><p>我们的贷款计算器通过提供精确的还款估算，帮助您做出明智的财务决策。无论您是计划申请个人贷款、汽车贷款还是房屋贷款，本计算器都能清晰呈现您的财务承诺。</p><h3>贷款计算器主要功能</h3><ul><li>快速准确地计算每月还款额</li><li>查看贷款期内支付的总利息</li><li>显示包含本金和利息的总还款额</li><li>无需注册即可获得即时结果</li><li>移动端友好，适配任何设备</li></ul><h3>影响贷款的关键因素</h3><p>了解每月还款额对于制定预算和财务规划至关重要。本计算器考虑以下三个主要因素：</p><ul><li><strong>贷款本金</strong> — 您借款的总金额</li><li><strong>年利率</strong> — 贷款方收取的年化利率</li><li><strong>贷款期限</strong> — 偿还贷款的年数</li></ul><p>通过调整这些变量，您可以探索不同的还款方案，找到适合自身预算的贷款结构。</p></div>'
      },
      mortgage: {
        explanation: '<h2 class="explanation-title">了解房屋贷款资格</h2><div class="explanation-text"><p>我们的房贷计算器通过分析您的收入、现有债务和期望贷款条件，帮助您确定能够承受的房屋价格。在与银行交谈之前获得切实可行的资格预估，可以节省时间并避免不必要的失望。</p><h3>房贷资格的关键因素</h3><ul><li><strong>收入</strong> — 您的月税前收入是资格审核的基础</li><li><strong>债务收入比（DTI）</strong> — 贷款机构通常要求DTI低于43%</li><li><strong>首付款</strong> — 较高的首付可降低贷款金额和月供</li><li><strong>利率</strong> — 即使是微小的利率差异也会对总费用产生重大影响</li></ul><h3>债务收入比如何影响您的房贷</h3><p>债务收入比（DTI）是贷款机构评估的最重要因素之一。它将您的月总债务支出（包括拟议的房贷还款）与月税前收入进行比较。大多数传统贷款机构要求DTI低于43%，越低越好。高DTI可能限制您能获批的贷款金额或导致更高的利率。</p><h3>提升房贷资格的建议</h3><ul><li>偿还现有债务以降低DTI比率</li><li>积累更多首付以减少所需贷款金额</li><li>申请前提升个人征信评分以获得最优利率</li><li>考虑较长还款期限以降低月供压力</li></ul></div>'
      },
      paycheck: {
        explanation: '<h2 class="explanation-title">薪资计算器使用说明</h2><div class="explanation-text"><p>我们的薪资计算器帮助您估算扣除税款和各项扣除后的实际到手工资。输入时薪、工作时长及适用税率，即可获得每个薪资周期净收入的详细明细。</p><h3>正常工时与加班收入</h3><p>计算器支持多种薪酬类型。输入标准时薪和每周期工作时长。对于加班，您可以按常见倍率指定加班时数：1.5倍（正常加班）、2倍（双倍工资）或3倍（三倍工资）。</p><h3>税款与扣除项目</h3><ul><li><strong>联邦个人所得税</strong> — 默认15%；根据您的税率档次调整</li><li><strong>州个人所得税</strong> — 默认5%；因州而异</li><li><strong>社会安全税</strong> — 固定为税前工资的6.2%</li><li><strong>医疗保险税</strong> — 固定为税前工资的1.45%</li><li><strong>退休金供款</strong> — 输入您的401(k)或IRA供款比例</li><li><strong>其他扣除</strong> — 医疗保险、FSA或其他固定金额扣除</li></ul><h3>净工资计算</h3><p>净工资（到手工资）通过从税前收入中扣除所有税款和扣除项目计算得出。请注意，这些仅为估算值。实际代扣金额取决于您的W-4申报情况和具体州法规。如需个性化建议，请咨询税务专业人士。</p></div>'
      },
      debt: {
        explanation: '<h2 class="explanation-title">了解债务偿还计划</h2><div class="explanation-text"><p>我们的债务偿还计算器帮助您准确确定何时能够实现无债一身轻，以及在此过程中需要支付多少利息。输入当前余额、利率和每月还款额，即可查看完整的还款时间表。</p><h3>债务偿还的关键因素</h3><ul><li><strong>债务金额</strong> — 您当前的未偿还余额</li><li><strong>利率</strong> — 债务的年化百分比利率（APR）</li><li><strong>每月还款额</strong> — 每月固定还款金额</li><li><strong>无债日期</strong> — 根据上述输入自动计算</li></ul><h3>加速还债的策略</h3><ul><li>尽可能增加月还款额以更快降低本金</li><li>考虑债务整合以获取更低利率</li><li>使用债务雪球法（最小余额优先）积累还款动力</li><li>使用债务雪崩法（最高利率优先）最小化总利息支出</li></ul><h3>无债生活的好处</h3><ul><li>提升信用评分和财务状况</li><li>增加可支配收入用于储蓄和投资</li><li>显著减轻财务压力</li><li>为未来目标提供更大的财务灵活性</li></ul></div>'
      },
      compound: {
        explanation: '<h2 class="explanation-title">复利计算器使用说明</h2><div class="explanation-text"><p>我们的复利计算器帮助您估算投资随时间的增长情况。通过综合考虑初始投资额、定期供款、利率和复利频率，您可以直观感受复利在长期财富积累中的强大效果。</p><h3>定期追加投入</h3><p>计算器同时考虑您的初始一次性投资以及计划进行的定期供款。定期追加月供或季供——即便金额较小——也能因复利效应而显著提升最终余额。</p><h3>复利频率</h3><ul><li><strong>每日</strong> — 每年复利365次（收益最高）</li><li><strong>每月</strong> — 每年复利12次</li><li><strong>每季</strong> — 每年复利4次</li><li><strong>每半年</strong> — 每年复利2次</li><li><strong>每年</strong> — 每年复利1次（收益最低）</li></ul><p>复利频率越高，实际收益率越高。在较长的投资周期内，每日复利与年度复利之间的差异可能相当可观。</p></div>'
      },
      investment: {
        explanation: '<h2 class="explanation-title">了解投资回报率计算</h2><div class="explanation-text"><p>我们的投资回报率计算器帮助您分析特定时期内投资的表现。无论您是在审查股票组合、基金还是其他资产，本工具均可提供清晰的回报指标，为您的财务决策提供依据。</p><h3>主要功能</h3><ul><li>计算从头到尾的总回报百分比</li><li>计算复合年均增长率（CAGR）以衡量年化表现</li><li>考虑对投资组合的额外定期供款</li><li>无需账户即可获得即时清晰的计算结果</li></ul><h3>投资回报指标解析</h3><ul><li><strong>总回报率</strong> — 投资的百分比盈亏</li><li><strong>年化回报率（CAGR）</strong> — 等效的稳定年均增长率</li><li><strong>回报金额</strong> — 实际盈亏的人民币/美元金额</li><li><strong>总投入</strong> — 初始投资加所有追加供款</li></ul><h3>使用方法</h3><ul><li>输入初始投资金额</li><li>输入投资终值</li><li>填写投资年限</li><li>可选择添加定期供款及其频率</li></ul></div>'
      },
      dividend: {
        explanation: '<h2 class="explanation-title">了解股息计算</h2><div class="explanation-text"><p>我们的股息计算器帮助您估算持股的股息收益潜力。无论您是为了收益投资，还是正在规划股息再投资策略，本工具均可提供详细的股息收益预测。</p><h3>主要功能</h3><ul><li>通过输入每股股息金额或股息率来计算股息收益</li><li>查看预计的月度、季度和年度股息收入</li><li>模拟股息再投资计划（DRIP）以观察复利收益增长</li><li>纳入年度股息增长率以进行切实的长期预测</li></ul><h3>股息核心指标</h3><ul><li><strong>股息率</strong> — 年度股息收入占股票价格的百分比</li><li><strong>每股股息（DPS）</strong> — 每个周期每股派发的金额</li><li><strong>分红频率</strong> — 股息支付频率（月度、季度、年度）</li><li><strong>增长率</strong> — 预期的年度股息增长率</li><li><strong>DRIP</strong> — 股息再投资计划；股息自动用于购买额外股份</li></ul><h3>使用方法</h3><ul><li>输入每股股息金额或股息率百分比</li><li>输入当前股价和持有股数</li><li>选择股息支付频率和投资期限</li><li>如计划再投资股息，请启用DRIP选项</li></ul><p><em>注意：股息无保证，过往表现不代表未来业绩。</em></p></div>'
      },
      stock: {
        explanation: '<h2 class="explanation-title">了解股票投资回报</h2><div class="explanation-text"><p>我们的股票回报计算器帮助您准确衡量股票投资的表现。通过综合考虑股价涨幅和股息收入，全面呈现您的投资总回报。</p><h3>主要功能</h3><ul><li>计算包含股价涨幅和已收股息的总回报率</li><li>计算CAGR（复合年均增长率）以衡量年化表现</li><li>针对股票拆分进行调整，确保历史回报计算准确</li><li>分别显示价格回报与股息回报的构成</li></ul><h3>回报指标解析</h3><ul><li><strong>总回报率</strong> — 股价变动与股息的综合百分比回报</li><li><strong>CAGR</strong> — 投资期间的年化增长率</li><li><strong>价格回报</strong> — 仅归因于股价变动的回报</li><li><strong>股息回报</strong> — 归因于已收股息的回报</li><li><strong>总盈亏</strong> — 盈利或亏损的绝对金额</li></ul><h3>使用方法</h3><ul><li>输入买入时的初始股价</li><li>输入当前（或终止）股价</li><li>输入持有股数和投资年限</li><li>可选择输入已收总股息和股票拆分比例</li></ul></div>'
      }
    }
  },

  // ===========================================================
  // KOREAN
  // ===========================================================
  ko: {
    localeDefaults: {
      loan:       { amount: '10000000',  rate: '4.5',  term: '5' },
      mortgage:   { income: '5000000',   debts: '500000', term: '30', rate: '4.0', down: '100000000' },
      paycheck:   { rate: '15000',       hours: '40' },
      debt:       { amount: '10000000',  rate: '15.0', payment: '300000' },
      compound:   { initial: '5000000',  contribution: '200000', rate: '5.0', years: '10' },
      investment: { initial: '10000000', final: '15000000', period: '5' },
      dividend:   { price: '50000',      dividend: '1000', shares: '100', period: '5' },
      stock:      { initial: '50000',    current: '75000', shares: '100', period: '3' }
    },
    calculators: {
      loan: {
        explanation: '<h2 class="explanation-title">대출 계산 완벽 가이드</h2><div class="explanation-text"><p>저희 대출 계산기는 월 상환액을 정확하게 산출하여 현명한 금융 결정을 내릴 수 있도록 도와줍니다. 신용대출, 자동차 할부, 주택담보대출 등 어떤 대출이든 상환 부담을 사전에 파악할 수 있습니다.</p><h3>대출 계산기 주요 기능</h3><ul><li>월 상환액을 빠르고 정확하게 계산</li><li>대출 기간 동안 납부할 총 이자 확인</li><li>원금과 이자를 포함한 총 상환금액 제공</li><li>회원가입 없이 즉시 결과 확인</li><li>모바일 최적화 설계로 어디서든 편리하게 사용</li></ul><h3>대출 조건의 핵심 요소</h3><p>월 상환액을 이해하는 것은 가계 예산 수립과 재무 계획에 매우 중요합니다. 본 계산기는 세 가지 핵심 요소를 고려합니다.</p><ul><li><strong>대출 원금</strong> — 실제로 빌리는 총 금액</li><li><strong>연 이자율</strong> — 금융기관이 부과하는 연간 이자율</li><li><strong>대출 기간</strong> — 원리금을 상환하는 기간(년)</li></ul><p>이 세 가지 변수를 조정하면 다양한 시나리오를 비교하여 자신의 상황에 맞는 최적의 대출 조건을 찾을 수 있습니다.</p></div>'
      },
      mortgage: {
        explanation: '<h2 class="explanation-title">주택담보대출 한도 계산 가이드</h2><div class="explanation-text"><p>저희 주택담보대출 계산기는 소득, 기존 부채, 희망 대출 조건을 분석하여 구매 가능한 주택 가격을 파악하는 데 도움을 드립니다. 은행 상담 전에 현실적인 대출 한도를 미리 확인하면 시간을 절약하고 실망을 방지할 수 있습니다.</p><h3>주택담보대출 심사의 핵심 요소</h3><ul><li><strong>월 소득</strong> — 세전 월 소득이 심사의 기초가 됩니다</li><li><strong>총부채상환비율(DTI)</strong> — 대부분의 금융기관은 DTI 43% 이하를 요구합니다</li><li><strong>계약금(자기자금)</strong> — 자기자금이 많을수록 대출금액과 월 상환액이 줄어듭니다</li><li><strong>금리</strong> — 금리의 작은 차이도 총 이자 비용에 큰 영향을 미칩니다</li></ul><h3>DTI가 주택담보대출에 미치는 영향</h3><p>총부채상환비율(DTI)은 금융기관이 가장 중요하게 평가하는 지표 중 하나입니다. 주택담보대출 예정 상환액을 포함한 월 총 부채 상환액을 월 세전 소득으로 나눈 비율입니다. 대부분의 금융기관은 DTI 43% 이하를 선호하며, 낮을수록 유리합니다. DTI가 높으면 대출 한도가 줄어들거나 더 높은 금리가 적용될 수 있습니다.</p><h3>주택담보대출 조건을 개선하는 방법</h3><ul><li>기존 부채를 상환하여 DTI를 낮추세요</li><li>자기자금을 늘려 필요 대출금액을 줄이세요</li><li>대출 신청 전 신용등급을 높여 우대 금리를 받으세요</li><li>대출 기간을 늘려 월 상환 부담을 줄이는 방안을 검토하세요</li></ul></div>'
      },
      paycheck: {
        explanation: '<h2 class="explanation-title">급여 계산기 사용 가이드</h2><div class="explanation-text"><p>저희 급여 계산기는 각종 세금과 공제 후 실제 수령액(실수령액)을 추정하는 데 도움을 드립니다. 시급, 근무 시간, 세율을 입력하면 각 급여 지급일별 순 소득 상세 내역을 확인할 수 있습니다.</p><h3>기본 근무와 초과근무 수당</h3><p>계산기는 다양한 급여 유형을 지원합니다. 기본 시급과 기간별 근무 시간을 입력하세요. 초과근무의 경우 일반적인 배율로 추가 시간을 지정할 수 있습니다: 1.5배(통상 연장근무), 2배(심야·휴일 가산), 3배(특별 가산).</p><h3>세금 및 공제 항목</h3><ul><li><strong>연방 소득세</strong> — 기본값 15%; 세율 구간에 맞게 조정</li><li><strong>주 소득세</strong> — 기본값 5%; 주별로 상이</li><li><strong>사회보장세</strong> — 과세 소득의 6.2% 고정</li><li><strong>메디케어세</strong> — 과세 소득의 1.45% 고정</li><li><strong>퇴직연금 기여금</strong> — 401(k) 또는 IRA 기여 비율 입력</li><li><strong>기타 공제</strong> — 건강보험, FSA 또는 기타 정액 공제 항목</li></ul><h3>실수령액 계산</h3><p>실수령액은 총 급여에서 모든 세금과 공제 항목을 차감하여 계산됩니다. 이 결과는 추정치입니다. 실제 원천징수 금액은 W-4 신고 내용과 각 주의 세법에 따라 달라질 수 있습니다. 개인 맞춤 조언을 위해 세무 전문가와 상담하시기 바랍니다.</p></div>'
      },
      debt: {
        explanation: '<h2 class="explanation-title">부채 상환 계획 가이드</h2><div class="explanation-text"><p>저희 부채 상환 계산기는 언제 완전히 부채를 청산할 수 있는지, 그 과정에서 이자를 얼마나 납부하는지 정확하게 파악하는 데 도움을 드립니다. 현재 잔액, 이자율, 월 상환액을 입력하면 전체 상환 일정을 확인할 수 있습니다.</p><h3>부채 상환의 핵심 요소</h3><ul><li><strong>부채 금액</strong> — 현재 미상환 잔액</li><li><strong>이자율</strong> — 부채에 적용되는 연 이자율(APR)</li><li><strong>월 상환액</strong> — 매월 고정적으로 납부하는 금액</li><li><strong>부채 청산 기간</strong> — 입력된 조건에 따라 자동 계산</li></ul><h3>부채를 더 빨리 상환하는 전략</h3><ul><li>가능한 한 월 상환액을 늘려 원금을 빠르게 줄이세요</li><li>저금리 대환 대출로 이자 부담을 낮추는 방안을 검토하세요</li><li>눈덩이 방식(잔액이 작은 부채 먼저)으로 상환 모멘텀을 쌓으세요</li><li>눈사태 방식(이자율이 높은 부채 먼저)으로 총 이자 지출을 최소화하세요</li></ul><h3>부채 완전 청산의 장점</h3><ul><li>신용등급 및 재무 프로필 개선</li><li>저축과 투자에 사용할 수 있는 가처분 소득 증가</li><li>재정적 스트레스 대폭 감소</li><li>미래 목표를 위한 더 큰 재무적 유연성 확보</li></ul></div>'
      },
      compound: {
        explanation: '<h2 class="explanation-title">복리 계산기 사용 가이드</h2><div class="explanation-text"><p>저희 복리 계산기는 시간이 지남에 따라 투자가 어떻게 성장하는지 추정하는 데 도움을 드립니다. 초기 투자금, 정기 납입금, 이자율, 복리 적용 주기를 종합적으로 고려하여 장기 자산 증식에서 복리 효과가 얼마나 강력한지 시각적으로 확인할 수 있습니다.</p><h3>정기 추가 납입</h3><p>계산기는 초기 일시 투자금과 정기적으로 추가 납입할 금액을 모두 고려합니다. 매월 또는 매 분기 소액이라도 정기적으로 납입하면 각 납입금에 복리 효과가 적용되어 최종 잔액이 크게 늘어납니다.</p><h3>복리 적용 주기</h3><ul><li><strong>매일</strong> — 연 365회 복리 적용 (수익률 최고)</li><li><strong>매월</strong> — 연 12회 복리 적용</li><li><strong>매 분기</strong> — 연 4회 복리 적용</li><li><strong>반기</strong> — 연 2회 복리 적용</li><li><strong>매년</strong> — 연 1회 복리 적용 (수익률 최저)</li></ul><p>복리 적용 주기가 짧을수록 실효 수익률이 높아집니다. 장기 투자 기간에서 일복리와 연복리의 차이는 상당히 클 수 있습니다.</p></div>'
      },
      investment: {
        explanation: '<h2 class="explanation-title">투자 수익률 계산 가이드</h2><div class="explanation-text"><p>저희 투자 수익률 계산기는 특정 기간 동안의 투자 성과를 분석하는 데 도움을 드립니다. 주식 포트폴리오, 펀드 등 어떤 자산이든 명확한 수익률 지표를 통해 금융 의사결정을 지원합니다.</p><h3>주요 기능</h3><ul><li>투자 시작부터 종료까지의 총 수익률 계산</li><li>연환산 성과 측정을 위한 연평균 복합 성장률(CAGR) 산출</li><li>포트폴리오에 대한 추가 정기 납입 반영</li><li>계정 등록 없이 즉시 명확한 결과 확인</li></ul><h3>투자 수익률 지표 이해</h3><ul><li><strong>총 수익률</strong> — 투자 원금 대비 손익 비율(%)</li><li><strong>연환산 수익률(CAGR)</strong> — 해당 기간의 등가 연평균 성장률</li><li><strong>수익금액</strong> — 실제 원화/달러 기준 손익 금액</li><li><strong>총 투자금</strong> — 초기 투자금과 모든 추가 납입금의 합계</li></ul><h3>사용 방법</h3><ul><li>초기 투자금액을 입력하세요</li><li>투자 최종 가치를 입력하세요</li><li>투자 기간(년)을 입력하세요</li><li>선택 사항: 정기 추가 납입금과 납입 주기를 입력하세요</li></ul></div>'
      },
      dividend: {
        explanation: '<h2 class="explanation-title">배당금 계산 가이드</h2><div class="explanation-text"><p>저희 배당금 계산기는 보유 주식의 배당 수익 잠재력을 추정하는 데 도움을 드립니다. 배당 수익을 목적으로 투자하거나 배당금 재투자 전략을 계획 중이라면, 이 도구로 장기적인 배당 수익 전망을 확인하세요.</p><h3>주요 기능</h3><ul><li>주당 배당금 또는 배당 수익률(%)로 배당 수익 계산</li><li>예상 월별·분기별·연간 배당 수입 확인</li><li>배당금 재투자 계획(DRIP) 시뮬레이션으로 복리 성장 효과 확인</li><li>연간 배당금 성장률을 반영한 현실적인 장기 전망 제공</li></ul><h3>배당 핵심 지표</h3><ul><li><strong>배당 수익률</strong> — 주가 대비 연간 배당금 비율(%)</li><li><strong>주당 배당금(DPS)</strong> — 각 지급 기간별 주당 배당금액</li><li><strong>배당 지급 주기</strong> — 배당금 지급 빈도 (월간, 분기별, 연간)</li><li><strong>배당 성장률</strong> — 예상 연간 배당금 증가율</li><li><strong>DRIP</strong> — 배당금 재투자 계획; 배당금으로 자동으로 추가 주식 매수</li></ul><h3>사용 방법</h3><ul><li>주당 배당금액 또는 배당 수익률(%)을 입력하세요</li><li>현재 주가와 보유 주식 수를 입력하세요</li><li>배당 지급 주기와 투자 기간을 선택하세요</li><li>배당금 재투자를 계획한다면 DRIP 옵션을 활성화하세요</li></ul><p><em>참고: 배당금은 보장되지 않으며, 과거 실적이 미래 수익을 보장하지 않습니다.</em></p></div>'
      },
      stock: {
        explanation: '<h2 class="explanation-title">주식 수익률 계산 가이드</h2><div class="explanation-text"><p>저희 주식 수익률 계산기는 주식 투자의 성과를 정확하게 측정하는 데 도움을 드립니다. 주가 상승분과 배당 수익을 모두 고려하여 총 투자 수익률을 종합적으로 보여줍니다.</p><h3>주요 기능</h3><ul><li>주가 상승 및 수령 배당금을 포함한 총 수익률 계산</li><li>연환산 성과 측정을 위한 CAGR(연평균 복합 성장률) 산출</li><li>주식 분할(액면분할)을 반영한 정확한 과거 수익률 계산</li><li>주가 수익률과 배당 수익률 분리 확인</li></ul><h3>수익률 지표 이해</h3><ul><li><strong>총 수익률</strong> — 주가 변동과 배당금을 합산한 종합 수익률(%)</li><li><strong>CAGR</strong> — 투자 기간 동안의 연환산 성장률</li><li><strong>주가 수익률</strong> — 주가 변동에만 기인하는 수익률</li><li><strong>배당 수익률</strong> — 수령한 배당금에 기인하는 수익률</li><li><strong>총 손익</strong> — 실제 원화 기준 총 손익 금액</li></ul><h3>사용 방법</h3><ul><li>주식 매수 당시의 초기 매입 단가를 입력하세요</li><li>현재(또는 매도) 주가를 입력하세요</li><li>보유 주식 수와 투자 기간을 입력하세요</li><li>선택 사항: 수령한 총 배당금과 주식 분할 비율을 입력하세요</li></ul></div>'
      }
    }
  },

  // ===========================================================
  // JAPANESE
  // ===========================================================
  ja: {
    localeDefaults: {
      loan:       { amount: '1000000',  rate: '3.0',  term: '5' },
      mortgage:   { income: '400000',   debts: '50000', term: '35', rate: '1.5', down: '5000000' },
      paycheck:   { rate: '1500',       hours: '40' },
      debt:       { amount: '500000',   rate: '15.0', payment: '20000' },
      compound:   { initial: '500000',  contribution: '30000', rate: '4.0', years: '10' },
      investment: { initial: '1000000', final: '1500000', period: '5' },
      dividend:   { price: '2000',      dividend: '50', shares: '100', period: '5' },
      stock:      { initial: '2000',    current: '3000', shares: '100', period: '3' }
    },
    calculators: {
      loan: {
        explanation: '<h2 class="explanation-title">ローン計算の完全ガイド</h2><div class="explanation-text"><p>当サイトのローン計算機は、毎月の返済額を正確に算出し、賢い財務的意思決定をサポートします。カードローン、マイカーローン、住宅ローンなど、あらゆるローンの返済負担を事前に把握できます。</p><h3>ローン計算機の主な機能</h3><ul><li>毎月の返済額を素早く正確に計算</li><li>ローン期間中に支払う総利息の確認</li><li>元金と利息を含む総返済額の表示</li><li>会員登録なしで即座に結果を確認</li><li>スマートフォン対応で外出先でも便利に利用可能</li></ul><h3>ローン条件の重要な要素</h3><p>毎月の返済額を把握することは、家計管理と財務計画において非常に重要です。本計算機は以下の3つの主要要素を考慮します。</p><ul><li><strong>借入元金</strong> — 実際に借り入れる総額</li><li><strong>年利率</strong> — 金融機関が設定する年間利率</li><li><strong>返済期間</strong> — 元利金を返済する期間（年数）</li></ul><p>これらの変数を調整することで、さまざまなシナリオを比較し、ご自身の状況に最適なローン条件を見つけることができます。</p></div>'
      },
      mortgage: {
        explanation: '<h2 class="explanation-title">住宅ローン審査ガイド</h2><div class="explanation-text"><p>当サイトの住宅ローン計算機は、収入・既存の負債・希望する融資条件を分析し、購入可能な物件価格を把握するお手伝いをします。金融機関に相談する前に現実的な借入可能額を確認することで、時間の節約と不要な落胆を防ぐことができます。</p><h3>住宅ローン審査の重要な要素</h3><ul><li><strong>月収</strong> — 税引前の月収が審査の基礎となります</li><li><strong>返済負担率（DTI）</strong> — 多くの金融機関はDTI43%以下を求めます</li><li><strong>頭金</strong> — 頭金が多いほど借入額と毎月の返済額が減ります</li><li><strong>金利</strong> — わずかな金利差が総返済額に大きく影響します</li></ul><h3>返済負担率が住宅ローンに与える影響</h3><p>返済負担率（DTI）は金融機関が最も重視する指標の一つです。住宅ローンの予定返済額を含む月々の総返済額を、税引前の月収で割った比率です。多くの金融機関はDTI43%以下を推奨しており、低いほど有利です。DTIが高いと融資額が制限されたり、金利が高くなる場合があります。</p><h3>住宅ローン審査を通過するためのポイント</h3><ul><li>既存の借入を返済してDTIを下げましょう</li><li>頭金を増やして必要借入額を減らしましょう</li><li>申込前に信用情報を整えて優遇金利を受けましょう</li><li>返済期間を長めに設定して月々の返済負担を軽減することも検討してください</li></ul></div>'
      },
      paycheck: {
        explanation: '<h2 class="explanation-title">給与計算機の使い方ガイド</h2><div class="explanation-text"><p>当サイトの給与計算機は、税金や各種控除後の手取り額（実際の受取額）を見積もるお手伝いをします。時給・労働時間・税率を入力すると、各給与支払い期間の手取り額の詳細な内訳が確認できます。</p><h3>基本給と残業代</h3><p>計算機はさまざまな給与タイプに対応しています。基本時給と期間ごとの労働時間を入力してください。残業については、一般的な割増倍率で追加時間を指定できます：1.5倍（法定残業手当）、2倍（深夜・休日割増）、3倍（特別割増）。</p><h3>税金・控除項目</h3><ul><li><strong>連邦所得税</strong> — デフォルト15%；ご自身の税率区分に合わせて調整</li><li><strong>州所得税</strong> — デフォルト5%；州によって異なります</li><li><strong>社会保障税</strong> — 課税賃金の6.2%（固定）</li><li><strong>メディケア税</strong> — 課税賃金の1.45%（固定）</li><li><strong>退職年金拠出</strong> — 401(k)またはIRAへの拠出率を入力</li><li><strong>その他控除</strong> — 健康保険、FSAまたはその他の定額控除</li></ul><h3>手取り額の計算</h3><p>手取り額は、総支給額からすべての税金と控除項目を差し引いて計算されます。これらの金額はあくまで目安です。実際の源泉徴収額はW-4の申告内容や各州の税法によって異なります。個別のアドバイスについては税務専門家にご相談ください。</p></div>'
      },
      debt: {
        explanation: '<h2 class="explanation-title">借金返済計画の完全ガイド</h2><div class="explanation-text"><p>当サイトの借金返済計算機は、いつ完全に借金を完済できるか、その過程でどれだけの利息を支払うかを正確に把握するお手伝いをします。現在の残高・金利・月々の返済額を入力すると、完全な返済スケジュールが確認できます。</p><h3>借金返済の重要な要素</h3><ul><li><strong>借入残高</strong> — 現在の未払い残高</li><li><strong>金利</strong> — 借金に適用される年利率（APR）</li><li><strong>毎月の返済額</strong> — 毎月固定で支払う金額</li><li><strong>完済期間</strong> — 入力した条件から自動計算</li></ul><h3>借金を早く返すための戦略</h3><ul><li>できる限り月々の返済額を増やして元金を早く減らしましょう</li><li>低金利への借り換えを検討して利息負担を軽減しましょう</li><li>スノーボール法（残高の少ない借金から順に返済）で返済の弾みをつけましょう</li><li>アバランシェ法（高金利の借金から順に返済）で総利息を最小化しましょう</li></ul><h3>借金完済のメリット</h3><ul><li>信用スコアと財務プロフィールの向上</li><li>貯蓄や投資に充てられる可処分所得の増加</li><li>金銭的なストレスの大幅な軽減</li><li>将来の目標に向けた財務的自由度の向上</li></ul></div>'
      },
      compound: {
        explanation: '<h2 class="explanation-title">複利計算機の使い方ガイド</h2><div class="explanation-text"><p>当サイトの複利計算機は、投資が時間とともにどのように成長するかを見積もるお手伝いをします。初期投資額・定期積立金・利率・複利の適用頻度を総合的に考慮することで、長期的な資産形成において複利がいかに強力かを視覚的に確認できます。</p><h3>定期的な追加積立</h3><p>計算機は初期の一括投資金額と、定期的に積み立てる予定の金額の両方を考慮します。毎月または毎四半期に少額でも定期的に積み立てると、各積立金にも複利効果が適用されるため、最終残高が大幅に増加します。</p><h3>複利の適用頻度</h3><ul><li><strong>毎日</strong> — 年365回の複利計算（最高利回り）</li><li><strong>毎月</strong> — 年12回の複利計算</li><li><strong>四半期ごと</strong> — 年4回の複利計算</li><li><strong>半年ごと</strong> — 年2回の複利計算</li><li><strong>毎年</strong> — 年1回の複利計算（最低利回り）</li></ul><p>複利の適用頻度が高いほど、実効利回りが高くなります。長期の投資期間においては、日次複利と年次複利の差は非常に大きくなる場合があります。</p></div>'
      },
      investment: {
        explanation: '<h2 class="explanation-title">投資リターン計算ガイド</h2><div class="explanation-text"><p>当サイトの投資リターン計算機は、特定の期間における投資パフォーマンスを分析するお手伝いをします。株式ポートフォリオ、投資信託、その他の資産を問わず、明確なリターン指標で財務上の意思決定を支援します。</p><h3>主な機能</h3><ul><li>投資開始から終了までの総リターン率を計算</li><li>年次換算パフォーマンスのためのCAGR（複合年間成長率）を算出</li><li>ポートフォリオへの定期的な追加投資を考慮</li><li>アカウント登録不要で即座に分かりやすい結果を確認</li></ul><h3>投資リターン指標の理解</h3><ul><li><strong>総リターン率</strong> — 投資の損益をパーセンテージで表示</li><li><strong>年率リターン（CAGR）</strong> — 等価な安定した年率成長率</li><li><strong>リターン金額</strong> — 実際の円建て損益金額</li><li><strong>総投資額</strong> — 初期投資額とすべての追加投資額の合計</li></ul><h3>使い方</h3><ul><li>初期投資金額を入力してください</li><li>投資の最終評価額を入力してください</li><li>投資期間（年数）を入力してください</li><li>任意で定期的な追加投資額と頻度を入力してください</li></ul></div>'
      },
      dividend: {
        explanation: '<h2 class="explanation-title">配当金計算ガイド</h2><div class="explanation-text"><p>当サイトの配当金計算機は、保有株式の配当収入ポテンシャルを見積もるお手伝いをします。インカム投資を目的とした方にも、配当再投資戦略を計画している方にも、長期的な配当収入の見通しを詳細に提供します。</p><h3>主な機能</h3><ul><li>1株当たり配当金額または配当利回り（%）で配当収入を計算</li><li>予想される月次・四半期・年次配当収入を確認</li><li>株式配当再投資計画（DRIP）のシミュレーションで複利成長効果を確認</li><li>年間配当成長率を反映した現実的な長期見通しを提供</li></ul><h3>配当の主要指標</h3><ul><li><strong>配当利回り</strong> — 株価に対する年間配当金の割合（%）</li><li><strong>1株当たり配当金（DPS）</strong> — 各支払い期間における1株当たりの配当金額</li><li><strong>配当頻度</strong> — 配当金の支払い頻度（月次・四半期・年次）</li><li><strong>成長率</strong> — 予想される年間配当成長率</li><li><strong>DRIP</strong> — 配当再投資計画；配当金が自動的に追加株式の購入に充てられます</li></ul><h3>使い方</h3><ul><li>1株当たり配当金額または配当利回り（%）を入力してください</li><li>現在の株価と保有株数を入力してください</li><li>配当支払い頻度と投資期間を選択してください</li><li>配当を再投資する予定の場合はDRIPオプションを有効にしてください</li></ul><p><em>注意：配当金は保証されておらず、過去の実績は将来の成果を示すものではありません。</em></p></div>'
      },
      stock: {
        explanation: '<h2 class="explanation-title">株式投資リターン計算ガイド</h2><div class="explanation-text"><p>当サイトの株式リターン計算機は、株式投資のパフォーマンスを正確に測定するお手伝いをします。株価上昇分と配当収入の両方を考慮することで、総投資リターンを包括的に表示します。</p><h3>主な機能</h3><ul><li>株価上昇分と受取配当金を含む総リターン率の計算</li><li>年次換算パフォーマンスのためのCAGR（複合年間成長率）の算出</li><li>株式分割を考慮した正確な過去リターンの計算</li><li>価格リターンと配当リターンの内訳を個別に表示</li></ul><h3>リターン指標の理解</h3><ul><li><strong>総リターン率</strong> — 株価変動と配当を合算した総合リターン率（%）</li><li><strong>CAGR</strong> — 投資期間中の年率換算成長率</li><li><strong>価格リターン</strong> — 株価変動のみに起因するリターン</li><li><strong>配当リターン</strong> — 受取配当金に起因するリターン</li><li><strong>総損益</strong> — 円建てでの絶対的な損益金額</li></ul><h3>使い方</h3><ul><li>株式を購入した時点の初期取得単価を入力してください</li><li>現在（または売却時）の株価を入力してください</li><li>保有株数と投資期間を入力してください</li><li>任意で受取配当金の合計と株式分割比率を入力してください</li></ul></div>'
      }
    }
  }

}; // end translations

// ============================================================
// UPDATE EACH i18n FILE
// ============================================================
['en', 'es', 'zh', 'ko', 'ja'].forEach(lang => {
  const filePath = path.join(__dirname, 'i18n', `${lang}.json`);

  if (!fs.existsSync(filePath)) {
    console.error(`✗ File not found: ${filePath}`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const t = translations[lang];

  // Add / overwrite localeDefaults at the top level
  data.localeDefaults = t.localeDefaults;

  // Add explanation key to each calculator section
  Object.keys(t.calculators).forEach(calc => {
    if (!data.calculators[calc]) {
      console.warn(`  ⚠ Warning [${lang}]: calculators.${calc} not found in existing file — skipping`);
      return;
    }
    Object.assign(data.calculators[calc], t.calculators[calc]);
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`✓ Updated i18n/${lang}.json`);
});

console.log('\nAll done! Run this script again to re-apply after any changes to translations.');
