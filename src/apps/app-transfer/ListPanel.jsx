// 목록 한 칸 (좌/우 공용) — 대기 멤버·선택된 멤버 양쪽에서 같은 컴포넌트를 쓴다.
// - 항목 클릭은 직접 처리하지 않고, 부모가 넘겨준 onToggle을 호출한다.
//   (자식은 "무엇을 할지"만 알리고, 선택 상태 변경은 상태를 가진 부모가 한다)
// - 개수(items.length)는 넘겨받은 배열에서 그때그때 계산해 보여줄 뿐, state로 저장하지 않는다.

export default function ListPanel({ title, items, selected, onToggle, emptyText }) {
  return (
    <div style={styles.panel}>
      {/* 헤더 — 제목과 현재 개수(넘겨받은 배열 길이) */}
      <div style={styles.panelHead}>
        <b>{title}</b>
        <span style={styles.count}>{items.length}개</span>
      </div>
      {/* 비었으면 안내 문구, 있으면 항목을 map으로 한 줄씩 렌더 */}
      {items.length === 0 ? (
        <p style={styles.empty}>{emptyText}</p>
      ) : (
        <ul style={styles.list}>
          {items.map((item) => {
            const on = selected.has(item.id) // 이 항목이 선택 상태인지
            return (
              // 항목 한 줄 — 클릭하면 부모의 onToggle을 호출, 선택 여부에 따라 스타일을 바꾼다
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onToggle(item.id)}
                  style={{ ...styles.row, ...(on ? styles.rowOn : null) }}
                >
                  <span style={styles.check}>{on ? '☑' : '☐'}</span>
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

// ---- 인라인 스타일 (공용 클래스에 없는 부분만 보완) --------------------

const styles = {
  panel: {
    flex: '1 1 200px',
    minWidth: 180,
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
  rowOn: {
    background: 'var(--brand)',
    color: '#fff',
    borderColor: 'var(--brand)',
  },
  check: { fontSize: 15, lineHeight: 1 },
  empty: { margin: 0, padding: '20px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 13 },
}
