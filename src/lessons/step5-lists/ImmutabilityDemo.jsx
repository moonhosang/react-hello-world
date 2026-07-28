import { useState } from 'react'

// ⚠️ 불변성: 원본 배열을 push로 바꾸면 리액트가 못 알아채 화면이 안 바뀐다.
// 리액트는 '새 배열(참조가 다른가)'로 변화를 판단하기 때문이다.
// → 항상 새 배열을 만들어(...펼치기) set 한다.

export default function ImmutabilityDemo() {
  const [items, setItems] = useState(['🍎'])

  function wrongAdd() {
    items.push('🍌') // 원본을 직접 바꿈 (참조는 그대로)
    setItems(items) // 참조가 같아 리액트가 리렌더하지 않음 → 화면 그대로
  }

  function rightAdd() {
    setItems([...items, '🍇']) // 새 배열 → 화면 갱신
  }

  return (
    <div className="card">
      <div className="file-label">📄 ImmutabilityDemo.jsx</div>
      <div className="button-row">
        <button onClick={wrongAdd}>❌ push로 추가</button>
        <button onClick={rightAdd}>✅ 새 배열로 추가</button>
        <button onClick={() => setItems(['🍎'])}>🔄</button>
      </div>
      <p className="demo-desc">
        현재 목록: <b>{items.join(' ')}</b> <small>({items.length}개)</small>
      </p>
      <p className="demo-desc">
        ❌ push는 눌러도 화면이 <b>안 바뀐다</b>(사실 배열엔 들어감). ✅를 누르면 그동안 숨어 있던 것이
        <b> 우르르</b> 나타난다 — 리액트는 '새 배열'일 때만 알아챈다.
      </p>
    </div>
  )
}
