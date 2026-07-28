// 파생 상태 표시 — 총 개수 · 합계 금액.
// 스스로 계산하지 않고, 부모(Cart)가 useMemo로 계산한 값을 props로 받아 '표시만' 한다.
export default function CartSummary({ totalCount, totalPrice }) {
  return (
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
  )
}
