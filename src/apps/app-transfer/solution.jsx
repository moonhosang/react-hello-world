import { useState } from 'react'

// ✅ 정답 예시 — 목록 좌↔우 교환 (선택 → 반대편으로 이동)
// 핵심: 배열을 직접 바꾸지 않는다(불변성).
//   - 뺄 때  : filter 로 '남길 것'만 걸러 새 배열
//   - 넣을 때 : 스프레드([...도착, ...옮길것]) 로 새 배열
// 이동이 끝나면 선택 상태도 함께 비운다.

const INITIAL_MEMBERS = [
  { id: 1, name: '김하늘' },
  { id: 2, name: '이도윤' },
  { id: 3, name: '박서연' },
  { id: 4, name: '최준호' },
]

export default function SolutionTransfer() {
  const [left, setLeft] = useState(INITIAL_MEMBERS) // 대기 멤버
  const [right, setRight] = useState([]) // 선택된 멤버
  const [selected, setSelected] = useState(() => new Set()) // 선택한 id들

  // 클릭 → 선택 토글 (Set을 새로 만들어 set)
  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // 핵심: from 에서 선택된 것을 빼서 to 에 넣는다.
  function move(from, setFrom, to, setTo, ids) {
    if (ids.length === 0) return
    const idSet = new Set(ids)
    const moving = from.filter((item) => idSet.has(item.id)) // 옮길 항목
    const staying = from.filter((item) => !idSet.has(item.id)) // 남을 항목
    setFrom(staying) // 뺀 쪽: filter 로 새 배열
    setTo([...to, ...moving]) // 넣은 쪽: 스프레드로 새 배열
    setSelected(new Set()) // 이동 후 선택 해제
  }

  // 선택된 것 중, 그 목록에 실제 있는 id만 골라낸다.
  function selectedIdsIn(list) {
    return list.filter((item) => selected.has(item.id)).map((item) => item.id)
  }

  // 좌→우 / 우→좌 핸들러 — 방향만 정해 move에 넘긴다.
  const moveRight = () => move(left, setLeft, right, setRight, selectedIdsIn(left))
  const moveLeft = () => move(right, setRight, left, setLeft, selectedIdsIn(right))

  return (
    <div style={styles.wrap}>
      {/* 좌 목록 — 대기 멤버 */}
      <Panel title="대기 멤버" items={left} selected={selected} onToggle={toggleSelect} />

      {/* 가운데 이동 버튼 — 선택된 게 없으면 disabled */}
      <div style={styles.controls}>
        <button
          type="button"
          onClick={moveRight}
          disabled={selectedIdsIn(left).length === 0}
          style={{ ...styles.ctrlBtn, ...(selectedIdsIn(left).length === 0 ? styles.disabled : null) }}
        >
          →
        </button>
        <button
          type="button"
          onClick={moveLeft}
          disabled={selectedIdsIn(right).length === 0}
          style={{ ...styles.ctrlBtn, ...(selectedIdsIn(right).length === 0 ? styles.disabled : null) }}
        >
          ←
        </button>
      </div>

      {/* 우 목록 — 선택된 멤버 (좌 목록과 같은 Panel 재사용) */}
      <Panel title="선택된 멤버" items={right} selected={selected} onToggle={toggleSelect} />
    </div>
  )
}

// 목록 한 칸 (좌/우 공용) — 데이터와 onToggle만 받아 표시한다.
function Panel({ title, items, selected, onToggle }) {
  return (
    <div style={styles.panel}>
      {/* 헤더 — 제목과 현재 개수 */}
      <div style={styles.panelHead}>
        <b>{title}</b>
        <span style={styles.count}>{items.length}개</span>
      </div>
      {/* 비었으면 안내, 있으면 항목을 한 줄씩 렌더 */}
      {items.length === 0 ? (
        <p style={styles.empty}>비어 있다</p>
      ) : (
        <ul style={styles.list}>
          {items.map((item) => {
            const on = selected.has(item.id) // 이 항목이 선택 상태인지
            return (
              // 항목 한 줄 — 클릭하면 onToggle 호출, 선택 여부로 스타일 전환
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onToggle(item.id)}
                  style={{ ...styles.row, ...(on ? styles.rowOn : null) }}
                >
                  <span>{on ? '☑' : '☐'}</span>
                  {item.name}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

const styles = {
  wrap: { display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'center', gap: 16 },
  panel: {
    flex: '1 1 180px',
    minWidth: 160,
    border: '1px solid var(--border)',
    borderRadius: 12,
    background: 'var(--panel)',
    padding: 12,
  },
  panelHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottom: '1px solid var(--border)',
    fontSize: 14,
  },
  count: {
    background: 'var(--brand-soft)',
    color: 'var(--brand)',
    fontSize: 12,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 999,
  },
  list: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 },
  row: {
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 10px',
    border: '1px solid var(--border)',
    borderRadius: 8,
    background: 'var(--panel)',
    color: 'var(--text)',
    cursor: 'pointer',
    fontSize: 14,
  },
  rowOn: { background: 'var(--brand)', color: '#fff', borderColor: 'var(--brand)' },
  empty: { margin: 0, padding: '20px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 13 },
  controls: { display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, alignSelf: 'center' },
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
  disabled: { opacity: 0.4, cursor: 'not-allowed' },
}
