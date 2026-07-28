import { useState } from 'react'
import { useBudget } from './BudgetContext.jsx'

// 거래 입력 폼 — 내용(text) · 금액(number) · 유형(수입/지출)을 controlled input으로 다룬다.
// 추가 버튼은 useBudget().addTransaction(...) 한 줄만 부른다. 계산·저장은 Provider가 맡는다.

export default function BudgetForm() {
  const { addTransaction } = useBudget()
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')

  function handleAdd() {
    const trimmed = text.trim()
    const money = Number(amount)
    // 빈 내용, 숫자가 아니거나 0 이하인 금액은 무시한다.
    if (!trimmed || !Number.isFinite(money) || money <= 0) return
    addTransaction(trimmed, money, type)
    setText('')
    setAmount('')
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
      {/* 내용 입력 — value/onChange로 text 상태와 묶은 controlled input, Enter로도 추가 */}
      <input
        value={text}
        placeholder="내용 (예: 커피)"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        style={{ flex: 2, minWidth: 140 }}
      />
      {/* 금액 입력 — 숫자용 input, 값은 문자열이라 handleAdd에서 Number로 바꿔 검증한다 */}
      <input
        type="number"
        value={amount}
        placeholder="금액"
        onChange={(e) => setAmount(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        style={{ flex: 1, minWidth: 100 }}
      />
      {/* 유형 선택 — 수입/지출을 type 상태로 고른다 */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ flex: 1, minWidth: 100 }}
      >
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
      {/* 추가 버튼 — handleAdd 한 번으로 검증→추가→입력 비우기까지 처리한다 */}
      <button onClick={handleAdd}>➕ 추가</button>
    </div>
  )
}
