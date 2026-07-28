import { useEffect, useReducer } from 'react'

// ============================================================
// 커스텀 훅 · usePersistedReducer
// ============================================================
// useReducer에 "localStorage 지속" 능력을 얹은 커스텀 훅이다.
// 저장/복원 로직을 이 한 곳에 캡슐화해, 화면 컴포넌트는 그냥 useReducer처럼 쓴다.
//   - 초기값 : 처음 한 번만 localStorage에서 읽는다(lazy init).
//   - 저장   : state가 바뀔 때마다 useEffect로 다시 써 둔다.
// 그래서 새로고침해도 데이터가 남는다.

// localStorage에서 초기 상태를 읽어 온다.
// 값이 없거나(첫 방문) 깨졌으면(파싱 실패) fallback을 쓴다.
function readInitial(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    if (saved == null) return fallback
    return JSON.parse(saved)
  } catch {
    // JSON이 깨졌으면 조용히 기본값으로 시작한다.
    return fallback
  }
}

export function usePersistedReducer(reducer, key, fallback) {
  // useReducer의 3번째 인자(init 함수)로 lazy init을 쓴다.
  // → 최초 렌더에서 딱 한 번만 localStorage를 읽는다.
  const [state, dispatch] = useReducer(reducer, fallback, (fb) =>
    readInitial(key, fb)
  )

  // state가 바뀔 때마다 localStorage에 저장한다.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // 저장 실패(용량 초과 등)는 앱 동작을 막지 않도록 무시한다.
    }
  }, [key, state])

  return [state, dispatch]
}
