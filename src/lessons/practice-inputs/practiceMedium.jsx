import { useState } from 'react'

// 🟡 중간 — value를 state에 묶고, 입력값으로 파생 표시(인사말·글자 수)를 이어 보자.
// 할 일: TODO A(value 묶기)와 TODO B(인사말·글자 수 표시)를 채운다.

export default function PracticeMedium() {
  const [name, setName] = useState('')
  const onChange = (e) => setName(e.target.value)

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO A: input에 value={name} 를 묶는다. (지금은 value가 없어 리액트가 값을 화면에 못 되돌린다) */}
      <input onChange={onChange} placeholder="이름을 입력" style={{ padding: '6px 8px' }} />

      {/* TODO B: 아래를 인사말과 글자 수로 바꾼다. 예: 안녕, {name || '손님'}님 · {name.length}자 */}
      <p style={{ marginTop: 8 }}>여기에 인사말과 글자 수를 표시하자</p>
    </div>
  )
}
