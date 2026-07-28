// ============================================================
// 실전 앱 · Lv2.5 · 목록 좌↔우 교환 (Transfer List / Shuttle)
// ============================================================
// 두 개의 배열 상태(left / right)를 두고, 항목을 한쪽에서 빼서
// 다른 쪽에 넣는다. 핵심은 "불변성" — 배열을 직접 바꾸지 않고,
//   - 뺄 때  : filter 로 걸러 새 배열을 만든다
//   - 넣을 때 : 스프레드([...arr, ...items]) 로 새 배열을 만든다
// 이렇게 항상 '새 배열'로 set 해야 리액트가 변화를 감지해 다시 그린다.

import PracticeLevels from '../../components/PracticeLevels.jsx'
import TechTags from '../../components/TechTags.jsx'
import TransferList from './TransferList.jsx'
import PracticeTransferEasy from './practiceEasy.jsx'
import PracticeTransferMedium from './practiceMedium.jsx'
import PracticeTransferHard from './practiceHard.jsx'
import SolutionTransfer from './solution.jsx'

export default function TransferApp({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">실전 앱 · Lv2.5</span>
        <h2>목록 좌↔우 교환</h2>
        <p>항목을 골라 왼쪽↔오른쪽 목록 사이로 옮긴다. 배열 상태를 filter/스프레드로 다루며 불변성을 지킨다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          두 개의 배열 상태(<code>left</code> · <code>right</code>)를 옮길 때, 원본을 바꾸지 않고
          <b> filter로 빼고 스프레드로 넣어 '새 배열'</b>을 만든다. 이게 <b>불변성(immutability)</b>이다 —
          항상 새 배열로 set 해야 리액트가 화면을 다시 그린다. 이동이 끝나면 선택 상태도 함께 비운다.
        </p>
      </div>

      <TechTags
        onGo={onGo}
        items={[
          { label: '배열 상태 2개', to: 3.1 },
          { label: '불변성(filter/spread)', to: 5 },
          { label: 'Set 선택관리', to: null },
        ]}
      />

      <h3 className="section-title">완성된 앱 — 항목 이동이 실제로 동작한다</h3>
      <span className="learn-tag">📎 학습 포인트 · 빼기는 filter, 넣기는 스프레드 — 언제나 새 배열로 set</span>
      <p className="section-desc">항목을 클릭해 <b>선택</b>(파란 칩)하고, 가운데 버튼으로 옮긴다. 버튼은 이렇게 나뉜다:</p>
      <ul className="section-list">
        <li><b>→</b> — 선택한 항목을 오른쪽 목록으로 옮긴다.</li>
        <li><b>←</b> — 선택한 항목을 왼쪽 목록으로 옮긴다.</li>
        <li><b>≫ / ≪</b> — 선택과 상관없이 한쪽 목록 전체를 통째로 옮긴다.</li>
      </ul>
      <div className="card">
        <div className="file-label">📄 TransferList.jsx · ListPanel.jsx</div>
        <TransferList />
      </div>

      <PracticeLevels
        solutionFile="app-transfer/solution.jsx"
        solution={<SolutionTransfer />}
        levels={[
          {
            label: '쉬움',
            file: 'app-transfer/practiceEasy.jsx',
            task: 'move는 거의 다 돼 있다 — 빼기·넣기는 끝났다. 마지막 한 줄, 이동한 뒤 선택을 비우는 코드만 채우자.',
            hints: [
              '① 먼저 체험 — 항목 몇 개를 골라 →로 옮겨보라. 이동은 되지만 옮긴 뒤에도 체크(☑)가 그대로 남는다. 이게 우리가 고칠 문제다.',
              '② 어디 — practiceEasy.jsx의 move 함수 맨 끝, 빼기(setFrom)·넣기(setTo) 바로 아래에 🟢 TODO가 있다.',
              '③ 어떻게 — 선택은 Set으로 관리한다. setSelected(new Set())로 빈 Set을 넣어 선택을 비운다.',
              '④ 확인 — 다시 옮겨보라. 이번엔 이동이 끝나면 체크가 깨끗이 풀린다.',
            ],
            node: <PracticeTransferEasy />,
          },
          {
            label: '중간',
            file: 'app-transfer/practiceMedium.jsx',
            task: 'move 함수 본체가 통째로 비어 있어 버튼을 눌러도 항목이 안 옮겨진다. 빼기·넣기·뒷정리 세 단계를 채워 이동을 되살리자.',
            hints: [
              '어디 — practiceMedium.jsx의 move(from, setFrom, to, setTo, ids) 함수 안. idSet까지는 만들어져 있고, 그 아래 🟡 TODO 세 곳을 채운다.',
              '큰 그림 — from을 "남을 것"과 "옮길 것"으로 나눠, 남을 것은 원래 쪽에 다시 담고 옮길 것은 반대쪽 끝에 붙인 뒤 선택을 비운다.',
              '① 빼기 — const staying = from.filter((item) => !idSet.has(item.id)); setFrom(staying). filter로 새 배열을 만들어 원본은 건드리지 않는다.',
              '② 넣기 — const moving = from.filter((item) => idSet.has(item.id)); setTo([...to, ...moving]). 스프레드로 새 배열에 이어 붙인다.',
              '③ 뒷정리 — setSelected(new Set())로 선택을 비운다. push로 배열을 직접 바꾸지 말 것 — 언제나 새 배열로 set 해야 화면이 다시 그려진다(불변성).',
            ],
            node: <PracticeTransferMedium />,
          },
          {
            label: '어려움',
            file: 'app-transfer/practiceHard.jsx',
            task: '토글도 이동도 비어 있어 클릭해도 아무 반응이 없다. 선택 토글(toggleSelect)과 이동(move) 두 로직을 직접 채워 살아 있는 앱으로 만들자.',
            hints: [
              '지금 상태 — 항목을 눌러도 선택(☑)이 안 되고 →/← 버튼도 반응이 없다. practiceHard.jsx의 두 곳(🔴 TODO A·B)을 채우면 살아난다.',
              '① 선택 토글(TODO A) — setSelected((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next }). prev를 직접 바꾸지 말고 new Set(prev)로 복사해서 넣는다.',
              '② 이동(TODO B) — from을 filter로 둘로 나눈다. 선택 안 된 "남을 것"은 setFrom에, 선택된 "옮길 것"은 setTo([...to, ...옮길것])로 반대쪽 끝에 붙인다.',
              '③ 뒷정리 — 이동이 끝나면 setSelected(new Set())로 선택을 비운다.',
              '④ 확인 — 항목을 클릭하면 파랗게 선택되고, →/←로 옮기면 반대 목록으로 이동한 뒤 선택이 풀리는지 본다. 언제나 새 배열·새 Set으로 set 한다(불변성).',
            ],
            node: <PracticeTransferHard />,
          },
        ]}
      />

      <div className="try-it">
        <h4>💡 배운 개념이 어디에 쓰였나</h4>
        <ul>
          <li><b>배열 state 2개</b> — <code>left</code>·<code>right</code>에 항목을 나눠 담고, 옮길 때마다 두 배열을 함께 set 한다.</li>
          <li><b>빼기 = filter</b> — 옮길 항목을 <code>filter</code>로 걸러 <b>새 배열</b>을 만든다. 원본 배열은 건드리지 않는다.</li>
          <li><b>넣기 = 스프레드</b> — <code>[...도착목록, ...옮길항목]</code>으로 <b>새 배열</b>을 만들어 이어 붙인다.</li>
          <li><b>선택 상태</b> — 선택한 id들을 <code>Set</code>으로 따로 관리하고, 이동이 끝나면 <code>new Set()</code>으로 비운다.</li>
          <li><b>파생 값</b> — 개수(<code>left.length</code>)는 state로 또 두지 않고, 배열에서 그때그때 계산한다.</li>
        </ul>
      </div>

      <div className="try-it reflect">
        <h4>🔎 확인해보기</h4>
        <ol>
          <li>항목을 오른쪽으로 옮긴 뒤, 왼쪽·오른쪽 <b>개수 합</b>이 항상 6으로 유지되는지 보자.</li>
          <li><code>move</code> 함수에서 <b>filter를 빼고</b> 스프레드만 하면 어떻게 될까? (같은 항목이 양쪽에 생긴다 — 그래서 빼기가 필요하다)</li>
        </ol>
      </div>
    </section>
  )
}
