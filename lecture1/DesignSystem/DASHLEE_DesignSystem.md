# DASHLEE 캡슐 피규어 디자인 시스템

## 프로젝트 정보
- **출처 이미지**: `lecture1/reference/DASHLEE.gif` (368×496px, 67프레임 애니메이션 GIF)
- **분석 날짜**: 2026-06-24
- **적용 프로젝트**: lecture1 디자인 레퍼런스
- **분석 방식**: GIF 프레임 추출(PIL) 후 영역별 픽셀 색상 샘플링(Counter 기반 dominant color 추출), HSV 채도 필터링을 통한 포인트 컬러 검출, 프레임 간 픽셀 diff로 모션 패턴 분석, GIF 메타데이터로 프레임 duration/루프 측정
- **문서 포맷 참고**: `DesignSystem/BOOK_DesignSystem.md`

## 1. 컬러 시스템

### CSS 변수 정의
```css
:root {
  /* Character Colors */
  --color-skin: #C6957E;
  --color-skin-highlight: #E4CCB6;
  --color-hair: #1C1414;
  --color-eye-iris: #3A3F4C;

  /* Accent Colors */
  --color-accent-gold: #C08A35;     /* 헤어밴드 */
  --color-accent-blue: #5B93C3;     /* 의상·리본 / 유리돔 반사광 */
  --color-accent-blue-light: #8EC6F7;

  /* Capsule Frame Colors */
  --color-frame-dark: #3B3A42;
  --color-frame-mid: #6F6F71;
  --color-frame-light: #B3B5C1;
}
```

### 컬러 사용 가이드
- **`--color-skin` / `--color-skin-highlight`**: 피규어 피부의 베이스/하이라이트 톤. 웜톤 베이지 계열로, 명암 표현에 두 톤을 함께 사용한다.
- **`--color-hair` (#1C1414)**: 거의 블랙에 가까운 다크 브라운. 헤어와 눈동자 외곽선(pupil outline)에 동일 계열을 사용해 통일감을 준다.
- **`--color-eye-iris` (#3A3F4C)**: 다크 네이비-그레이 눈동자 색. 화이트 캐치라이트와의 대비가 표정의 핵심 디테일이다.
- **`--color-accent-gold` (#C08A35)**: 머스타드 골드 헤어밴드 색상. 캐릭터 전체에서 가장 채도가 높은 포인트 컬러로, 포인트 액세서리에만 제한적으로 사용한다.
- **`--color-accent-blue` / `--color-accent-blue-light`**: 의상·리본 색상이자 캡슐 유리돔에 반사되는 하늘색 라이트. 두 톤을 그라디언트로 함께 사용한다.
- **`--color-frame-dark` / `-mid` / `-light`**: 캐릭터를 감싸는 메탈 그립 링의 무채색 그라디언트. 톱니 텍스처의 음영 표현에 사용한다.

> 측정 근거: GIF 프레임을 RGB로 변환한 뒤 영역별로 크롭(얼굴 중앙, 정수리, 우안 클로즈업)하여 Counter로 dominant color를 추출했다. 포인트 블루는 HSV 채도 0.4 이상·색相 190~230˚ 구간을 필터링해 추출한 값이다.

## 2. 프레임 & 쉐이프 (Capsule / Vignette)

### CSS 변수 정의
```css
:root {
  --capsule-aspect-ratio: 0.742;  /* 368 / 496 */
  --capsule-radius: 50%;         /* 원형 돔 비네팅 */
  --frame-texture: ridged;       /* 메탈 그립 톱니 텍스처 */
}
```

### 프레임 사용 가이드
- 캐릭터는 항상 원형(돔 형태) 비네팅 프레임 안에 담기고, 프레임 둘레는 톱니/그립 텍스처의 메탈 링으로 마감된다. UI에 재현할 때는 `border-radius: 50%`에 회색조 그라디언트 보더(box-shadow)를 더해 표현한다.
- 캔버스 비율은 368:496(가로:세로 ≈ 0.74:1)로 세로가 더 긴 포트레잇 비율이다. 프로필 썸네일, 캐릭터 카드 등에 동일 비율 사용을 권장한다.
- 프레임 네 귀퉁이는 어두운 비네팅으로 처리되어 시선이 중앙 캐릭터로 모이는 구조다.

## 3. 모션 & 애니메이션

### CSS 변수 정의
```css
:root {
  --motion-frame-count: 67;
  --motion-duration: 2.23s;  /* 67프레임 합산 재생 시간 */
  --motion-fps: 30;          /* 평균 약 33ms/프레임 */
  --motion-loop: infinite;
  --motion-easing: linear;
}
```

### 모션 사용 가이드
- 전체 67프레임이 약 2.23초간 재생되며 무한 루프된다. 프레임 간격은 30ms/40ms가 번갈아 반복되어 평균 약 30fps에 대응한다.
- 모션의 본질은 와이드 풀샷에서 얼굴 클로즈업까지 이어지는 단방향 줌인(zoom-in)이며, 줌아웃 없이 루프 시작점으로 즉시 컷백된다.
- React 등에서 재현할 때는 `transform: scale()`을 재생 구간(0~2.23s) 동안 `linear` 타이밍 함수로 적용하고, 루프 지점에서 `scale` 값을 즉시 초기값으로 리셋하는 방식이 가장 가깝다.

## 반응형 고려사항
- **모바일/저해상도 화면**: 세로형 비율(`--capsule-aspect-ratio`)을 유지한 채 컨테이너 너비에 맞춰 축소한다. 너비 120px 이하에서는 메탈 그립 텍스처 디테일이 뭉개지므로 정적 이미지(첫 프레임)로 대체를 권장한다.
- **모션 최소화 설정**: `prefers-reduced-motion: reduce` 환경에서는 줌인 애니메이션을 끄고 클로즈업 프레임(마지막 프레임 등) 정지 이미지로 대체한다.
