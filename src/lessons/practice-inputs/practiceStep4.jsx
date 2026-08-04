import { useState } from 'react'

// 🟣 중간+ — controlled input과 글자 수까지 됐다. '초기화' 버튼만 더한다.
// 할 일: 버튼을 누르면 text를 ''로 되돌리는 '초기화' 버튼을 만든다. (state가 진실이라 화면도 따라 비워진다)

export default function PracticeStep4() {
  const [text, setText] = useState('')

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="여기에 입력" style={{ padding: '6px 8px' }} />
      <p style={{ marginTop: 8 }}>리액트가 아는 값: <b>{text || '(없음)'}</b> · <b>{text.length}</b>자</p>
      <div className="button-row">
        {/* TODO: '초기화' 버튼 — onClick={() => setText('')} */}
      </div>
    </div>
  )
}
