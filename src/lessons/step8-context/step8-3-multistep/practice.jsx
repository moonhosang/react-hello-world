import { FormProvider, useForm, STEPS } from './FormContext.jsx'

// 🎯 실습 — 진행바가 Context에서 step을 '직접' 읽게 만들자
//
// 이 미니 마법사에는 '다음/이전' 버튼이 있어 step이 0→1→2로 바뀐다.
// 그런데 아래 ProgressBar는 아직 step을 Context에서 읽지 않고 0으로 고정돼 있다.
// → 버튼을 눌러도 막대가 안 움직인다. useForm()으로 step을 꺼내 반영하면 된다.

function ProgressBar() {
  // 🟢 TODO ①: useForm()에서 step을 꺼낸다.
  //            예) const { step } = useForm()
  // 🟢 TODO ②: 아래 0을 위에서 꺼낸 step으로 바꾼다.
  const step = 0 // ← 여기가 항상 0이라 막대가 첫 칸에 멈춰 있다

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

// step을 바꿔볼 수 있는 이전/다음 버튼 (이미 Context를 쓰고 있다 — 참고용)
function Controls() {
  const { step, prev, next } = useForm()
  return (
    <div className="button-row" style={{ justifyContent: 'space-between' }}>
      <button onClick={prev} disabled={step === 0}>← 이전</button>
      <button onClick={next} disabled={step === STEPS.length - 1}>다음 →</button>
    </div>
  )
}

export default function PracticeProgress() {
  // FormProvider로 감싸야 useForm()이 통한다.
  return (
    <FormProvider>
      <div className="demo-card">
        <ProgressBar />
        <Controls />
      </div>
    </FormProvider>
  )
}
