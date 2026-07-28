// ③ useCallback — 함수를 매 렌더 새로 만들면 memo 자식이 소용없어진다.
// useCallback으로 함수의 '정체성(참조)'을 고정하면 memo 자식이 리렌더를 건너뛴다.
import { useState, useCallback, memo } from 'react'
import { RenderTag } from './RenderTag.jsx'

// memo 자식 — onClick prop이 이전과 '같은 함수'면 리렌더를 건너뛴다.
// 함수는 참조(===)로 같은지 비교되므로, 매 렌더 새 함수가 오면 '다르다'고 판단해 다시 그린다.
const Button = memo(function Button({ onClick, label }) {
  return (
    <button className="chip" onClick={onClick} style={{ marginTop: 6 }}>
      {label} <RenderTag />
    </button>
  )
})

export function UseCallbackDemo() {
  const [count, setCount] = useState(0)

  // ❌ 매 렌더마다 새로 만들어지는 함수 → 참조가 매번 달라 memo 자식이 매번 리렌더된다.
  const handlePlain = () => {}

  // ✅ useCallback으로 고정한 함수 → 참조가 유지돼 memo 자식이 리렌더를 건너뛴다.
  const handleStable = useCallback(() => {}, [])

  return (
    <div>
      <button className="chip on" onClick={() => setCount((c) => c + 1)} style={{ marginBottom: 4 }}>
        ➕ 부모 상태 바꾸기 (count: {count})
      </button>
      <p className="section-desc" style={{ margin: '6px 0 8px', fontSize: 12 }}>
        둘 다 <b>memo 자식</b>이다. 그런데 위 버튼으로 부모를 리렌더시키면 —
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div className="tree-box leaf" style={{ padding: 10 }}>
          <div style={{ fontSize: 13, marginBottom: 2 }}>
            🔁 매번 새 함수(<code>{'() => {}'}</code>)를 넘김 → memo가 무력화
          </div>
          <Button onClick={handlePlain} label="새 함수 자식" />
        </div>
        <div className="tree-box leaf" style={{ padding: 10 }}>
          <div style={{ fontSize: 13, marginBottom: 2 }}>
            ✅ <code>useCallback</code>으로 고정한 함수를 넘김 → 참조 유지
          </div>
          <Button onClick={handleStable} label="고정 함수 자식" />
        </div>
      </div>
      <p className="section-desc" style={{ margin: '8px 0 0', fontSize: 12 }}>
        위 자식은 <b>지문이 계속 바뀌고</b>(매번 새 함수라 memo가 소용없다),
        아래 자식은 <b>고정</b>이다(<code>useCallback</code>이 같은 함수를 유지한다).
      </p>
    </div>
  )
}
