import { createContext, useContext } from 'react'

// 🔴 처음부터 (다른 예시) — 로그인 사용자 이름 Context
// 테마와 같은 기술을 다른 소재로 한 번 더. 껍데기에서 처음부터.
//   TODO A: const UserContext = createContext('게스트')  (아래에 이미 있음 — 그대로 써도 된다)
//   TODO B: return에서 <UserContext.Provider value="김코딩"> 로 <DeepHello />를 감싼다
//   TODO C: DeepHello에서 const name = useContext(UserContext) 로 읽어 하드코딩을 지운다

const UserContext = createContext('게스트')

function DeepHello() {
  // TODO C: const name = useContext(UserContext)
  const name = '게스트' // ← 지금은 하드코딩
  return <b>👋 {name}님, 환영합니다</b>
}

export default function PracticeUserContext() {
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO B: <UserContext.Provider value="김코딩"> 로 감싸기 */}
      <DeepHello />
    </div>
  )
}
