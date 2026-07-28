# 3단계 · 상태와 이벤트 — useState

화면에서 **변하는 값**은 state로 관리한다. 두 걸음으로 나눠 배운다.

| 하위 | 배우는 것 | 폴더 |
|---|---|---|
| **3-1** | useState 기초 (카운터·좋아요) + 🎯실습 | `step3-1-basics` |
| **3-2** | 상태 설계·함정 (여러 상태 vs 객체, 연속 setState) | `step3-2-design` |

## 한눈에

```jsx
const [count, setCount] = useState(0)   // [현재값, 바꾸는 함수]
setCount(count + 1)   // ⭕ set 함수로만 바꾼다 → 화면 갱신
count = count + 1     // ❌ 직접 대입하면 화면 안 바뀜
```

- 값이 바뀌면 그 컴포넌트가 **다시 그려진다(리렌더)**.
- 이벤트는 <code>onClick={() =&gt; ...}</code>로 연결한다.
- 독립적인 값이면 **여러 state**, 함께 움직이는 값이면 **객체 하나**로.

> 하위 단계는 개념 + 라이브 데모 중심이다.

→ 이전: [✅ 체크포인트 A](../../checkpoints/checkpointA-team-page/README.md) · 다음: [개념 · props vs state](../../concepts/props-vs-state/README.md)
