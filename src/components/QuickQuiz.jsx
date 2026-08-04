import { useState } from 'react'

const mono = 'var(--font-mono)'

// 보기 순서를 섞을 순열을 만든다 — 저자가 정답을 늘 같은 자리에 둬도 '모르면 B' 찍기가 안 통하게.
function shuffled(n) {
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 데이터 주도 선다형 드릴 — questions 배열만 넘기면 자동 채점·즉시 해설.
// 입문자용: '같은 수준'을 표면(데이터·상황)만 바꿔 여러 번 반복해 손에 익힌다.
//
// question = {
//   q: '문제 지문',
//   code?: '보여줄 코드(선택)',
//   options: ['보기A', '보기B', ...],   // 화면엔 매번 섞여서 나온다
//   codeOptions?: true,                  // 보기 자체가 코드면 true → 고정폭 글꼴로
//   answer: 정답 인덱스(위 options 기준, 0부터),
//   explain: '정답 해설(왜 그런지)',
// }
export default function QuickQuiz({ title = '🧩 확인 퀴즈', intro, questions }) {
  const [picked, setPicked] = useState(() => questions.map(() => null)) // 고른 '원본' 인덱스
  const [order] = useState(() => questions.map((q) => shuffled(q.options.length))) // 화면 순서 → 원본 인덱스
  const answeredCount = picked.filter((p) => p !== null).length
  const correctCount = picked.filter((p, i) => p === questions[i].answer).length
  const done = answeredCount === questions.length
  // 한 번 고르면 잠금(그 문제는 아직 null일 때만 기록). 다시 풀려면 리셋.
  const pick = (qi, origIdx) => setPicked((arr) => arr.map((v, i) => (i === qi && v === null ? origIdx : v)))
  const reset = () => setPicked(questions.map(() => null))

  return (
    <div className="card" style={{ borderColor: 'var(--brand)' }}>
      <div className="file-label" style={{ color: 'var(--brand)' }}>{title}</div>
      {intro && <p className="demo-desc" style={{ marginTop: 0 }}>{intro}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {questions.map((qq, qi) => {
          const p = picked[qi]
          const solved = p !== null
          const ok = p === qq.answer
          return (
            <div key={qi} style={{ borderTop: qi ? '1px solid var(--border)' : 'none', paddingTop: qi ? 12 : 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: qq.code ? 6 : 8 }}>Q{qi + 1}. {qq.q}</div>
              {qq.code && <pre className="err-code" style={{ margin: '0 0 8px' }}>{qq.code}</pre>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {order[qi].map((origIdx, pos) => {
                  const opt = qq.options[origIdx]
                  const isAnswer = origIdx === qq.answer
                  const isPicked = origIdx === p
                  let border = 'var(--border)', bg = 'transparent', mark = ''
                  if (solved) {
                    if (isAnswer) { border = '#16a34a'; bg = 'rgba(22,163,74,.08)'; mark = '  ✓' }
                    else if (isPicked) { border = '#dc2626'; bg = 'rgba(220,38,38,.08)'; mark = '  ✗' }
                  }
                  return (
                    <button
                      key={pos}
                      onClick={() => pick(qi, origIdx)}
                      aria-disabled={solved}
                      style={{
                        textAlign: 'left', border: `1.5px solid ${border}`, background: bg,
                        borderRadius: 8, padding: '7px 10px', cursor: solved ? 'default' : 'pointer',
                        font: 'inherit', fontFamily: qq.codeOptions ? mono : 'inherit',
                        fontSize: 13.5, color: 'var(--text)',
                      }}
                    >
                      <b style={{ color: 'var(--muted)', fontFamily: 'inherit' }}>{String.fromCharCode(65 + pos)}.</b> {opt}{mark}
                    </button>
                  )
                })}
              </div>
              {solved && (
                <div className="demo-desc" role="status" style={{ marginTop: 8, color: ok ? 'var(--brand)' : 'var(--red)' }}>
                  {ok ? '✅ 정답 — ' : '❌ 아쉽다 — '}{qq.explain}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="button-row" style={{ marginTop: 12, alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="demo-desc" style={{ margin: 0, fontWeight: 700 }}>
          맞힘 {correctCount} / {questions.length}{done ? ' — 다 풀었다! 🎉' : ` · 푼 문제 ${answeredCount}`}
        </span>
        <button className="chip" onClick={reset}>↺ 다시 풀기</button>
      </div>
    </div>
  )
}
