// ① React.memo — 부모가 리렌더돼도 props가 그대로면 자식은 다시 안 그려진다.
// memo 없는 자식 vs memo 자식을 나란히 두고, 렌더 지문으로 차이를 눈으로 본다.
import { useState, memo } from 'react'
import { RenderTag } from './RenderTag.jsx'

// memo 안 함 — 부모가 리렌더되면 props가 같든 말든 무조건 다시 그려진다.
function PlainChild({ label }) {
  return (
    <div className="tree-box leaf" style={{ marginTop: 6 }}>
      🔁 memo 없는 자식 <small>({label})</small> <RenderTag />
    </div>
  )
}

// memo 함 — props(label)가 이전과 같으면 부모가 리렌더돼도 그리기를 건너뛴다.
const MemoChild = memo(function MemoChild({ label }) {
  return (
    <div className="tree-box leaf" style={{ marginTop: 6 }}>
      ✅ memo 자식 <small>({label})</small> <RenderTag />
    </div>
  )
})

export function MemoDemo() {
  const [count, setCount] = useState(0)

  // count만 바꾼다 → 부모(MemoDemo)는 리렌더되지만, 두 자식에게 주는 label prop은 그대로다.
  return (
    <div>
      <button className="chip on" onClick={() => setCount((c) => c + 1)} style={{ marginBottom: 4 }}>
        ➕ 부모 상태 바꾸기 (count: {count})
      </button>
      <p className="section-desc" style={{ margin: '6px 0 0', fontSize: 12 }}>
        버튼을 누르면 부모가 리렌더된다. 두 자식에게 주는 <code>label</code>은 그대로인데,
        <b> memo 없는 자식만 지문이 계속 바뀌고</b>, memo 자식은 <b>고정</b>이다.
      </p>
      <PlainChild label="고정 문구" />
      <MemoChild label="고정 문구" />
    </div>
  )
}
