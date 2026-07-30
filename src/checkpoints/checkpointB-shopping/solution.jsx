import { useState } from 'react'

// ✅ 정답 예시 — 장보기 리스트
// 4단계(controlled input) + 3·6단계(상태 배열 추가/삭제 + map/key)를 모두 씀.

let nextId = 1

export default function SolutionShopping() {
  const [items, setItems] = useState([])
  const [text, setText] = useState('')

  function add() {
    const name = text.trim()
    if (name === '') return
    setItems([...items, { id: nextId++, name }]) // 새 배열을 만들어 넣는다
    setText('')
  }

  return (
    <div className="demo-card">
      <div className="shop-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="살 것을 입력"
        />
        <button onClick={add}>추가</button>
      </div>

      {items.length === 0 ? (
        <p className="demo-desc">아직 없다. 하나 추가해 보자 🛒</p>
      ) : (
        <ul className="plain-list">
          {items.map((it) => (
            <li key={it.id}>
              {it.name}
              <button className="mini-del" onClick={() => setItems(items.filter((x) => x.id !== it.id))}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
