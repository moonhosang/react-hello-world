// 2-1 · props 기초 (문제 → 하나 → 여러 개)
// 부모가 자식에게 값을 건네는 통로가 props다.

import HelloName from './HelloName.jsx'
import ProfileCard from './ProfileCard.jsx'
import Practice from '../../../components/Practice.jsx'
import PracticeBadge from './practice.jsx'
import SolutionBadge from './solution.jsx'

export default function Step2_1() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge form-badge">2-1</span>
        <h2>props 기초 — 값 전달하기</h2>
        <p>부모 컴포넌트가 자식 컴포넌트에게 값을 건네주는 통로가 <b>props</b>다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          같은 컴포넌트에 서로 다른 값을 props로 넘겨 재사용하는 법을 익힌다.
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          <b>props</b> = 부모 컴포넌트가 자식 컴포넌트에게 건네는 <b>값</b>. 함수에 인자를 넘기는 것과 똑같다.
        </p>
        <pre className="concept-flow">{`부모 (불러 쓰는 쪽)                자식 (불려지는 쪽)

  <HelloName name="김코딩" />  ──▶   function HelloName({ name }) { ... }
       값을 건넨다                        {name} 으로 받아 화면에 쓴다`}</pre>
        <ul className="concept-terms">
          <li><b>부모</b> — 다른 컴포넌트를 불러 쓰는 쪽</li>
          <li><b>자식</b> — 불려지는 쪽 (<code>HelloName</code>, <code>ProfileCard</code> …)</li>
          <li><b>props</b> — 부모 → 자식, <b>한 방향</b>으로만 흐른다 (읽기 전용)</li>
        </ul>
      </div>

      <h3 className="section-title">① 왜 props가 필요할까?</h3>
      <span className="learn-tag">📎 학습 포인트 · 값이 박힌 컴포넌트의 한계와 props가 필요한 이유</span>
      <p className="section-desc">
        1단계의 <code>Greeting</code>은 항상 <b>"김코딩"</b>만 인사했다. 코드에 값이 <b>박혀</b> 있으니까.
        다른 사람으로 인사하려면? → 컴포넌트를 새로 만들 필요 없다. <b>props</b>가 있다.
      </p>

      <h3 className="section-title">② props 하나 넘겨 보기</h3>
      <span className="learn-tag">📎 학습 포인트 · name="..."으로 넘기고 {'{ name }'}으로 받기</span>
      <p className="section-desc">
        <code>HelloName</code>은 <code>name</code>을 <b>바깥에서 받는다</b>. HTML 속성처럼 <code>name="..."</code>을 넘기면
        같은 컴포넌트가 다른 인사를 한다.
      </p>
      <div className="card">
        <div className="file-label">📄 HelloName.jsx  ·  &lt;HelloName name="..." /&gt;</div>
        <HelloName name="김코딩" />
        <HelloName name="이리액트" />
        <HelloName name="박개발" />
      </div>
      <p className="section-desc">
        정의는 <code>function HelloName(&#123; name &#125;)</code> — 중괄호로 받을 값 이름을 적는다.
        <br />사용은 <code>&lt;HelloName name="김코딩" /&gt;</code> — 넘길 값을 적는다. (함수의 인자와 똑같다)
      </p>

      <h3 className="section-title">③ props 여러 개 넘기기</h3>
      <span className="learn-tag">📎 학습 포인트 · 여러 값을 넘겨 카드 하나를 사람마다 재사용하기</span>
      <p className="section-desc">
        값은 여러 개 넘길 수 있다. <code>ProfileCard</code>는 <code>emoji·name·role·bio</code> 네 개를 받아
        카드 하나를 그린다. 같은 카드를 사람마다 다른 값으로 재사용한다.
      </p>
      <div className="card-grid">
        <ProfileCard emoji="👩‍💻" name="김리액트" role="프론트엔드 개발자" bio="컴포넌트로 세상을 조립하는 걸 좋아한다." />
        <ProfileCard emoji="🧑‍🎨" name="이디자인" role="UI/UX 디자이너" bio="사용자가 헤매지 않는 화면을 만든다." />
        <ProfileCard emoji="🐶" name="멍멍이" role="사내 마스코트" bio="회의 시간에 가장 집중하는 팀원." />
      </div>

      <div className="try-it">
        <h4>💡 알아두기</h4>
        <ul>
          <li>props는 <b>부모 → 자식</b> 한 방향으로만 흐른다. 자식은 <b>읽기만</b> 한다 (읽기 전용·불변).</li>
          <li>문자열·숫자·참/거짓·배열·함수까지 무엇이든 넘길 수 있다.</li>
          <li><b>기본값</b>은 구조 분해에서: <code>function HelloName(&#123; name = '손님' &#125;)</code> — 값을 안 넘기면 <b>손님</b>.</li>
        </ul>
      </div>

      <Practice
        task="Badge 컴포넌트가 props(emoji·label)를 받아 보여주게 만들고, 3개를 다른 값으로 렌더하자."
        hints={[
          'function Badge({ emoji, label }) 처럼 중괄호로 props를 받는다.',
          '<Badge emoji="⚛️" label="React" /> 로 값을 넘긴다.',
          'props가 다르면 다른 뱃지가 된다 — 정의는 하나, 사용은 여러 번.',
        ]}
        practiceFile="step2-props/step2-1-basics/practice.jsx"
        solutionFile="step2-props/step2-1-basics/solution.jsx"
        solution={<SolutionBadge />}
      >
        <PracticeBadge />
      </Practice>

      <div className="try-it">
        <h4>🛠️ 직접 해보기</h4>
        <ol>
          <li><code>ProfileCard</code>를 하나 더 추가해 <b>여러분 자신</b>의 카드를 만들어 보자.</li>
          <li><code>ProfileCard.jsx</code>에 <code>likes</code> 같은 새 prop을 추가하고 표시해 보자.</li>
          <li><code>bio</code>를 지웠을 때 어떻게 되는지 확인해 보자. (props는 없을 수도 있다)</li>
        </ol>
      </div>
    </section>
  )
}
