# 9단계 · useEffect (부수 효과)

컴포넌트는 원래 "화면을 그리는" 함수다. 그런데 화면 그리기 **외의** 일(문서 제목 바꾸기,
타이머, 데이터 요청 등)이 필요할 때가 있다. 그걸 **`useEffect`** 에 적는다. 네 걸음으로 차근차근.

| 하위 | 배우는 것 | 폴더 |
|---|---|---|
| **9-1** | useEffect 소개 + 의존성 배열 (렌더 후 실행 · deps) | `step8-1-effect-basics` |
| **9-2** | 정리(cleanup) 함수 — 뒷정리 | `step8-2-cleanup` |
| **9-3** | 데이터 불러오기 (loading → data) | `step8-3-fetch` |
| **9-4** | 값이 바뀌면 다시 불러오기 (+ 흔한 실수) | `step8-4-refetch` |

## 한눈에

```jsx
useEffect(() => {
  // 렌더가 끝난 뒤 할 일 (부수 효과)
  return () => {
    // 정리(cleanup): 컴포넌트가 사라지기 전 / 다음 effect 전
  }
}, [의존성])   // []=처음 한 번, [x]=x 바뀔 때, 생략=매 렌더
```

> 데이터 불러오기 데모(9-3·9-4)는 인터넷 없이도 되도록 **가짜 API**(`src/lib/fakeApi.js`)를 쓴다.

→ 이전: [8단계 · Context](../step7-context/README.md) · 다음: [10단계 · 에러 읽는 법](../step9-errors/README.md)
