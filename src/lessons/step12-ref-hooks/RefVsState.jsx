import { useRef, useState } from 'react'

// useRef의 대표 쓰임 ② — '리렌더를 일으키지 않는' 값 보관.
// 핵심 대조:
//   - state를 바꾸면 → 화면이 다시 그려진다.
//   - ref.current를 바꾸면 → 값은 바뀌지만 화면은 그대로다. (다음 렌더 때 반영)
export default function RefVsState() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)

  // 이 컴포넌트가 몇 번 렌더됐는지 ref로 센다.
  // (state로 셌다면 세는 행위 자체가 또 렌더를 유발해 무한루프가 된다)
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div className="card">
      <div className="file-label">📄 RefVsState.jsx</div>

      <div className="chip-row" style={{ marginBottom: 12 }}>
        <span className="chip">state 값: <b>{stateCount}</b></span>
        <span className="chip">ref 값(current): <b>{refCount.current}</b></span>
        <span className="chip on">이 컴포넌트 렌더 횟수: <b>{renderCount.current}</b></span>
      </div>

      <div className="button-row">
        {/* state 변경 → 즉시 화면 갱신 (+ 렌더 횟수 증가) */}
        <button onClick={() => setStateCount((c) => c + 1)}>➕ state +1 (리렌더 O)</button>
        {/* ref 변경 → 값만 바뀌고 화면은 그대로 */}
        <button onClick={() => { refCount.current += 1 }}>➕ ref +1 (리렌더 X)</button>
      </div>

      <p className="section-desc" style={{ marginTop: 12, marginBottom: 0 }}>
        <b>ref +1</b>을 여러 번 눌러도 화면의 ref 값은 안 변한다. 그 뒤 <b>state +1</b>을 한 번 누르면,
        그동안 쌓인 ref 값이 그제서야 화면에 나타난다 — ref는 바뀌어도 <b>리렌더를 안 일으키기</b> 때문이다.
      </p>
    </div>
  )
}
