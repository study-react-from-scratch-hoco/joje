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
- [x] JSX 설정
- [x] React.createElement 구현
- [x] 가상 DOM 구현
- [ ] 렌더러 구현

#### React 핵심 개념: ReactElement vs ReactComponent

##### ReactElement
- HTML 태그를 직접 사용하는 기본적인 JSX 구조
- 예시:
  ```jsx
  const App = (
    <div>
      <h2>Hello React!</h2>
      <p>I am a paragraph</p>
    </div>
  );
  ```
- 특징:
  - 단순한 HTML 구조 표현
  - 정적인 콘텐츠
  - 재사용이 어려움

##### ReactComponent
- props를 입력받아 ReactElement를 반환하는 함수
- 예시:
  ```jsx
  const Title = (props) => (
    <h2>안녕하세요 {props.name}!</h2>
  );

  const App = (
    <div>
      <Title name="React" />
      <p>나는 단락이에요</p>
    </div>
  );
  ```
- 특징:
  - 재사용 가능한 UI 조각
  - props를 통한 동적 데이터 처리
  - 로직과 UI의 캡슐화
  - 컴포넌트 기반 개발의 기초

##### ReactElement와 ReactComponent 비교
| 특성 | ReactElement | ReactComponent |
|------|--------------|----------------|
| 형태 | 일반 객체 | 함수 |
| 생성 방식 | JSX → createElement 호출 | 함수 정의 |
| 입력 | 없음 | props |
| 재사용성 | 낮음 | 높음 |
| 동적 데이터 | 직접 값 사용 | props를 통해 전달 |
| 로직 포함 | 불가능 | 가능 |
| 예시 코드 | `<div>Hello</div>` | `<Title name="React" />` |

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