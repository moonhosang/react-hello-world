import { FormProvider, useForm, STEPS } from './FormContext.jsx'

// ✅ 정답 — 진행바가 useForm()으로 step을 직접 읽는다.
function ProgressBar() {
  const { step } = useForm() // Context에서 step을 꺼낸다 (props 없이!)

  const total = STEPS.length
  const pct = ((step + 1) / total) * 100

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>
        <b style={{ color: 'var(--brand)' }}>{step + 1}</b> / {total} · {STEPS[step]}
      </div>
      <div style={{ height: 8, borderRadius: 999, background: 'var(--border)', overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: 'var(--brand)', transition: 'width .25s' }} />
      </div>
    </div>
  )
}

function Controls() {
  const { step, prev, next } = useForm()
  return (
    <div className="button-row" style={{ justifyContent: 'space-between' }}>
      <button onClick={prev} disabled={step === 0}>← 이전</button>
      <button onClick={next} disabled={step === STEPS.length - 1}>다음 →</button>
    </div>
  )
}

export default function SolutionProgress() {
  return (
    <FormProvider>
      <div className="demo-card">
        <ProgressBar />
        <Controls />
      </div>
    </FormProvider>
  )
}
