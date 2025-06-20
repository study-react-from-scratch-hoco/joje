# React from Scratch 구현하기

## 주차별 학습 내용

### 1주차: VirtualDOM & Renderer
- 참고 자료: [Let's build a React from scratch: Part 1 — VirtualDOM and Renderer](https://geekpaul.medium.com/lets-build-a-react-from-scratch-part-1-virtualdom-and-renderer-14f4f716de62)

#### 개발 환경 설정
1. 프로젝트 초기화
```bash
npm init -y                  # package.json 생성
npm install -D typescript    # TypeScript 설치
npx tsc --init              # tsconfig.json 생성 (자료에서는 npx typescript --init 이라고 되어있지만 실제로는 npx tsc --init를 해야함)
```

2. TypeScript 설정 (`tsconfig.json`)
- JSX 지원을 위한 설정: `"jsx": "react"` 
- 타입 체크 완화: `"strict": false`
- 추가 설정:
  ```json
  {
    "outDir": "./dist",     # 컴파일된 파일이 저장될 위치지정
    "rootDir": "./src"      # TypeScript 소스 파일 위치지정정
  }
  ```

3. 개발 서버 설정
```bash
npm install -D serve         # 로컬 웹 서버 설치
```

#### 실행 방법
두 개의 터미널이 필요합니다:

1. TypeScript 컴파일러 실행 (첫 번째 터미널)
```bash
npm run dev
```

2. 웹 서버 실행 (두 번째 터미널)
```bash
npm run serve
```

#### 구현 단계
- [x] 개발 환경 설정
- [ ] JSX 설정
- [ ] React.createElement 구현
- [ ] 가상 DOM 구현
- [ ] 렌더러 구현

## Scripts (package.json)
```json
{
  "scripts": {
    "dev": "tsc -w",        # TypeScript 컴파일러 watch 모드
    "serve": "npx serve ."  # 로컬 웹 서버 실행
  }
}
```

#### 1주차 소감
<!-- 구현 완료 후 작성 예정 -->

<!-- 
### 2주차: State Management & Hooks
- 참고 자료: (추후 추가 예정)

### 3주차: React Suspense & Concurrent Mode
- 참고 자료: (추후 추가 예정)

### 4주차: Server Side Rendering
- 참고 자료: (추후 추가 예정)
--> 