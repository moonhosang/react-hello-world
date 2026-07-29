import { useState } from 'react'

// ⚠️ 연속 setState 함정
// setCount(count + 1)을 세 번 해도 +1만 오른다.
// 이유: 한 번의 이벤트가 처리되는 동안 count는 '같은 값(스냅샷)'으로 고정돼 있다.
// 해결: 이전 값을 받는 '함수형 업데이트' setCount(c => c + 1)를 쓴다.

export default function TrapCounter() {
  const [count, setCount] = useState(0)

  function wrong() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1) // 셋 다 같은 count(스냅샷)를 봐서 결국 +1
  }

  function right() {
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    setCount((c) => c + 1) // 각자 '직전 값'을 받아 +3
  }

  return (
    <div className="card counter-card">
      <div className="file-label">📄 TrapCounter.jsx</div>
      <div className="counter-value">{count}</div>
      <div className="button-row">
        <button onClick={wrong}>❌ +3 (count + 1 세 번)</button>
        <button onClick={right}>✅ +3 (함수형 업데이트)</button>
        <button onClick={() => setCount(0)}>🔄</button>
      </div>
      <p className="demo-desc">
        ❌ 버튼은 <b>+1</b>만 오른다. ✅ 버튼(<code>c =&gt; c + 1</code>)은 <b>+3</b>. 눌러서 차이를 보자.
      </p>
    </div>
  )
}

// 🗄️ React 내부 상태 저장소 시각화 — 한 이벤트가 처리되는 동안 '스냅샷 count'와 'React 저장소'가 어떻게 다른지.
const mono = '"Consolas", ui-monospace, monospace'
const STORE = {
  wrong: {
    tag: '❌ setCount(count + 1)',
    rows: [
      { read: 'count = 0 (스냅샷)', calc: '0 + 1 = 1', store: 1, note: '저장소에 1 예약' },
      { read: 'count = 0 (여전히!)', calc: '0 + 1 = 1', store: 1, note: '1로 덮어씀' },
      { read: 'count = 0 (여전히!)', calc: '0 + 1 = 1', store: 1, note: '1로 덮어씀' },
    ],
    snapshot: '0', tail: '값을 넣으면 세 번 다 스냅샷 0을 봐서 1로 덮어쓴다 → 저장소는 1. 그래서 +1.',
  },
  right: {
    tag: '✅ setCount(c => c + 1)',
    rows: [
      { read: 'c = 0 (현재 저장소)', calc: '0 + 1 = 1', store: 1, note: '저장소 = 1' },
      { read: 'c = 1 (직전 예약값)', calc: '1 + 1 = 2', store: 2, note: '저장소 = 2' },
      { read: 'c = 2 (직전 예약값)', calc: '2 + 1 = 3', store: 3, note: '저장소 = 3' },
    ],
    snapshot: '—', tail: '함수를 넣으면 각자 직전 예약값을 받아 0→1→2→3 → 저장소는 3. 그래서 +3.',
  },
}
export function SetStateStoreViz() {
  const [mode, setMode] = useState('wrong')
  const [shown, setShown] = useState(0)
  const d = STORE[mode]
  const done = shown >= d.rows.length
  const store = shown > 0 ? d.rows[shown - 1].store : 0
  const reset = (m) => { setMode(m); setShown(0) }
  const box = { flex: '1 1 160px', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }
  return (
    <div className="card">
      <div className="file-label">🗄️ React 내부 상태 저장소 — 한 이벤트 처리 중 (값 vs 함수)</div>
      <div className="button-row">
        <button className={'chip' + (mode === 'wrong' ? ' on' : '')} onClick={() => reset('wrong')}>❌ 값</button>
        <button className={'chip' + (mode === 'right' ? ' on' : '')} onClick={() => reset('right')}>✅ 함수</button>
      </div>
      <div style={{ fontFamily: mono, fontSize: 13, margin: '8px 0' }}><b>{d.tag}</b> 를 세 번</div>
      <div className="tree-box" style={{ fontFamily: mono, fontSize: 12.5 }}>
        {shown === 0 && <div className="demo-desc" style={{ margin: 0 }}>▶ 눌러 한 번씩 처리해 보라.</div>}
        {d.rows.slice(0, shown).map((r, i) => (
          <div key={i} style={{ marginBottom: 4, color: i === shown - 1 ? 'var(--brand)' : 'inherit' }}>
            {i + 1}. {r.read} → {r.calc} → {r.note}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        <div style={box}>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>📸 이 렌더의 count <b>(스냅샷)</b></div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{d.snapshot}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{mode === 'wrong' ? '렌더 내내 0 고정' : '함수형은 스냅샷 안 씀'}</div>
        </div>
        <div style={box}>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>🗄️ <b>React 저장소</b></div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--brand)' }}>count = {store}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{done ? '→ 이 값으로 리렌더' : '예약 처리 중…'}</div>
        </div>
      </div>
      <div className="button-row" style={{ marginTop: 10 }}>
        <button className="chip on" disabled={done} onClick={() => setShown((v) => Math.min(d.rows.length, v + 1))}>{done ? '✅ 끝' : '▶ 다음 처리'}</button>
        <button className="chip" onClick={() => setShown(0)}>↺ 처음</button>
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>{d.tail}</p>
    </div>
  )
}
