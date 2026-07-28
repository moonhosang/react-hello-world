import { memo, useContext } from 'react'
import { UserContext } from './UserContext.js'
import { RenderTag } from './RenderTag.jsx'

// ✅ 해결: 5단계 어디도 props를 안 받는다 → props가 없으니 memo가 통한다.
// name이 바뀌어도 중간 5단계는 리렌더 안 됨(지문 고정), useContext로 쓰는 leaf만 리렌더된다.
export const CtxPage = memo(function CtxPage() {
  return (
    <div className="tree-box">
      ① Page <small>(props 없음 · memo)</small> <RenderTag />
      <CtxLayout />
    </div>
  )
})
const CtxLayout = memo(function CtxLayout() {
  return (
    <div className="tree-box">
      ② Layout <small>(props 없음 · memo)</small> <RenderTag />
      <CtxSidebar />
    </div>
  )
})
const CtxSidebar = memo(function CtxSidebar() {
  return (
    <div className="tree-box">
      ③ Sidebar <small>(props 없음 · memo)</small> <RenderTag />
      <CtxPanel />
    </div>
  )
})
const CtxPanel = memo(function CtxPanel() {
  return (
    <div className="tree-box">
      ④ Panel <small>(props 없음 · memo)</small> <RenderTag />
      <CtxProfile />
    </div>
  )
})
const CtxProfile = memo(function CtxProfile() {
  return (
    <div className="tree-box">
      ⑤ Profile <small>(props 없음 · memo)</small> <RenderTag />
      <CtxBadge />
    </div>
  )
})
function CtxBadge() {
  const user = useContext(UserContext)
  return <div className="tree-box leaf">👤 {user.name} ({user.role}) <small>← useContext로 바로 꺼냄</small> <RenderTag /></div>
}
