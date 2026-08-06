import { createContext, useContext, useState } from 'react'

// 실습용 — 닉네임 추가 실습에서 name + nickname을 담는 Context.
const NickContext = createContext({ name: '', nickname: '' })

// 닉네임 추가 실습: 입력값(nickname)을 value에 담기만 하면, 중간을 안 거치고 leaf에 바로 반영된다.
// 실제로 바뀌는 코드는 딱 2곳 — (1) Provider value, (2) 읽는 leaf. 중간 Page·Sidebar는 그대로.
export function NicknameExercise() {
  const [nickname, setNickname] = useState('')
  return (
    // (1) value에 nickname 한 줄 추가
    <NickContext.Provider value={{ name: '김코딩', nickname }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 14 }}>
        닉네임 입력:
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="예: 코딩왕"
          style={{
            flex: 1, maxWidth: 220, padding: '7px 10px',
            border: '1px solid var(--border)', borderRadius: 8, fontSize: 14,
          }}
        />
      </label>
      <NickPage />
    </NickContext.Provider>
  )
}
// 중간: nickname을 몰라도 된다 (props 없음) — 실습에서 이 두 함수는 건드리지 않는다.
function NickPage() {
  return (
    <div className="tree-box">
      Page <small>(props 없음 · 안 건드림)</small>
      <NickSidebar />
    </div>
  )
}
function NickSidebar() {
  return (
    <div className="tree-box">
      Sidebar <small>(props 없음 · 안 건드림)</small>
      <NickBadge />
    </div>
  )
}
// (2) 읽는 leaf: 여기서만 nickname을 꺼내 표시한다.
function NickBadge() {
  const { name, nickname } = useContext(NickContext)
  return (
    <div className="tree-box leaf">
      👤 {name}
      {nickname ? <b style={{ color: 'var(--brand)' }}> @{nickname}</b> : <small> (닉네임을 입력해보세요)</small>}
    </div>
  )
}
