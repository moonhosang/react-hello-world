// ============================================================
// 결과 화면 — 점수를 보여주고 다시 하기 버튼을 준다.
// ============================================================
// 필요한 값(score, total)과 콜백(onReset)을 props로 받는다.
// 점수 비율(percent)은 받은 값으로 여기서 계산해 이모지·문구를 정한다.

export default function ResultScreen({ score, total, onReset }) {
  const percent = Math.round((score / total) * 100) // 맞힌 비율(%) — 이모지·문구 기준
  return (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
      {/* 성적별 이모지: 만점 🏆 / 60점 이상 🎉 / 그 외 💪 */}
      <div style={{ fontSize: 40, marginBottom: 8 }}>
        {percent === 100 ? '🏆' : percent >= 60 ? '🎉' : '💪'}
      </div>
      <div className="demo-desc" style={{ marginBottom: 6 }}>결과</div>
      {/* 점수: 맞힌 개수 / 전체 개수 */}
      <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>
        {score} / {total}
      </div>
      {/* 풀어쓴 결과 문구 + 환산 점수 */}
      <p className="demo-desc" style={{ marginBottom: 16 }}>
        {total}문제 중 <b>{score}문제</b>를 맞혔다. ({percent}점)
      </p>
      {/* 다시 하기: onReset으로 부모에게 RESET을 알린다 */}
      <div className="button-row">
        <button onClick={onReset}>🔄 다시 하기</button>
      </div>
    </div>
  )
}
