import { useState, useRef, useEffect } from 'react'

// 📖 용어 사전 — JS·React에서 은근히 걸리는 말들을 한 곳에.
//   상세 정의 + (필요하면) 간략 예시 코드 + 처음 배우는 레슨으로 점프.
//   위: 검색 + 카테고리 바로가기만(용어 나열은 아래 상세 한 곳으로 통일 — 중복 제거).
// term = { t, cat('react'|'js'|'core'), to(레슨 id), def, ex?(예시 코드) }

const TERMS = [
  // ── ⚛️ React ──────────────────────────────
  { t: '컴포넌트', cat: 'react', to: 1, def: '화면 한 조각을 그리는 함수. 대문자로 시작하고 JSX를 return한다. 한 번 정의하면 <이름 />으로 여러 번 재사용한다.', ex: `function Hello() {\n  return <h1>안녕</h1>\n}\n<Hello />` },
  { t: 'JSX', cat: 'react', to: 1.45, def: 'HTML처럼 생긴 자바스크립트 문법. 빌드 도구가 함수 호출로 바꾸고, 그 결과는 객체다. class 대신 className, 값은 {중괄호}로 꽂는다.', ex: `const el = <b className="on">{name}</b>` },
  { t: 'props', cat: 'react', to: 2.1, def: '부모가 자식에게 내려주는 값(문자열·숫자·함수·JSX 등). 자식은 읽기만 하고 바꾸지 못한다. 함수의 인자와 같은 역할이다.', ex: `<Card title="공지" />\nfunction Card({ title }) {\n  return <h3>{title}</h3>\n}` },
  { t: 'children (합성)', cat: 'react', to: 2.3, def: '여는·닫는 태그 사이에 넣은 내용. props.children으로 받아 "무엇이 들어올지 모르는 껍데기"를 만든다.', ex: `<Box><p>내용</p></Box>\nfunction Box({ children }) {\n  return <div className="box">{children}</div>\n}` },
  { t: '캡슐화', cat: 'react', to: 1.5, def: '내부 구현(구조·상태·로직)을 감추고 <이름 />이라는 일관된 사용법만 드러내는 것. 쓰는 쪽은 속을 몰라도 된다. 정의 한 곳을 고치면 쓰는 곳 전부가 바뀐다.' },
  { t: 'state', cat: 'react', to: 3.1, def: '컴포넌트가 소유하고 스스로 바꾸는 데이터. 바뀌면 그 컴포넌트가 다시 그려진다. 밖에서는 직접 못 바꾼다.' },
  { t: 'useState', cat: 'react', to: 3.1, def: '[값, set 함수]를 돌려주는 훅. 값은 반드시 set 함수로만 바꾼다(직접 대입하면 화면이 안 바뀐다).', ex: `const [n, setN] = useState(0)\nsetN(n + 1)  // O\nn = n + 1    // X (화면 안 바뀜)` },
  { t: '스냅샷 (snapshot)', cat: 'react', to: 3.2, def: '한 번의 렌더 동안 state 값은 고정(스냅샷)이다. 그래서 같은 렌더에서 여러 번 더해도 결과가 누적되지 않는다. 누적하려면 함수형 업데이트를 쓴다.', ex: `setCount(count + 1) // 세 번 해도 +1\nsetCount(c => c + 1) // 세 번이면 +3` },
  { t: '상태 끌어올리기 (lifting state up)', cat: 'react', to: 3.5, def: '여러 형제가 공유할 state를 공통 부모로 올리는 것. 부모가 소유하고 props로 내리고, 자식은 콜백으로 "바꿔 달라"고 요청한다.' },
  { t: '콜백 prop', cat: 'react', to: 3.5, def: '자식에게 내려준 함수. 자식이 "일이 생겼다"며 값과 함께 부르면 부모가 처리한다. <button onClick>과 똑같은 구조다.', ex: `<Child onPick={c => setColor(c)} />\n// 자식 안: <button onClick={() => onPick('red')}>` },
  { t: '리렌더링', cat: 'react', to: 3.6, def: 'state·props가 바뀌면 그 컴포넌트(와 자식)를 다시 실행해 화면을 새로 그리는 것. 화면 = f(state)라고 보면 된다.' },
  { t: '이벤트 전파 (버블링)', cat: 'react', to: 3.3, def: '자식에서 일어난 클릭이 부모의 onClick까지 타고 올라가는 것. e.stopPropagation()으로 그 지점에서 끊는다.', ex: `<div onClick={부모}>\n  <button onClick={e => e.stopPropagation()}>안쪽</button>\n</div>` },
  { t: 'key', cat: 'react', to: 5, def: 'map으로 만든 목록의 각 요소에 주는 고유값(보통 데이터 id). 리액트가 어느 항목이 바뀌었는지 구분한다. 순서가 바뀔 수 있으면 index 말고 id를 쓴다.', ex: `todos.map(t => <li key={t.id}>{t.text}</li>)` },
  { t: '조건부 렌더링', cat: 'react', to: 4.5, def: '삼항(A?B:C)·&&로 "무엇을 그릴지" 고르는 것. 특별 문법이 아니라 그냥 자바스크립트다. {숫자 && ...}는 0을 화면에 찍는 함정이 있다.', ex: `{isLogin ? <환영/> : <로그인/>}\n{count > 0 && <배지/>}  // 0 함정 피하기` },
  { t: 'controlled input', cat: 'react', to: 4, def: '입력값을 state로 쥐고 value와 onChange로 다루는 입력창. 화면이 언제나 state를 따라간다(단방향).', ex: `<input value={text}\n  onChange={e => setText(e.target.value)} />` },
  { t: 'useEffect', cat: 'react', to: 8.1, def: '렌더가 끝난 뒤 할 일(부수 효과)을 적는 훅. 지금의 props·state에 맞춰 "화면 밖"(fetch·타이머·문서 제목 등)을 동기화한다.', ex: `useEffect(() => {\n  document.title = '클릭 ' + count\n}, [count])` },
  { t: '의존성 배열', cat: 'react', to: 8.1, def: 'useEffect의 둘째 인자. 그 안의 값이 (이전 렌더와) 달라졌을 때만 effect를 다시 실행한다. []=처음 한 번, 생략=매 렌더, [x]=x가 바뀔 때.' },
  { t: '정리 (cleanup)', cat: 'react', to: 8.2, def: 'effect가 return한 함수. 다음 실행 전과 언마운트 때 돌아, 걸어 둔 타이머·구독을 뒷정리한다.', ex: `useEffect(() => {\n  const id = setInterval(f, 1000)\n  return () => clearInterval(id)\n}, [])` },
  { t: '부수 효과 (side effect)', cat: 'react', to: 8.1, def: '렌더 순수성 밖의 일 — fetch·타이머·DOM 직접 조작·구독 등. 렌더 도중이 아니라 useEffect 안에서 해야 한다.' },
  { t: 'Context', cat: 'react', to: 7.1, def: 'prop을 줄줄이 넘기지 않고, Provider로 감싼 곳 어디서든 값을 꺼내 쓰게 하는 통로. 테마·로그인 정보처럼 넓게 쓰는 값에 좋다.', ex: `<Ctx.Provider value={theme}> … </Ctx.Provider>\nconst theme = useContext(Ctx)` },
  { t: 'prop drilling', cat: 'react', to: 7.1, def: '값을 쓰지도 않는 중간 컴포넌트를 거쳐 props를 여러 단계 내려보내는 번거로움. 깊어지면 Context로 푼다.' },
  { t: 'useReducer', cat: 'react', to: 10, def: '흩어진 상태 로직을 reducer 한 곳에 모으는 훅. dispatch(action)로 "무엇을 할지"만 보낸다. 서로 얽힌 복잡한 state에 유리하다.', ex: `const [s, dispatch] = useReducer(reducer, init)\ndispatch({ type: 'ADD', text })` },
  { t: 'reducer / action / dispatch', cat: 'react', to: 10, def: 'reducer(현재 state, action) → 새 state인 순수 함수. dispatch로 action(할 일)을 보내면 reducer가 다음 state를 만든다.', ex: `function reducer(s, action) {\n  if (action.type === 'ADD') return { ...s, n: s.n + 1 }\n  return s\n}` },
  { t: 'memo / useMemo / useCallback', cat: 'react', to: 11, def: '불필요한 재계산·재렌더를 건너뛰는 최적화. memo=컴포넌트, useMemo=값, useCallback=함수를 기억(메모)해 재사용한다.', ex: `const total = useMemo(() => heavy(list), [list])` },
  { t: 'useRef', cat: 'react', to: 12, def: '리렌더를 일으키지 않는 상자(.current). DOM 참조(예: focus)나 렌더 사이에 값을 기억하는 데 쓴다.', ex: `const ref = useRef(null)\n<input ref={ref} />\nref.current.focus()` },
  { t: '커스텀 훅', cat: 'react', to: 12, def: 'use로 시작하는 내 함수. 상태 로직(useState+useEffect 등)을 담아 여러 컴포넌트가 재사용하게 한다.', ex: `function useToggle(init) {\n  const [on, set] = useState(init)\n  return [on, () => set(o => !o)]\n}` },
  { t: '훅 규칙', cat: 'react', to: 3.81, def: '훅은 컴포넌트(또는 커스텀 훅) 최상위에서만 호출한다. if·반복문·이벤트 핸들러 안에서 부르면 호출 순서가 흔들려 깨진다.' },
  { t: '불변성 (immutability)', cat: 'react', to: 3.2, def: '원본을 바꾸지 말고 새 값을 만들어 넣기. 객체는 {...obj, k:v}, 배열은 [...arr, x]. 이래야 리액트가 "바뀜"을 알아챈다.', ex: `setUser({ ...user, name: '새이름' })  // O\nuser.name = '새이름'  // X` },
  { t: '순수 함수', cat: 'react', to: 3.6, def: '같은 입력이면 같은 출력을 내고, 바깥 값을 건드리지 않는 함수. 렌더 함수와 reducer가 이래야 예측 가능하다.' },
  { t: '마운트 / 언마운트', cat: 'react', to: 3.84, def: '컴포넌트가 화면에 처음 붙는 것(마운트)과 떨어지는 것(언마운트). effect는 마운트 후, cleanup은 언마운트 전에 돈다.' },
  { t: '생명주기 (lifecycle)', cat: 'react', to: 3.84, def: '마운트 → 업데이트(리렌더) → 언마운트로 이어지는 컴포넌트의 일생. 훅에선 useEffect로 이 시점들을 다룬다.' },
  { t: '단방향 데이터 흐름', cat: 'react', to: 4, def: '데이터는 부모 → 자식(props)으로만 흐른다. 자식이 바꾸려면 콜백으로 부모에게 요청한다. 흐름이 한 방향이라 추적이 쉽다.' },
  { t: '파생 상태 (derived state)', cat: 'react', to: 6.3, def: '다른 state로 계산되는 값(에러·합계·필터 결과). state로 저장하지 말고 렌더할 때 계산해야 원본과 어긋나지 않는다.', ex: `const errors = validate(form) // 저장 X, 매 렌더 계산` },
  { t: '이벤트 객체 (e)', cat: 'react', to: 3.1, def: 'onChange·onClick이 자동으로 받는 정보 꾸러미. e.target.value(입력값), e.preventDefault()(기본 동작 취소) 등을 꺼내 쓴다.' },
  { t: 'preventDefault', cat: 'react', to: 6.2, def: '폼 제출·링크 클릭의 브라우저 기본 동작(새로고침·이동)을 막는다. onSubmit에서 거의 항상 쓴다.', ex: `onSubmit={e => { e.preventDefault(); save() }}` },
  { t: '인스턴스 (독립)', cat: 'react', to: 1.5, def: '정의는 하나(설계도)지만, <Card/>를 쓸 때마다 자기 state를 따로 갖는 독립 개체. 한 카드를 눌러도 다른 카드는 그대로다.' },
  { t: 'React element', cat: 'react', to: 1.45, def: 'JSX가 변환된 객체 { type, props }. 컴포넌트(함수)와 다르다 — 함수는 "설계도", element는 그 함수가 만든 "결과"다.' },
  { t: 'localStorage', cat: 'react', to: 8.5, def: '브라우저에 문자열로 저장하는 공간. 새로고침해도 남는다. 객체는 JSON.stringify로 담고 JSON.parse로 꺼낸다.', ex: `localStorage.setItem('todos', JSON.stringify(list))` },

  // ── 🟨 JS ─────────────────────────────────
  { t: '표현식 vs 문 (expression / statement)', cat: 'js', to: 'js-expr', def: '표현식 = 값이 되는 것(1+2, name). 문 = 실행되는 명령(if·for). JSX 중괄호 { } 안엔 표현식만 들어간다.', ex: `{isLogin ? 'A' : 'B'}  // 표현식 O\n{ if (x) {} }          // 문 X` },
  { t: '항 · 인자 (term / factor)', cat: 'js', to: 'js-expr', def: '식을 쪼갠 조각. +로 나눈 조각이 항(term), 더 안쪽 *로 나눈 조각이 인자(factor). 어디를 기준으로 보느냐에 따른 상대적 개념이다.' },
  { t: '화살표 함수', cat: 'js', to: 'js-arrow', def: 'const f = (x) => x*2 처럼 짧게 쓰는 함수. 몸통이 한 줄이면 { }·return을 생략해 값을 바로 반환한다.', ex: `const double = n => n * 2\nconst add = (a, b) => a + b` },
  { t: '삼항 연산자', cat: 'js', to: 'js-arrow', def: '조건 ? A : B — 조건이 참이면 A, 거짓이면 B라는 "값"을 만든다. if와 달리 표현식이라 JSX 안에서 쓸 수 있다.', ex: `const grade = score >= 90 ? 'A' : 'B'` },
  { t: '템플릿 리터럴', cat: 'js', to: 'js-arrow', def: '백틱(`)으로 감싼 문자열. 안에서 ${}로 값을 꽂고, 줄바꿈도 그대로 쓸 수 있다.', ex: '`안녕, ${name}님 (${age}세)`' },
  { t: '함수는 값이다 (일급 함수)', cat: 'js', to: 'js-func', def: '함수도 값이라 변수에 담고, 인자로 넘기고, 실행한다. 괄호 ()가 "실행" 스위치다. onClick={fn}(넘김) vs onClick={fn()}(즉시 실행)을 구분해야 한다.', ex: `const f = greet   // 넘김(괄호 없음)\nf()               // 실행(괄호)` },
  { t: '콜백 (callback)', cat: 'js', to: 'js-func', def: '남에게 넘겨 두고 그쪽이 나중에 대신 불러 주는 함수. onClick={fn}, arr.map(fn)이 대표. "넘기기"라 괄호 없이 준다.', ex: `[1,2,3].map(n => n * 2) // 콜백을 map이 대신 부른다` },
  { t: 'truthy / falsy', cat: 'js', to: 'js-truthy', def: '불리언이 아닌 값도 조건에선 참/거짓으로 취급된다. falsy는 딱 6개(false·0·\'\'·null·undefined·NaN), 나머지는 전부 truthy.', ex: `if ('hi') {}  // truthy\nif (0) {}     // falsy` },
  { t: '단락 평가 (short-circuit)', cat: 'js', to: 'js-truthy', def: 'A && B는 A가 거짓이면 A를 그대로 반환(B는 평가조차 안 함). A || B는 A가 참이면 A. 가드·기본값에 쓴다.', ex: `name || '손님'     // 기본값\nuser && user.name  // 가드` },
  { t: 'map · filter', cat: 'js', to: 'js-array', def: 'map = 각 원소를 변환해 같은 길이의 새 배열, filter = 조건을 통과한 것만 모은 새 배열. 둘 다 원본은 안 바꾼다.', ex: `[1,2,3].map(n => n * 2)    // [2,4,6]\n[1,2,3].filter(n => n > 1) // [2,3]` },
  { t: '구조 분해 (destructuring)', cat: 'js', to: 'js-destructure', def: 'const {name, age} = user / const [a, b] = arr 로 값을 한 번에 꺼내 변수에 담는 문법. props 받을 때 많이 쓴다.', ex: `const { name } = user\nfunction Card({ title }) {}` },
  { t: '스프레드 (...)', cat: 'js', to: 'js-destructure', def: '{...obj}·[...arr]로 펼쳐 복사한다. {...obj, k: 새값}으로 한 필드만 덮어쓴다. 불변 갱신의 핵심 도구.', ex: `const next = { ...user, name: '새' }\nconst arr2 = [...arr, 4]` },
  { t: '얕은 복사', cat: 'js', to: 'js-destructure', def: '스프레드는 한 겹만 새로 복사한다. 중첩된 안쪽 객체·배열은 여전히 같은 참조를 공유하므로, 깊은 곳을 바꾸려면 그 겹도 새로 만든다.' },
  { t: 'Promise', cat: 'js', to: 'js-async', def: '"나중에 값이 올 상자". 성공하면 .then(값 => ...), 실패하면 .catch로 받는다. 만들자마자는 pending(대기) 상태다.' },
  { t: 'async / await', cat: 'js', to: 'js-async', def: '.then 사슬 대신 const x = await f()로 "기다렸다가" 다음 줄로 간다. 비동기 코드를 동기처럼 읽게 해 준다(async 함수 안에서만).', ex: `async function load() {\n  const user = await fetchUser()\n  setUser(user)\n}` },
  { t: '비동기 (asynchronous)', cat: 'js', to: 'js-async', def: '결과가 지금이 아니라 나중에 오는 것(네트워크·타이머). 그동안 코드와 화면은 멈추지 않고 계속 진행한다.' },
  { t: '변수 (let / const)', cat: 'js', to: 'js-expr', def: 'const = 재할당 못 함(기본으로 쓴다), let = 재할당 가능. var는 옛 방식이라 요즘은 안 쓴다.', ex: `const PI = 3.14\nlet count = 0\ncount = 1` },
  { t: '스코프 (scope)', cat: 'js', to: 'js-func', def: '변수가 살아 있는 범위. 함수나 블록 { } 안에서 만든 변수는 그 안에서만 보이고, 밖에서는 쓸 수 없다.' },
  { t: '클로저 (closure)', cat: 'js', to: 'js-func', def: '함수가 만들어질 때의 바깥 변수를 기억하는 것. 콜백·이벤트 핸들러가 그때의 값을 계속 참조할 수 있는 이유다.' },
  { t: '참조 vs 값', cat: 'js', to: 'js-destructure', def: '숫자·문자열은 값으로 복사되고, 객체·배열은 참조(주소)로 공유된다. 그래서 객체를 바꾸려면 새로 만들어야(불변성) 한다.', ex: `const b = a       // 객체면 같은 것을 가리킴\nconst b = { ...a } // 새로 복사` },
  { t: '=== vs ==', cat: 'js', to: 'js-truthy', def: '===는 타입까지 같아야 참(권장). ==는 타입을 자동 변환해 비교해서 함정이 많다(예: 0 == \'\'가 참).' },
  { t: '옵셔널 체이닝 (?.)', cat: 'js', to: 'js-truthy', def: 'user?.name — 앞이 null·undefined면 에러 없이 undefined를 준다. 있을지 모르는 값에 안전하게 접근할 때 쓴다.', ex: `user?.profile?.city` },
  { t: '널 병합 (??)', cat: 'js', to: 'js-truthy', def: 'a ?? b — a가 null·undefined일 때만 b를 쓴다. ||와 달리 0·\'\'·false는 그대로 살린다.', ex: `count ?? 0   // count가 0이어도 0 유지` },
  { t: 'rest 매개변수 (...)', cat: 'js', to: 'js-destructure', def: '함수 인자나 구조 분해에서 "남은 것"을 배열/객체로 모은다. 펼치는 스프레드의 반대 방향이다.', ex: `const [first, ...rest] = [1, 2, 3] // rest = [2, 3]` },
  { t: 'JSON', cat: 'js', to: 8.5, def: '객체를 문자열로 주고받는 형식. JSON.stringify(객체→문자열, 저장)와 JSON.parse(문자열→객체, 복원)로 오간다.', ex: `JSON.stringify({ a: 1 }) // '{"a":1}'` },

  // ── 🛠️ 도구·기초 ──────────────────────────
  { t: 'DOM', cat: 'core', to: 0, def: '브라우저가 화면(HTML)을 트리로 표현한 것. 원래는 JS로 직접 고쳤지만, 리액트가 대신 갱신해 준다.' },
  { t: '가상 DOM (virtual DOM)', cat: 'core', to: 0, def: '리액트가 메모리에 그린 가벼운 사본. 새로 그린 것과 이전 것을 비교해 "바뀐 곳만" 진짜 DOM에 반영한다(그래서 빠르다).' },
  { t: '재조정 (reconciliation)', cat: 'core', to: 0, def: '옛 가상 DOM과 새 것을 비교(diff)해 최소한만 바꾸는 과정. 목록에서 key가 이때 "같은 항목"을 알려 준다.' },
  { t: 'import / export (모듈)', cat: 'core', to: 1, def: '파일(모듈) 사이에 값을 주고받는 법. export로 내보내고 import로 가져온다. default(기본)와 이름 붙은 것 두 방식.', ex: `export default App\nimport App from './App.jsx'` },
  { t: '빌드 도구 (Vite)', cat: 'core', to: 1.45, def: 'JSX·최신 문법을 브라우저가 알아듣는 코드로 바꾸고, 저장하면 화면을 바로 갱신하는 개발 서버를 띄운다.' },
  { t: 'Babel / esbuild', cat: 'core', to: 1.45, def: 'JSX를 React.createElement 같은 함수 호출로 변환(컴파일)하는 도구. 빌드 타임(브라우저에 보내기 전)에 돈다.' },
  { t: 'npm / 패키지', cat: 'core', to: 0, def: '남이 만든 코드(라이브러리=패키지)를 받아 쓰는 도구·저장소. react·vite도 패키지다. package.json에 쓰는 목록이 적혀 있다.' },
]

const CATS = { react: '⚛️ React', js: '🟨 JS', core: '🛠️ 도구·기초' }

// 용어명을 안전한 DOM id로. (getElementById는 아무 문자열이나 되지만 공백·기호는 정리)
const termId = (t) => 'term-' + t.replace(/[^0-9A-Za-z가-힣]+/g, '-')

export default function Glossary({ onGo }) {
  const [q, setQ] = useState('')
  // 목록에서 눌러 이동한 용어를 잠깐 강조한다.
  const [hl, setHl] = useState(null)
  const hlTimer = useRef(null)
  // 언마운트 때 남은 타이머 정리 (9단계 cleanup과 같은 이유)
  useEffect(() => () => clearTimeout(hlTimer.current), [])

  const jumpCat = (cat) => {
    const el = document.getElementById(`sec-${cat}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  // 용어 목록에서 클릭 → 그 상세 카드로 스크롤 + 잠깐 강조
  const jumpTerm = (t) => {
    const el = document.getElementById(termId(t))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setHl(t)
    clearTimeout(hlTimer.current)
    hlTimer.current = setTimeout(() => setHl(null), 1400)
  }

  const kw = q.trim().toLowerCase()
  const match = (x) => !kw || x.t.toLowerCase().includes(kw) || x.def.toLowerCase().includes(kw)
  const shown = TERMS.filter(match)

  return (
    <section>
      <header className="lesson-header">
        <span className="badge concept-badge">📖 용어 사전</span>
        <h2>JS·React 용어 총정리</h2>
        <p>은근히 어려운 말들을 한 곳에. 상세 정의 + 예시 코드 + 처음 배우는 레슨으로 점프한다.</p>
      </header>

      {/* 검색 + 카테고리 바로가기 (용어 나열은 아래 상세로 통일) */}
      <div className="card" style={{ position: 'sticky', top: 0, zIndex: 2 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="🔎 용어·설명 검색 (예: 콜백, 의존성, truthy, 클로저)"
          style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid var(--border)', borderRadius: 8 }}
        />
        <div className="button-row" style={{ marginTop: 10, flexWrap: 'wrap' }}>
          {Object.entries(CATS).map(([k, label]) => (
            <button key={k} className="chip" onClick={() => jumpCat(k)}>{label}</button>
          ))}
          <span className="demo-desc" style={{ margin: 0, alignSelf: 'center' }}>· 총 {shown.length}개</span>
        </div>
      </div>

      {/* 📑 용어 목록 — 카테고리별로 한눈에. 누르면 아래 상세로 바로 이동한다. */}
      <div className="card" style={{ marginTop: 12, padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
          <b style={{ fontSize: 14 }}>📑 용어 목록</b>
          <span className="demo-desc" style={{ margin: 0, fontSize: 12.5 }}>이름을 누르면 아래 상세로 이동한다</span>
        </div>
        {Object.keys(CATS).map((cat) => {
          const items = shown.filter((x) => x.cat === cat)
          if (items.length === 0) return null
          return (
            <div key={cat} style={{ display: 'flex', gap: 10, alignItems: 'baseline', padding: '8px 0', borderTop: '1px solid var(--border)' }}>
              <button
                className="chip"
                onClick={() => jumpCat(cat)}
                title={`${CATS[cat]} 섹션으로`}
                style={{ fontSize: 12, fontWeight: 700, flex: 'none', whiteSpace: 'nowrap' }}
              >
                {CATS[cat]} {items.length}
              </button>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {items.map((x) => (
                  <button
                    key={x.t}
                    className={'chip' + (hl === x.t ? ' on' : '')}
                    onClick={() => jumpTerm(x.t)}
                    style={{ fontSize: 12.5, padding: '4px 10px' }}
                  >
                    {x.t}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
        {shown.length === 0 && (
          <p className="demo-desc" style={{ margin: '8px 0 0' }}>검색 결과가 없다. 다른 말로 찾아보라.</p>
        )}
      </div>

      {Object.keys(CATS).map((cat) => {
        const items = shown.filter((x) => x.cat === cat)
        if (items.length === 0) return null
        return (
          <div key={cat}>
            <h3 className="section-title" id={`sec-${cat}`}>{CATS[cat]}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map((x) => (
                <div
                  className="card"
                  key={x.t}
                  id={termId(x.t)}
                  style={{
                    padding: '12px 14px',
                    scrollMarginTop: 12,
                    transition: 'box-shadow .3s, background .3s',
                    ...(hl === x.t ? { boxShadow: '0 0 0 2px var(--brand)', background: 'var(--brand-soft)' } : {}),
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                    <b style={{ fontSize: 15 }}>{x.t}</b>
                    <button className="chip" style={{ fontSize: 12 }} onClick={() => onGo(x.to)}>레슨으로 →</button>
                  </div>
                  <p className="demo-desc" style={{ margin: '6px 0 0', lineHeight: 1.65 }}>{x.def}</p>
                  {x.ex && <pre className="err-code" style={{ margin: '8px 0 0' }}>{x.ex}</pre>}
                </div>
              ))}
            </div>
          </div>
        )
      })}

      <p className="section-desc" style={{ marginTop: 16 }}>
        📌 용어가 헷갈리면 여기로 돌아와 검색하면 된다. "레슨으로 →"를 누르면 그 용어를 처음 배우는 곳으로 이동한다.
      </p>
    </section>
  )
}
