import { useState } from 'react'

// ✅ 정답 (다른 예시) — items.length > 0 && ... 로 그리면 빈 장바구니에 숫자 0이 남지 않는다.
// (items.length && ... 는 0이 falsy면서 화면에 그려지는 값이라, 0이 덩그러니 남는다.)
export default function SolutionTruthyZero() {
  const [items, setItems] = useState([])

  return (
    <div>
      <div className="button-row">
        <button className="chip on" onClick={() => setItems((a) => [...a, '🍎'])}>담기</button>
        <button className="chip" onClick={() => setItems([])}>비우기</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>
        담긴 상품: {items.length > 0 && <b>{items.length}개</b>}
        {items.length === 0 && <span className="demo-desc"> (비었을 때 숫자 0이 안 남는다)</span>}
      </div>
    </div>
  )
}
