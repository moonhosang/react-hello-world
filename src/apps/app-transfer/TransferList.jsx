import { useState } from 'react'
import ListPanel from './ListPanel.jsx'

// 🔀 목록 좌↔우 교환 — 라이브 데모 (Lv2.5 · 배열 불변성)
//   두 개의 배열 상태(left / right)를 두고, 항목을 한쪽에서 빼서 다른 쪽에 넣는다.
//   핵심은 "불변성" — 배열을 직접 바꾸지 않고,
//     - 뺄 때  : filter 로 걸러 새 배열을 만든다
//     - 넣을 때 : 스프레드([...arr, ...items]) 로 새 배열을 만든다
//   이렇게 항상 '새 배열'로 set 해야 리액트가 변화를 감지해 다시 그린다.

// 초기 데이터 — 처음엔 전부 왼쪽(대기 멤버)에 둔다.
const INITIAL_MEMBERS = [
  { id: 1, name: '김하늘' },
  { id: 2, name: '이도윤' },
  { id: 3, name: '박서연' },
  { id: 4, name: '최준호' },
  { id: 5, name: '정예린' },
  { id: 6, name: '강민재' },
]

export default function TransferList() {
  const [left, setLeft] = useState(INITIAL_MEMBERS) // 대기 멤버
  const [right, setRight] = useState([])            // 선택된 멤버
  const [selected, setSelected] = useState(() => new Set()) // 선택한 항목 id들

  // 항목 클릭 → 선택 토글 (Set을 새로 만들어 set — 여기도 불변성)
  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // 핵심: from 목록에서 ids에 해당하는 항목을 빼서 to 목록에 넣는다.
  //  - from : filter 로 '남길 것'만 걸러 새 배열
  //  - to   : 스프레드로 '옮길 것'을 이어붙여 새 배열
  function move(from, setFrom, to, setTo, ids) {
    if (ids.length === 0) return
    const idSet = new Set(ids)
    const moving = from.filter((item) => idSet.has(item.id)) // 옮길 항목
    const staying = from.filter((item) => !idSet.has(item.id)) // 남을 항목
    setFrom(staying)
    setTo([...to, ...moving])
    setSelected(new Set()) // 이동 후 선택 해제
  }

  // 선택된 것 중, 해당 목록에 실제로 있는 id만 골라낸다.
  function selectedIdsIn(list) {
    return list.filter((item) => selected.has(item.id)).map((item) => item.id)
  }

  // 방향·범위별 핸들러 — 어느 쪽에서 어느 쪽으로, 어떤 ids를 옮길지만 정해 move에 넘긴다.
  const moveSelectedRight = () => move(left, setLeft, right, setRight, selectedIdsIn(left))
  const moveSelectedLeft = () => move(right, setRight, left, setLeft, selectedIdsIn(right))
  const moveAllRight = () => move(left, setLeft, right, setRight, left.map((i) => i.id))
  const moveAllLeft = () => move(right, setRight, left, setLeft, right.map((i) => i.id))

  return (
    <div style={styles.wrap}>
      {/* 좌 목록 — 대기 멤버. 데이터(left)와 선택/토글만 내려주고 상태는 안 넘긴다 */}
      <ListPanel
        title="대기 멤버"
        items={left}
        selected={selected}
        onToggle={toggleSelect}
        emptyText="비어 있다"
      />

      {/* 가운데 이동 버튼 — 옮길 대상이 없으면 disabled로 막는다 */}
      <div style={styles.controls}>
        <ControlButton onClick={moveAllRight} disabled={left.length === 0} title="전체 오른쪽으로">≫</ControlButton>
        <ControlButton onClick={moveSelectedRight} disabled={selectedIdsIn(left).length === 0} title="선택 오른쪽으로">→</ControlButton>
        <ControlButton onClick={moveSelectedLeft} disabled={selectedIdsIn(right).length === 0} title="선택 왼쪽으로">←</ControlButton>
        <ControlButton onClick={moveAllLeft} disabled={right.length === 0} title="전체 왼쪽으로">≪</ControlButton>
      </div>

      {/* 우 목록 — 선택된 멤버. 좌 목록과 같은 ListPanel을 재사용한다 */}
      <ListPanel
        title="선택된 멤버"
        items={right}
        selected={selected}
        onToggle={toggleSelect}
        emptyText="아직 없다"
      />
    </div>
  )
}

// ---- 가운데 이동 버튼 -------------------------------------------------

// 이동 버튼 한 개 — 클릭·비활성·툴팁만 받아 표시하는 순수 표시용 컴포넌트다.
function ControlButton({ children, onClick, disabled, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{ ...styles.ctrlBtn, ...(disabled ? styles.ctrlBtnDisabled : null) }}
    >
      {children}
    </button>
  )
}

// ---- 인라인 스타일 (공용 클래스에 없는 부분만 보완) --------------------

const styles = {
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 16,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'center',
  },
  ctrlBtn: {
    width: 44,
    height: 38,
    fontSize: 16,
    fontWeight: 700,
    border: '1px solid var(--border)',
    borderRadius: 8,
    background: 'var(--panel)',
    color: 'var(--text)',
    cursor: 'pointer',
  },
  ctrlBtnDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
}
