# 개념 · props vs state (3~4단계 사이)

> 📂 파일
> - `LabeledCounter.jsx` — props와 state를 한 컴포넌트에서 둘 다 쓰는 데모
> - `index.jsx` — 비교 화면

2단계에서 **props**, 3단계에서 **state**를 배웠다. 둘 다 "컴포넌트가 화면에 쓰는 데이터"라
헷갈리기 쉽다. 차이는 딱 두 가지 — **어디서 오는가**, **누가 바꾸는가**.

## 한 줄 정리

- **props** — **밖(부모)** 에서 온다. 자식은 **읽기만** 한다.
- **state** — **안(자기 자신)** 에서 가진다. **스스로 바꾼다** (`setState`).

## 비교표

| | props | state |
|---|---|---|
| 어디서 오나 | 부모가 준다 (밖에서) | 컴포넌트가 가진다 (안에서) |
| 값 변경 | 읽기 전용 · 불변 | 가변 · set 함수로 (비동기로 갱신될 수 있음) |
| 누가 바꾸나 | 자식은 못 바꾼다 | 자기가 바꾼다 (setState) |
| 밖에서 접근 | 자식이 받아서 접근 | 비공개 — 밖에서는 접근 불가 |
| 주 용도 | 컴포넌트 간 통신 · 재사용 | 동적 변화를 화면에 반영 |
| 비유 | 함수의 **인자** | 함수 안의 **기억되는 변수** |

## 한 컴포넌트에 둘 다

```jsx
function LabeledCounter({ label }) {   // label = props (밖에서 옴, 못 바꿈)
  const [count, setCount] = useState(0) // count = state (안에서 가짐, 내가 바꿈)
  return (
    <div>
      <div>{label}</div>                 {/* props: 부모가 정해준 대로 고정 */}
      <div>{count}</div>                 {/* state: 버튼으로 직접 바꿈 */}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

<LabeledCounter label="🍎 사과" />
<LabeledCounter label="🍌 바나나" />
```

두 카드는 같은 컴포넌트다. `label`은 부모가 준 대로 고정, `count`는 각자 따로 센다.

## 각각의 특징

**📥 props**
- 🔒 **읽기 전용(read-only)** — 자식은 받은 props를 바꾸지 못한다. `props.name = '...'` ❌
- ⬇️ 부모 → 자식 **한 방향**
- 🔁 부모가 바꾸면 자식도 다시 렌더
- 📦 문자열·숫자·불리언·배열·객체·함수·JSX 무엇이든 전달 가능

**🧠 state**
- ✋ 그 컴포넌트가 **소유**한 자기 데이터
- 🔧 **set 함수로만** 바꾼다: `setCount(...)` ⭕ / `count = ...` ❌
- 🔁 바뀌면 그 컴포넌트가 다시 렌더
- 💾 다시 렌더돼도 값은 **유지(기억)** 된다

### ❌ 흔한 실수
- **props를 직접 바꾸려 함** → 안 된다. 바뀌어야 하는 값이면 state로 둔다.
- **state를 `=`로 직접 바꿈** → 화면이 안 바뀐다. 반드시 set 함수로 바꾼다.

## 🧭 판단 규칙

- **밖에서 받아 오고** 컴포넌트가 **안 바꾸면** → **props**
- 컴포넌트가 **직접 바꾸며** 시간에 따라 변하면 → **state**
- 공통점: 둘 중 무엇이 바뀌든 **화면은 다시 그려진다.** (`UI = f(props, state)`)

→ 이전: [3단계 · 상태와 이벤트](../../lessons/step3-state-events/README.md) · 다음: [4단계 · 입력 다루기](../../lessons/step4-inputs/README.md)
