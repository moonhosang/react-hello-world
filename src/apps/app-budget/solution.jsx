import { useState, useMemo, useRef } from 'react'

// 정답 예시 — 미니 가계부 (파생 통계 useMemo)
// 핵심: 총수입·총지출·잔액은 상태가 아니라 transactions에서 "계산해 내는 값"이다.
// useMemo로 거래가 바뀔 때만 다시 계산한다.

const won = (n) => n.toLocaleString('ko-KR') + '원'

export default function SolutionBudget() {
  const [transactions, setTransactions] = useState([
    { id: 1, text: '월급', amount: 3000000, type: 'income' },
    { id: 2, text: '장보기', amount: 85000, type: 'expense' },
  ])
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const nextId = useRef(3)

  // 추가 — 빈 내용·0 이하 금액은 막고, 새 거래를 붙인 새 배열로 set 한 뒤 입력을 비운다.
  function handleAdd() {
    const trimmed = text.trim()
    const money = Number(amount)
    if (!trimmed || !Number.isFinite(money) || money <= 0) return
    setTransactions([
      ...transactions,
      { id: nextId.current++, text: trimmed, amount: money, type },
    ])
    setText('')
    setAmount('')
  }

  // 삭제 — 해당 id만 뺀 새 배열로 set 한다(원본을 건드리지 않는다).
  function handleDelete(id) {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  // ✅ 파생 통계 — transactions에서 계산해 낸다. 따로 state로 두지 않는다.
  const stats = useMemo(() => {
    let income = 0
    let expense = 0
    for (const t of transactions) {
      if (t.type === 'income') income += t.amount
      else expense += t.amount
    }
    return { income, expense, balance: income - expense }
  }, [transactions])

  const cell = {
    flex: 1,
    minWidth: 100,
    padding: '12px 14px',
    borderRadius: 12,
    background: 'var(--brand-soft)',
    textAlign: 'center',
  }
  const label = { margin: 0, fontSize: 13, color: 'var(--muted)' }
  const num = { margin: '6px 0 0', fontSize: 18, fontWeight: 700 }

  return (
    <div className="demo-card">
      {/* 요약 카드 — 파생 통계(stats)를 총수입·총지출·잔액으로 보여 준다 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        <div style={cell}>
          <p style={label}>총수입</p>
          <p style={{ ...num, color: '#16a34a' }}>+{won(stats.income)}</p>
        </div>
        <div style={cell}>
          <p style={label}>총지출</p>
          <p style={{ ...num, color: '#dc2626' }}>−{won(stats.expense)}</p>
        </div>
        <div style={cell}>
          <p style={label}>잔액</p>
          <p style={{ ...num, color: stats.balance < 0 ? '#dc2626' : 'var(--text)' }}>
            {won(stats.balance)}
          </p>
        </div>
      </div>

      {/* 입력 폼 — 내용·금액·유형을 controlled input으로 받아 handleAdd로 추가한다 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        <input
          value={text}
          placeholder="내용 (예: 커피)"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          style={{ flex: 2, minWidth: 120 }}
        />
        <input
          type="number"
          value={amount}
          placeholder="금액"
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          style={{ flex: 1, minWidth: 90 }}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ flex: 1, minWidth: 90 }}>
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
        <button onClick={handleAdd}>➕ 추가</button>
      </div>

      {/* 목록 — 비었으면 안내, 있으면 map으로 한 줄씩(key엔 고유 id) 그린다 */}
      {transactions.length === 0 ? (
        <p className="demo-desc" style={{ margin: 0 }}>거래가 없다. 위에서 하나 추가해 보자.</p>
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                {/* 삭제 버튼 — 이 항목의 id로 handleDelete를 부른다 */}
                <button className="chip" onClick={() => handleDelete(t.id)} aria-label="삭제">
                  ✕
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
