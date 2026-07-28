import { useState, useEffect } from 'react'

// 🔬 생명주기 3단계(🟢 마운트 · 🔵 업데이트 · 🔴 언마운트)를 로그로 직접 관찰하는 데모다.
// ⏰ 리액트가 '언제' 컴포넌트를 부르는지 눈으로 본다. (useEffect의 자세한 사용법은 9장)

// 👶 관찰 대상 자식. 마운트/업데이트/언마운트 시점을 부모에게 로그로 올린다.
function Child({ n, onLog }) {
  // 🟢🔴 의존성 [] → 마운트 때 한 번 실행, 언마운트 때 정리(return)만 실행된다
  useEffect(() => {
    onLog('🟢 마운트 — 처음 화면에 등장(컴포넌트 첫 호출)')
    return () => onLog('🔴 언마운트 — 화면에서 사라짐(정리)')
  }, [])
  // 🔵 의존성 [n] → 전달받은 n이 바뀔 때마다 = 업데이트(리렌더)
  useEffect(() => {
    if (n > 0) onLog(`🔵 업데이트 — 다시 그려짐 (n=${n})`)
  }, [n])
  return <div className="tree-box leaf">👶 Child · n = <b>{n}</b></div>
}

export default function LifecycleLogger() {
  const [mounted, setMounted] = useState(true)
  const [n, setN] = useState(0)
  const [logs, setLogs] = useState([])
  const log = (m) => setLogs((prev) => [...prev, m]) // 📝 함수형 업데이트라 항상 최신 로그에 이어 붙는다

  return (
    <div>
      <div className="button-row">
        <button className="chip" onClick={() => setN((x) => x + 1)} disabled={!mounted}>🔵 업데이트 (리렌더)</button>
        <button className="chip on" onClick={() => setMounted((v) => !v)}>
          {mounted ? '🔴 언마운트' : '🟢 다시 마운트'}
        </button>
        <button className="chip" onClick={() => setLogs([])}>🧹 로그 지우기</button>
      </div>

      {mounted ? <Child n={n} onLog={log} /> : <p className="demo-desc">Child가 화면에서 사라진 상태다.</p>}

      <ul className="section-list" style={{ marginTop: 8 }}>
        {logs.length === 0 ? (
          <li style={{ color: 'var(--muted)' }}>버튼을 눌러 생명주기가 언제 도는지 관찰해보라.</li>
        ) : (
          logs.map((l, i) => <li key={i}>{l}</li>)
        )}
      </ul>

      <p className="demo-desc" style={{ marginTop: 6 }}>
        ※ 개발 모드(StrictMode)에선 마운트를 한 번 더 검증해 🟢→🔴→🟢로 겹쳐 보일 수 있다 — 실제 동작이다.
      </p>
    </div>
  )
}
