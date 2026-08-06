import { useForm, STEPS } from './FormContext.jsx'

// 진행바 — "지금 몇 번째 스텝인가"만 보여준다.
// 핵심: 이 컴포넌트는 props를 하나도 받지 않는다.
// 부모(Wizard)가 step을 내려주지 않아도, useForm()으로 Context에서 직접 꺼낸다.
// props 드릴링 없이 트리 어디에 놔도 현재 step을 안다는 게 Context의 이점이다.
export default function ProgressBar() {
  const { step } = useForm() // Context에서 step만 구독한다
  const total = STEPS.length // 전체 스텝 수(3)
  const pct = ((step + 1) / total) * 100 // 진행률(%) — 파생 계산

  return (
    <div style={{ marginBottom: 16 }}>
      {/* "2 / 3 · 프로필"처럼 숫자와 현재 스텝 이름을 함께 표시 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 13,
          color: 'var(--muted)',
          marginBottom: 6,
        }}
      >
        <span>
          <b style={{ color: 'var(--brand)' }}>{step + 1}</b> / {total} · {STEPS[step]}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>

      {/* 진행 막대 — 바깥은 트랙, 안쪽 너비를 pct로 채운다 */}
      <div style={{ height: 8, borderRadius: 999, background: 'var(--border)', overflow: 'hidden' }}>
        <div
          style={{
            width: pct + '%',
            height: '100%',
            background: 'var(--brand)',
            transition: 'width .25s',
          }}
        />
      </div>
    </div>
  )
}
