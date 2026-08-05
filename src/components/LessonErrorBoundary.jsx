import { Component } from 'react'

// 강의 하나가 렌더 중 터져도 앱 전체가 언마운트되지 않게 감싼다.
// App에서 key={강의 id}로 감싸면, 다른 강의로 이동할 때 자동으로 리셋된다.
export default class LessonErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      const msg = String(this.state.error.message || this.state.error).split('\n')[0]
      return (
        <div className="card" style={{ borderColor: 'var(--red)' }}>
          <div className="file-label" style={{ color: 'var(--red)' }}>
            ⚠️ 이 강의에서 오류가 발생했다
          </div>
          <pre className="err-code" style={{ color: 'var(--red)', marginTop: 8 }}>{msg}</pre>
          <p className="section-desc" style={{ margin: '10px 0 0' }}>
            다른 강의는 계속 볼 수 있다. 이 화면이 계속 뜨면 페이지를 새로고침해 보라.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
