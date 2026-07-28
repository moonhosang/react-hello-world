import { useState } from 'react'

// ⚠️ 배열도 객체와 똑같다 — 원본을 push로 바꾸면(참조 그대로) 리액트가 못 알아채 화면이 안 바뀐다.
// → 항상 새 배열([...items, 새값])을 만들어 set 한다. (5단계 리스트에서 더 자세히)
export default function ArrayMutationDemo() {
  const [items, setItems] = useState(['🍎'])

  // ❌ 원본 배열을 직접 바꾼다 — 참조는 그대로라 리액트가 모른다
  function wrongAdd() {
    items.push('🍌') // 원본을 바꿈 (같은 배열)
    setItems(items) // 참조가 같아 리렌더하지 않음 → 화면 그대로
  }

  // ✅ 새 배열 → 참조가 달라 화면이 갱신된다
  function rightAdd() {
    setItems([...items, '🍇'])
  }

  return (
    <div className="card">
      <div className="file-label">📄 ArrayMutationDemo.jsx</div>
      <div className="button-row">
        <button onClick={wrongAdd}>❌ push (원본 수정)</button>
        <button onClick={rightAdd}>✅ 새 배열 ([...items])</button>
        <button onClick={() => setItems(['🍎'])}>🔄</button>
      </div>
      <p className="demo-desc">
        목록: <b>{items.join(' ')}</b> <small>({items.length}개)</small>
      </p>
      <p className="demo-desc">
        ❌ push는 눌러도 화면이 <b>안 바뀐다</b>(배열엔 들어감). ✅를 누르면 숨어 있던 게 <b>우르르</b> 나타난다.
      </p>
    </div>
  )
}
