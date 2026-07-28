// reducer: (현재 state, action) => 새 state
// 순수 함수다 — 원본 state를 건드리지 않고 '새 값'을 return 한다.
export function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    case 'reset':
      return 0
    default:
      return state
  }
}
