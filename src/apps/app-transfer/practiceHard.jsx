import { useState } from 'react'

// 🎯 실습 · 어려움 — 목록 좌↔우 교환 (껍데기만 준다)
// 두 목록 UI(Panel)와 버튼 배선, 초기 데이터, selectedIdsIn 은 준비돼 있다.
// 로직의 핵심 두 가지는 네가 직접 채운다 — 선택 토글 + 이동(move).
//
// 지금 상태: toggleSelect 와 move 가 비어 있어서 클릭해도 아무 일도 안 일어난다(에러는 없다).
//
// 할 일:
//   🔴 TODO A (선택 토글) : toggleSelect 안에서, 이전 Set 을 복사한 새 Set 을 만들고
//                        id 가 있으면 delete, 없으면 add 한 뒤 그 새 Set 을 반환한다.
//                        (Set 을 직접 바꾸지 말고 new Set(prev) 로 복사해 set 하는 게 불변성이다.)
//   🔴 TODO B (이동 move) : from 을 filter 로 나눠 '남을 것'은 setFrom, '옮길 것'은
//                        setTo([...to, ...옮길것]) 로 이어붙인다. 끝나면 setSelected(new Set()).

const INITIAL_MEMBERS = [
  { id: 1, name: '김하늘' },
  { id: 2, name: '이도윤' },
  { id: 3, name: '박서연' },
  { id: 4, name: '최준호' },
]

export default function PracticeTransferHard() {
  const [left, setLeft] = useState(INITIAL_MEMBERS) // 대기 멤버
  const [right, setRight] = useState([]) // 선택된 멤버
  const [selected, setSelected] = useState(() => new Set()) // 선택한 id들

  // 🔴 TODO A (선택 토글): 클릭한 id 를 선택에 넣거나 뺀다.
  //   힌트) setSelected((prev) => { const next = new Set(prev); ... ; return next })
  function toggleSelect(id) {
    // 여기를 채우자.
  }

  // 선택된 것 중, 그 목록에 실제 있는 id만 골라낸다 (이미 완성돼 있다)
  function selectedIdsIn(list) {
    return list.filter((item) => selected.has(item.id)).map((item) => item.id)
  }

  // 🔴 TODO B (이동): from 에서 ids 항목을 빼서 to 에 넣는다.
  //   빼기 = filter 로 '남을 것' → setFrom
  //   넣기 = 스프레드 [...to, ...옮길것] → setTo
  //   뒷정리 = setSelected(new Set())
  function move(from, setFrom, to, setTo, ids) {
    // 여기를 채우자.
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
