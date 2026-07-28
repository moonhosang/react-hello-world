// 관심분야 다중 선택 — 칩(chip)을 눌러 켜고 끄는 입력.
// Field(한 칸에 값 하나)와 달리, 이건 '여러 개를 고르는' 입력이라 따로 컴포넌트로 뺐다.
// 역시 상태는 갖지 않는다 — 후보·선택배열·에러를 props로 받아 '표시'만 하고,
// 칩을 누르면 어떤 값을 눌렀는지 onToggle로 부모에게 올려보낸다(토글 판단은 부모 몫).
//
// props:
//   label    : 라벨 문구
//   options  : 고를 수 있는 후보 문자열 배열 (예: ['프론트엔드','백엔드', ...])
//   selected : 지금 선택된 값들의 배열 (부모 state의 form.interests)
//   onToggle : 칩을 눌렀을 때 부르는 콜백 (value 하나를 넘긴다)
//   error    : 보여줄 에러 문구. 없으면 에러 줄을 그리지 않는다.
export default function ChipSelect({ label, options, selected, onToggle, error, min = 2, max = 4 }) {
  const full = selected.length >= max // 최대 개수에 도달했나

  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
        {label}
      </label>

      {/* 후보를 칩으로 죽 늘어놓는다. 선택된 칩엔 'on' 클래스를 붙여 강조한다(파생 표시). */}
      <div className="chip-row">
        {options.map((opt) => {
          const on = selected.includes(opt) // 이 후보가 지금 선택돼 있나
          const locked = !on && full // 최대 도달 시 '미선택' 칩은 잠근다(더 못 고르게)
          return (
            <button
              key={opt}
              type="button" // form 안이라 기본 submit이 되지 않게 막는다
              className={'chip' + (on ? ' on' : '')}
              onClick={() => onToggle(opt)}
              disabled={locked}
              style={locked ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {/* 선택 개수 — 고를 때마다 바로 갱신되는 파생 표시 */}
      <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted)' }}>
        총 <b style={{ color: full ? 'var(--brand)' : 'var(--text)' }}>{selected.length}</b>개 선택
        {' '}<span style={{ opacity: 0.7 }}>({min}~{max}개)</span>
      </p>

      {/* 에러 줄 — 조건부 렌더링. 개수 조건을 못 맞췄을 때만 뜬다. */}
      {error && (
        <p style={{ margin: '6px 0 0', color: 'var(--red)', fontSize: 13 }}>
          ⚠ {error}
        </p>
      )}
    </div>
  )
}
