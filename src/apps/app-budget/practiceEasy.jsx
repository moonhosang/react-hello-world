import { useState, useMemo, useRef } from 'react'

// 실전 앱 · 미니 가계부 (쉬움)
// 통계 계산이 거의 다 채워져 있다. 마지막 한 줄, 잔액만 채우면 된다.
//
// 파생 통계란? 총수입·총지출·잔액은 따로 state로 두지 않는다.
// 거래 배열(transactions)에서 "계산해 내는 값"이다. (중복 상태 = 버그의 원천)
//
// 할 일:
//   🟢 TODO: balance(잔액)를 계산한다. 잔액 = 총수입 - 총지출 이다.

const won = (n) => n.toLocaleString('ko-KR') + '원'

export default function PracticeBudgetEasy() {
  const [transactions, setTransactions] = useState([
    { id: 1, text: '월급', amount: 3000000, type: 'income' },
    { id: 2, text: '장보기', amount: 85000, type: 'expense' },
  ])
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const nextId = useRef(3)

  // 거래 추가 (골격 제공) — 항상 새 배열로 set 한다(불변성).
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

  function handleDelete(id) {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  // 파생 통계 — income/expense는 이미 채워져 있다.
  const stats = useMemo(() => {
    let income = 0
    let expense = 0
    for (const t of transactions) {
      if (t.type === 'income') income += t.amount
      else expense += t.amount
    }
    // 🟢 TODO: 잔액을 계산해서 balance에 넣자. (잔액 = 총수입 - 총지출)
    const balance = 0 // ← 이 줄을 balance = income - expense 로 바꾸자.
    return { income, expense, balance }
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

      {transactions.length === 0 ? (
        <p className="demo-desc" style={{ margin: 0 }}>거래가 없다. 위에서 하나 추가해 보자.</p>
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {transactions.map((t) => {
            const income = t.type === 'income'
            return (
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
                <span style={{ flex: 1 }}>{t.text}</span>
                <span style={{ fontWeight: 700, color: income ? '#16a34a' : '#dc2626' }}>
                  {income ? '+' : '−'}
                  {won(t.amount)}
                </span>
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
