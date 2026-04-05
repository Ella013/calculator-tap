const fs = require('fs');
const path = require('path');

// 지원 언어 목록 (시장 규모 및 금융 서비스 이용률 기준)
// 1. English - 가장 넓은 시장 (미국, 영국, 캐나다, 호주 등)
// 2. Español - 라틴 아메리카 + 스페인 (큰 시장)
// 3. 中文 - 중국, 대만, 싱가포르 (거대한 시장)
// 4. 한국어 - 한국 시장
// 5. 日本語 - 일본 시장
const languages = ['en', 'es', 'zh', 'ko', 'ja'];

// 번역 파일 로드
function loadTranslations(lang) {
  const filePath = path.join(__dirname, 'i18n', `${lang}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// 중첩된 객체에서 값을 가져오기
function getNestedValue(obj, key) {
  return key.split('.').reduce((o, k) => o && o[k], obj);
}

// HTML에서 번역 키를 찾아서 번역된 텍스트로 교체
function translateHTML(html, translations, lang) {
  let translatedHTML = html;
  
  // lang 속성 업데이트
  translatedHTML = translatedHTML.replace(/lang="[^"]*"/, `lang="${translations.lang}"`);
  
  // 메타 태그 번역
  translatedHTML = translatedHTML.replace(
    /<title>([^<]*)<\/title>/,
    `<title>${translations.meta.title}</title>`
  );
  
  translatedHTML = translatedHTML.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${translations.meta.description}"`
  );
  
  translatedHTML = translatedHTML.replace(
    /<meta name="keywords" content="[^"]*"/,
    `<meta name="keywords" content="${translations.meta.keywords}"`
  );
  
  // href 속성은 그대로 유지 (언어별 빌드된 파일에서는 상대 경로가 맞음)
  
  // data-translate 속성 처리 (여러 줄 지원)
  // 각 요소를 태그 이름으로 그룹화하여 처리
  const translateRegex = /<(\w+)([^>]*?)data-translate="([^"]*)"([^>]*?)>([\s\S]*?)<\/\1>/g;
  translatedHTML = translatedHTML.replace(translateRegex, (match, tagName, beforeAttrs, key, afterAttrs, oldContent) => {
    const value = getNestedValue(translations, key);
    if (value) {
      // data-translate 속성 제거
      const cleanAttrs = (beforeAttrs + afterAttrs).replace(/\s*data-translate="[^"]*"/g, '').trim();
      return `<${tagName}${cleanAttrs ? ' ' + cleanAttrs : ''}>${value}</${tagName}>`;
    }
    return match;
  });
  
  // 남은 data-translate 속성 제거 (번역되지 않은 것들)
  translatedHTML = translatedHTML.replace(/\s*data-translate="[^"]*"/g, '');
  
  // 속성 값 번역 (placeholder, alt 등)
  translatedHTML = translatedHTML.replace(
    /(\w+)="[^"]*" data-translate-attr="([^"]*)"/g,
    (match, attrName, key) => {
      const value = getNestedValue(translations, key);
      return value ? `${attrName}="${value}"` : match.replace(/\s*data-translate-attr="[^"]*"/, '');
    }
  );
  
  // 남은 data-translate-attr 속성 제거
  translatedHTML = translatedHTML.replace(/\s*data-translate-attr="[^"]*"/g, '');
  
  // 커스텀 언어 선택 드롭다운 업데이트
  const langMap = {
    'en': 'English',
    'ko': '한국어',
    'es': 'Español',
    'zh': '中文',
    'ja': '日本語'
  };
  
  // 언어 선택 버튼의 텍스트 업데이트
  translatedHTML = translatedHTML.replace(
    /<span class="language-selected">[^<]*<\/span>/,
    `<span class="language-selected">${langMap[lang] || 'English'}</span>`
  );
  
  // 활성 언어 옵션 표시
  translatedHTML = translatedHTML.replace(
    new RegExp(`<div class="language-option" data-lang="${lang}">`, 'g'),
    `<div class="language-option active" data-lang="${lang}">`
  );
  
  return translatedHTML;
}

// hreflang 태그 생성
function generateHreflang(pageRelPath) {
  const langs = ['en', 'es', 'zh', 'ko', 'ja'];
  const base = 'https://calculatortap.com';
  let tags = '';
  langs.forEach(l => {
    tags += `\n    <link rel="alternate" hreflang="${l}" href="${base}/${l}/${pageRelPath}">`;
  });
  tags += `\n    <link rel="alternate" hreflang="x-default" href="${base}/en/${pageRelPath}">`;
  return tags;
}

// HTML 파일 빌드
function buildHTML(filePath, outputDir, translations, lang) {
  const html = fs.readFileSync(filePath, 'utf8');
  let translatedHTML = translateHTML(html, translations, lang);

  // hreflang 태그 삽입
  const rootDir = path.resolve(__dirname);
  const fileRelPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const hreflangTags = generateHreflang(fileRelPath);
  translatedHTML = translatedHTML.replace('</head>', hreflangTags + '\n</head>');
  
  // 출력 디렉토리 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 파일 저장
  const fileName = path.basename(filePath);
  const outputPath = path.join(outputDir, fileName);
  fs.writeFileSync(outputPath, translatedHTML, 'utf8');
  
  console.log(`  ✓ ${fileName}`);
}

// 정적 파일 복사
function copyStaticFiles(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // srcDir이 dist 폴더 안에 있으면 복사하지 않음 (절대 경로로 비교)
  const distPath = path.resolve(__dirname, 'dist');
  const srcDirResolved = path.resolve(srcDir);
  if (srcDirResolved === distPath || (srcDirResolved.startsWith(distPath + path.sep) && path.basename(srcDir) === 'dist')) {
    return;
  }
  
  const files = fs.readdirSync(srcDir);
  
  files.forEach(file => {
    // dist 폴더나 무시할 폴더는 건너뛰기
    if (['i18n', 'node_modules', '.git', 'dist'].includes(file)) {
      return;
    }
    
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    const stat = fs.statSync(srcPath);
    
    // srcPath가 dist 폴더를 가리키는지 확인 (절대 경로로 비교)
    const srcPathResolved = path.resolve(srcPath);
    if (srcPathResolved === distPath || (srcPathResolved.startsWith(distPath + path.sep) && file === 'dist')) {
      return;
    }
    
    if (stat.isDirectory()) {
      copyStaticFiles(srcPath, destPath);
    } else {
      // HTML 파일은 빌드 과정에서 생성되므로 복사하지 않음
      if (!file.endsWith('.html') && !file.includes('template') && !file.includes('package.json') && !file.includes('build.js')) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  });
}

// 메인 빌드 함수
function build() {
  console.log('🚀 Starting build...\n');
  
  // 기존 dist 폴더 삭제 (깨끗한 빌드를 위해)
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    try {
      // Windows에서 파일이 사용 중일 수 있으므로 재시도 로직
      let retries = 3;
      while (retries > 0) {
        try {
          fs.rmSync(distDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
          console.log('  ✓ Cleaned existing dist directory\n');
          break;
        } catch (err) {
          retries--;
          if (retries === 0) throw err;
          // 잠시 대기 후 재시도
          const { execSync } = require('child_process');
          if (process.platform === 'win32') {
            execSync(`timeout /t 1 /nobreak >nul 2>&1`, { stdio: 'ignore' });
          } else {
            execSync(`sleep 1`, { stdio: 'ignore' });
          }
        }
      }
    } catch (err) {
      console.warn('  ⚠ Could not clean dist directory, continuing anyway...\n');
    }
  }
  
  // 각 언어별로 빌드
  languages.forEach(lang => {
    console.log(`\n📦 Building ${lang.toUpperCase()}...`);
    const translations = loadTranslations(lang);
    const outputDir = path.join(__dirname, 'dist', lang);
    
    // 정적 파일 복사
    copyStaticFiles(__dirname, outputDir);
    
    // HTML 파일 빌드
    const htmlFiles = [
      'index.html',
      'about.html',
      'contact.html',
      'privacy-policy.html',
      'terms.html',
      'sitemap.html'
    ];
    
    htmlFiles.forEach(file => {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        buildHTML(filePath, outputDir, translations, lang);
      }
    });
    
    // 하위 디렉토리의 HTML 파일들도 빌드
    const subDirs = [
      { dir: 'loan-calculator', file: 'loan-calculator.html' },
      { dir: 'Mortgage-Qualification-Calculator', file: 'mortgage-qualification.html' },
      { dir: 'paycheck-calculator', file: 'paycheck-calculator.html' },
      { dir: 'payoff-calculator', file: 'payoff-calculator.html' },
      { dir: 'compound-interest-calculator', file: 'compound-interest.html' },
      { dir: 'investment-return-calculator', file: 'investment-return.html' },
      { dir: 'dividend-calculator', file: 'dividend-calculator.html' },
      { dir: 'stock-return-calculator', file: 'stock-return.html' }
    ];
    
    subDirs.forEach(({ dir, file }) => {
      const htmlPath = path.join(__dirname, dir, file);
      if (fs.existsSync(htmlPath)) {
        const outputSubDir = path.join(outputDir, dir);
        if (!fs.existsSync(outputSubDir)) {
          fs.mkdirSync(outputSubDir, { recursive: true });
        }
        buildHTML(htmlPath, outputSubDir, translations, lang);
      }
    });
  });
  
  console.log('\n✅ Build complete!');
  console.log(`\n📁 Output directory: ${path.join(__dirname, 'dist')}`);
  
  // 루트 index.html 생성 (영어 버전을 기본으로)
  const enIndexPath = path.join(__dirname, 'dist', 'en', 'index.html');
  const rootIndexPath = path.join(__dirname, 'dist', 'index.html');
  
  if (fs.existsSync(enIndexPath)) {
    let rootIndexContent = fs.readFileSync(enIndexPath, 'utf8');
    
    // 루트 index.html의 계산기 링크에 /en/ 경로 추가
    rootIndexContent = rootIndexContent.replace(/href="(loan-calculator|Mortgage-Qualification-Calculator|paycheck-calculator|payoff-calculator|compound-interest-calculator|investment-return-calculator|dividend-calculator|stock-return-calculator)\//g, 'href="en/$1/');
    rootIndexContent = rootIndexContent.replace(/url: '(loan-calculator|Mortgage-Qualification-Calculator|paycheck-calculator|payoff-calculator|compound-interest-calculator|investment-return-calculator|dividend-calculator|stock-return-calculator)\//g, "url: 'en/$1/");
    
    fs.writeFileSync(rootIndexPath, rootIndexContent, 'utf8');
    console.log('  ✓ Created root index.html (copy of en/index.html with /en/ links)');
  }
  
  // 루트에 필요한 정적 파일들 복사 (CSS, 이미지 등)
  const enDir = path.join(__dirname, 'dist', 'en');
  const rootDir = path.join(__dirname, 'dist');
  const staticFiles = ['styles.css', 'calculator tap logo.png', 'script.js'];
  const faviconFiles = ['favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png', 'android-chrome-192x192.png', 'android-chrome-512x512.png', 'site.webmanifest', 'ads.txt'];
  
  staticFiles.forEach(file => {
    const srcPath = path.join(enDir, file);
    const destPath = path.join(rootDir, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  ✓ Copied ${file} to root`);
    }
  });

  // 로고 파일을 하이픈 버전으로도 복사 (about.html 등 일부 페이지에서 calculator-tap-logo.png 사용)
  const logoSrc = path.join(enDir, 'calculator-tap-logo.png');
  const logoDest = path.join(rootDir, 'calculator-tap-logo.png');
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, logoDest);
    console.log('  ✓ Copied calculator-tap-logo.png to root');
  }
  
  faviconFiles.forEach(file => {
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(rootDir, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  ✓ Copied ${file} to root`);
    }
  });
  
  // 루트에 필요한 HTML 페이지들 복사 (about, privacy-policy, terms, sitemap, contact)
  const rootPages = ['about.html', 'contact.html', 'privacy-policy.html', 'terms.html', 'sitemap.html'];
  
  rootPages.forEach(file => {
    const srcPath = path.join(enDir, file);
    const destPath = path.join(rootDir, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  ✓ Copied ${file} to root`);
    }
  });
}

// 빌드 실행
build();

