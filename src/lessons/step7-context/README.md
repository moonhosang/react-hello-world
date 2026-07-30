# 8단계 · Context — prop drilling 해결 / 전역 상태

2단계에서 props로 **부모 → 자식** 값 전달을 배웠다. 그런데 값을 쓰는 곳이 **깊은 자식**이면,
중간 컴포넌트들이 필요도 없는 props를 **줄줄이 전달**해야 한다 (**prop drilling**).
Context는 이 문제를 없앤다. 두 걸음으로 차근차근.

| 하위 | 배우는 것 | 폴더 |
|---|---|---|
| **8-1** | prop drilling 문제 → `Provider`+`useContext`로 해결 (before/after) | `step7-1-context` |
| **8-2** | Provider에 상태+setter를 담아 **전역 상태** 관리 | `step7-2-global-state` |

## 한눈에

```jsx
const UserContext = createContext(null)      // 1) 통로 만들기

<UserContext.Provider value={user}>          // 2) 감싸서 값 흘려보내기
  <Page />                                    //    (중간 컴포넌트는 props 안 받음)
</UserContext.Provider>

const user = useContext(UserContext)         // 3) 깊은 자식이 바로 꺼내 쓰기
```

## 언제 쓸까?

- **여러 깊이**의 컴포넌트가 **같은 값**(로그인 사용자, 테마, 언어 등)을 필요로 할 때.
- 단순히 한두 단계만 넘기면 되는 값은 그냥 props가 낫다. (Context 남용 금물)

→ 이전: [7단계 · 폼 입력 응용](../step6-forms/README.md) · 다음: [9단계 · useEffect](../step8-effects/README.md)
