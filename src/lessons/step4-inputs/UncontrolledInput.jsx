// 😵 그냥 둔 input — value·onChange를 아무것도 안 묶었다.
// 타이핑은 되지만, 값의 '주인'은 DOM(input)이다.
// 컴포넌트 안에는 이 값을 가리킬 변수가 없어서, 리액트는 사용자가 뭘 쳤는지 전혀 모른다(깜깜).
// (정말 DOM 값을 직접 읽어야 하면 useRef라는 게 있는데, 그건 13단계에서 배운다.)

export default function UncontrolledInput() {
  return (
    <div className="card compare-card old">
      <div className="file-label">📄 UncontrolledInput.jsx</div>
      <span className="compare-tag">😵 그냥 두기 (uncontrolled)</span>
      <input placeholder="타이핑해도…" />
      {/* 아래 값은 state가 아니라 '고정 텍스트'다 — 리액트가 참조할 값 자체가 없기 때문 */}
      <p className="compare-note">리액트가 아는 값: <b>———</b> <span className="compare-hint">(영영 안 바뀜)</span></p>
      <p className="compare-note">글자 수: <b>?</b> (셀 수가 없다)</p>
      <p className="compare-hint">
        <code>value</code>·<code>onChange</code>를 <b>안 묶었다</b>. 값의 주인이 <b>DOM</b>이라,
        컴포넌트 안에서 이 값을 가리킬 변수가 없다 → 리액트는 <b>깜깜</b>이다.
      </p>
    </div>
  )
}
