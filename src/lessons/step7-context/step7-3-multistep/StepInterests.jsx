import { useForm, INTEREST_OPTIONS } from './FormContext.jsx'

// 3번 스텝 — 관심분야(칩 2~4개).
// 배열 필드도 props 없이 Context에서 다룬다.
// form.interests를 읽어 선택 여부를 판단하고, toggleInterest로 켜고 끈다.
export default function StepInterests() {
  const { form, toggleInterest } = useForm()
  const selected = form.interests
  const full = selected.length >= 4 // 최대 4개 도달 여부(파생 판단)

  return (
    <div>
      <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
        관심분야 (2~4개)
      </label>

      {/* 후보를 칩으로 늘어놓는다. 선택된 칩엔 'on' 클래스로 강조. */}
      <div className="chip-row">
        {INTEREST_OPTIONS.map((opt) => {
          const on = selected.includes(opt) // 지금 선택돼 있나
          const locked = !on && full // 4개 다 찼으면 미선택 칩은 잠근다
          return (
            <button
              key={opt}
              type="button"
              className={'chip' + (on ? ' on' : '')}
              onClick={() => toggleInterest(opt)}
              disabled={locked}
              style={locked ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {/* 선택 개수 — 고를 때마다 즉시 갱신되는 파생 표시 */}
      <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--muted)' }}>
        총 <b style={{ color: full ? 'var(--brand)' : 'var(--text)' }}>{selected.length}</b>개 선택{' '}
        <span style={{ opacity: 0.7 }}>(2~4개)</span>
      </p>
    </div>
  )
}
