import { createContext, useContext, useState } from 'react'

// 실무 패턴: Context 객체는 이 파일 '밖으로 내보내지 않는다'(비공개).
// 기본값을 undefined로 두면 → Provider 없이 useContext를 쓴 걸 감지할 수 있다.
const AuthContext = createContext(undefined)

// 1) Provider 컴포넌트 — 상태와 로직을 여기 한 곳에 캡슐화한다.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login = (name) => setUser({ name })
  const logout = () => setUser(null)
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

// 2) 커스텀 훅 — useContext를 감싸고, Provider 밖 사용을 막는 안전장치를 넣는다.
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    // Provider로 감싸지 않으면 기본값(undefined)이 나온다 → 조용한 버그 대신 즉시 에러.
    throw new Error('useAuth()는 <AuthProvider> 안에서만 쓸 수 있다')
  }
  return ctx
}
