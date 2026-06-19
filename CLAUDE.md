# AIVIBELEE 워크스페이스 가이드

이 디렉토리(`C:\Users\User\Desktop\AIVIBELEE`)는 GitHub 저장소
**https://github.com/LEESUNNAM/AIVIBE** 와 연결되어 있습니다.
하위에 `lecture1` 등 여러 학습/프로젝트 폴더가 들어올 수 있는 상위 워크스페이스입니다.
(각 하위 프로젝트에 자체 `CLAUDE.md`가 있으면 그 규칙이 우선합니다.)

## 자동 백업 규칙 (가장 중요)

**매 작업(요청한 기능 추가, 수정, 버그 픽스 등)이 끝날 때마다, 별도로 "백업해줘" 라는
요청이 없어도 자동으로 변경사항을 저장소에 업로드한다.**

작업을 마칠 때마다 아래 순서를 수행한다:

```bash
git add -A
git commit -m "{무엇을 왜 바꿨는지 한 줄 요약}"
git push
```

- 원격이 아직 연결되지 않은 새 폴더라면 먼저 연결한다:
  ```bash
  git init
  git remote add origin https://github.com/LEESUNNAM/AIVIBE.git
  git branch -M main
  git push -u origin main
  ```
- 인증은 `gh auth login` (OAuth 브라우저 로그인) 으로 이미 되어 있다고 가정한다.
  Personal Access Token 을 코드/문서에 직접 적지 않는다.
- 커밋 메시지는 "무엇을, 왜" 바꿨는지 한국어로 간단히 적는다 (예: `lecture1 Header 컴포넌트 반응형 레이아웃 수정`).
- `git add -A` 전에 `.gitignore` 가 `node_modules/`, `.env`, `dist/` 등을 제외하는지 확인한다.
  민감한 키/토큰 파일은 절대 커밋하지 않는다.

## gh CLI / `/gh-cli` 스킬 사용 범위

- 이슈/PR 생성·조회, 릴리즈 작성, GitHub Actions 워크플로우 실행/확인, 저장소 설정 변경 등
  **GitHub API 가 필요한 작업**은 `/gh-cli` (또는 `gh-cli-runner`) 스킬을 사용해 `gh` CLI 로 수행한다.
- 단순 변경사항 업로드(커밋+푸시)는 위의 일반 `git` 명령으로 충분하며, 매 작업 종료 시 자동으로 수행한다.
- 아래처럼 되돌리기 어렵거나 외부에 영향을 주는 작업은 **반드시 먼저 사용자에게 확인**한다
  (이 자동 백업 규칙으로 사전 승인되지 않음):
  - `git push --force`, `git reset --hard`, 브랜치 삭제
  - `gh repo delete`, `gh pr merge`, `gh release delete` 등 파괴적이거나 공유 상태를 바꾸는 `gh` 명령

## 금지 사항

- netlify, vercel 등 외부 정적 호스팅 서비스 사용 금지 (GitHub Pages + Actions 워크플로우만 사용)
- Personal Access Token 직접 발급/하드코딩 금지 (`gh auth login` OAuth 방식만)
- `.env`, API 키, 토큰 등 민감 정보를 커밋하거나 문서에 직접 노출 금지
