import { useState } from 'react'

// 같은 '탭 UI'를 두 방식으로 만들어, state를 '누가 소유하나'가 왜 중요한지 실증한다.
// 목표: 한 번에 '하나만' 선택. ❌ 자식이 각자 소유하면 동기화가 깨지고, ✅ 부모가 소유하면 지켜진다.

const TABS = [
  { id: 0, label: '🏠 홈' },
  { id: 1, label: '🔔 알림' },
  { id: 2, label: '⚙️ 설정' },
]

// ❌ 자식이 각자 state 소유 — 형제끼리 서로를 모른다 → 여러 개가 동시에 켜질 수 있다.
function SelfTab({ label }) {
  const [active, setActive] = useState(false)
  return (
    <button className={'chip' + (active ? ' on' : '')} onClick={() => setActive((a) => !a)}>
      {label}
    </button>
  )
}

// ✅ 부모가 state 소유 — 자식은 active를 props로 받고, 클릭은 콜백(onSelect)으로 부모에 알린다.
function LiftedTab({ label, active, onSelect }) {
  return (
    <button className={'chip' + (active ? ' on' : '')} onClick={onSelect}>
      {label}
    </button>
  )
}

export default function OwnershipDemo() {
  const [mode, setMode] = useState('self') // 'self'(자식 소유) | 'lifted'(부모 소유)
  const [selectedId, setSelectedId] = useState(0) // 부모가 소유하는 '하나의 진실'

  return (
    <div>
      <div className="button-row" style={{ marginBottom: 10 }}>
        <button className={'chip' + (mode === 'self' ? ' on' : '')} onClick={() => setMode('self')}>❌ 자식이 각자 소유</button>
        <button className={'chip' + (mode === 'lifted' ? ' on' : '')} onClick={() => setMode('lifted')}>✅ 부모가 소유(끌어올리기)</button>
      </div>

      <div className="tree-box">
        <div className="demo-desc" style={{ marginBottom: 8 }}>탭을 여러 개 눌러 보라 — 목표는 <b>"한 번에 하나만 선택"</b>이다.</div>
        <div className="button-row">
          {mode === 'self'
            ? TABS.map((t) => <SelfTab key={t.id} label={t.label} />)
            : TABS.map((t) => (
              <LiftedTab key={t.id} label={t.label} active={selectedId === t.id} onSelect={() => setSelectedId(t.id)} />
            ))}
        </div>

        <div style={{ marginTop: 10 }}>
          {mode === 'self' ? (
            <p className="demo-desc" style={{ margin: 0, color: 'var(--red)' }}>
              🚫 각 탭이 <b>자기 active state</b>를 따로 가진다 → 형제끼리 몰라서 <b>여러 개가 동시에 켜진다</b>.
              게다가 부모는 "지금 뭐가 선택됐는지" <b>알 수도 없다</b> (자식의 비공개 state라서).
            </p>
          ) : (
            <p className="demo-desc" style={{ margin: 0, color: 'var(--brand)' }}>
              ✅ 부모가 <code>selectedId</code> <b>하나</b>를 가진다 → 항상 <b>하나만</b> 켜지고,
              부모는 <b>지금 선택: {TABS[selectedId].label}</b> 까지 안다. (자식은 props로 받고, 클릭만 콜백으로 알린다)
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
