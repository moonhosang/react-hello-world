import { createContext, useContext } from 'react'

// ✅ 다른 예시 정답 — 로그인 사용자 이름 Context (테마와 같은 기술: createContext·Provider·useContext)
const UserContext = createContext('게스트')

function DeepHello() {
  const name = useContext(UserContext) // prop 없이 깊은 곳에서 바로 읽는다
  return <b>👋 {name}님, 환영합니다</b>
}
function Layout() {
  return <div style={{ padding: 8 }}><DeepHello /></div>
}

export default function SolutionUserContext() {
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <UserContext.Provider value="김코딩">
        <Layout />
      </UserContext.Provider>
    </div>
  )
}
