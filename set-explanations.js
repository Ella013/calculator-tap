const fs = require('fs');
const path = require('path');

// All explanation translations: [lang][calculator]
const explanations = {
  en: {
    loan: `<h2 class="explanation-title">Understanding Your Loan Calculator</h2>
                    <div class="explanation-text">
                        <p>Our loan calculator helps you make informed financial decisions by providing accurate estimates of your monthly loan payments. Whether you're planning a personal loan, auto loan, or refinancing, this tool gives you a clear picture of your financial commitment.</p>
                        <h3>Key Features</h3>
                        <ul>
                            <li>Calculate exact monthly payments for any loan amount and term</li>
                            <li>See the total interest paid over the life of the loan</li>
                            <li>Compare different loan amounts, rates, and terms instantly</li>
                            <li>Visual breakdown of principal vs. interest with interactive chart</li>
                            <li>Free to use — no sign-up required</li>
                        </ul>
                        <h3>How Loan Interest Works</h3>
                        <p>Your monthly payment is determined by three factors:</p>
                        <ul>
                            <li><strong>Principal:</strong> The amount you borrow</li>
                            <li><strong>Annual Interest Rate:</strong> The yearly cost of borrowing, expressed as a percentage</li>
                            <li><strong>Loan Term:</strong> The number of years to repay the loan</li>
                        </ul>
                        <p>Adjusting these variables lets you find the loan structure that best fits your budget. Note that actual loan terms depend on your credit score, lender requirements, and market conditions.</p>
                    </div>`,
    mortgage: `<h2 class="explanation-title">How Mortgage Qualification Works</h2>
                    <div class="explanation-text">
                        <p>Our mortgage qualification calculator estimates how much home you can afford based on your income, debts, and down payment. Lenders use similar calculations to determine your maximum loan amount.</p>
                        <h3>Key Qualification Factors</h3>
                        <ul>
                            <li><strong>Debt-to-Income Ratio (DTI):</strong> Most lenders require your total monthly debts (including the new mortgage) to be under 43% of gross monthly income</li>
                            <li><strong>Down Payment:</strong> A larger down payment reduces your loan amount and may eliminate private mortgage insurance (PMI)</li>
                            <li><strong>Interest Rate:</strong> Even a small rate difference significantly affects your qualification amount and monthly payment</li>
                            <li><strong>Loan Term:</strong> A 30-year term lowers monthly payments; a 15-year term saves substantial interest</li>
                        </ul>
                        <h3>Tips for Better Qualification</h3>
                        <ul>
                            <li>Pay down existing debts to improve your DTI ratio</li>
                            <li>Save for a larger down payment (20% avoids PMI)</li>
                            <li>Improve your credit score to secure a lower interest rate</li>
                            <li>Consider all homeownership costs: property taxes, insurance, and maintenance</li>
                        </ul>
                    </div>`,
    paycheck: `<h2 class="explanation-title">Understanding Your Paycheck Calculator</h2>
                    <div class="explanation-text">
                        <p>Our paycheck calculator estimates your take-home pay after federal income tax, Social Security, and Medicare deductions. Understanding your net pay helps you budget effectively and plan your finances.</p>
                        <h3>What Gets Deducted</h3>
                        <ul>
                            <li><strong>Federal Income Tax:</strong> Calculated using 2024 tax brackets based on your filing status</li>
                            <li><strong>Social Security (FICA):</strong> 6.2% on wages up to the annual wage base limit</li>
                            <li><strong>Medicare:</strong> 1.45% on all wages (additional 0.9% for high earners)</li>
                            <li><strong>State &amp; Local Taxes:</strong> Vary by location — check your state's rates</li>
                        </ul>
                        <h3>How to Use This Calculator</h3>
                        <ul>
                            <li>Enter your hourly wage or annual salary</li>
                            <li>Select your pay frequency (weekly, bi-weekly, monthly)</li>
                            <li>Choose your filing status for accurate federal tax calculation</li>
                            <li>Results show gross pay, deductions, and net take-home pay</li>
                        </ul>
                        <p>This calculator provides estimates only. Your actual paycheck may differ based on state taxes, pre-tax deductions (401k, health insurance), and other withholdings.</p>
                    </div>`,
    payoff: `<h2 class="explanation-title">How the Debt Payoff Calculator Works</h2>
                    <div class="explanation-text">
                        <p>Our debt payoff calculator shows you exactly when you'll be debt-free and how much interest you'll pay based on your current balance, interest rate, and monthly payment. Use it to create a realistic debt elimination plan.</p>
                        <h3>Payoff Strategies</h3>
                        <ul>
                            <li><strong>Avalanche Method:</strong> Pay minimum on all debts, put extra money toward the highest-interest debt first — saves the most interest</li>
                            <li><strong>Snowball Method:</strong> Pay off the smallest balance first for quick wins and motivation</li>
                            <li><strong>Increase Monthly Payment:</strong> Even a small extra payment each month dramatically reduces payoff time</li>
                        </ul>
                        <h3>Why Early Payoff Matters</h3>
                        <ul>
                            <li>Credit card debt at 18–24% APR grows quickly — paying it off fast saves thousands</li>
                            <li>Becoming debt-free frees up monthly cash flow for savings and investing</li>
                            <li>Lower debt improves your credit utilization ratio and credit score</li>
                        </ul>
                        <p>Enter your debt details and experiment with higher monthly payments to see how much interest and time you can save.</p>
                    </div>`,
    compound: `<h2>How Compound Interest Works</h2>
                    <p>Our compound interest calculator shows how your investment grows over time when interest is earned on both your principal and previously accumulated interest. This "interest on interest" effect is the foundation of long-term wealth building.</p>
                    <h3>The Power of Compounding</h3>
                    <p>The more frequently interest compounds, the faster your investment grows:</p>
                    <ul>
                        <li><strong>Daily:</strong> Interest calculated and added 365 times per year</li>
                        <li><strong>Monthly:</strong> Compounds 12 times per year</li>
                        <li><strong>Quarterly:</strong> Compounds 4 times per year</li>
                        <li><strong>Annually:</strong> Compounds once per year</li>
                    </ul>
                    <h3>Regular Contributions Make a Big Difference</h3>
                    <p>Adding consistent monthly contributions accelerates growth significantly. Even small recurring deposits—combined with compound interest—can produce remarkable results over decades. Start early and stay consistent for best results.</p>`,
    investment: `<h2 class="explanation-title">Understanding Investment Returns</h2>
                    <div class="explanation-text">
                        <p>Our investment return calculator computes your actual return on investment (ROI) based on your initial and final values over a chosen time period. Use it to evaluate stocks, mutual funds, real estate, or any investment.</p>
                        <h3>Key Return Metrics</h3>
                        <ul>
                            <li><strong>Total Return:</strong> The percentage gain or loss from start to finish</li>
                            <li><strong>Annual Return (CAGR):</strong> The compound annual growth rate — the consistent yearly return that would produce the same result</li>
                            <li><strong>Absolute Gain/Loss:</strong> The actual dollar amount gained or lost</li>
                        </ul>
                        <h3>What Affects Investment Returns</h3>
                        <ul>
                            <li>Market conditions and economic cycles</li>
                            <li>Dividends and income reinvested</li>
                            <li>Fees and taxes (which reduce net returns)</li>
                            <li>Investment time horizon — longer periods smooth out volatility</li>
                        </ul>
                        <p>Always compare returns over the same time period for fair investment comparisons. Past performance does not guarantee future results.</p>
                    </div>`,
    dividend: `<h2 class="explanation-title">How the Dividend Calculator Works</h2>
                    <div class="explanation-text">
                        <p>Our dividend calculator helps you estimate dividend income from stock investments. Enter the stock price, annual dividend per share, and number of shares to see your projected income and yield.</p>
                        <h3>Key Dividend Metrics</h3>
                        <ul>
                            <li><strong>Dividend Yield:</strong> Annual dividend ÷ stock price, expressed as a percentage — higher yield means more income relative to price</li>
                            <li><strong>Annual Income:</strong> Total yearly dividend payments across all your shares</li>
                            <li><strong>Dividend Growth:</strong> Companies that consistently raise dividends can provide growing income over time</li>
                        </ul>
                        <h3>Building Dividend Income</h3>
                        <ul>
                            <li>Reinvesting dividends (DRIP) uses compound growth to accelerate portfolio value</li>
                            <li>Diversify across sectors to reduce dividend cut risk</li>
                            <li>Look for companies with long histories of dividend payments and growth</li>
                            <li>High yield alone isn't always better — check payout ratio and financial health</li>
                        </ul>
                    </div>`,
    stock: `<h2 class="explanation-title">Understanding Your Stock Return</h2>
                    <div class="explanation-text">
                        <p>Our stock return calculator measures how well your stock investment performed. Enter your buy price, sell price, shares owned, and holding period to see your total return, annualized return, and profit or loss.</p>
                        <h3>Return Metrics Explained</h3>
                        <ul>
                            <li><strong>Total Return:</strong> Overall percentage gain or loss on your investment</li>
                            <li><strong>Annualized Return (CAGR):</strong> The equivalent yearly return rate — useful for comparing investments held for different periods</li>
                            <li><strong>Profit / Loss:</strong> The actual dollar gain or loss on your position</li>
                        </ul>
                        <h3>Factors That Affect Stock Returns</h3>
                        <ul>
                            <li>Company earnings growth and financial health</li>
                            <li>Market sentiment and macroeconomic trends</li>
                            <li>Dividends received during the holding period</li>
                            <li>Transaction costs and capital gains taxes</li>
                        </ul>
                        <p>Use this calculator to review your portfolio performance and compare how individual investments contributed to your overall returns.</p>
                    </div>`
  },

  ko: {
    loan: `<h2 class="explanation-title">대출 계산기 사용법</h2>
                    <div class="explanation-text">
                        <p>대출 계산기를 사용하면 월 상환액, 총 이자, 총 상환금액을 한눈에 확인할 수 있습니다. 개인 대출, 자동차 대출, 주택담보대출 등 다양한 대출 계획에 활용하세요.</p>
                        <h3>주요 기능</h3>
                        <ul>
                            <li>대출 금액, 금리, 기간에 따른 정확한 월 상환액 계산</li>
                            <li>대출 기간 동안 납부하는 총 이자 확인</li>
                            <li>원금과 이자 비율을 시각적 차트로 비교</li>
                            <li>다양한 조건을 빠르게 비교하여 최적의 대출 구조 파악</li>
                            <li>회원가입 없이 무료로 사용 가능</li>
                        </ul>
                        <h3>대출 이자 계산 원리</h3>
                        <p>월 상환액은 다음 세 가지 요소에 의해 결정됩니다:</p>
                        <ul>
                            <li><strong>대출 원금:</strong> 빌리는 금액</li>
                            <li><strong>연 이자율:</strong> 연간 이자 비율 (예: 5.5%)</li>
                            <li><strong>대출 기간:</strong> 상환 기간 (년 단위)</li>
                        </ul>
                        <p>한국의 평균 개인 신용대출 금리는 연 5~7% 수준이며, 주택담보대출은 연 3~5% 수준입니다. 실제 조건은 신용등급, 금융기관, 시장 상황에 따라 다를 수 있습니다.</p>
                    </div>`,
    mortgage: `<h2 class="explanation-title">주택담보대출 한도 계산기</h2>
                    <div class="explanation-text">
                        <p>주택담보대출 자격 계산기는 소득, 부채, 자기자본(보증금)을 바탕으로 대출 가능 금액을 추정합니다. 금융기관도 비슷한 방식으로 최대 대출 한도를 산정합니다.</p>
                        <h3>주요 자격 요건</h3>
                        <ul>
                            <li><strong>DSR (총부채원리금상환비율):</strong> 모든 대출 상환액 합계가 연 소득의 40% 이하여야 합니다 (규제지역 기준)</li>
                            <li><strong>LTV (주택담보대출비율):</strong> 규제지역은 40~50%, 비규제지역은 최대 70%까지 가능</li>
                            <li><strong>금리:</strong> 고정금리와 변동금리를 비교하여 유리한 조건 선택</li>
                            <li><strong>대출 기간:</strong> 30년 만기는 월 상환 부담이 낮지만 총 이자가 많음</li>
                        </ul>
                        <h3>대출 한도 높이는 방법</h3>
                        <ul>
                            <li>기존 부채를 상환하여 DSR 비율 개선</li>
                            <li>자기자본 비율을 높여 LTV 조건 충족</li>
                            <li>신용등급 향상으로 우대금리 적용 받기</li>
                            <li>재산세, 관리비, 수리비 등 부대비용도 미리 계산</li>
                        </ul>
                    </div>`,
    paycheck: `<h2 class="explanation-title">급여 실수령액 계산기</h2>
                    <div class="explanation-text">
                        <p>급여 계산기는 세금 및 4대 보험 공제 후 실제 받는 금액(실수령액)을 추정합니다. 정확한 예산 계획을 위해 활용하세요.</p>
                        <h3>공제 항목</h3>
                        <ul>
                            <li><strong>국민연금:</strong> 월 소득의 4.5% (사업주 4.5% 별도 부담)</li>
                            <li><strong>건강보험:</strong> 월 소득의 3.545% (장기요양보험 포함 시 약 3.75%)</li>
                            <li><strong>고용보험:</strong> 월 소득의 0.9%</li>
                            <li><strong>소득세:</strong> 과세표준에 따라 6%~45% 누진세율 적용</li>
                            <li><strong>지방소득세:</strong> 소득세의 10%</li>
                        </ul>
                        <h3>사용 방법</h3>
                        <ul>
                            <li>시급 또는 연봉을 입력하세요</li>
                            <li>근무 시간 또는 급여 형태를 선택하세요</li>
                            <li>결과에서 공제 항목별 금액과 실수령액을 확인하세요</li>
                        </ul>
                        <p>이 계산기는 참고용 추정치를 제공합니다. 실제 급여는 회사 내규, 비과세 항목, 추가 공제 등에 따라 달라질 수 있습니다.</p>
                    </div>`,
    payoff: `<h2 class="explanation-title">부채 상환 계획 계산기</h2>
                    <div class="explanation-text">
                        <p>부채 상환 계산기는 현재 잔액, 이자율, 월 납부액을 기반으로 부채를 완전히 갚는 데 걸리는 기간과 총 이자를 계산합니다. 현실적인 부채 탈출 계획을 세우는 데 활용하세요.</p>
                        <h3>효과적인 상환 전략</h3>
                        <ul>
                            <li><strong>고금리 우선 상환 (눈덩이 효과 역방향):</strong> 가장 높은 이자율의 부채부터 상환 — 총 이자 절감 효과 극대화</li>
                            <li><strong>소액 부채 우선 상환 (눈덩이 효과):</strong> 잔액이 적은 부채부터 상환 — 심리적 성취감으로 동기 유지</li>
                            <li><strong>월 납부액 증가:</strong> 소액이라도 납부액을 늘리면 상환 기간이 크게 단축됨</li>
                        </ul>
                        <h3>빠른 상환이 중요한 이유</h3>
                        <ul>
                            <li>카드론이나 마이너스 통장 금리(연 12~20%)는 빠르게 복리로 불어남</li>
                            <li>부채를 갚으면 매달 여유 자금이 생겨 저축과 투자가 가능해짐</li>
                            <li>신용카드 사용률 감소로 신용점수 향상</li>
                        </ul>
                    </div>`,
    compound: `<h2>복리 계산기 사용법</h2>
                    <p>복리 계산기는 시간이 지남에 따라 원금과 누적 이자 모두에 이자가 붙는 복리 효과를 보여줍니다. 장기 자산 형성의 핵심인 복리의 힘을 직접 확인해 보세요.</p>
                    <h3>복리 계산 주기</h3>
                    <p>이자가 더 자주 복리로 계산될수록 자산이 빠르게 성장합니다:</p>
                    <ul>
                        <li><strong>일 복리:</strong> 이자를 매일 원금에 합산</li>
                        <li><strong>월 복리:</strong> 연 12회 합산</li>
                        <li><strong>분기 복리:</strong> 연 4회 합산</li>
                        <li><strong>연 복리:</strong> 연 1회 합산</li>
                    </ul>
                    <h3>정기 납입의 효과</h3>
                    <p>매월 꾸준히 추가 납입하면 복리 효과가 극대화됩니다. 적금이나 ETF에 소액이라도 꾸준히 투자하면 수십 년 후 놀라운 결과를 얻을 수 있습니다. 빨리 시작할수록 유리합니다.</p>`,
    investment: `<h2 class="explanation-title">투자 수익률 계산기</h2>
                    <div class="explanation-text">
                        <p>투자 수익률 계산기는 초기 투자금, 최종 가치, 투자 기간을 기반으로 실제 투자 성과를 계산합니다. 주식, 펀드, 부동산, 예금 등 모든 투자 상품에 활용 가능합니다.</p>
                        <h3>핵심 수익률 지표</h3>
                        <ul>
                            <li><strong>총 수익률:</strong> 투자 시작부터 종료까지의 전체 손익 비율</li>
                            <li><strong>연평균 수익률 (CAGR):</strong> 매년 동일한 비율로 성장했을 때의 연간 수익률</li>
                            <li><strong>절대 손익:</strong> 실제 벌거나 잃은 금액 (원화)</li>
                        </ul>
                        <h3>투자 수익에 영향을 미치는 요소</h3>
                        <ul>
                            <li>시장 상황 및 경기 사이클</li>
                            <li>배당금 및 분배금 재투자 여부</li>
                            <li>수수료와 세금 (양도소득세 등) 차감 효과</li>
                            <li>투자 기간 — 장기 투자일수록 변동성이 평준화됨</li>
                        </ul>
                        <p>공정한 비교를 위해 동일한 기간 기준으로 수익률을 비교하세요. 과거 수익률이 미래 성과를 보장하지 않습니다.</p>
                    </div>`,
    dividend: `<h2 class="explanation-title">배당금 계산기</h2>
                    <div class="explanation-text">
                        <p>배당금 계산기를 이용하면 주식 투자로 얻을 수 있는 예상 배당 수입을 쉽게 계산할 수 있습니다. 주가, 주당 연간 배당금, 보유 주식 수를 입력하면 배당 수익률과 연간 배당 수입을 확인할 수 있습니다.</p>
                        <h3>주요 배당 지표</h3>
                        <ul>
                            <li><strong>배당 수익률:</strong> 연간 배당금 ÷ 주가 × 100 — 수익률이 높을수록 주가 대비 배당 수입이 많음</li>
                            <li><strong>연간 배당 수입:</strong> 보유 주식 전체에서 받는 연간 배당금 합계</li>
                            <li><strong>배당 성장:</strong> 꾸준히 배당을 늘려온 기업은 장기적으로 증가하는 수입 제공</li>
                        </ul>
                        <h3>배당 투자 전략</h3>
                        <ul>
                            <li>배당 재투자(DRIP)로 복리 효과를 극대화하여 자산 성장 가속</li>
                            <li>다양한 섹터에 분산 투자하여 배당 삭감 위험 최소화</li>
                            <li>배당 지급 이력이 긴 기업 선별 (배당귀족주 등)</li>
                            <li>높은 배당 수익률만 보지 말고 배당 성향, 재무 건전성 함께 확인</li>
                        </ul>
                    </div>`,
    stock: `<h2 class="explanation-title">주식 수익률 계산기</h2>
                    <div class="explanation-text">
                        <p>주식 수익률 계산기는 매수가, 매도가, 보유 주식 수, 보유 기간을 입력하여 총 수익률, 연평균 수익률(CAGR), 실제 손익 금액을 계산합니다.</p>
                        <h3>수익률 지표 설명</h3>
                        <ul>
                            <li><strong>총 수익률:</strong> 투자 대비 전체 손익 비율 (%)</li>
                            <li><strong>연평균 수익률 (CAGR):</strong> 매년 동일한 비율로 성장했다고 가정할 때의 연간 수익률 — 보유 기간이 다른 투자 비교에 유용</li>
                            <li><strong>실현 손익:</strong> 실제 벌거나 잃은 금액 (원화)</li>
                        </ul>
                        <h3>주식 수익에 영향을 미치는 요소</h3>
                        <ul>
                            <li>기업의 실적 성장과 재무 건전성</li>
                            <li>시장 심리 및 거시 경제 흐름</li>
                            <li>보유 기간 중 배당금 수령 여부</li>
                            <li>거래 수수료 및 양도소득세</li>
                        </ul>
                        <p>이 계산기로 보유 종목별 성과를 분석하고 포트폴리오 전반의 투자 수익을 점검해 보세요.</p>
                    </div>`
  },

  ja: {
    loan: `<h2 class="explanation-title">ローン計算機の使い方</h2>
                    <div class="explanation-text">
                        <p>ローン計算機では、借入金額・金利・返済期間を入力するだけで、毎月の返済額・総利息・総支払額を瞬時に計算できます。カーローン、住宅ローン、フリーローンなど、あらゆるローンの計画にご活用ください。</p>
                        <h3>主な機能</h3>
                        <ul>
                            <li>任意の借入額・金利・期間で毎月の返済額を正確に計算</li>
                            <li>返済期間中に支払う総利息を確認</li>
                            <li>元金と利息の割合をグラフで視覚的に把握</li>
                            <li>さまざまな条件をすぐに比較し、最適なローン構造を見つける</li>
                            <li>登録不要・完全無料</li>
                        </ul>
                        <h3>ローン利息の仕組み</h3>
                        <p>毎月の返済額は以下の3つの要素で決まります：</p>
                        <ul>
                            <li><strong>借入金額（元本）：</strong>借りる金額</li>
                            <li><strong>年利率：</strong>年間の借入コスト（例：2.5%）</li>
                            <li><strong>返済期間：</strong>返済にかかる年数</li>
                        </ul>
                        <p>日本の消費者ローン平均金利は年2〜15%程度、住宅ローンは変動金利で年0.5〜2%程度です。実際の条件は信用情報や金融機関により異なります。</p>
                    </div>`,
    mortgage: `<h2 class="explanation-title">住宅ローン借入可能額計算機</h2>
                    <div class="explanation-text">
                        <p>住宅ローン資格計算機は、収入・借入残高・頭金をもとに借入可能な最大金額を試算します。金融機関も同様の計算で融資可能額を判断します。</p>
                        <h3>主な審査基準</h3>
                        <ul>
                            <li><strong>返済負担率（DTI）：</strong>年間返済額が年収の25〜35%以内が目安（金融機関により異なる）</li>
                            <li><strong>頭金：</strong>購入価格の20%以上が理想。頭金が多いほど借入額が減り、月々の返済が軽くなる</li>
                            <li><strong>金利：</strong>変動金利と固定金利の特徴を比較し、将来の金利上昇リスクも考慮する</li>
                            <li><strong>返済期間：</strong>35年返済は月々の負担が軽いが、総支払利息が多くなる</li>
                        </ul>
                        <h3>借入可能額を増やすコツ</h3>
                        <ul>
                            <li>既存の借入を返済してDTI比率を改善する</li>
                            <li>頭金を増やしてLTV（担保価値比率）を下げる</li>
                            <li>信用情報を改善して優遇金利を獲得する</li>
                            <li>固定資産税・管理費・修繕費など住居関連コスト全体を試算する</li>
                        </ul>
                    </div>`,
    paycheck: `<h2 class="explanation-title">給与手取り計算機</h2>
                    <div class="explanation-text">
                        <p>給与計算機は、額面給与から各種控除を差し引いた手取り金額を試算します。家計管理や転職時の条件比較にご活用ください。</p>
                        <h3>主な控除項目</h3>
                        <ul>
                            <li><strong>所得税：</strong>課税所得に応じて5%〜45%の累進税率が適用</li>
                            <li><strong>住民税：</strong>前年の所得に対して約10%（翌年6月から天引き）</li>
                            <li><strong>厚生年金：</strong>標準報酬月額の9.15%（会社が同額を負担）</li>
                            <li><strong>健康保険：</strong>標準報酬月額の約5%（組合健保により異なる）</li>
                            <li><strong>雇用保険：</strong>賃金の0.6%</li>
                        </ul>
                        <h3>使い方</h3>
                        <ul>
                            <li>時給または月給・年収を入力してください</li>
                            <li>給与形態（時給・月給・年収）を選択してください</li>
                            <li>結果で控除項目ごとの金額と手取り額を確認できます</li>
                        </ul>
                        <p>この計算機は概算を提供します。実際の手取りは通勤手当の非課税枠、社会保険料の等級区分、iDeCoなどの控除により異なる場合があります。</p>
                    </div>`,
    payoff: `<h2 class="explanation-title">借金完済シミュレーター</h2>
                    <div class="explanation-text">
                        <p>借金返済計算機は、現在の残高・金利・月々の返済額をもとに、完済までの期間と総利息を計算します。現実的な借金解消プランを立てるのに役立ちます。</p>
                        <h3>効果的な返済戦略</h3>
                        <ul>
                            <li><strong>高金利優先（アバランチ法）：</strong>最も金利の高い借入から優先して返済。総利息の節約額が最大になる</li>
                            <li><strong>少額優先（スノーボール法）：</strong>残高の少ない借入から返済。達成感を得やすくモチベーション維持に有効</li>
                            <li><strong>毎月の返済額を増やす：</strong>少額でも追加返済することで完済期間が大幅に短縮できる</li>
                        </ul>
                        <h3>早期返済が重要な理由</h3>
                        <ul>
                            <li>カードローンや消費者金融（金利15〜18%）の利息は複利で急増する</li>
                            <li>借金がなくなると毎月の余裕資金が増え、貯蓄・投資が可能になる</li>
                            <li>借入残高の減少でクレジットスコアの改善が期待できる</li>
                        </ul>
                    </div>`,
    compound: `<h2>複利計算機の使い方</h2>
                    <p>複利計算機は、元本に加えて累積した利息にも利息がつく「複利効果」による資産成長をシミュレートします。長期的な資産形成の基本原理を直接体験してみてください。</p>
                    <h3>複利の計算頻度</h3>
                    <p>利息が加算される頻度が高いほど、資産の成長が速くなります：</p>
                    <ul>
                        <li><strong>日次複利：</strong>利息を毎日元本に加算（年365回）</li>
                        <li><strong>月次複利：</strong>年12回加算</li>
                        <li><strong>四半期複利：</strong>年4回加算</li>
                        <li><strong>年次複利：</strong>年1回加算</li>
                    </ul>
                    <h3>定期積立の効果</h3>
                    <p>毎月一定額を追加積立することで複利効果が加速します。少額でも積立NISAやiDeCoなどを活用して継続的に投資することで、数十年後には大きな資産になります。早く始めるほど有利です。</p>`,
    investment: `<h2 class="explanation-title">投資リターン計算機</h2>
                    <div class="explanation-text">
                        <p>投資リターン計算機は、投資元本・最終評価額・投資期間をもとに、実際の投資パフォーマンスを計算します。株式、投資信託、不動産など、あらゆる投資の評価に活用できます。</p>
                        <h3>主なリターン指標</h3>
                        <ul>
                            <li><strong>トータルリターン：</strong>投資開始から終了までの総損益率</li>
                            <li><strong>年平均リターン（CAGR）：</strong>毎年同じ割合で成長した場合の年間リターン。期間の異なる投資を比較する際に有効</li>
                            <li><strong>絶対損益：</strong>実際に増減した金額（円）</li>
                        </ul>
                        <h3>投資リターンに影響する要因</h3>
                        <ul>
                            <li>市場環境・景気サイクル</li>
                            <li>配当・分配金の再投資効果</li>
                            <li>信託報酬・税金（譲渡所得税）の影響</li>
                            <li>投資期間 — 長期投資ほど価格変動が平準化される</li>
                        </ul>
                        <p>公平な比較のため、同一期間でリターンを比較してください。過去の運用実績は将来の成果を保証するものではありません。</p>
                    </div>`,
    dividend: `<h2 class="explanation-title">配当計算機</h2>
                    <div class="explanation-text">
                        <p>配当計算機を使えば、株式投資から得られる予想配当収入を簡単に試算できます。株価・1株当たり年間配当金・保有株数を入力すると、配当利回りと年間配当収入が確認できます。</p>
                        <h3>主な配当指標</h3>
                        <ul>
                            <li><strong>配当利回り：</strong>年間配当金 ÷ 株価 × 100 — 高いほど株価に対する配当収入が多い</li>
                            <li><strong>年間配当収入：</strong>保有株数全体から受け取る年間の配当金合計</li>
                            <li><strong>増配傾向：</strong>継続的に増配している企業は長期的に増加する収入源となる</li>
                        </ul>
                        <h3>配当投資の戦略</h3>
                        <ul>
                            <li>配当再投資（DRIP）で複利効果を活かしてポートフォリオを加速成長させる</li>
                            <li>複数セクターへの分散投資で減配・無配リスクを軽減</li>
                            <li>連続増配実績のある企業（日本の高配当株・配当貴族）を重視</li>
                            <li>高配当利回りだけでなく、配当性向と財務健全性も確認</li>
                        </ul>
                    </div>`,
    stock: `<h2 class="explanation-title">株式リターン計算機</h2>
                    <div class="explanation-text">
                        <p>株式リターン計算機は、購入価格・売却価格・保有株数・保有期間を入力して、トータルリターン・年平均リターン・実現損益を計算します。</p>
                        <h3>リターン指標の説明</h3>
                        <ul>
                            <li><strong>トータルリターン：</strong>投資全体の損益率（%）</li>
                            <li><strong>年平均リターン（CAGR）：</strong>毎年同じ割合で成長したと仮定した場合の年率 — 保有期間が異なる投資の比較に便利</li>
                            <li><strong>実現損益：</strong>実際に利益または損失した金額（円）</li>
                        </ul>
                        <h3>株式リターンに影響する要因</h3>
                        <ul>
                            <li>企業の業績成長と財務健全性</li>
                            <li>市場のセンチメントとマクロ経済動向</li>
                            <li>保有期間中の配当受取</li>
                            <li>取引手数料と譲渡所得税</li>
                        </ul>
                        <p>この計算機で保有銘柄ごとのパフォーマンスを分析し、ポートフォリオ全体の投資収益を確認してみてください。</p>
                    </div>`
  },

  zh: {
    loan: `<h2 class="explanation-title">贷款计算器使用说明</h2>
                    <div class="explanation-text">
                        <p>贷款计算器帮助您快速估算每月还款额、总利息及总还款金额。无论是个人贷款、汽车贷款还是房贷，都能让您清晰了解财务负担。</p>
                        <h3>主要功能</h3>
                        <ul>
                            <li>根据贷款金额、利率和期限精确计算每月还款额</li>
                            <li>查看整个还款期内支付的总利息</li>
                            <li>通过图表直观了解本金与利息的比例</li>
                            <li>快速比较不同贷款方案，找到最优选择</li>
                            <li>免费使用，无需注册</li>
                        </ul>
                        <h3>贷款利息计算原理</h3>
                        <p>每月还款额由以下三个因素决定：</p>
                        <ul>
                            <li><strong>贷款本金：</strong>借款金额</li>
                            <li><strong>年利率：</strong>每年的借贷成本（如4.35%）</li>
                            <li><strong>贷款期限：</strong>还款年限</li>
                        </ul>
                        <p>中国个人消费贷款利率通常为年利率4%~8%，住房贷款利率约为3.5%~5.5%。实际利率因银行、信用评级和市场状况而异。</p>
                    </div>`,
    mortgage: `<h2 class="explanation-title">房贷资格计算器</h2>
                    <div class="explanation-text">
                        <p>房贷资格计算器根据您的收入、负债和首付款，估算您能够获批的最高贷款金额。银行和贷款机构也使用类似的计算方式来评估您的贷款资格。</p>
                        <h3>主要资格评估标准</h3>
                        <ul>
                            <li><strong>负债收入比（DTI）：</strong>每月所有债务还款（包括新增房贷）不超过月收入的50%</li>
                            <li><strong>首付比例（LTV）：</strong>首套房通常首付不低于20%~30%；二套房首付比例更高</li>
                            <li><strong>贷款利率：</strong>LPR（贷款市场报价利率）加点确定，固定利率与浮动利率各有优劣</li>
                            <li><strong>贷款期限：</strong>30年期月供低但总利息多；20年期节省利息但月供较高</li>
                        </ul>
                        <h3>提高贷款额度的建议</h3>
                        <ul>
                            <li>提前偿还现有债务以改善DTI比率</li>
                            <li>增加首付比例以降低贷款金额</li>
                            <li>维护良好的信用记录以获得更低利率</li>
                            <li>综合考虑房产税、物业费、维修基金等额外费用</li>
                        </ul>
                    </div>`,
    paycheck: `<h2 class="explanation-title">工资税后收入计算器</h2>
                    <div class="explanation-text">
                        <p>工资计算器帮助您估算扣除个人所得税和社会保险后的实际到手收入。合理规划预算，掌握每月实际收入。</p>
                        <h3>主要扣除项目</h3>
                        <ul>
                            <li><strong>个人所得税：</strong>采用3%~45%七级超额累进税率，按月应纳税所得额计算</li>
                            <li><strong>养老保险：</strong>个人缴纳工资的8%</li>
                            <li><strong>医疗保险：</strong>个人缴纳工资的2%+每月10元</li>
                            <li><strong>失业保险：</strong>个人缴纳工资的0.5%~1%</li>
                            <li><strong>住房公积金：</strong>个人缴纳工资的5%~12%（各地比例不同）</li>
                        </ul>
                        <h3>使用方法</h3>
                        <ul>
                            <li>输入时薪或月薪/年薪</li>
                            <li>选择发薪频率（每周、每两周、每月）</li>
                            <li>查看各扣除项明细及税后实发金额</li>
                        </ul>
                        <p>本计算器提供估算数值。实际到手工资因各地社保基数、专项附加扣除（如子女教育、住房贷款利息）等因素而有所不同。</p>
                    </div>`,
    payoff: `<h2 class="explanation-title">债务还清计划计算器</h2>
                    <div class="explanation-text">
                        <p>债务还清计算器根据当前余额、利率和每月还款额，计算何时能够完全还清债务以及需要支付的总利息。帮助您制定切实可行的还债计划。</p>
                        <h3>有效的还款策略</h3>
                        <ul>
                            <li><strong>高息优先法（雪崩法）：</strong>优先偿还利率最高的债务，最大程度节省利息支出</li>
                            <li><strong>小额优先法（滚雪球法）：</strong>优先偿还余额最小的债务，获得成就感并保持动力</li>
                            <li><strong>增加月还款额：</strong>即使每月多还一点，也能大幅缩短还款期限</li>
                        </ul>
                        <h3>提前还款的重要性</h3>
                        <ul>
                            <li>信用卡欠款（年利率15%~24%）复利增长迅速，早还早省</li>
                            <li>还清债务后每月释放大量现金流，可用于储蓄和投资</li>
                            <li>降低信用卡使用率有助于提升信用评分</li>
                        </ul>
                    </div>`,
    compound: `<h2>复利计算器使用说明</h2>
                    <p>复利计算器模拟您的投资如何随时间增长——不仅本金产生利息，已累积的利息也继续产生利息。这种"利滚利"效应是长期财富积累的核心原理。</p>
                    <h3>复利计算频率</h3>
                    <p>复利计算越频繁，资产增长越快：</p>
                    <ul>
                        <li><strong>按日复利：</strong>每天将利息加入本金（每年365次）</li>
                        <li><strong>按月复利：</strong>每年复利12次</li>
                        <li><strong>按季复利：</strong>每年复利4次</li>
                        <li><strong>按年复利：</strong>每年复利1次</li>
                    </ul>
                    <h3>定期定投的力量</h3>
                    <p>每月坚持追加投入可显著加速复利效果。哪怕是小额的定期存入，结合复利，数十年后也能积累可观财富。越早开始，复利效果越显著。</p>`,
    investment: `<h2 class="explanation-title">投资回报率计算器</h2>
                    <div class="explanation-text">
                        <p>投资回报率计算器根据初始投资额、最终价值和投资期限，计算您的实际投资收益表现。适用于股票、基金、房产等各类投资。</p>
                        <h3>核心收益指标</h3>
                        <ul>
                            <li><strong>总收益率：</strong>从投资开始到结束的整体盈亏比例</li>
                            <li><strong>年化收益率（CAGR）：</strong>假设每年以相同比率增长时的年均回报率，用于比较不同期限的投资</li>
                            <li><strong>绝对盈亏：</strong>实际盈利或亏损的金额（人民币）</li>
                        </ul>
                        <h3>影响投资收益的因素</h3>
                        <ul>
                            <li>市场行情与经济周期</li>
                            <li>股息、分红再投资的复利效应</li>
                            <li>手续费和税收（如资本利得税）的影响</li>
                            <li>投资期限——时间越长，波动性越趋于平稳</li>
                        </ul>
                        <p>为公平比较，请统一使用相同期限衡量投资收益。历史业绩不代表未来表现。</p>
                    </div>`,
    dividend: `<h2 class="explanation-title">股息计算器</h2>
                    <div class="explanation-text">
                        <p>股息计算器帮助您估算股票投资的预期分红收入。输入股价、每股年度股息和持有股数，即可查看股息收益率和年度股息收入。</p>
                        <h3>主要股息指标</h3>
                        <ul>
                            <li><strong>股息收益率：</strong>年度股息 ÷ 股价 × 100%——收益率越高，相对股价获得的分红越多</li>
                            <li><strong>年度股息收入：</strong>持有全部股份获得的年度分红总额</li>
                            <li><strong>股息增长：</strong>持续提高分红的公司可提供长期增长的被动收入</li>
                        </ul>
                        <h3>股息投资策略</h3>
                        <ul>
                            <li>股息再投资（DRIP）利用复利加速组合增值</li>
                            <li>跨行业分散投资，降低个股减息或停息风险</li>
                            <li>优选连续多年稳定分红的蓝筹股或高股息ETF</li>
                            <li>不要只看高股息率，还需检查派息比率和公司财务健康状况</li>
                        </ul>
                    </div>`,
    stock: `<h2 class="explanation-title">股票收益计算器</h2>
                    <div class="explanation-text">
                        <p>股票收益计算器通过输入买入价、卖出价、持有股数和持有期限，计算您的总收益率、年化收益率（CAGR）及实际盈亏金额。</p>
                        <h3>收益指标说明</h3>
                        <ul>
                            <li><strong>总收益率：</strong>投资的整体盈亏百分比</li>
                            <li><strong>年化收益率（CAGR）：</strong>假设每年以相同比率增长时的年均回报率——便于比较持有期不同的投资</li>
                            <li><strong>实现盈亏：</strong>实际盈利或亏损的金额（人民币）</li>
                        </ul>
                        <h3>影响股票收益的因素</h3>
                        <ul>
                            <li>公司盈利增长和财务健康状况</li>
                            <li>市场情绪和宏观经济趋势</li>
                            <li>持有期间获得的股息收入</li>
                            <li>交易手续费和资本利得税</li>
                        </ul>
                        <p>使用本计算器分析各持仓的表现，全面评估您的投资组合收益情况。</p>
                    </div>`
  },

  es: {
    loan: `<h2 class="explanation-title">Cómo Usar la Calculadora de Préstamos</h2>
                    <div class="explanation-text">
                        <p>Nuestra calculadora de préstamos te ayuda a tomar decisiones financieras informadas al estimar con precisión tus pagos mensuales. Ya sea un préstamo personal, de automóvil o hipoteca, esta herramienta te da una imagen clara de tu compromiso financiero.</p>
                        <h3>Características Principales</h3>
                        <ul>
                            <li>Calcula los pagos mensuales exactos para cualquier monto y plazo</li>
                            <li>Visualiza el total de intereses pagados durante la vida del préstamo</li>
                            <li>Compara diferentes montos, tasas y plazos al instante</li>
                            <li>Gráfico interactivo con el desglose de capital e intereses</li>
                            <li>Gratis y sin registro requerido</li>
                        </ul>
                        <h3>Cómo Funcionan los Intereses del Préstamo</h3>
                        <p>Tu pago mensual está determinado por tres factores:</p>
                        <ul>
                            <li><strong>Capital (Principal):</strong> El monto que solicitas en préstamo</li>
                            <li><strong>Tasa de Interés Anual:</strong> El costo anual del préstamo expresado en porcentaje</li>
                            <li><strong>Plazo del Préstamo:</strong> El número de años para devolver el préstamo</li>
                        </ul>
                        <p>Las tasas de interés en América Latina varían según el país y tipo de préstamo. En México, los préstamos personales rondan el 20-30% anual; en España, entre el 6-12%. Las condiciones reales dependen de tu historial crediticio y el banco.</p>
                    </div>`,
    mortgage: `<h2 class="explanation-title">Calculadora de Calificación Hipotecaria</h2>
                    <div class="explanation-text">
                        <p>La calculadora de calificación hipotecaria estima el monto máximo de préstamo para comprar una vivienda según tus ingresos, deudas y pago inicial. Los bancos utilizan cálculos similares para determinar tu elegibilidad.</p>
                        <h3>Factores Clave de Calificación</h3>
                        <ul>
                            <li><strong>Relación Deuda-Ingreso (DTI):</strong> El total de pagos mensuales de deuda (incluida la hipoteca nueva) no debe superar el 40-43% de tu ingreso bruto mensual</li>
                            <li><strong>Pago Inicial (Enganche):</strong> Un enganche mayor reduce el monto del préstamo y puede eliminar el seguro hipotecario privado (PMI)</li>
                            <li><strong>Tasa de Interés:</strong> Incluso una pequeña diferencia en la tasa afecta significativamente tu cuota mensual y monto calificado</li>
                            <li><strong>Plazo:</strong> A 30 años la cuota es menor; a 15 años pagas mucho menos en intereses totales</li>
                        </ul>
                        <h3>Consejos para Mejorar tu Calificación</h3>
                        <ul>
                            <li>Reduce tus deudas existentes para mejorar tu relación DTI</li>
                            <li>Ahorra para un enganche del 20% o más</li>
                            <li>Mejora tu historial crediticio para acceder a tasas más bajas</li>
                            <li>Considera todos los costos: impuestos, seguros, mantenimiento</li>
                        </ul>
                    </div>`,
    paycheck: `<h2 class="explanation-title">Calculadora de Nómina y Salario Neto</h2>
                    <div class="explanation-text">
                        <p>La calculadora de nómina estima tu salario neto después de impuestos y deducciones. Te ayuda a planificar tu presupuesto y entender exactamente cuánto recibirás en tu cuenta.</p>
                        <h3>Principales Deducciones</h3>
                        <ul>
                            <li><strong>Impuesto sobre la Renta:</strong> Varía según el país y nivel de ingresos; se aplica tasa progresiva</li>
                            <li><strong>Seguridad Social / IMSS:</strong> Aportaciones para pensión, salud y desempleo (varía por país)</li>
                            <li><strong>Seguro Médico:</strong> Contribución al sistema de salud pública o seguro privado</li>
                            <li><strong>Otras Retenciones:</strong> Fondo de vivienda (INFONAVIT en México), seguro de cesantía, etc.</li>
                        </ul>
                        <h3>Cómo Usar la Calculadora</h3>
                        <ul>
                            <li>Ingresa tu salario por hora o anual</li>
                            <li>Selecciona la frecuencia de pago (semanal, quincenal, mensual)</li>
                            <li>Los resultados muestran el salario bruto, las deducciones y el neto</li>
                        </ul>
                        <p>Esta calculadora es una estimación de referencia. Tu nómina real puede variar según las leyes locales, beneficios de empresa y otras deducciones específicas de tu país.</p>
                    </div>`,
    payoff: `<h2 class="explanation-title">Calculadora de Pago de Deudas</h2>
                    <div class="explanation-text">
                        <p>La calculadora de pago de deudas te muestra exactamente cuándo quedarás libre de deudas y cuánto interés pagarás, según tu saldo actual, tasa de interés y pago mensual. Úsala para crear un plan realista de eliminación de deudas.</p>
                        <h3>Estrategias de Pago</h3>
                        <ul>
                            <li><strong>Método Avalancha:</strong> Paga el mínimo en todas las deudas y dirige el dinero extra a la de mayor interés primero — ahorra más en intereses</li>
                            <li><strong>Método Bola de Nieve:</strong> Liquida primero la deuda de menor saldo para ganar motivación con logros rápidos</li>
                            <li><strong>Aumentar el Pago Mensual:</strong> Incluso una pequeña cantidad adicional cada mes reduce drásticamente el tiempo de pago</li>
                        </ul>
                        <h3>Por Qué Importa Pagar Pronto</h3>
                        <ul>
                            <li>Las tarjetas de crédito con tasas del 25-40% anual generan intereses rápidamente — pagarlas pronto ahorra miles</li>
                            <li>Liberarte de deudas libera flujo de efectivo mensual para ahorro e inversión</li>
                            <li>Reducir el saldo de tarjetas mejora tu historial y puntaje crediticio</li>
                        </ul>
                    </div>`,
    compound: `<h2>Cómo Funciona el Interés Compuesto</h2>
                    <p>La calculadora de interés compuesto muestra cómo crece tu inversión cuando los intereses se generan sobre el capital inicial y los intereses ya acumulados. Este efecto de "interés sobre interés" es la base de la creación de riqueza a largo plazo.</p>
                    <h3>Frecuencia de Capitalización</h3>
                    <p>Cuanto más frecuentemente se capitaliza el interés, más rápido crece tu inversión:</p>
                    <ul>
                        <li><strong>Diaria:</strong> El interés se calcula y añade 365 veces al año</li>
                        <li><strong>Mensual:</strong> Capitaliza 12 veces al año</li>
                        <li><strong>Trimestral:</strong> Capitaliza 4 veces al año</li>
                        <li><strong>Anual:</strong> Capitaliza una vez al año</li>
                    </ul>
                    <h3>El Poder de las Aportaciones Regulares</h3>
                    <p>Añadir contribuciones mensuales constantes acelera significativamente el crecimiento. Incluso pequeños depósitos recurrentes, combinados con el interés compuesto, pueden producir resultados notables a lo largo de décadas. Empieza cuanto antes y mantén la constancia.</p>`,
    investment: `<h2 class="explanation-title">Calculadora de Rentabilidad de Inversiones</h2>
                    <div class="explanation-text">
                        <p>La calculadora de rentabilidad mide el rendimiento real de tu inversión basándose en el valor inicial, el valor final y el período de tiempo elegido. Úsala para evaluar acciones, fondos de inversión, bienes raíces o cualquier activo.</p>
                        <h3>Métricas Clave de Rentabilidad</h3>
                        <ul>
                            <li><strong>Rentabilidad Total:</strong> El porcentaje de ganancia o pérdida desde el inicio hasta el final</li>
                            <li><strong>Rentabilidad Anualizada (CAGR):</strong> La tasa de crecimiento anual compuesto — el rendimiento anual constante que produciría el mismo resultado</li>
                            <li><strong>Ganancia/Pérdida Absoluta:</strong> El monto real en dinero ganado o perdido</li>
                        </ul>
                        <h3>Factores que Afectan los Retornos</h3>
                        <ul>
                            <li>Condiciones del mercado y ciclos económicos</li>
                            <li>Dividendos e ingresos reinvertidos</li>
                            <li>Comisiones e impuestos (reducen el retorno neto)</li>
                            <li>Horizonte temporal — períodos más largos suavizan la volatilidad</li>
                        </ul>
                        <p>Compara siempre rentabilidades durante el mismo período para comparaciones justas. El rendimiento pasado no garantiza resultados futuros.</p>
                    </div>`,
    dividend: `<h2 class="explanation-title">Calculadora de Dividendos</h2>
                    <div class="explanation-text">
                        <p>La calculadora de dividendos te ayuda a estimar los ingresos por dividendos de tus inversiones en acciones. Ingresa el precio de la acción, el dividendo anual por acción y la cantidad de acciones para ver tu rendimiento y tus ingresos proyectados.</p>
                        <h3>Métricas Clave de Dividendos</h3>
                        <ul>
                            <li><strong>Rendimiento por Dividendo:</strong> Dividendo anual ÷ precio de acción — mayor rendimiento significa más ingresos relativos al precio</li>
                            <li><strong>Ingresos Anuales:</strong> Pagos totales de dividendos anuales de todas tus acciones</li>
                            <li><strong>Crecimiento del Dividendo:</strong> Las empresas que aumentan consistentemente sus dividendos pueden proporcionar ingresos crecientes a lo largo del tiempo</li>
                        </ul>
                        <h3>Construyendo Ingresos por Dividendos</h3>
                        <ul>
                            <li>Reinvertir dividendos (DRIP) aprovecha el crecimiento compuesto para acelerar el valor de la cartera</li>
                            <li>Diversifica entre sectores para reducir el riesgo de recorte de dividendos</li>
                            <li>Busca empresas con largo historial de pagos y crecimiento de dividendos</li>
                            <li>El alto rendimiento solo no siempre es mejor — verifica el ratio de pago y la salud financiera</li>
                        </ul>
                    </div>`,
    stock: `<h2 class="explanation-title">Calculadora de Rentabilidad de Acciones</h2>
                    <div class="explanation-text">
                        <p>La calculadora de retorno de acciones mide el rendimiento de tu inversión bursátil. Ingresa el precio de compra, precio de venta, número de acciones y período de tenencia para ver tu rentabilidad total, rendimiento anualizado y ganancia o pérdida.</p>
                        <h3>Métricas de Rentabilidad Explicadas</h3>
                        <ul>
                            <li><strong>Rentabilidad Total:</strong> Porcentaje total de ganancia o pérdida en tu inversión</li>
                            <li><strong>Rentabilidad Anualizada (CAGR):</strong> La tasa de rendimiento anual equivalente — útil para comparar inversiones mantenidas durante períodos diferentes</li>
                            <li><strong>Ganancia / Pérdida:</strong> El monto real en dinero ganado o perdido en tu posición</li>
                        </ul>
                        <h3>Factores que Afectan los Retornos Bursátiles</h3>
                        <ul>
                            <li>Crecimiento de beneficios de la empresa y salud financiera</li>
                            <li>Sentimiento del mercado y tendencias macroeconómicas</li>
                            <li>Dividendos recibidos durante el período de tenencia</li>
                            <li>Costos de transacción e impuestos sobre ganancias de capital</li>
                        </ul>
                        <p>Usa esta calculadora para revisar el rendimiento de tu cartera y comparar cómo cada inversión contribuyó a tus retornos totales.</p>
                    </div>`
  }
};

const langs = ['en', 'ko', 'ja', 'zh', 'es'];
const calcKeys = ['loan', 'mortgage', 'paycheck', 'payoff', 'compound', 'investment', 'dividend', 'stock'];

langs.forEach(lang => {
  const filePath = path.join(__dirname, 'i18n', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!data.calculators) data.calculators = {};

  calcKeys.forEach(key => {
    if (!data.calculators[key]) data.calculators[key] = {};
    data.calculators[key].explanation = explanations[lang][key];
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`✓ Updated i18n/${lang}.json with explanations`);
});

console.log('\nDone! All explanations written.');
