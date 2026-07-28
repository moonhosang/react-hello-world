// ============================================================
// 시작 화면 — 문제 수·제한 시간을 안내하고 시작 버튼을 준다.
// ============================================================
// 필요한 값(total, timePerQ)과 콜백(onStart)을 props로 받는다.
// 상태는 없다 — 부모(QuizGame)가 내려준 값을 그리고, 버튼을 누르면 onStart를 호출한다.

export default function StartScreen({ total, timePerQ, onStart }) {
  return (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
      <div style={{ fontSize: 40, marginBottom: 8 }}>🧠</div>
      <div className="demo-desc" style={{ marginBottom: 6 }}>리액트 상식 퀴즈</div>
      <p className="demo-desc" style={{ marginBottom: 16 }}>
        총 <b>{total}문제</b> · 문항당 <b>{timePerQ}초</b>. 시작을 누르면 첫 문제가 나온다.
      </p>
      <div className="button-row" style={{ justifyContent: 'center' }}>
        <button onClick={onStart}>▶ 시작하기</button>
      </div>
    </div>
  )
}
