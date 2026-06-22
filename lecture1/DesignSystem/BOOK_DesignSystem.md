# 비상교재(VISANG) 디자인 시스템

## 프로젝트 정보
- **출처 이미지**: 비상교육 비상교재 사이트 전체 페이지 캡처 (`lecture1/reference/비상교재.jpg`, 1920×8532px)
- **분석 날짜**: 2026-06-22
- **적용 프로젝트**: my-react-app (lecture1) 디자인 레퍼런스
- **분석 방식**: 원본 이미지를 영역별로 크롭 후 픽셀 색상 샘플링, 텍스트 영역 픽셀 높이 측정, 카드/컨테이너 경계 픽셀 측정
- **문서 포맷 참고**: `color_pallette/DIETRO_ColorSystem.md`

## 1. 타이포그래피

### CSS 변수 정의
```css
:root {
  /* Font Size Scale */
  --font-size-h1: 2.25rem;     /* 36px - 히어로 메인 타이틀 */
  --font-size-h2: 1.5rem;      /* 24px - 섹션 타이틀 (비상 소식 등) */
  --font-size-h3: 1.125rem;    /* 18px - 카드/서브 타이틀 */
  --font-size-nav: 1rem;       /* 16px - 내비게이션/버튼 텍스트 */
  --font-size-body: 0.875rem;  /* 14px - 본문/설명 텍스트 */
  --font-size-caption: 0.75rem;/* 12px - 날짜/캡션/보조정보 */

  /* Font Weight */
  --font-weight-bold: 700;
  --font-weight-semibold: 600;
  --font-weight-medium: 500;
  --font-weight-regular: 400;

  /* Line Height */
  --line-height-heading: 1.3;
  --line-height-body: 1.6;
}
```

### 타이포그래피 사용 가이드
- **`--font-size-h1` (36px / bold)**: 페이지 최상단 메인 카피(예: "공부의 힘! 완자 공부력 시리즈"). 반응형에서는 `{ xs: '1.75rem', md: '2.25rem' }` 형태로 축소한다.
- **`--font-size-h2` (24px / bold)**: "비상 소식", "비상이 추천하는 OO 교재" 등 섹션 구분 타이틀. `{ xs: '1.25rem', md: '1.5rem' }` 권장.
- **`--font-size-h3` (18px / semibold)**: 카드 내부 타이틀("학습 자료실", 교재명 등).
- **`--font-size-nav` (16px / medium)**: 상단 내비게이션, 탭, 버튼 라벨.
- **`--font-size-body` (14px / regular)**: 카드 설명문, 리뷰 본문.
- **`--font-size-caption` (12px / regular)**: 날짜, 등록 정보 등 가장 낮은 위계의 텍스트.

> 측정 근거: 원본 1920px 폭 캡처 이미지에서 히어로 타이틀 글자 높이 약 41px, 섹션 타이틀(`비상 소식`) 약 23px, 내비 텍스트 약 16px를 픽셀 단위로 실측한 뒤, 표준 타입 스케일(Material Design 기준)에 맞춰 8px 그리드로 보정한 값이다.

## 2. 간격(Spacing) & 레이아웃

### CSS 변수 정의
```css
:root {
  --spacing-xs: 0.5rem;   /* 8px */
  --spacing-sm: 1rem;     /* 16px */
  --spacing-md: 1.5rem;   /* 24px */
  --spacing-lg: 2rem;     /* 32px - 카드 사이 gap */
  --spacing-xl: 4rem;     /* 64px - 섹션 간 세로 padding */
  --spacing-2xl: 6rem;    /* 96px - 대형 섹션 간 세로 padding */

  --container-max-width: 1280px;
  --grid-gap: 2rem; /* 32px */
}
```

### 간격 사용 가이드
- **`--container-max-width` (1280px)**: 1920px 캡처 기준 좌우 여백을 측정(약 320px씩, 콘텐츠가 화면 중앙 66.7%만 차지)해 환산한 값. React 구현 시 MUI `Container maxWidth="lg"`(1200px)에 대응시킨다.
- **`--grid-gap` (32px)**: 퀵링크 카드(4열), 추천 교재 카드 등 그리드 아이템 사이 간격. 실측값 약 36px를 8px 그리드에 맞춰 보정했다.
- **`--spacing-xl` / `--spacing-2xl` (64px / 96px)**: "비상이 추천하는 교재", "비상 소식" 같은 메이저 섹션 사이의 세로 padding. `py: { xs: 4, md: 8 }` ~ `py: { xs: 6, md: 12 }` 형태로 적용한다.
- 카드 내부 padding은 `--spacing-md`(24px) 기준, 모바일에서는 `--spacing-sm`(16px)로 축소한다.

## 3. 컴포넌트 스타일 (Radius / Shadow)

### CSS 변수 정의
```css
:root {
  --radius-sm: 8px;     /* 교재 표지, 작은 뱃지 */
  --radius-md: 16px;    /* 퀵링크/리뷰 카드 */
  --radius-lg: 24px;    /* 히어로 배너 */
  --radius-pill: 999px; /* 이벤트 뱃지, 캡슐 버튼 */

  --shadow-card: none;  /* 그림자 대신 배경색 대비로 카드 구분 */
}
```

### 컴포넌트 스타일 가이드
- 카드 구분은 box-shadow가 아니라 카드 배경과 페이지 배경의 미세한 명도 차이로만 처리하는 플랫(flat) 스타일이다. 원본 톤을 유지하려면 기본값은 `shadow: none`을 유지한다.
- 히어로/이벤트 배너는 `--radius-lg`(24px) 이상의 큰 라운드를 사용해 부드러운 인상을 준다.
- "교재 후기 이벤트" 같은 작은 뱃지는 `--radius-pill`로 캡슐 형태로 처리한다.

## 반응형 고려사항
- **모바일/저해상도 화면**: `--container-max-width`는 `calc(100% - 32px)`(좌우 16px 거터)로 대체하고, 4열 그리드는 2열 또는 1열로 축소한다. `--font-size-h1`은 36px → 28px, `--font-size-h2`는 24px → 20px로 축소를 권장한다.
- **터치 디바이스**: hover 강조 효과는 모바일에서 hover 대신 active 상태에 적용한다.
