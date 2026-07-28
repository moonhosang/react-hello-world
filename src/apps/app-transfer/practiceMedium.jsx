import { useState } from 'react'

// 🎯 실습 · 중간 — 목록 좌↔우 교환 (move 함수 전체를 직접 채운다)
// 두 목록 골격, 선택 토글(☑/☐), selectedIdsIn 은 이미 완성돼 있다.
// 네가 채울 건 move 함수 본체 전부다 — 빼기 · 넣기 · 뒷정리 세 단계.
//
// 할 일 (move 안에서):
//   🟡 TODO 1 (빼기)   : from 을 filter 해서 '남을 것'만 새 배열로 만들고 setFrom 한다.
//                     예) const staying = from.filter((item) => !idSet.has(item.id)); setFrom(staying)
//   🟡 TODO 2 (넣기)   : 옮길 것을 filter 로 골라, to 에 스프레드로 이어붙여 setTo 한다.
//                     예) const moving = from.filter((item) => idSet.has(item.id)); setTo([...to, ...moving])
//   🟡 TODO 3 (뒷정리) : setSelected(new Set()) 로 선택을 비운다.
//
// ※ push 로 배열을 직접 바꾸지 말 것. 언제나 '새 배열'로 set 해야 화면이 다시 그려진다(불변성).

const INITIAL_MEMBERS = [
  { id: 1, name: '김하늘' },
  { id: 2, name: '이도윤' },
  { id: 3, name: '박서연' },
  { id: 4, name: '최준호' },
]

export default function PracticeTransferMedium() {
  const [left, setLeft] = useState(INITIAL_MEMBERS) // 대기 멤버
  const [right, setRight] = useState([]) // 선택된 멤버
  const [selected, setSelected] = useState(() => new Set()) // 선택한 id들

  // 클릭 → 선택 토글 (이미 완성돼 있다)
  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // 선택된 것 중, 그 목록에 실제 있는 id만 골라낸다 (이미 완성돼 있다)
  function selectedIdsIn(list) {
    return list.filter((item) => selected.has(item.id)).map((item) => item.id)
  }

  // 👉 여기가 핵심이다. from 에서 ids 항목을 빼서 to 에 넣자.
  function move(from, setFrom, to, setTo, ids) {
    if (ids.length === 0) return
    const idSet = new Set(ids)
    // 🟡 TODO 1 (빼기)   : from 을 filter 해서 '남을 것'만 새 배열로 만들고 setFrom 한다.
    // 🟡 TODO 2 (넣기)   : 옮길 것을 filter 로 골라 setTo([...to, ...옮길것]) 로 이어붙인다.
    // 🟡 TODO 3 (뒷정리) : setSelected(new Set())
  }

  const moveRight = () => move(left, setLeft, right, setRight, selectedIdsIn(left))
  const moveLeft = () => move(right, setRight, left, setLeft, selectedIdsIn(right))

  return (
    <div style={styles.wrap}>
      <Panel title="대기 멤버" items={left} selected={selected} onToggle={toggleSelect} />

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

      <Panel title="선택된 멤버" items={right} selected={selected} onToggle={toggleSelect} />
    </div>
  )
}

// ---- 목록 한 칸 (골격은 이미 완성) — 여기는 손대지 않아도 된다 ----
function Panel({ title, items, selected, onToggle }) {
  return (
    <div style={styles.panel}>
      <div style={styles.panelHead}>
        <b>{title}</b>
        <span style={styles.count}>{items.length}개</span>
      </div>
      {items.length === 0 ? (
        <p style={styles.empty}>비어 있다</p>
      ) : (
        <ul style={styles.list}>
          {items.map((item) => {
            const on = selected.has(item.id)
            return (
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
