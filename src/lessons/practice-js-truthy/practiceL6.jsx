import { useState } from 'react'

// ⚫ 처음부터 (다른 예시) — && 0 함정 피하기.
// 장바구니가 비었을 때 화면에 숫자 0이 남지 않게, items.length > 0 && ... 로 그린다. (👀 정답 보기로 비교)

export default function PracticeL6() {
  const [items, setItems] = useState([])

  return (
    <div>
      <div className="button-row">
        <button className="chip on" onClick={() => setItems((a) => [...a, '🍎'])}>담기</button>
        <button className="chip" onClick={() => setItems([])}>비우기</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>
        담긴 상품:{' '}
        {/* TODO: items.length > 0 && <b>{items.length}개</b> 로 그린다.
             items.length && ... 로 쓰면 빈 장바구니(0)에 숫자 0이 화면에 남는다! */}
      </div>
    </div>
  )
}
