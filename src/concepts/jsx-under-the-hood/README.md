# 개념 · JSX의 정체 (변환 과정)

> 📂 파일: `index.jsx` — 변환 다이어그램 + "JSX는 객체다" 라이브 데모

JSX는 HTML이 **아니다**. 자바스크립트 확장 문법이다. 브라우저는 JSX를 모르니,
빌드 도구(**Vite**)가 미리 **함수 호출**로 바꾸고, 그 결과는 그냥 **객체**가 된다.

## 변환 4단계

```
① 내가 쓴 JSX
   <Badge value="hihi" />
        ↓  (빌드 도구 Vite가 변환)
② 자바스크립트 함수 호출
   React.createElement(Badge, { value: "hihi" })
        ↓  (실행 결과)
③ 그냥 자바스크립트 객체 (React element)
   { type: Badge, props: { value: "hihi" } }
        ↓  (리액트가 이 객체를 읽어)
④ 실제 화면 (DOM)
```

## JSX는 정말 '객체'다

```jsx
const badgeEl = <Badge value="hi" />
const divEl   = <div className="x" />

typeof badgeEl       // "object"
badgeEl.type         // Badge 함수
badgeEl.props.value  // "hi"
divEl.type           // "div"  ← 소문자는 그냥 문자열!
```

## 이걸 알면 규칙들이 이해된다

- **JSX를 변수에 담을 수 있다** — 그냥 객체니까. (`const hello = <Badge />`)
- `className` — JSX는 함수 인자(객체)라서 `class`(JS 예약어) 대신 `className` 키를 쓴다.
- `{중괄호}` — JSX 안은 진짜 JS라서, 중괄호로 자바스크립트 값을 꽂는다.
- **대문자** — `type`이 컴포넌트(함수)를 가리키려면 대문자 변수여야 한다. (소문자 = 문자열 `"div"` = HTML)

> 참고: React 17+는 `React.createElement` 대신 자동 변환을 써서 `import React`가 필요 없다 — 원리는 같다.

→ 이전: [개념 · 함수 vs 컴포넌트](../function-vs-component/README.md) · 다음: [개념 · 캡슐화](../encapsulation/README.md)
