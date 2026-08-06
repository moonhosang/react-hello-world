import { useReducer } from 'react'
import { reducer } from './counterReducer.js'
// 표시용(?raw) — 아래 <pre>에 보이는 코드는 counterReducer.js의 '실제 소스'다.
// 손으로 옮겨 적지 않으므로 화면 코드와 도는 코드가 항상 일치한다.
import reducerCode from './counterReducer.js?raw'

// 카운터를 useReducer로 만든다.
// 상태를 바꾸는 방법(증가/감소/리셋)이 여러 개일 때,
// 그 로직을 reducer 함수 "한 곳"(counterReducer.js)에 모으고, 버튼은 dispatch로 "무엇을 할지"만 보낸다.
export default function CounterReducer() {
  // useReducer(reducer, 초깃값) → [현재 state, dispatch]
  const [count, dispatch] = useReducer(reducer, 0)

  return (
    <div className="card counter-card">
      <div className="file-label">📄 counterReducer.js (실제 소스)</div>
      <div className="counter-value">{count}</div>
      <div className="button-row">
        {/* dispatch는 "무엇을 할지"(action)만 보낸다. 계산은 reducer가 한다 */}
        <button onClick={() => dispatch({ type: 'decrement' })}>➖ 감소</button>
        <button onClick={() => dispatch({ type: 'reset' })}>🔄 리셋</button>
        <button onClick={() => dispatch({ type: 'increment' })}>➕ 증가</button>
      </div>
      <pre className="err-code">{reducerCode}</pre>
    </div>
  )
}
