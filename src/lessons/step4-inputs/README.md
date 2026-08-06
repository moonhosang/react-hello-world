# 4단계 · 입력 다루기 — input 그냥 두기 vs state에 묶기

> 📂 이 폴더의 파일
> - `UncontrolledInput.jsx` — `value`·`onChange`를 안 묶은 input (리액트가 값을 모름)
> - `ControlledInput.jsx` — value를 state에 묶는 방식 (리액트 방식)
> - `index.jsx` — 둘을 나란히 비교 + 단방향 데이터 흐름

0단계에서 본 "직접 조작 vs 상태 관리"의 차이가, 입력창에서도 똑같이 나타난다.

---

## 방식 ① 그냥 두기 (uncontrolled) — 값의 주인은 DOM

`<input>`을 그냥 두고 `value`·`onChange`를 아무것도 안 묶는다.

```jsx
<input placeholder="타이핑해도…" />
// 타이핑은 되지만, 컴포넌트 안엔 이 값을 가리킬 변수가 없다
```

- 값의 주인은 **DOM(input)** 이다.
- 타이핑하는 **동안** 리액트는 값을 **모른다(깜깜)** → 실시간 글자 수·검증이 불가능하다.
- 💡 정말 DOM 값을 직접 읽어야 하면 `useRef` 훅을 쓴다 — **13단계 · Ref와 커스텀 훅**에서 배운다. 지금은 "기본은 controlled"만 익히면 된다.

## 방식 ② 상태에 묶기 (controlled) — 값의 주인은 state ⭐

input의 `value`를 **state에 연결**한다. 이게 리액트의 기본 방식이다.

```jsx
const [text, setText] = useState('')

<input
  value={text}                              // 화면 값 = state
  onChange={(e) => setText(e.target.value)} // 타이핑 → state 갱신
/>
```

작동 흐름 (단방향 데이터 흐름 · one-way data flow):

```
① state → 화면  (자동)       : text ──value={text}──▶ <input>
② 화면 → state  (자동 아님!)  : 타이핑 ──onChange──▶ setText ──▶ text
```

- 핵심은 **②** — 타이핑해도 state가 **저절로** 안 바뀐다. `onChange`를 받아 **내가 직접 `setText`** 를 불러야 바뀐다.
  (Vue의 `v-model` 같은 **양방향 바인딩이 아니다.**)
- 값은 늘 **state → 화면** 한 방향으로 흐른다.
- 값의 **단일 진실의 원천(single source of truth)** 이 state가 된다.
- 타이핑하는 **매 순간** 값을 알기 때문에:
  - 글자 수 세기 `{text.length}`
  - 실시간 검증 `{text.length > 10 && <p>너무 길다</p>}`
  - 자동 변환 `text.toUpperCase()`
  - 조건부 버튼 `disabled={text === ''}`

  ...이 전부 **공짜로** 따라온다.

---

## ⚠️ 흔한 실수

`value`만 주고 `onChange`를 안 주면, 입력이 **안 된다.**
(화면 값을 state에 고정해 놓고 갱신할 방법을 안 줬으니까.)
→ `value`와 `onChange`는 controlled에서 항상 **한 쌍**이다.

## 한 줄 요약

> 리액트에서 입력값은 **state에 묶어서** 다룬다. DOM이 아니라 **state가 진실**이다.

---

## 🛠️ 직접 해보기

1. 값이 비어 있으면 **제출 버튼 비활성화**: `disabled={text.trim() === ''}`
2. 숫자만 남기기: `onChange`에서 `e.target.value.replace(/\D/g, '')`
3. uncontrolled 쪽 "리액트가 아는 값"을 실시간으로 바꾸려면? → `value`·`onChange`로 state에 묶기(=controlled로 바꾸기)

→ 이전: [3단계 · 상태와 이벤트](../step3-state-events/README.md) · 다음: [6단계 · 리스트](../step6-lists/README.md)
