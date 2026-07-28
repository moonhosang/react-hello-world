// ============================================================
// 진행(문제) 화면 — 문제·보기·남은 시간 막대·진행 표시를 그린다.
// ============================================================
// 값(question, current, total, score, timeLeft, timePerQ)과
// 콜백(onAnswer)을 props로 받는다.
// 보기를 고르면 onAnswer(보기 index)로 부모에게 "몇 번을 골랐는지"만 알린다.
// 채점·다음 문항 계산은 부모(QuizGame)의 reducer가 맡는다.

export default function QuestionScreen({
  question,
  current,
  total,
  score,
  timeLeft,
  timePerQ,
  onAnswer,
}) {
  const progress = (timeLeft / timePerQ) * 100
  const urgent = timeLeft <= 3

  return (
    <div>
      {/* 상단: 진행 표시 + 남은 시간 + 점수 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <span className="badge">{current + 1} / {total}</span>
        <span
          className="demo-desc"
          style={{ fontWeight: 700, color: urgent ? '#dc2626' : undefined }}
        >
          ⏱️ {timeLeft}초
        </span>
        <span className="demo-desc">점수 {score}</span>
      </div>

      {/* 남은 시간 막대 */}
      <div
        style={{
          height: 8,
          background: 'rgba(0,0,0,0.08)',
          borderRadius: 999,
          overflow: 'hidden',
          marginBottom: 18,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: urgent ? '#dc2626' : 'var(--brand)',
            transition: 'width 1s linear',
          }}
        />
      </div>

      {/* 문제 */}
      <h4 style={{ margin: '0 0 16px', fontSize: 17, lineHeight: 1.5 }}>
        Q{current + 1}. {question.q}
      </h4>

      {/* 보기 — 고르면 부모에게 고른 index를 알린다 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i)}
            style={{
              textAlign: 'left',
              padding: '12px 16px',
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--panel)',
              cursor: 'pointer',
              fontSize: 15,
            }}
          >
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
