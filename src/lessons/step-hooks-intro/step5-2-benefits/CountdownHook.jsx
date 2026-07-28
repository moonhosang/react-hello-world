import { useState, useEffect } from 'react'

// ✅ 훅으로 — 커스텀 훅 하나에 '시작 + 정리'가 같이 있는 카운트다운.
// 아래 CountdownHook()가 Timer를 마운트/언마운트로 토글해, 시작 옆에 적어 둔 정리(return)가
// 실제로 도는 걸 로그로 확인시킨다. (0에서 멈춘다)

const box = { padding: '10px 12px', margin: '6px 0', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', textAlign: 'center', fontSize: 15 }

// use로 시작하고 안에서 useState·useEffect를 쓴다 → '커스텀 훅'이다.
// onLog는 부모 useState의 setter라 identity가 고정된다 → 마운트 때 한 번 시작하고, 언마운트 때 정리가 돈다.
function useCountdown(from, onLog) {
  const [sec, setSec] = useState(from)
  useEffect(() => {
    onLog((prev) => [...prev, '🟢 시작: setInterval 타이머 시작'])
    const id = setInterval(() => setSec((s) => (s > 0 ? s - 1 : 0)), 1000) // 🟢 시작
    return () => {
      clearInterval(id) // 🔴 정리 (시작 바로 옆)
      onLog((prev) => [...prev, '🔴 정리: clearInterval 실행'])
    }
  }, [onLog])
  return sec
}

// useCountdown을 '한 줄'로 재사용하는 컴포넌트
function Timer({ onLog }) {
  const sec = useCountdown(10, onLog)
  return (
    <div style={box}>
      ⏱️ 남은 시간 · <b>{sec}초</b>
      {sec === 0 && ' · 완료!'}
    </div>
  )
}

export default function CountdownHook() {
  const [mounted, setMounted] = useState(true)
  const [log, setLog] = useState([])

  return (
    <>
      <div className="button-row" style={{ margin: '4px 0 12px' }}>
        <button className={'chip' + (mounted ? ' on' : '')} onClick={() => setMounted((v) => !v)}>
          {mounted ? '⏹ 언마운트하기 (정리 실행)' : '▶ 다시 마운트하기'}
        </button>
      </div>

      {mounted ? (
        <Timer onLog={setLog} />
      ) : (
        <div style={{ ...box, color: 'var(--muted)' }}>(언마운트됨 · 타이머 정지)</div>
      )}

      <ul className="section-list" style={{ marginTop: 6 }}>
        {log.length === 0 ? (
          <li style={{ color: 'var(--muted)' }}>아직 기록 없음</li>
        ) : (
          log.map((line, i) => <li key={i}>{line}</li>)
        )}
      </ul>
    </>
  )
}
