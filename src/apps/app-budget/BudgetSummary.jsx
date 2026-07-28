import { useBudget } from './BudgetContext.jsx'

// 상단 요약 카드 — 총수입·총지출·잔액을 보여 준다.
// 이 값들은 상태가 아니라 useBudget()이 넘겨 주는 "파생 통계(stats)"다.

const won = (n) => n.toLocaleString('ko-KR') + '원'

export default function BudgetSummary() {
  const { stats } = useBudget()

  const cell = {
    flex: 1,
    minWidth: 120,
    padding: '14px 16px',
    borderRadius: 12,
    background: 'var(--brand-soft)',
    textAlign: 'center',
  }
  const label = { margin: 0, fontSize: 13, color: 'var(--muted)' }
  const num = { margin: '6px 0 0', fontSize: 20, fontWeight: 700 }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
      {/* 총수입 카드 — 수입 합계를 초록 +로 보여 준다 */}
      <div style={cell}>
        <p style={label}>총수입</p>
        <p style={{ ...num, color: '#16a34a' }}>+{won(stats.income)}</p>
      </div>
      {/* 총지출 카드 — 지출 합계를 빨강 −로 보여 준다 */}
      <div style={cell}>
        <p style={label}>총지출</p>
        <p style={{ ...num, color: '#dc2626' }}>−{won(stats.expense)}</p>
      </div>
      {/* 잔액 카드 — 수입−지출. 음수면 빨강으로 경고한다 */}
      <div style={cell}>
        <p style={label}>잔액</p>
        <p style={{ ...num, color: stats.balance < 0 ? '#dc2626' : 'var(--text)' }}>
          {won(stats.balance)}
        </p>
      </div>
    </div>
  )
}
