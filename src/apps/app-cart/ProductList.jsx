// 🧺 상품 목록 — '담기'로 장바구니에 넣는다.
// 상품 카탈로그는 바뀌지 않는 고정 데이터라 state가 아니라 상수로 여기서 소유한다.
// 부모(Cart)에게는 onAdd 콜백만 받아, 담기 클릭 시 그 상품을 올려보낸다.
const PRODUCTS = [
  { id: 'p1', name: '아메리카노', price: 4000, emoji: '☕' },
  { id: 'p2', name: '카페라떼', price: 4500, emoji: '🥛' },
  { id: 'p3', name: '크루아상', price: 3500, emoji: '🥐' },
  { id: 'p4', name: '치즈케이크', price: 6000, emoji: '🍰' },
  { id: 'p5', name: '초코쿠키', price: 2500, emoji: '🍪' },
]

export default function ProductList({ onAdd }) {
  return (
    <>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>🧺 상품 목록</div>
      {/* 폭에 맞춰 칸이 자동으로 늘고 줄어드는 반응형 그리드(최소 150px) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 10,
          marginBottom: 20,
        }}
      >
        {/* 상품마다 카드 하나. 담기 콜백은 그대로 아래로 전달만 한다 */}
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </>
  )
}

// 상품 한 칸(이모지·이름·가격·담기 버튼). 담기를 누르면 부모에게 이 상품을 알릴 뿐,
// 장바구니에 어떻게 담기는지는 이 컴포넌트가 몰라도 된다(관심사 분리).
function ProductCard({ product, onAdd }) {
  return (
    <div
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
        onClick={() => onAdd(product)}
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
  )
}
