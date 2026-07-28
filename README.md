# ⚛️ 리액트 입문 커리큘럼

> 리액트를 **처음** 배우는 사람을 위한, 읽고 → 보고 → 직접 만들며 배우는 실습형 커리큘럼.

한 개의 Vite 앱 안에서 **0단계부터 차근차근**, 각 단계마다 개념 설명 · 라이브 데모 · 직접 채우는 실습이 함께 있다.
`npm run dev` 한 번이면 사이드바로 전 과정을 넘겨보며 배울 수 있다.

---

## 🚀 설치 & 실행

### 1. 사전 준비 — Node.js 설치

이 프로젝트는 **Node.js 18 이상**이 필요하다. (권장: LTS 최신 버전)

- 설치: [nodejs.org](https://nodejs.org) 에서 LTS 버전을 받아 설치한다.
- 설치 확인 — 터미널에서:
  ```bash
  node -v   # v18.x 이상이면 OK
  npm -v
  ```
  `node`를 못 찾는다는 에러가 나면 터미널(또는 컴퓨터)을 재시작한다.

### 2. 의존성 설치

프로젝트 폴더에서 (이 README가 있는 위치) 한 번만 실행한다.

```bash
npm install
```

`node_modules/` 폴더가 생기고 필요한 패키지(React, Vite 등)가 설치된다.

### 3. 개발 서버 실행

```bash
npm run dev
```

터미널에 뜨는 주소(예: `http://localhost:5173`)를 브라우저에서 연다.
왼쪽 사이드바에서 강의를 고르고, 코드를 저장하면 화면이 **자동으로 새로고침**된다.
서버 종료는 터미널에서 `Ctrl + C`.

### 4. 그 밖의 명령

```bash
npm run build     # 배포용 정적 파일 생성 (dist/)
npm run preview   # 빌드 결과를 로컬에서 미리보기
```

### ❓ 자주 겪는 문제

- **포트가 이미 쓰인다** → Vite가 자동으로 다음 포트(5174 …)로 열어 준다. 터미널에 뜬 주소를 쓰면 된다.
- **`npm install`이 실패한다** → Node 버전이 18 이상인지 확인하고, `node_modules/`와 `package-lock.json`을 지운 뒤 다시 설치한다.
- **화면이 안 바뀐다** → 파일을 저장했는지, 터미널에 에러가 없는지 확인한다.

---

## ✨ 이 커리큘럼의 특징

- **대비로 배운다** — 순수 HTML(jQuery/DOM) 방식과 리액트 방식을 **나란히** 놓고 차이를 눈으로 본다.
  왜 리액트를 쓰는지가 먼저 이해된다.
- **한 문장으로 관통** — `UI = f(State)`. 화면은 상태의 결과물이라는 원칙이 모든 단계를 꿴다.
- **직접 만든다** — 단계마다 🎯 실습(빈 `practice.jsx`를 채우고 `👀 정답 보기`로 비교)이 있다.
- **종합한다** — 몇 단계마다 ✅ 체크포인트로 배운 것을 합쳐 작은 결과물을 만든다.
- **평서체 · 자세한 주석** — 모든 코드에 왜 그렇게 쓰는지 한국어 주석이 달려 있다.

---

## 📚 커리큘럼

| 단계 | 배우는 것 | 실습 결과물 | 폴더 |
|------|-----------|-------------|------|
| **0단계** | 반응형 vs 명령형 (순수 HTML과 비교) | 두 방식 카운터 | [`step0-why-react`](src/lessons/step0-why-react/README.md) |
| **1단계** | 컴포넌트 · 조립 · **재사용** | 인사·시계·날씨·대시보드 | [`step1-components`](src/lessons/step1-components/README.md) |
| 🔍 **개념** | 함수 vs 리액트 컴포넌트 | 비교표 + 데모 | [`function-vs-component`](src/concepts/function-vs-component/README.md) |
| 📝 **개념** | JSX의 정체 (무엇으로 변환되나) | 변환 다이어그램 + 라이브 | [`jsx-under-the-hood`](src/concepts/jsx-under-the-hood/README.md) |
| 🧩 **개념** | 캡슐화 (겉은 컴포넌트, 속은 감춤) | 메뉴 | [`encapsulation`](src/concepts/encapsulation/README.md) |
| **2단계** | props (2-1 기초 · 2-2 함수·상태·객체) | 프로필 카드 | [`step2-props`](src/lessons/step2-props/README.md) |
| ✅ **체크포인트 A** | 컴포넌트 + props 종합 | 팀 소개 페이지 | [`checkpointA`](src/checkpoints/checkpointA-team-page/README.md) |
| **3단계** | useState · 이벤트 (3-1 기초 · 3-2 설계·함정) | 카운터 & 좋아요 | [`step3-state-events`](src/lessons/step3-state-events/README.md) |
| 🔀 **개념** | props vs state 차이 | 비교표 + 데모 | [`props-vs-state`](src/concepts/props-vs-state/README.md) |
| 🔁 **개념** | 리렌더링 조건 (언제 다시 그려지나) | 라이브 데모 | [`rerender`](src/concepts/rerender/README.md) |
| **4단계** | `value` 직접 접근 vs controlled 입력 | 입력 비교 | [`step4-inputs`](src/lessons/step4-inputs/README.md) |
| **5단계** | map · key · 조건부 렌더링 · 상태 끌어올리기 | 투두 리스트 | [`step5-lists`](src/lessons/step5-lists/README.md) |
| ✅ **체크포인트 B** | 상태 · 입력 · 리스트 종합 | 장보기 리스트 | [`checkpointB`](src/checkpoints/checkpointB-shopping/README.md) |
| **6단계** | 폼 입력 응용 (6-1~6-2) | 방명록 | [`step6-forms`](src/lessons/step6-forms/README.md) |
| **7단계** | Context — prop drilling 해결 · 전역 상태 (7-1~7-2) | 사용자·테마 공유 | [`step7-context`](src/lessons/step7-context/README.md) |
| **8단계** | useEffect — 부수 효과 (8-1~8-4) | 데이터 불러오기 | [`step8-effects`](src/lessons/step8-effects/README.md) |
| **9단계** | 에러 읽는 법 (자주 만나는 에러 5종) | 고장난 코드 고치기 | [`step9-errors`](src/lessons/step9-errors/README.md) |
| 10단계~ | localStorage · 졸업 프로젝트 … | (예정) | |

---

## 🔁 학습 루프

```
   개념(README) ──▶ 라이브 데모(보기) ──▶ 🎯 실습(직접 채우고 정답 비교) ──▶ 다음 단계
                                                                    │
                                              몇 단계마다  ▼
                                          ✅ 체크포인트 (배운 것 종합)
```

1. 단계 폴더의 **`README.md`** 로 개념을 이해한다.
2. 앱에서 그 강의를 눌러 **동작**을 확인한다. (코드는 각 폴더의 `.jsx`에 주석과 함께)
3. **`practice.jsx`** 를 열어 TODO를 채운다 → 저장하면 '내 코드' 칸에 바로 반영된다.
4. 막히면 앱에서 **`👀 정답 보기`** 로 `solution.jsx`와 비교한다.
5. 체크포인트에서 여러 단계를 합쳐 스스로 만들어 본다.

---

## 🗂️ 폴더 구조

```
리액트공부/
├─ index.html                    # 앱이 붙는 HTML
├─ package.json · vite.config.js
├─ public/
│  └─ vanilla/                   # 순수 HTML 비교 데모 (단계별 패키지)
│     ├─ step0-why-react/counter.html      # 0단계 짝: 순수 HTML 카운터
│     └─ step1-components/dashboard.html    # 1단계 짝: 복붙 방식 대시보드
└─ src/
   ├─ main.jsx                   # 앱 시작점
   ├─ App.jsx                    # 사이드바 + 강의 전환
   ├─ index.css                  # 전체 스타일
   ├─ components/
   │  └─ Practice.jsx            # 공용 실습 블록 (정답 보기 토글)
   ├─ lessons/                   # ⭐ 단계별 폴더
   │  ├─ step0-why-react/        # OldWayCounter(iframe) · ReactWayCounter · practice/solution
   │  ├─ step1-components/       # Greeting·Clock·Announcement·WeatherWidget·Dashboard · practice/solution
   │  ├─ step2-props/            # 2-1 기초(HelloName·ProfileCard) · 2-2 더 넘겨보기(함수·상태·객체)
   │  ├─ step3-state-events/     # 3-1 기초(Counter·LikeButton) · 3-2 설계·함정(MultiState·ObjectState·TrapCounter)
   │  ├─ step4-inputs/           # UncontrolledInput · ControlledInput · practice/solution
   │  └─ step5-lists/            # TodoInput · TodoList · TodoItem · practice/solution
   └─ checkpoints/               # 단계 사이 누적 실습
      ├─ checkpointA-team-page/  # 컴포넌트 + props
      └─ checkpointB-shopping/   # 상태 + 입력 + 리스트
```

각 단계 폴더 = **`README.md`(개념) + `index.jsx`(화면) + 하위 컴포넌트 + `practice.jsx`/`solution.jsx`**.

> 리액트 강의(`src/lessons/<step>/`)와 그 순수 HTML 짝(`public/vanilla/<step>/`)이
> **같은 step 이름으로 1:1 대응**한다.

---

## 🧩 기술 스택

- **React 18** + **Vite 5** (JavaScript, JSX)
- 별도 라우터/상태 라이브러리 없이, 사이드바 상태 하나로 강의를 전환한다.
- 순수 HTML 비교 데모는 `public/`의 정적 파일을 `<iframe>`으로 띄운다.

---

## 🗺️ 앞으로 (로드맵)

- 6단계 · 폼 & 유효성 검사
- 7단계 · `useEffect` · 데이터 불러오기(fetch)
- 8단계 · 라우팅(react-router)
- 종합 프로젝트

막히거나 이어서 만들고 싶은 부분이 있으면 언제든 물어보자.
