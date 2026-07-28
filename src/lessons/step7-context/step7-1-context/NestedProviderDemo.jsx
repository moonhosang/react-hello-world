import { useContext, useState } from 'react'
import { UserContext } from './UserContext.js'

const nickInput = {
  padding: '6px 9px', border: '1px solid var(--border)', borderRadius: 8,
  fontSize: 13, maxWidth: 180,
}

// 중첩 Provider 데모: 같은 UserContext를 겹쳐 감싸면, useContext는 '가장 가까운' Provider 값을 쓴다.
// 바깥/안쪽 각각 닉네임을 입력해보면, 각 스코프의 값(닉네임 포함)이 가장 가까운 곳에서 읽힌다.
export function NestedContextDemo() {
  const [outerNick, setOuterNick] = useState('보스')
  const [innerNick, setInnerNick] = useState('뜨내기')

  return (
    <UserContext.Provider value={{ name: '김코딩', role: '관리자', nickname: outerNick }}>
      <div className="tree-box">
        🟦 바깥 Provider <small>(value = 김코딩·관리자)</small>
        <label style={{ display: 'block', margin: '6px 0', fontSize: 13 }}>
          바깥 닉네임:{' '}
          <input style={nickInput} value={outerNick} onChange={(e) => setOuterNick(e.target.value)} placeholder="바깥 닉네임" />
        </label>
        <NearestReader label="바깥에서 읽기" />

        <UserContext.Provider value={{ name: '게스트', role: '손님', nickname: innerNick }}>
          <div className="tree-box">
            🟩 안쪽 Provider <small>(value = 게스트·손님)</small>
            <label style={{ display: 'block', margin: '6px 0', fontSize: 13 }}>
              안쪽 닉네임:{' '}
              <input style={nickInput} value={innerNick} onChange={(e) => setInnerNick(e.target.value)} placeholder="안쪽 닉네임" />
            </label>
            <NestedWrapper />
          </div>
        </UserContext.Provider>

        <NearestReader label="안쪽을 벗어나 다시 바깥에서 읽기" />
      </div>
    </UserContext.Provider>
  )
}

// 안쪽 Provider 밑으로 몇 단계 더 내려가도, 가장 가까운(안쪽) 값을 찾는다.
function NestedWrapper() {
  return (
    <div className="tree-box">
      중간 래퍼 <small>(Provider 아님)</small>
      <NearestReader label="안쪽 깊은 곳에서 읽기" />
    </div>
  )
}

function NearestReader({ label }) {
  const user = useContext(UserContext)
  return (
    <div className="tree-box leaf">
      {label} → 👤 <b>{user.name}</b>
      {user.nickname && <b style={{ color: 'var(--brand)' }}> @{user.nickname}</b>} ({user.role})
    </div>
  )
}
