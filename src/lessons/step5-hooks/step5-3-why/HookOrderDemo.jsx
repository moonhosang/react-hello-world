import { useState } from 'react'

// ③ '왜 이런 규칙인가'를 눈으로 보여주는 데모다.
// 실제로 크래시를 내지 않는 안전한 '그림'이다 — 조건부 훅 호출이 왜 위험한지를 재현만 한다.
//
// 핵심: 리액트는 훅을 이름표가 아니라 '부른 순서(0, 1, 2 …)'로 구분해 각 값을 기억한다.
// 그래서 렌더마다 호출 순서가 같아야 각 훅이 자기 값을 정확히 되찾는다.
export default function HookOrderDemo() {
  const [skip, setSkip] = useState(false)

  // 리액트가 첫 렌더 때 '순서대로' 저장해 둔 기억 상자다. (0번 = 이름, 1번 = 카운트)
  const memory = [
    { slot: 0, stored: "'철수'" },
    { slot: 1, stored: '0' },
  ]

  // 이번 렌더에서 컴포넌트가 실제로 부르는 훅들이다 (부른 순서대로).
  // skip이 켜지면 '이름 훅'을 조건부로 건너뛴 상황을 흉내 낸다 → 순서가 한 칸씩 밀린다.
  const calls = skip
    ? [{ name: 'useState(count)', wants: '숫자' }]
    : [
        { name: 'useState(name)', wants: '문자열' },
        { name: 'useState(count)', wants: '숫자' },
      ]

  return (
    <div className="demo-card">
      <div className="button-row">
        <button className={'chip' + (skip ? ' on' : '')} onClick={() => setSkip((v) => !v)}>
          {skip ? '⚠️ 조건부로 이름 훅을 건너뛴 상태' : '✅ 정상 (모든 훅을 순서대로 호출)'}
        </button>
      </div>

      <p className="demo-desc">
        리액트는 이름이 아니라 <b>부른 순서</b>로 값을 찾는다. 버튼을 눌러 이름 훅을{' '}
        <b>건너뛰면</b> 순서가 한 칸씩 밀려 값이 어긋나는 걸 볼 수 있다.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '10px 0' }}>
        {calls.map((c, i) => {
          const box = memory[i]
          // 건너뛴 렌더에서는 count(숫자)가 0번 상자(문자열 '철수')를 받아 버린다 → 어긋남.
          const mismatch = skip && c.wants === '숫자' && box.slot === 0
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 8,
                fontFamily: 'Consolas, ui-monospace, monospace',
                fontSize: 13,
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: mismatch ? 'rgba(239, 68, 68, 0.12)' : 'var(--bg)',
              }}
            >
              <span style={{ color: 'var(--muted)' }}>{i}번째 호출</span>
              <code>{c.name}</code>
              <span style={{ color: 'var(--muted)' }}>→ 기억상자 {box.slot}번</span>
              <code>{box.stored}</code>
              {mismatch && <span style={{ color: '#ef4444', fontWeight: 700 }}>⚠️ 어긋남</span>}
            </div>
          )
        })}
      </div>

      <p className="demo-desc">
        {skip
          ? '⚠️ count가 0번 상자(문자열 "철수")를 받아 버렸다 — 훅 하나를 건너뛰자 순서가 밀려 값이 어긋난 것이다.'
          : '✅ 순서가 그대로라 각 훅이 자기 값을 정확히 되찾는다. 그래서 훅은 늘 같은 순서로 불러야 한다.'}
      </p>
    </div>
  )
}
