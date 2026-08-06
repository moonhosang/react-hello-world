import { useForm } from './FormContext.jsx'

// 요약(완료) 화면 — 제출을 마치면 이 화면이 뜬다.
// 이 컴포넌트는 트리에서 가장 안쪽에 있지만, form '전체'를 props 없이 읽는다.
// 만약 props로 했다면 Wizard → 완료화면 → Review까지 form을 계속 내려야 했다.
// useForm() 한 줄이면 깊이와 무관하게 전체 폼을 꺼내 요약할 수 있다.
export default function Review() {
  const { form, reset } = useForm()

  // 한 줄씩 라벨·값으로 표시할 목록(파생). 빈 값은 '(없음)'으로 채운다.
  const rows = [
    ['이메일', form.email || '(없음)'],
    ['이름', form.name || '(없음)'],
    ['닉네임', form.nickname || '(없음)'],
    ['경력', form.level || '(없음)'],
    ['관심분야', form.interests.length ? form.interests.join(', ') : '(없음)'],
  ]

  return (
    <div className="demo-card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 6 }}>🎉</div>
      <h3 style={{ margin: '4px 0' }}>가입 완료</h3>
      <p className="section-desc" style={{ margin: '0 0 12px' }}>
        아래는 세 스텝에서 모은 값을 <b>한곳에서 요약</b>한 것이다.
      </p>

      {/* 요약 표 — form 전체를 그대로 나열한다 */}
      <div style={{ textAlign: 'left', maxWidth: 320, margin: '0 auto' }}>
        {rows.map(([label, value]) => (
          <div
            key={label}
            style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}
          >
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>{label}</span>
            <b style={{ fontSize: 14 }}>{value}</b>
          </div>
        ))}
      </div>

      <div className="button-row" style={{ marginTop: 16, justifyContent: 'center' }}>
        <button onClick={reset}>처음부터 다시</button>
      </div>
    </div>
  )
}
