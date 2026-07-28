import { createContext, useContext, useMemo } from 'react'
import { usePersistedReducer } from './usePersistedReducer.js'

// ============================================================
// 전역 상태 · BudgetContext (Context + useReducer)
// ============================================================
// 거래 목록이라는 "하나의 상태"를 앱 전체가 공유한다.
// Provider가 상태와 로직을 한 곳에 모으고, 화면은 커스텀 훅 useBudget()으로만 접근한다.
// action은 '무엇을 할지'만 담는다: ADD(추가) · DELETE(삭제).

// Context 객체는 밖으로 내보내지 않는다(비공개).
// 기본값 undefined → Provider 없이 쓴 걸 즉시 감지한다.
const BudgetContext = createContext(undefined)

const STORAGE_KEY = 'react-study:budget'

// 처음 열었을 때 보여 줄 예시 거래(localStorage가 비어 있을 때만 쓰인다).
const initialTransactions = [
  { id: 1, text: '월급', amount: 3000000, type: 'income' },
  { id: 2, text: '월세', amount: 700000, type: 'expense' },
  { id: 3, text: '장보기', amount: 85000, type: 'expense' },
]

// reducer는 순수 함수다.
// 원본 배열을 건드리지 않고(push/직접 대입 ❌) 항상 "새 배열"을 return 한다.
export function budgetReducer(transactions, action) {
  switch (action.type) {
    case 'ADD':
      // 새 거래를 붙인 새 배열을 만든다.
      return [...transactions, action.transaction]
    case 'DELETE':
      // 해당 id만 뺀 새 배열을 만든다.
      return transactions.filter((t) => t.id !== action.id)
    default:
      return transactions
  }
}

// Provider — 상태·로직·파생 통계를 여기 한 곳에 캡슐화한다.
export function BudgetProvider({ children }) {
  // usePersistedReducer가 localStorage 저장/복원까지 알아서 해 준다.
  const [transactions, dispatch] = usePersistedReducer(
    budgetReducer,
    STORAGE_KEY,
    initialTransactions
  )

  // 파생 통계 — 총수입·총지출·잔액은 transactions에서 "계산해 내는 값"이다.
  // 따로 상태로 두지 않는다(중복 상태 = 버그의 원천). useMemo로 거래가 바뀔 때만 다시 계산한다.
  const stats = useMemo(() => {
    let income = 0
    let expense = 0
    for (const t of transactions) {
      if (t.type === 'income') income += t.amount
      else expense += t.amount
    }
    return { income, expense, balance: income - expense }
  }, [transactions])

  // 화면이 쓰기 편하도록 dispatch를 의미 있는 함수로 감싼다.
  const value = useMemo(
    () => ({
      transactions,
      stats,
      // 안전한 id: 렌더 중 Date.now()보다, 저장된 것과 안 겹치도록 만든다.
      addTransaction: (text, amount, type) =>
        dispatch({
          type: 'ADD',
          transaction: {
            id: (crypto.randomUUID && crypto.randomUUID()) || Date.now(),
            text,
            amount,
            type,
          },
        }),
      deleteTransaction: (id) => dispatch({ type: 'DELETE', id }),
    }),
    [transactions, stats]
  )

  // value를 Provider로 내려, 안에 든 모든 자식이 useBudget()으로 공유한다.
  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  )
}

// 커스텀 훅 — useContext를 감싸고 Provider 밖 사용을 막는다.
export function useBudget() {
  const ctx = useContext(BudgetContext)
  // Provider 밖에서 부르면 기본값 undefined가 그대로 온다 → 바로 에러로 알려 준다.
  if (ctx === undefined) {
    throw new Error('useBudget()은 <BudgetProvider> 안에서만 쓸 수 있다')
  }
  return ctx
}
