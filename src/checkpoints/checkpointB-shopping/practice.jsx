import { useState } from 'react'

// ✅ 체크포인트 B — 장보기 리스트 (실습 파일)
// 3~5단계를 합쳐서 '추가 / 목록 / 삭제'가 되는 장보기 리스트를 만들어 보자.
//
// 할 일:
//   TODO 1: input을 controlled로 만든다 (value, onChange)   ← 4단계
//   TODO 2: '추가'를 누르면 items 배열에 새 항목을 넣는다     ← 3·5단계 (새 배열!)
//   TODO 3: items를 map으로 목록으로 그린다 (key)            ← 5단계
//   TODO 4: 각 항목의 ✕로 그 항목을 뺀다 (filter)            ← 5단계

let nextId = 1

export default function PracticeShopping() {
  const [items, setItems] = useState([])
  const [text, setText] = useState('')

  return (
    <div className="demo-card">
      <div className="shop-input">
        {/* TODO 1 */}
        <input placeholder="살 것을 입력" />
        {/* TODO 2 */}
        <button>추가</button>
      </div>

      <ul className="plain-list">
        {/* TODO 3, 4: items를 목록으로, 각 항목에 삭제(✕) 버튼 */}
        <li>여기에 목록이 나오게 하자</li>
      </ul>
    </div>
  )
}
