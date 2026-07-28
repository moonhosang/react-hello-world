import { useState, useMemo, useRef } from 'react'

// 실전 앱 · 미니 가계부 (어려움)
// 껍데기(입력 폼·요약 카드·목록 UI)만 있다. 동작 로직은 대부분 비어 있다.
// 추가·삭제·파생 통계를 직접 채워 완성하자.
//
// 할 일:
//   🔴 TODO 1 (추가): handleAdd — 입력값을 검증하고, 항상 "새 배열"로 set 한다(불변성).
//                  - text.trim()이 비었거나 금액이 0 이하면 무시한다.
//                  - { id: nextId.current++, text, amount, type } 를 뒤에 붙인다.
//                  - 추가 후 text/amount 입력을 비운다.
//   🔴 TODO 2 (삭제): handleDelete(id) — filter로 그 id만 뺀 "새 배열"로 set 한다.
//   🔴 TODO 3 (통계): useMemo로 income/expense/balance를 계산한다.
//                  - transactions를 돌며 type === 'income'이면 income에, 아니면 expense에 amount를 더한다.
//                  - balance = income - expense, 의존성 배열은 [transactions].

const won = (n) => n.toLocaleString('ko-KR') + '원'

export default function PracticeBudgetHard() {
  const [transactions, setTransactions] = useState([])
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const nextId = useRef(1)

  // 🔴 TODO 1: 거래 추가. 지금은 아무 일도 하지 않는다.
  function handleAdd() {
    // 힌트: const trimmed = text.trim(); const money = Number(amount)
    //       if (!trimmed || !Number.isFinite(money) || money <= 0) return
    //       setTransactions([...transactions, { id: nextId.current++, text: trimmed, amount: money, type }])
    //       setText(''); setAmount('')
  }

  // 🔴 TODO 2: 거래 삭제. 지금은 아무 일도 하지 않는다.
  function handleDelete(id) {
    // 힌트: setTransactions(transactions.filter((t) => t.id !== id))
  }

  // 🔴 TODO 3: 파생 통계. 지금은 항상 0이다.
  const stats = useMemo(() => {
    // 힌트: let income = 0, expense = 0
    //       for (const t of transactions) { ... }
    //       return { income, expense, balance: income - expense }
    return { income: 0, expense: 0, balance: 0 }
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
