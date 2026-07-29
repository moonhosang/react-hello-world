// ============================================================
// 실전 앱 · Lv5 — 미니 가계부 (Budget)
// ============================================================
// 지금까지 배운 걸 종합하는 최종 앱이다.
//   - Context + useReducer : 거래 상태를 앱 전역에서 한 곳으로 모아 관리한다.
//   - 파생 통계(useMemo)   : 총수입·총지출·잔액은 상태가 아니라 "계산해 내는 값"이다.
//   - localStorage 지속    : 커스텀 훅으로 저장/복원을 캡슐화해, 새로고침해도 데이터가 남는다.
//   - 리스트 렌더(map/key) : 거래 목록을 그리고, 수입 +/지출 −을 색으로 구분한다.

import { BudgetProvider } from './BudgetContext.jsx'
import BudgetSummary from './BudgetSummary.jsx'
import BudgetForm from './BudgetForm.jsx'
import BudgetList from './BudgetList.jsx'
import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeBudgetEasy from './practiceEasy.jsx'
import PracticeBudgetMedium from './practiceMedium.jsx'
import PracticeBudgetHard from './practiceHard.jsx'
import SolutionBudget from './solution.jsx'
import TechTags from '../../components/TechTags.jsx'

export default function BudgetApp({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">실전 앱 · Lv5</span>
        <h2>미니 가계부</h2>
        <p>
          수입·지출을 기록하면 총수입·총지출·잔액이 자동으로 계산되고, 새로고침해도 데이터가
          남는 가계부 앱이다. 배운 걸 전부 엮은 최종 앱이다.
        </p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          거래 상태를 <b>Context + useReducer</b>로 전역에 모으고, 화면은 커스텀 훅{' '}
          <code>useBudget()</code>으로만 접근한다. 총수입·총지출·잔액은 상태가 아니라{' '}
          <b>useMemo로 계산한 파생값</b>이고, <b>localStorage 지속</b>은 커스텀 훅{' '}
          <code>usePersistedReducer</code>에 캡슐화해 새로고침해도 데이터가 남는다.
        </p>
      </div>

      <TechTags
        onGo={onGo}
        items={[
          { label: 'Context', to: 7.1 },
          { label: 'useReducer', to: 10 },
          { label: 'useMemo(통계)', to: 11 },
          { label: '커스텀 훅', to: 12 },
          { label: 'localStorage', to: null },
        ]}
      />

      <h3 className="section-title">완성된 앱 — 실제로 동작한다</h3>
      <span className="learn-tag">
        📎 학습 포인트 · 전역 상태는 Provider가 모으고, 통계는 파생값으로 계산하고, 지속은 훅이 맡는다
      </span>
      <p className="section-desc">직접 넣어 보며 확인할 것은 다음과 같다:</p>
      <ul className="section-list">
        <li><b>추가</b> — 내용·금액·유형을 넣고 [추가]를 누르면 목록에 쌓인다.</li>
        <li><b>요약 갱신</b> — 추가·삭제할 때마다 상단의 총수입·총지출·잔액이 자동으로 다시 계산된다.</li>
        <li><b>삭제</b> — 각 항목의 ✕로 그 거래만 뺀다.</li>
        <li><b>지속</b> — 새로고침해도 데이터가 그대로 남아 있는지 확인한다.</li>
      </ul>

      {/* Provider로 감싸야 아래 컴포넌트들이 useBudget()으로 같은 상태를 공유한다. */}
      <BudgetProvider>
        <div className="card">
          <div className="file-label">
            📄 BudgetSummary.jsx · BudgetForm.jsx · BudgetList.jsx
          </div>
          <BudgetSummary />
          <BudgetForm />
          <BudgetList />
        </div>
      </BudgetProvider>

      <PracticeLevels
        goal="Context + reducer로 전역 상태를 다루는 실전 앱(가계부)을 만든다."
        solutionFile="app-budget/solution.jsx"
        solution={<SolutionBudget />}
        levels={[
          {
            label: '쉬움',
            file: 'app-budget/practiceEasy.jsx',
            task: '요약 카드에서 잔액만 늘 0이다. 마지막 한 줄, 잔액(잔액 = 총수입 − 총지출)을 채워 채우자.',
            hints: [
              '① 먼저 이해 — 총수입·총지출·잔액은 따로 저장하는 값이 아니라, 거래 목록(transactions)에서 그때그때 계산해 내는 파생값이다. 여기선 총수입(income)·총지출(expense)은 이미 계산돼 있고, 마지막 잔액 한 줄만 비어 있다.',
              '② 어디 — practiceEasy.jsx의 useMemo 안, income·expense를 모두 더한 바로 아래에 🟢 TODO가 있다. const balance = 0 으로 임시로 둔 줄이다.',
              '③ 어떻게 — 잔액은 총수입에서 총지출을 뺀 값이다. 그 줄을 balance = income - expense 로 바꾼다.',
              '④ 확인 — 요약 카드의 잔액이 곧바로 채워진다. 거래를 더하거나 지워 income·expense가 바뀌면 balance도 자동으로 다시 계산된다.',
            ],
            node: <PracticeBudgetEasy />,
          },
          {
            label: '중간',
            file: 'app-budget/practiceMedium.jsx',
            task: '지금은 요약 값이 항상 0이다. 파생 통계 useMemo를 통째로 채워 transactions에서 총수입·총지출·잔액을 계산하자.',
            hints: [
              '① 먼저 이해 — 총수입·총지출·잔액은 state로 두지 않는다. 거래 목록에서 계산해 내는 파생값이라, transactions가 바뀔 때만 useMemo로 다시 센다. 같은 값을 state로 또 두면 서로 어긋나 버그가 된다.',
              '② 어디 — practiceMedium.jsx의 useMemo 안. 지금은 { income: 0, expense: 0, balance: 0 }을 그대로 돌려줘서 화면 값이 늘 0이다. 여기를 채운다.',
              '③ 어떻게(합계) — let income = 0, expense = 0 으로 시작해, transactions를 하나씩 돌며 type === "income"이면 income에, 아니면 expense에 amount를 더한다.',
              '④ 어떻게(잔액·반환) — 다 더했으면 return { income, expense, balance: income - expense } 로 돌려준다. 의존성 배열은 [transactions] 그대로 둔다.',
              '⑤ 확인 — 요약 카드가 실제 합계로 채워지고, 거래를 추가하거나 삭제하면 세 값이 함께 갱신된다.',
            ],
            node: <PracticeBudgetMedium />,
          },
          {
            label: '어려움',
            file: 'app-budget/practiceHard.jsx',
            task: '껍데기만 있다 — 입력해도 추가가 안 되고, ✕도 안 먹고, 요약은 늘 0이다. 추가·삭제·파생 통계 세 곳을 채워 완성하자.',
            hints: [
              '① 먼저 이해 — 지금은 골격뿐이라 아무 반응이 없다. practiceHard.jsx의 세 곳(🔴 TODO)을 채우면 살아난다. 통계는 저장하는 값이 아니라 거래 목록에서 계산하는 파생값임을 기억한다.',
              '② 추가(handleAdd) — text.trim()이 비었거나 금액이 0 이하면 무시하고, 아니면 [...transactions, { id: nextId.current++, text, amount, type }] 로 새 배열을 만들어 set 한다. 원본을 건드리지 않는다(불변성). 끝으로 입력칸(text·amount)을 비운다.',
              '③ 삭제(handleDelete) — transactions.filter((t) => t.id !== id) 로 그 id만 뺀 새 배열로 set 한다.',
              '④ 통계(useMemo) — 중간 단계와 똑같다. income/expense를 더하고 return { income, expense, balance: income - expense }. 의존성 배열은 [transactions].',
              '⑤ 확인 — 추가하면 목록과 요약이 채워지고, ✕로 지우면 빠지고, 수입은 초록 +, 지출은 빨강 −으로 구분돼 보인다.',
            ],
            node: <PracticeBudgetHard />,
          },
        ]}
      />

      <div className="try-it">
        <h4>💡 배운 개념이 어디에 쓰였나</h4>
        <ul>
          <li>
            <b>Context + useReducer</b> — 거래 상태를 <code>BudgetProvider</code> 한 곳에 모으고,
            reducer의 <code>ADD</code>·<code>DELETE</code> case가 배열 계산을 맡는다. 화면은{' '}
            <code>dispatch</code>를 감싼 <code>addTransaction</code>·<code>deleteTransaction</code>만 부른다.
          </li>
          <li>
            <b>커스텀 훅 (접근)</b> — <code>useBudget()</code>이 <code>useContext</code>를 감싸고,
            Provider 밖에서 쓰면 즉시 에러를 던진다. 화면 컴포넌트는 Context 객체를 몰라도 된다.
          </li>
          <li>
            <b>파생 통계 (useMemo)</b> — 총수입·총지출·잔액은 따로 state로 두지 않는다. 거래 배열에서{' '}
            <code>useMemo</code>로 계산해, 거래가 바뀔 때만 다시 센다. (중복 상태 = 버그의 원천)
          </li>
          <li>
            <b>localStorage 지속 (커스텀 훅)</b> — <code>usePersistedReducer</code>가 초기값을
            localStorage에서 lazy init으로 읽고, <code>useEffect</code>로 state가 바뀔 때마다 저장한다.
            그래서 새로고침해도 남는다.
          </li>
          <li>
            <b>리스트 렌더 (map / key)</b> — <code>transactions.map</code>으로 목록을 그리고 각 항목에{' '}
            <code>key</code>를 준다. 수입은 초록 <b>+</b>, 지출은 빨강 <b>−</b>으로 구분한다.
          </li>
          <li>
            <b>불변성 · 순수 reducer</b> — 추가는 <code>[...transactions, 새것]</code>, 삭제는{' '}
            <code>filter</code> — 원본을 건드리지 않고 항상 <b>새 배열</b>을 return 한다.
          </li>
        </ul>
      </div>
    </section>
  )
}
