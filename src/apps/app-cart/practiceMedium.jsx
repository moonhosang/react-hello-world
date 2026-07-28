import { useState } from 'react'

// 🛒 장바구니 — 실습 · 중간 (절반 완성)
// 담기 · 삭제와 화면(JSX)은 이미 만들어 뒀다.
// 수량 조절과 파생 값(합계)을 직접 채운다.
//
// 할 일:
//   🟡 TODO 1 (수량 +): increase(id) — 그 항목의 qty를 +1 한다 (map으로 새 배열·새 객체)
//   🟡 TODO 2 (수량 −): decrease(id) — 그 항목의 qty를 −1 한다. 단 최소 1 유지 (Math.max(1, ...))
//   🟡 TODO 3 (파생값) : totalCount·totalPrice를 cart에서 계산한다 (reduce)
//                     → useMemo로 감싸면 cart가 바뀔 때만 다시 계산한다

const PRODUCTS = [
  { id: 'p1', name: '아메리카노', price: 4000, emoji: '☕' },
  { id: 'p2', name: '카페라떼', price: 4500, emoji: '🥛' },
  { id: 'p3', name: '크루아상', price: 3500, emoji: '🥐' },
  { id: 'p4', name: '치즈케이크', price: 6000, emoji: '🍰' },
  { id: 'p5', name: '초코쿠키', price: 2500, emoji: '🍪' },
]

export default function PracticeCartMedium() {
  const [cart, setCart] = useState([])

  // 담기 — 이미 있으면 수량 +1, 없으면 새로 추가 (제공됨)
  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id)
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  // 🟡 TODO 1: 그 id 항목의 qty를 +1 한 '새 배열'로 set 한다
  //   setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item))
  function increase(id) {
    // 여기를 채운다
  }

  // 🟡 TODO 2: 그 id 항목의 qty를 −1 한다. 단 1 밑으로는 내려가지 않는다
  //   qty 자리에 Math.max(1, item.qty - 1) 을 쓰면 최소 1이 유지된다
  function decrease(id) {
    // 여기를 채운다
  }

  // 삭제 — 해당 id를 뺀 '새 배열' (제공됨)
  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  // 🟡 TODO 3: 파생 상태 — cart에서 '계산'한다 (state로 저장하지 않는다)
  //   totalCount = 담긴 수량의 합    → cart.reduce((sum, item) => sum + item.qty, 0)
  //   totalPrice = 합계 금액         → cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  //   반복 계산은 useMemo(() => ..., [cart])로 감싸면 cart가 바뀔 때만 다시 돈다
  const totalCount = 0
  const totalPrice = 0

  return (
    <div className="demo-card">
      <div style={{ fontWeight: 700, marginBottom: 8 }}>🧺 상품 목록</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 10,
          marginBottom: 20,
        }}
      >
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: 12,
              textAlign: 'center',
              background: 'var(--panel)',
            }}
          >
            <div style={{ fontSize: 30 }}>{product.emoji}</div>
            <div style={{ fontWeight: 600, margin: '4px 0 2px' }}>{product.name}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>
              {product.price.toLocaleString()}원
            </div>
            <button
              onClick={() => addToCart(product)}
              style={{
                width: '100%',
                padding: '7px 0',
                background: 'var(--brand)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              담기
            </button>
          </div>
        ))}
      </div>

      <div style={{ fontWeight: 700, marginBottom: 8 }}>
        🛒 장바구니 <span style={{ color: 'var(--muted)', fontWeight: 400 }}>({totalCount}개)</span>
      </div>

      {cart.length === 0 ? (
        <p className="empty">장바구니가 비었다. 위에서 상품을 담아 보자 🛍️</p>
      ) : (
        <ul
          className="plain-list"
          style={{ paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          {cart.map((item) => (
            <li
              key={item.id}
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
                  <b style={{ color: 'var(--text)' }}>
                    {(item.price * item.qty).toLocaleString()}원
                  </b>
                </div>
              </div>

              {/* 수량 조절: 🟡 TODO 1·2가 채워지면 동작한다 (− 는 최소 1) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  onClick={() => decrease(item.id)}
                  disabled={item.qty <= 1}
                  style={qtyBtnStyle(item.qty <= 1)}
                  aria-label="수량 줄이기"
                >
                  −
                </button>
                <span
                  style={{
                    minWidth: 20,
                    textAlign: 'center',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {item.qty}
                </span>
                <button
                  onClick={() => increase(item.id)}
                  style={qtyBtnStyle(false)}
                  aria-label="수량 늘리기"
                >
                  +
                </button>
              </div>

              <button className="mini-del" onClick={() => removeItem(item.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 16,
          paddingTop: 14,
          borderTop: '2px solid var(--border)',
        }}
      >
        <span style={{ color: 'var(--muted)' }}>총 {totalCount}개</span>
        <span style={{ fontSize: 20, fontWeight: 800 }}>
          합계 {totalPrice.toLocaleString()}원
        </span>
      </div>
    </div>
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
