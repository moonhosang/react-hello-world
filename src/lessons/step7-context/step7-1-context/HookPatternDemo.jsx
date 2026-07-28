import { Component } from 'react'
import { AuthProvider, useAuth } from './AuthContext.jsx'

// 깊은 자식: raw Context(useContext/AuthContext)를 몰라도 useAuth()만 부르면 된다.
function Navbar() {
  const { user, login, logout } = useAuth()
  return (
    <div className="tree-box leaf" style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      {user ? (
        <>
          👤 <b>{user.name}</b> 님 로그인됨
          <button className="chip" onClick={logout}>로그아웃</button>
        </>
      ) : (
        <>
          🔒 로그아웃 상태
          <button className="chip on" onClick={() => login('김코딩')}>로그인</button>
        </>
      )}
    </div>
  )
}

// 앱 트리: Navbar는 몇 단계 아래에 있어도 useAuth()로 바로 꺼낸다.
function AppHeader() {
  return (
    <div className="tree-box">
      Header <small>(props 없음)</small>
      <Navbar />
    </div>
  )
}

// Provider '밖에서' useAuth()를 호출하는 컴포넌트 → 에러가 난다.
function OutsideProbe() {
  useAuth() // ctx === undefined → throw
  return null
}

// 에러 바운더리: 위 에러를 잡아 페이지를 죽이지 않고 메시지로 보여준다.
class ProviderGuard extends Component {
  state = { message: null }
  static getDerivedStateFromError(err) {
    return { message: err.message }
  }
  render() {
    if (this.state.message) {
      return (
        <div className="tree-box leaf" style={{ color: 'var(--red)' }}>
          ❌ 던져진 에러: {this.state.message}
        </div>
      )
    }
    return this.props.children
  }
}

export function HookPatternDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>
          ✅ <code>&lt;AuthProvider&gt;</code>로 감싼 안 — 깊은 Navbar가 <code>useAuth()</code>로 로그인/로그아웃
        </div>
        <AuthProvider>
          <div className="tree-box">
            App <small>(AuthProvider로 감쌈)</small>
            <AppHeader />
          </div>
        </AuthProvider>
      </div>

      <div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>
          ❌ Provider <b>밖에서</b> <code>useAuth()</code> 호출 — 안전장치가 에러를 던진다
        </div>
        <ProviderGuard>
          <OutsideProbe />
        </ProviderGuard>
      </div>
    </div>
  )
}
