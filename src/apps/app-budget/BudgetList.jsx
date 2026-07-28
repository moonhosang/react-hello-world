import { useBudget } from './BudgetContext.jsx'

// 거래 목록 — transactions.map으로 그리고 각 항목에 key를 준다.
// 수입은 초록 +, 지출은 빨강 −으로 구분한다. ✕로 삭제한다.

const won = (n) => n.toLocaleString('ko-KR') + '원'

export default function BudgetList() {
  const { transactions, deleteTransaction } = useBudget()

  // 비었을 때 — 목록 대신 안내 문구만 보여 준다.
  if (transactions.length === 0) {
    return (
      <p className="section-desc" style={{ margin: 0 }}>
        거래가 없다. 위에서 하나 추가해 보자.
      </p>
    )
  }

  return (
    <ul
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* 거래 한 줄씩 — map으로 그리고 key엔 고유 id를 준다 */}
      {transactions.map((t) => {
        const income = t.type === 'income'
        return (
          // 항목 한 줄 — 왼쪽 색 띠로 수입(초록)·지출(빨강)을 구분한다
          <li
            key={t.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid var(--border)',
              borderLeft: `4px solid ${income ? '#16a34a' : '#dc2626'}`,
            }}
          >
            {/* 내용 — 남는 공간을 채운다 */}
            <span style={{ flex: 1 }}>{t.text}</span>
            {/* 금액 — 부호와 색으로 수입/지출을 나타낸다 */}
            <span style={{ fontWeight: 700, color: income ? '#16a34a' : '#dc2626' }}>
              {income ? '+' : '−'}
              {won(t.amount)}
            </span>
            {/* 삭제 버튼 — 이 항목의 id로 deleteTransaction을 부른다 */}
            <button
              className="chip"
              onClick={() => deleteTransaction(t.id)}
              aria-label="삭제"
            >
              ✕
            </button>
          </li>
        )
      })}
    </ul>
  )
}
