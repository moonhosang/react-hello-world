// 가입 완료 화면 — 조립이 제대로 됐고 검증을 통과하면 이 화면이 뜬다.
export default function SignupDone({ form, onReset }) {
  return (
    <div className="demo-card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 6 }}>🎉</div>
      <h3 style={{ margin: '4px 0' }}>가입 완료</h3>
      <p className="demo-desc">
        환영한다, <b>{form.name}</b>! · 관심분야: {form.interests.join(', ')}
      </p>
      <div className="button-row" style={{ marginTop: 14 }}>
        <button onClick={onReset}>다시 입력</button>
      </div>
    </div>
  )
}
