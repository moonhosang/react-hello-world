import { useState } from 'react'

// 📽️ 소스 + 동작 과정 — 소스를 '즉시' 펼쳐 두고, 실행 흐름을 한 단계씩 짚는다.
//   현재 단계가 가리키는 줄이 소스에서 하이라이트되어, "지금 어느 줄이 도는지"가 눈에 보인다.
//   file  : 파일명(라벨)
//   code  : 소스 문자열 (줄 단위로 쪼개 렌더 — 줄 번호가 steps의 hl과 맞아야 한다)
//   steps : [{ hl?: number[](1-based 줄번호), t: 제목, d: 설명(문자열/JSX), tag?: 작은 배지, note?: 상태 스냅샷 }]
export default function SourceTrace({ file, code, steps }) {
  const [i, setI] = useState(0)
  const lines = code.replace(/\n+$/, '').split('\n')
  const step = steps[i]
  const hl = new Set(step?.hl ?? [])

  return (
    <div className="strace">
      <div className="strace-head">
        <span className="cb-file">📄 {file}</span>
        <span className="strace-count">동작 과정 {i + 1} / {steps.length}</span>
      </div>

      {/* 소스 — 항상 펼쳐 보인다. 현재 단계의 줄이 강조된다. */}
      <div className="strace-code">
        {lines.map((ln, idx) => {
          const n = idx + 1
          return (
            <div key={n} className={'strace-line' + (hl.has(n) ? ' on' : '')}>
              <span className="strace-ln">{n}</span>
              <span className="strace-tx">{ln === '' ? ' ' : ln}</span>
            </div>
          )
        })}
      </div>

      {/* 현재 단계 설명 */}
      <div className="strace-step">
        <div className="strace-step-head">
          <span className="strace-step-no">{i + 1}</span>
          {step.tag && <span className="strace-tag">{step.tag}</span>}
          <b>{step.t}</b>
        </div>
        <p className="strace-step-desc">{step.d}</p>
        {step.note && <p className="strace-note">📦 {step.note}</p>}
      </div>

      {/* 이동 */}
      <div className="strace-nav">
        <button className="chip" onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0}>◀ 이전</button>
        <div className="strace-dots">
          {steps.map((_, k) => (
            <button
              key={k}
              className={'strace-dot' + (k === i ? ' on' : '')}
              onClick={() => setI(k)}
              aria-label={`${k + 1}단계로`}
            />
          ))}
        </div>
        <button
          className="chip on"
          onClick={() => setI((v) => Math.min(steps.length - 1, v + 1))}
          disabled={i === steps.length - 1}
        >
          {i === steps.length - 1 ? '끝' : '다음 ▶'}
        </button>
      </div>
    </div>
  )
}
