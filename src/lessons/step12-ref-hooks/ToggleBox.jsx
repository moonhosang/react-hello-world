import { useToggle } from './useToggle.js'

// 같은 useToggle 훅을 쓰는 재사용 컴포넌트.
// 이 컴포넌트를 여러 번 놓아도, 각 인스턴스는 '자기만의 on 상태'를 가진다.
export default function ToggleBox({ label, onEmoji, offEmoji }) {
  const [on, toggle] = useToggle(false)

  return (
    <div className="card center">
      <div style={{ fontSize: 40, marginBottom: 8 }}>{on ? onEmoji : offEmoji}</div>
      <div className="button-row" style={{ justifyContent: 'center' }}>
        <button onClick={toggle}>{label}: {on ? 'ON' : 'OFF'}</button>
      </div>
    </div>
  )
}
