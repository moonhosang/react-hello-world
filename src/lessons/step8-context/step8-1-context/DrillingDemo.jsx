import { RenderTag } from './RenderTag.jsx'

// 😩 문제: 필드(name·role)를 개별 prop으로 5단계를 거쳐 계속 넘겨받아 전달만 한다.
// name이 바뀌면 prop이 새로 내려오므로 5단계가 '전부' 리렌더된다(지문 전부 바뀜) — memo도 못 막는다.
export function DrillPage({ name, role }) {
  return (
    <div className="tree-box">
      ① Page <small>(전달만)</small> <RenderTag />
      <DrillLayout name={name} role={role} />
    </div>
  )
}
function DrillLayout({ name, role }) {
  return (
    <div className="tree-box">
      ② Layout <small>(전달만)</small> <RenderTag />
      <DrillSidebar name={name} role={role} />
    </div>
  )
}
function DrillSidebar({ name, role }) {
  return (
    <div className="tree-box">
      ③ Sidebar <small>(전달만)</small> <RenderTag />
      <DrillPanel name={name} role={role} />
    </div>
  )
}
function DrillPanel({ name, role }) {
  return (
    <div className="tree-box">
      ④ Panel <small>(전달만)</small> <RenderTag />
      <DrillProfile name={name} role={role} />
    </div>
  )
}
function DrillProfile({ name, role }) {
  return (
    <div className="tree-box">
      ⑤ Profile <small>(전달만)</small> <RenderTag />
      <DrillBadge name={name} role={role} />
    </div>
  )
}
function DrillBadge({ name, role }) {
  return <div className="tree-box leaf">👤 {name} ({role}) <small>← 여기서만 씀</small> <RenderTag /></div>
}
