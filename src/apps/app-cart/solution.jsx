import { useMemo, useState } from 'react'

// ✅ 정답 예시 — 장바구니 (Lv2 · 파생 상태)
// 자기완결형 한 파일이다. 핵심은 두 가지.
//   1) 수량 조절: qty를 map으로 새 배열·새 객체를 만들어 set 한다 (불변성). − 는 최소 1 유지.
//   2) 파생값: 총 개수·합계는 state로 저장하지 않고 cart에서 계산한다.
//      useMemo(..., [cart])로 감싸 cart가 바뀔 때만 다시 계산한다.

const PRODUCTS = [
  { id: 'p1', name: '아메리카노', price: 4000, emoji: '☕' },
  { id: 'p2', name: '카페라떼', price: 4500, emoji: '🥛' },
  { id: 'p3', name: '크루아상', price: 3500, emoji: '🥐' },
  { id: 'p4', name: '치즈케이크', price: 6000, emoji: '🍰' },
  { id: 'p5', name: '초코쿠키', price: 2500, emoji: '🍪' },
]

export default function SolutionCart() {
  // 진짜 상태는 cart 하나뿐 — 담긴 상품 배열을 소유한다
  const [cart, setCart] = useState([])

  // 담기 — 이미 있으면 수량 +1, 없으면 새로 추가
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

  // 수량 +1
  function increase(id) {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    )
  }

  // 수량 −1 (최소 1 유지)
  function decrease(id) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    )
  }

  // 삭제
  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  // 파생 상태 — cart에서 계산. state로 저장하지 않는다.
  const totalCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  )
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  )

  return (
    <div className="demo-card">
      {/* 상품 목록: PRODUCTS를 grid로 깔고, 각 카드의 담기 버튼이 addToCart를 부른다 */}
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

      {/* 장바구니 제목 — 옆에 파생값 totalCount를 붙여 담긴 개수를 보여준다 */}
      <div style={{ fontWeight: 700, marginBottom: 8 }}>
        🛒 장바구니 <span style={{ color: 'var(--muted)', fontWeight: 400 }}>({totalCount}개)</span>
      </div>

      {/* 비었으면 안내 문구, 있으면 map으로 한 줄씩 렌더 (조건부 렌더링 + key) */}
      {cart.length === 0 ? (
        <p className="empty">장바구니가 비었다. 위에서 상품을 담아 보자 🛍️</p>
      ) : (
        <ul
          className="plain-list"
          style={{ paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          {cart.map((item) => (
            // 장바구니 한 줄 — 상품 정보 · 수량 +/− · 삭제를 한 li에 담는다
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

      {/* 합계 표시 — 파생값 totalCount·totalPrice를 바닥에 요약한다 */}
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
