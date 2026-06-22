# 컬러 팔레트 디자인 시스템

## 프로젝트 정보
- **출처 웹사이트**: 옥정중앙역 디에트르(D'etre) 분양 홈페이지
- **분석 날짜**: 2026-06-22
- **적용 프로젝트**: 포트폴리오 웹사이트

## CSS 변수 정의
```css
:root {
  /* Primary Colors */
  --color-primary: #76A7D8;
  --color-primary-light: #9FC1E4;
  --color-primary-dark: #537597;

  /* Secondary Colors */
  --color-secondary: #C5BDD8;
  --color-accent: #818264;

  /* Background Colors */
  --color-bg-primary: #F4F8FC;
  --color-bg-secondary: #F9F8FB;

  /* Text Colors */
  --color-text-primary: #47453C;
  --color-text-secondary: #42484C;
  --color-text-muted: #AAADAE;

  /* Interactive Colors */
  --color-button-primary: #818264;
  --color-button-hover: #4D4E30;
  --color-link: #6189B1;
  --color-link-hover: #4D6D8C;
}
```

## 컬러 사용 가이드

### Primary Colors
- **`--color-primary` (#76A7D8)**: 원본 히어로 배경의 스카이 블루. 페이지 상단 히어로 섹션, 핵심 그래픽 요소, 브랜드를 대표하는 포인트 영역(아이콘, 강조 도형)에 사용한다.
- **`--color-primary-light` (#9FC1E4)**: primary를 밝게 보정한 톤. 호버되지 않은 비활성 상태, 카드 배경의 옅은 강조, 그라디언트의 밝은 쪽 끝에 사용한다.
- **`--color-primary-dark` (#537597)**: primary를 어둡게 보정한 톤. 다크 배경 위의 강조 요소, primary 위에 겹치는 텍스트/아이콘 등 대비가 필요한 곳에 사용한다.

### Secondary Colors
- **`--color-secondary` (#C5BDD8)**: 원본 그라디언트 하단의 라벤더 핑크. primary와 함께 그라디언트를 구성하거나, 섹션 구분용 배경 톤, 부드러운 강조 박스에 사용한다.
- **`--color-accent` (#818264)**: CTA 버튼/사이드바에서 추출한 올리브 카키 그린. 시선을 끌어야 하는 버튼, 배지, 강조 라벨 등 "행동 유도" 요소에만 제한적으로 사용해 희소성을 유지한다.

### Background Colors
- **`--color-bg-primary` (#F4F8FC)**: primary 색상을 92% 틴트한 거의 흰색에 가까운 배경. 본문 페이지의 기본 배경색으로 사용한다.
- **`--color-bg-secondary` (#F9F8FB)**: secondary 색상을 틴트한 배경. 섹션을 구분하거나 카드/패널 배경으로 사용해 페이지에 미세한 리듬을 준다.

### Text Colors
- **`--color-text-primary` (#47453C)**: 원본 메인 헤드라인에서 추출한 다크 차콜. 제목, 본문 등 가장 중요한 텍스트에 사용한다.
- **`--color-text-secondary` (#42484C)**: 원본 서브 헤드라인 색상. 부제목, 설명문 등 본문보다 한 단계 낮은 위계의 텍스트에 사용한다.
- **`--color-text-muted` (#AAADAE)**: 비활성/보조 정보용 톤. placeholder, 캡션, 타임스탬프, 비활성화된 텍스트에 사용한다.

### Interactive Colors
- **`--color-button-primary` (#818264)**: 메인 CTA 버튼의 기본 배경색.
- **`--color-button-hover` (#4D4E30)**: 원본 사이트의 진한 올리브 헤더 색을 그대로 호버 상태로 재사용. 버튼 hover/active 시 적용해 명확한 피드백을 준다.
- **`--color-link` (#6189B1)**: 본문 내 링크 텍스트 기본색. primary보다 어둡게 보정해 흰 배경에서도 가독성을 확보했다.
- **`--color-link-hover` (#4D6D8C)**: 링크 hover/focus 시 적용하는 더 어두운 톤.

## 반응형 고려사항

- **다크모드**: 다크모드 전환 시 `--color-bg-primary`/`--color-bg-secondary`를 짙은 네이비 계열(예: `#10151C`, `#161A22`)로 교체하고, `--color-text-primary`/`--color-text-secondary`를 밝은 톤(예: `#F4F8FC`, `#D6D9DC`)으로 반전한다. `--color-primary`, `--color-accent`는 다크 배경에서도 식별이 가능하므로 유지하되, 명도 대비가 부족하면 `--color-primary-light`로 대체한다.
- **모바일/저해상도 화면**: 작은 화면에서는 `--color-accent`(올리브)와 `--color-button-hover` 간 명도 차이가 충분한지 확인하고, 터치 영역(버튼)에는 hover 대신 active 상태에 `--color-button-hover`를 적용한다.
- **고대비/접근성 모드**: `--color-text-muted`(#AAADAE)는 흰 배경 대비 명도비가 낮으므로 본문에는 사용하지 않고 보조 정보에만 한정한다. 필요 시 접근성 모드에서 `--color-text-secondary`로 대체한다.
- **다양한 화면 배경**: 사진/그라디언트가 들어가는 히어로 영역에서는 `--color-primary` → `--color-secondary` 그라디언트를 유지하고, 일반 콘텐츠 영역에서는 `--color-bg-primary`/`--color-bg-secondary`의 옅은 틴트만 사용해 과도한 채도로 인한 눈의 피로를 방지한다.
