// ⚠️ 이 카드의 '진짜 옛날 방식' 코드는 리액트가 아니라 순수 HTML 파일에 있다.
//    → public/vanilla/step0-why-react/counter.html  (리액트도, JSX도, 컴포넌트도, useRef도 없다)
//
// 이 .jsx 파일은 그 HTML을 <iframe>으로 그대로 띄우는 '껍데기'일 뿐이다.
// 리액트 앱 안에서 순수 HTML을 완전히 분리해 보여주려고 iframe을 쓴다.
// (진짜 코드가 궁금하면 public/vanilla/step0-why-react/counter.html을 열어 보자.)

export default function OldWayCounter() {
  return (
    <div className="card compare-card old">
      <div className="file-label">📄 public/vanilla/step0-why-react/counter.html</div>
      <span className="compare-tag">😵 옛날 방식 (순수 HTML · 명령형)</span>

      {/* 리액트가 아니라, 순수 HTML 파일을 그대로 띄운다 */}
      <iframe className="vanilla-frame" src="/vanilla/step0-why-react/counter.html" title="순수 HTML 카운터" />

      <p className="compare-hint">
        리액트가 전혀 없다. 값이 바뀌면 <code>document.getElementById</code>로 요소를 찾아
        <code>textContent</code>를 <b>내가 직접</b> 갱신한다.
      </p>
    </div>
  )
}
