import { useState } from 'react'

// ✅ 리액트 방식(반응형): input의 value를 "상태(state)"에 묶는다.
// 이걸 controlled component(제어 컴포넌트)라고 부른다.
//
//   value={text}                     → 화면의 값은 항상 state를 따라감
//   onChange={e => setText(...)}      → 타이핑할 때마다 state를 갱신
//
// 이렇게 하면 state가 "단일 진실의 원천(single source of truth)"이 된다.
// 타이핑하는 매 순간 값을 알기 때문에, 글자 수·실시간 검증·변환이 전부 쉬워진다.

export default function ControlledInput() {
  const [text, setText] = useState('')

  return (
    <div className="card compare-card react">
      <div className="file-label">📄 ControlledInput.jsx</div>
      <span className="compare-tag">⚛️ 상태에 묶기 (controlled)</span>
      <input
        value={text} // 화면 값 = state
        placeholder="이름을 입력하세요"
        onChange={(e) => setText(e.target.value)} // 타이핑 → state 갱신
      />
      {/* 값을 항상 알고 있으니, 아래처럼 실시간 기능이 공짜로 따라온다 */}
      <p className="compare-note">리액트가 아는 값: <b>{text || '———'}</b> <span className="compare-hint">(실시간)</span></p>
      <p className="compare-note">글자 수: {text.length}자</p>
      <p className="compare-note">대문자 미리보기: {text.toUpperCase() || '(비어 있음)'}</p>
      {text.length > 10 && <p className="warn">⚠️ 10자를 넘었다!</p>}
      <p className="compare-hint">
        타이핑하는 <b>매 순간</b> 값을 알기 때문에 검증·변환이 쉽다.
      </p>
    </div>
  )
}
