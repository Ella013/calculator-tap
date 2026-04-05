const fs = require('fs');
const path = require('path');

const LANG_SWITCHER_CSS = `
        /* Language Selector */
        .language-selector {
            margin-left: 1rem;
            position: relative;
        }
        .language-select-wrapper {
            position: relative;
        }
        .language-icon {
            position: absolute;
            left: 0.9rem;
            top: 50%;
            transform: translateY(-50%);
            color: #3498db;
            font-size: 0.9rem;
            pointer-events: none;
            z-index: 2;
        }
        .language-select-btn {
            padding: 0.6rem 2.5rem 0.6rem 2.5rem;
            border: 1.5px solid #e0e0e0;
            border-radius: 25px;
            background: white;
            color: #2c3e50;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            min-width: 120px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            font-family: inherit;
        }
        .language-select-btn:hover {
            border-color: #3498db;
            box-shadow: 0 2px 8px rgba(52, 152, 219, 0.15);
        }
        .language-select-btn.active {
            border-color: #3498db;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }
        .language-selected {
            flex: 1;
            text-align: left;
        }
        .language-arrow {
            font-size: 0.7rem;
            color: #3498db;
            transition: transform 0.3s ease;
        }
        .language-select-btn.active .language-arrow {
            transform: rotate(180deg);
        }
        .language-dropdown {
            position: absolute;
            top: calc(100% + 0.5rem);
            left: 0;
            right: 0;
            background: white;
            border: 1.5px solid #e0e0e0;
            border-radius: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
            z-index: 1000;
            overflow: hidden;
            min-width: 120px;
        }
        .language-dropdown.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        .language-option {
            padding: 0.8rem 1.2rem;
            color: #2c3e50;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s ease;
            border-radius: 12px;
            margin: 0.3rem;
        }
        .language-option:first-child { margin-top: 0.5rem; }
        .language-option:last-child { margin-bottom: 0.5rem; }
        .language-option:hover { background-color: #f8f9fa; }
        .language-option.active { background-color: #3498db; color: white; }`;

const LANG_SWITCHER_HTML = `
                <div class="language-selector">
                    <div class="language-select-wrapper">
                        <i class="fas fa-globe language-icon"></i>
                        <button class="language-select-btn" id="languageSelectBtn">
                            <span class="language-selected">English</span>
                            <i class="fas fa-chevron-down language-arrow"></i>
                        </button>
                        <div class="language-dropdown" id="languageDropdown">
                            <div class="language-option" data-lang="en">English</div>
                            <div class="language-option" data-lang="es">Español</div>
                            <div class="language-option" data-lang="zh">中文</div>
                            <div class="language-option" data-lang="ko">한국어</div>
                            <div class="language-option" data-lang="ja">日本語</div>
                        </div>
                    </div>
                </div>`;

const LANG_SWITCHER_JS = `
        // Language switcher
        (function initLanguageSelector() {
            const languageSelectBtn = document.getElementById('languageSelectBtn');
            const languageDropdown = document.getElementById('languageDropdown');
            const languageOptions = document.querySelectorAll('.language-option');
            const languageSelected = document.querySelector('.language-selected');
            if (!languageSelectBtn || !languageDropdown) return;
            const currentPath = window.location.pathname;
            const pathLang = currentPath.split('/').find(p => ['en', 'es', 'zh', 'ko', 'ja'].includes(p)) || 'en';
            const langMap = { 'en': 'English', 'es': 'Español', 'zh': '中文', 'ko': '한국어', 'ja': '日本語' };
            if (languageSelected) languageSelected.textContent = langMap[pathLang] || 'English';
            languageOptions.forEach(option => {
                if (option.dataset.lang === pathLang) option.classList.add('active');
            });
            languageSelectBtn.addEventListener('click', function(e) {
                e.preventDefault(); e.stopPropagation();
                languageSelectBtn.classList.toggle('active');
                languageDropdown.classList.toggle('show');
            });
            languageOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault(); e.stopPropagation();
                    const selectedLang = option.dataset.lang;
                    if (!selectedLang || selectedLang === pathLang) {
                        languageSelectBtn.classList.remove('active');
                        languageDropdown.classList.remove('show');
                        return;
                    }
                    localStorage.setItem('preferred-language', selectedLang);
                    const langCodes = ['en', 'es', 'zh', 'ko', 'ja'];
                    const pathParts = currentPath.split('/').filter(p => p);
                    let langIndex = -1;
                    for (let i = 0; i < pathParts.length; i++) {
                        if (langCodes.includes(pathParts[i])) { langIndex = i; break; }
                    }
                    let newPath = '';
                    if (langIndex >= 0) {
                        const afterLang = pathParts.slice(langIndex + 1);
                        if (window.location.protocol === 'file:') {
                            const dirDepth = afterLang.length;
                            newPath = '../'.repeat(dirDepth) + selectedLang + '/' + afterLang.join('/');
                        } else {
                            pathParts[langIndex] = selectedLang;
                            newPath = '/' + pathParts.join('/');
                        }
                    } else {
                        const fileName = pathParts[pathParts.length - 1] || 'index.html';
                        newPath = '/' + selectedLang + '/' + fileName;
                    }
                    window.location.href = newPath;
                });
            });
            document.addEventListener('click', function(e) {
                if (!languageSelectBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
                    languageSelectBtn.classList.remove('active');
                    languageDropdown.classList.remove('show');
                }
            });
        })();`;

const calculatorPages = [
    'loan-calculator/loan-calculator.html',
    'Mortgage-Qualification-Calculator/mortgage-qualification.html',
    'paycheck-calculator/paycheck-calculator.html',
    'payoff-calculator/payoff-calculator.html',
    'compound-interest-calculator/compound-interest.html',
    'investment-return-calculator/investment-return.html',
    'dividend-calculator/dividend-calculator.html',
    'stock-return-calculator/stock-return.html'
];

const baseDir = __dirname;

calculatorPages.forEach(relPath => {
    const filePath = path.join(baseDir, relPath);
    if (!fs.existsSync(filePath)) {
        console.log(`SKIPPED (not found): ${relPath}`);
        return;
    }

    let html = fs.readFileSync(filePath, 'utf8');

    // 1. Fix logo: replace webp picture tag with simple img
    html = html.replace(
        /<picture>\s*<source srcset="\.\.\/calculator-tap-logo\.webp" type="image\/webp">\s*<img src="\.\.\/calculator-tap-logo\.png"/g,
        '<img src="../calculator-tap-logo.png"'
    );
    // Also fix paycheck-calculator which uses space name
    html = html.replace(
        /<picture>\s*<source srcset="\.\.\/calculator-tap-logo\.webp" type="image\/webp">\s*<img src="\.\.\/calculator tap logo\.png"/g,
        '<img src="../calculator-tap-logo.png"'
    );
    // Close the picture tag that was opened
    html = html.replace(/<\/picture>/g, (match, offset) => {
        // Only remove if in the logo area (first occurrence near header)
        return '';
    });

    // 2. Add language switcher CSS before </style>
    if (!html.includes('language-selector')) {
        html = html.replace('</style>', LANG_SWITCHER_CSS + '\n    </style>');
    }

    // 3. Add language switcher HTML after the Home nav link
    if (!html.includes('languageSelectBtn')) {
        html = html.replace(
            /<a href="\.\.\/index\.html" class="nav-link"><i class="fas fa-home"><\/i> Home<\/a>\s*<\/nav>/,
            `<a href="../index.html" class="nav-link"><i class="fas fa-home"></i> Home</a>${LANG_SWITCHER_HTML}
            </nav>`
        );
    }

    // 4. Add Contact to footer if missing
    if (!html.includes('contact.html')) {
        html = html.replace(
            /<a href="\.\.\/about\.html">About<\/a>\s*(<\/div>|<a href)/,
            (match, after) => `<a href="../about.html">About</a>
                <a href="../contact.html">Contact</a>
                ${after}`
        );
    }

    // 5. Add language switcher JS before the mobile menu JS
    if (!html.includes('initLanguageSelector')) {
        html = html.replace(
            '// 모바일 메뉴 스크립트 추가',
            LANG_SWITCHER_JS + '\n\n        // 모바일 메뉴 스크립트 추가'
        );
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Updated: ${relPath}`);
});

console.log('\nDone! All calculator pages updated.');
