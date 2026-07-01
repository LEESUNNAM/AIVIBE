# 컬러 팔레트 디자인 시스템

## 프로젝트 정보
- **출처 이미지**: 커뮤니티 색상 레퍼런스 (고양이 다섯 마리와 지중해 하늘·바다 풍경 사진)
- **분석 날짜**: 2026-07-01
- **적용 프로젝트**: 포트폴리오 웹사이트

## 원본 이미지 색상 요소
| 구역 | 실측 Hex | 설명 |
|---|---|---|
| 하늘 최상단 | `#376586` | 가장 짙은 스틸 블루, 이미지 상단 60% |
| 하늘 중간 | `#437998` | 중간 톤 청록빛 블루 |
| 하늘 하단/지평선 | `#9AB4C2` | 수평선 근처 밝은 하늘 헤이즈 |
| 바다(오션 틸) | `#437B95` | 지중해 에메랄드빛 파도 |
| 흰 벽(밝은 영역) | `#BABDC3` | 석회 도장 흰 벽, 하늘빛 반사 |
| 벽 그림자 | `#949CA6` | 고양이 그림자가 드리운 쿨 블루그레이 |
| 바닥 타일 | `#CDCBCA` | 웜 베이지그레이 벽돌 |
| 다크 그레이 고양이 | `#1A2B35` | 가장 왼쪽 짙은 차콜 고양이 |
| 흰색/크림 고양이 | `#D5D6D5` | 가운데 세 마리 흰색 고양이 털 |
| 오렌지 앰버 고양이 | `#AC6A2A` | 오른쪽 끝 진저 태비 고양이 |

## CSS 변수 정의
```css
:root {
  /* Primary Colors */
  --color-primary: #376586;
  --color-primary-light: #6F90A8;
  --color-primary-dark: #2B4F69;

  /* Secondary Colors */
  --color-secondary: #9AB4C2;
  --color-accent: #AC6A2A;

  /* Background Colors */
  --color-bg-primary: #EFF3F5;
  --color-bg-secondary: #F5F8F9;

  /* Text Colors */
  --color-text-primary: #1A2B35;
  --color-text-secondary: #213D50;
  --color-text-muted: #7A8E9B;

  /* Interactive Colors */
  --color-button-primary: #AC6A2A;
  --color-button-hover: #815020;
  --color-link: #335D7B;
  --color-link-hover: #294C64;
}
```

## 컬러 사용 가이드

### Primary Colors
- **`--color-primary` (#376586)**: 원본 하늘 최상단의 짙은 스틸 블루. 히어로 섹션 배경, 헤더 강조 영역, 네비게이션 액티브 상태 등 페이지 전체 톤을 지배하는 핵심 색상으로 사용한다.
- **`--color-primary-light` (#6F90A8)**: primary를 28% 틴트한 중간 블루. 카드 테두리, 비활성 탭, 아이콘 보조색, 호버 이전 상태 등 primary보다 한 단계 낮은 강조에 사용한다.
- **`--color-primary-dark` (#2B4F69)**: primary를 22% 어둡게 보정한 딥 네이비. 다크 배경 위 텍스트, 포커스 링, 진한 구분선 등 대비가 강하게 필요한 곳에 사용한다.

### Secondary Colors
- **`--color-secondary` (#9AB4C2)**: 수평선 부근 하늘의 헤이즈 블루그레이. 배경 섹션 구분, 서브카드 테두리, 사진 오버레이 등 primary보다 부드럽고 넓게 쓰이는 보조 톤으로 사용한다.
- **`--color-accent` (#AC6A2A)**: 오렌지 앰버 고양이에서 추출한 웜 앰버. 쿨한 블루 계열 팔레트와 강한 보색 대비를 이루므로, CTA 버튼·뱃지·하이라이트 텍스트 등 반드시 시선이 집중되어야 하는 요소에만 제한적으로 사용해 임팩트를 극대화한다.

### Background Colors
- **`--color-bg-primary` (#EFF3F5)**: primary 색상을 92% 틴트한 거의 흰색에 가까운 쿨 배경. 페이지 전체 기본 배경으로 사용해 흰 벽의 지중해적 청명함을 표현한다.
- **`--color-bg-secondary` (#F5F8F9)**: secondary 색상을 틴트한 더욱 옅은 배경. 카드·패널·섹션 구분 배경으로 사용해 bg-primary와 미세한 차이로 깊이감을 준다.

### Text Colors
- **`--color-text-primary` (#1A2B35)**: 다크 그레이 고양이의 짙은 차콜 블루에서 도출. 제목, 본문 등 가장 중요한 텍스트에 사용하며, 쿨 배경 위에서 따뜻한 블랙 계열이 아닌 블루그레이 다크로 팔레트 통일감을 유지한다.
- **`--color-text-secondary` (#213D50)**: primary-dark 계열의 중간 다크 블루. 부제목, 설명문 등 text-primary보다 한 단계 낮은 위계 텍스트에 사용한다.
- **`--color-text-muted` (#7A8E9B)**: 벽 그림자 영역 측정값에서 도출한 미디엄 블루그레이. placeholder, 캡션, 날짜, 비활성 라벨 등 정보 위계가 낮은 텍스트에만 사용한다.

### Interactive Colors
- **`--color-button-primary` (#AC6A2A)**: 오렌지 앰버 accent를 버튼 기본 배경으로 사용. 쿨 블루 배경 위에서 시각적 온도 차이로 자연스럽게 시선을 유도한다.
- **`--color-button-hover` (#815020)**: button-primary를 25% 어둡게 보정. 마우스 오버/터치 active 시 명확한 시각 피드백을 제공한다.
- **`--color-link` (#335D7B)**: primary를 8% 어둡게 조정한 링크 기본색. 밝은 배경 위에서도 WCAG 대비 기준을 만족하는 읽기 가능한 블루.
- **`--color-link-hover` (#294C64)**: link보다 25% 어두운 딥 블루. 링크 hover/focus 상태에서 적용한다.

## 반응형 고려사항

- **다크모드**: 다크모드 전환 시 `--color-bg-primary`/`--color-bg-secondary`를 깊은 네이비 계열(예: `#0D1B24`, `#111E29`)로 교체하고, `--color-text-primary`/`--color-text-secondary`를 밝은 쿨 톤(예: `#EFF3F5`, `#C2D0D8`)으로 반전한다. `--color-accent`(앰버)는 다크 배경에서 더욱 선명하게 보이므로 동일하게 유지하되, button-hover는 `#A06428`로 밝혀 터치 피드백을 확보한다.
- **모바일/저해상도**: 작은 화면에서 `--color-accent`와 `--color-button-hover`의 명도 차이가 충분한지 검토하고, 터치 영역(최소 44px)에서 hover 상태 대신 active 상태에 `--color-button-hover`를 적용한다.
- **고대비/접근성 모드**: `--color-text-muted`(#7A8E9B)는 흰 배경(`#FFFFFF`) 대비 명도비 약 3.5:1로 WCAG AA 기준(4.5:1)에 미치지 못하므로, 본문에는 사용하지 않고 보조 정보에만 한정한다. 접근성 강화 모드에서는 `--color-text-secondary`(#213D50)로 대체한다.
- **다양한 화면 배경**: 히어로 영역에는 `--color-primary` → `--color-secondary`의 하늘 그라디언트(상단에서 수평선 방향으로 밝아지는 방향)를 적용하고, 일반 콘텐츠 영역은 `--color-bg-primary`/`--color-bg-secondary`의 옅은 틴트만 사용해 채도 피로를 방지한다.
