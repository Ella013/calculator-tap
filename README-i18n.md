# 다국어 지원 빌드 시스템

이 프로젝트는 빌드 단계에서 언어별 HTML 파일을 생성하는 다국어 지원 시스템을 사용합니다.

## 구조

```
/
├── i18n/              # 번역 JSON 파일
│   ├── en.json       # 영어
│   ├── ko.json       # 한국어
│   └── es.json       # 스페인어
├── build.js          # 빌드 스크립트
├── package.json      # npm 설정
├── index.html        # 템플릿 HTML (원본)
└── dist/             # 빌드 결과물 (생성됨)
    ├── en/
    ├── ko/
    └── es/
```

## 사용 방법

### 1. 빌드 실행

```bash
npm install
npm run build
```

### 2. 빌드 결과

`dist/` 폴더에 각 언어별로 HTML 파일이 생성됩니다:

- `dist/en/index.html` - 영어
- `dist/ko/index.html` - 한국어
- `dist/es/index.html` - 스페인어

## 번역 파일 수정

`i18n/` 폴더의 JSON 파일을 수정하여 번역을 업데이트할 수 있습니다.

```json
{
  "lang": "ko",
  "meta": {
    "title": "페이지 제목"
  },
  "nav": {
    "home": "홈"
  }
}
```

## HTML 템플릿 작성

번역이 필요한 텍스트에 `data-translate` 속성을 추가하세요:

```html
<h1 data-translate="hero.title">Free Online Financial Calculators</h1>
<p data-translate="hero.subtitle">Make informed financial decisions</p>
```

속성 값 번역의 경우 `data-translate-attr` 사용:

```html
<input placeholder="Search..." data-translate-attr="hero.searchPlaceholder">
```

## 언어 선택

사용자는 헤더의 언어 선택 드롭다운을 통해 언어를 변경할 수 있습니다.
선택한 언어는 localStorage에 저장되어 다음 방문 시 자동으로 적용됩니다.

## 배포

`dist/` 폴더의 내용을 웹 서버에 업로드하세요.

각 언어별 URL:
- 영어: `https://yourdomain.com/en/index.html`
- 한국어: `https://yourdomain.com/ko/index.html`
- 스페인어: `https://yourdomain.com/es/index.html`

