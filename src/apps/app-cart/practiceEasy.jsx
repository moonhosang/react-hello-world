import { useMemo, useState } from 'react'

// 🛒 장바구니 — 실습 · 쉬움 (90% 완성)
// 담기 · 수량 +/− · 삭제 · 총 개수까지 전부 채워져 있다.
// 딱 한 군데, 합계 금액(totalPrice) 한 줄만 비어 있다.
//
// 할 일:
//   🟢 TODO 1 (합계): totalPrice — cart에서 price × qty 를 모두 더한다 (reduce)
//                   총 개수(totalCount) 바로 위 줄을 그대로 참고하면 된다

const PRODUCTS = [
  { id: 'p1', name: '아메리카노', price: 4000, emoji: '☕' },
  { id: 'p2', name: '카페라떼', price: 4500, emoji: '🥛' },
  { id: 'p3', name: '크루아상', price: 3500, emoji: '🥐' },
  { id: 'p4', name: '치즈케이크', price: 6000, emoji: '🍰' },
  { id: 'p5', name: '초코쿠키', price: 2500, emoji: '🍪' },
]

export default function PracticeCartEasy() {
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

  // 수량 +1 (제공됨)
  function increase(id) {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    )
  }

  // 수량 −1, 최소 1 유지 (제공됨)
  function decrease(id) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    )
  }

  // 삭제 (제공됨)
  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  // 파생 상태 — cart에서 계산한다 (state로 저장하지 않는다)
  // 총 개수는 채워져 있다. 이걸 그대로 흉내 내면 된다.
  const totalCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  )

  // 🟢 TODO 1: 합계 금액 — price × qty 를 모두 더한다
  //   위 totalCount 처럼 useMemo(() => cart.reduce(...), [cart]) 형태로 채운다
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
