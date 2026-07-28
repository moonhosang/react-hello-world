// ============================================================
// 실전 앱 · Lv3 · 사용자 검색 (디바운스 + 비동기 + 경쟁 상태)
// ============================================================
// 이 파일은 페이지 래퍼다 — 헤더·학습 포인트·완성 데모·연습 문제를 배치한다.
// 완성 데모(검색창 + debounce + 결과 목록)의 로직은 SearchDemo.jsx로 분리했다.

import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeSearchEasy from './practiceEasy.jsx'
import PracticeSearchMedium from './practiceMedium.jsx'
import PracticeSearchHard from './practiceHard.jsx'
import SolutionSearch from './solution.jsx'
import TechTags from '../../components/TechTags.jsx'
import SearchDemo from './SearchDemo.jsx'

const DEBOUNCE_MS = 350

export default function SearchApp({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge effect-badge">실전 앱 · Lv3</span>
        <h2>사용자 검색</h2>
        <p>입력이 멈춘 뒤에만 검색하는 디바운스 검색이다. 비동기·타이머·경쟁 상태를 한 앱에 엮는다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          입력마다 요청하지 말고 <b>debounce</b>로 입력이 멈춘 뒤 <b>한 번만</b> 부른다.
          이전 타이머는 <code>useRef</code>에 담아 정리하고, 비동기 응답은 <b>순번</b>을 매겨 최신 것만 화면에 반영한다.
        </p>
      </div>

      <TechTags
        onGo={onGo}
        items={[
          { label: 'useEffect', to: 8.1 },
          { label: 'useRef(타이머)', to: 12 },
          { label: 'debounce', to: null },
          { label: '비동기 fetch', to: 8.3 },
          { label: '로딩 상태', to: 8.3 },
        ]}
      />

      <h3 className="section-title">완성된 앱 — 타이핑을 멈추면 검색된다</h3>
      <span className="learn-tag">📎 학습 포인트 · 매 입력이 아니라 '멈춘 뒤 한 번'만 요청한다</span>
      <p className="section-desc">아래 검색창에 이름을 쳐보면서 확인한다:</p>
      <ul className="section-list">
        <li><b>일부만 쳐도 된다</b> — 예: <code>김</code>, <code>코딩</code>, <code>데</code>.</li>
        <li><b>멈춰야 검색된다</b> — 입력을 멈추고 {DEBOUNCE_MS}ms가 지나야 검색이 실행된다.</li>
        <li><b>매 글자마다가 아니다</b> — 빠르게 여러 글자를 치면 중간 요청은 건너뛰고 마지막 한 번만 검색한다.</li>
      </ul>

      <div className="card">
        <SearchDemo />
      </div>

      <PracticeLevels
        solutionFile="app-search/solution.jsx"
        solution={<SolutionSearch />}
        levels={[
          {
            label: '쉬움',
            file: 'app-search/practiceEasy.jsx',
            task: '검색은 입력이 멈춘 뒤 한 번만 부르는 게 좋다(debounce). 지금은 그 마지막 한 줄 — 실제로 검색을 부르는 부분 — 만 비어 있다. 그 한 줄을 채우자.',
            hints: [
              '① 무엇·왜 — debounce는 입력할 때마다 검색하지 않고, 타이핑이 멈추길 잠깐(350ms) 기다렸다 한 번만 검색하는 방식이다. 요청이 쏟아지는 것을 막는다. 타이머 예약·정리는 이미 다 되어 있고, 타이머가 끝났을 때 실제로 검색을 부르는 한 줄만 남았다.',
              '② 어디 — practiceEasy.jsx의 useEffect 안, setTimeout(() => { ... }, DEBOUNCE_MS)의 중괄호 안에 🟢 TODO가 있다.',
              '③ 어떻게 — searchUsers(q)는 결과를 나중에 주는 Promise다 → searchUsers(q).then((data) => { setResults(data); setLoading(false) })로, 결과가 오면 목록을 채우고 ⏳를 끈다.',
              '④ 확인 — 검색창에 "김"을 치고 잠깐 멈춰보라. 350ms 뒤 결과가 뜨면 성공이다. 빠르게 여러 글자를 치면 마지막 것만 검색된다.',
            ],
            node: <PracticeSearchEasy />,
          },
          {
            label: '중간',
            file: 'app-search/practiceMedium.jsx',
            task: 'debounce 로직(useEffect 안)이 통째로 비어 있어 검색이 실행되지 않는다. 이전 타이머 정리 → 예약 → 검색 → 정리, 네 조각을 채워 되살리자.',
            hints: [
              '① 무엇·왜 — debounce는 입력이 멈춘 뒤 한 번만 검색하는 방식이다. query가 바뀔 때마다 "이전 예약을 취소하고 새로 350ms 뒤 검색을 예약"하면, 타이핑하는 동안엔 예약이 자꾸 미뤄지다가 멈춘 순간 딱 한 번만 실행된다.',
              '② 어디 — practiceMedium.jsx의 useEffect 안, setLoading(true) 아래에 🟡 TODO 1~4가 있다. 검색어가 비었을 때 처리는 이미 되어 있다.',
              '③ 어떻게 (1) — 먼저 이전 예약을 취소한다: clearTimeout(timerRef.current).',
              '③ 어떻게 (2) — 새 예약을 잡고 그 타이머 id를 담는다: timerRef.current = setTimeout(() => { searchUsers(q).then((data) => { setResults(data); setLoading(false) }) }, DEBOUNCE_MS).',
              '④ 확인 — 마지막에 cleanup을 돌려준다: return () => clearTimeout(timerRef.current). 다 채우고 "김"을 친 뒤 멈추면 결과가 뜬다.',
            ],
            node: <PracticeSearchMedium />,
          },
          {
            label: '어려움',
            file: 'app-search/practiceHard.jsx',
            task: '타이머용 useRef와 debounce useEffect가 통째로 비어 있다. 상태 선언 아래 두 자리를 처음부터 채워 검색을 살리자.',
            hints: [
              '① 무엇·왜 — debounce는 입력이 멈춘 뒤에만(여기선 350ms) 한 번 검색하는 방식이다. 이걸 하려면 "예약한 타이머의 id"를 어딘가 기억해 둬야, 다음 입력이 왔을 때 이전 예약을 취소할 수 있다. 그 기억 장소가 useRef다(값이 바뀌어도 재렌더를 일으키지 않는다).',
              '② 어디 — practiceHard.jsx의 🔴 TODO A(상태 선언 아래)와 🔴 TODO B(그 아래) 두 곳이다. 입력창·결과 목록 렌더는 이미 있다.',
              '③ 어떻게 A — 타이머 id를 담을 곳을 만든다: const timerRef = useRef(null).',
              '③ 어떻게 B — useEffect(() => { ... }, [query])로 query가 바뀔 때마다 실행한다. 안에서: q = query.trim()이 비면 예약 취소·결과 비우고 return → setLoading(true) → clearTimeout(timerRef.current) → timerRef.current = setTimeout(() => searchUsers(q).then((data) => { setResults(data); setLoading(false) }), DEBOUNCE_MS) → return () => clearTimeout(timerRef.current).',
              '④ 확인 — "김"을 치고 멈추면 350ms 뒤 결과가 뜬다. 입력을 다 지우면 초기 안내 문구로 돌아온다.',
            ],
            node: <PracticeSearchHard />,
          },
        ]}
      />

      <div className="try-it">
        <h4>💡 배운 개념이 어디에 쓰였나</h4>
        <ul>
          <li><b>debounce</b> — 입력마다 검색하지 않고, 입력이 멈추고 {DEBOUNCE_MS}ms 뒤에 <b>한 번만</b> 검색한다.</li>
          <li><b>타이머 정리 (useRef)</b> — 타이머 id를 <code>timerRef</code>에 담아, 새 입력이 오면 <code>clearTimeout</code>으로 이전 예약을 취소한다.</li>
          <li><b>loading / 빈 결과</b> — 검색 중엔 <code>⏳</code>, 결과가 없으면 "결과 없음", 검색어가 비면 초기 안내로 화면을 나눈다.</li>
          <li><b>경쟁 상태 방지</b> — 요청마다 <code>seqRef</code>로 순번을 매기고, 늦게 온 옛 응답(순번이 뒤처진)이 최신 결과를 덮지 못하게 버린다.</li>
          <li><b>controlled input</b> — 입력창의 값을 <code>query</code> state로 다뤄, 값이 바뀔 때마다 <code>useEffect</code>가 검색을 다시 예약한다.</li>
        </ul>
      </div>
    </section>
  )
}
