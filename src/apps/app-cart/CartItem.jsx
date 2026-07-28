// 장바구니 한 줄을 그리는 컴포넌트.
// - 수량 +/− 와 삭제는 직접 하지 않고, 부모가 넘겨준 함수를 호출한다.
//   (자식은 "무엇을 할지"만 알리고, 상태 변경은 상태를 가진 부모가 한다)
// - 항목의 소계(price × qty)는 넘겨받은 값으로 계산해 보여줄 뿐, state로 저장하지 않는다.

export default function CartItem({ item, onInc, onDec, onRemove }) {
  const subtotal = item.price * item.qty // 렌더할 때 계산 — 저장하지 않는다

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px',
        border: '1px solid var(--border)',
        borderRadius: 10,
        listStyle: 'none',
        background: 'var(--panel)',
      }}
    >
      <span style={{ fontSize: 24 }}>{item.emoji}</span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600 }}>{item.name}</div>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>
          {item.price.toLocaleString()}원 × {item.qty} ={' '}
          <b style={{ color: 'var(--text)' }}>{subtotal.toLocaleString()}원</b>
        </div>
      </div>

      {/* 수량 조절: 최소 1 유지 (0 이하로는 내려가지 않는다) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button
          onClick={() => onDec(item.id)}
          disabled={item.qty <= 1}
          style={qtyBtnStyle(item.qty <= 1)}
          aria-label="수량 줄이기"
        >
          −
        </button>
        <span style={{ minWidth: 20, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
          {item.qty}
        </span>
        <button
          onClick={() => onInc(item.id)}
          style={qtyBtnStyle(false)}
          aria-label="수량 늘리기"
        >
          +
        </button>
      </div>

      <button className="mini-del" onClick={() => onRemove(item.id)}>
        삭제
      </button>
    </li>
  )
}

function qtyBtnStyle(disabled) {
  return {
    width: 28,
    height: 28,
    border: '1px solid var(--border)',
    background: 'var(--panel)',
    color: 'var(--text)',
    borderRadius: 8,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: 16,
    lineHeight: 1,
    opacity: disabled ? 0.4 : 1,
  }
}
