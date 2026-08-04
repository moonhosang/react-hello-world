import { useState } from 'react'

// 📖 용어 사전 — JS·React에서 은근히 걸리는 말들을 한 곳에 모아
//   한 줄 정의 + 처음 배우는 레슨으로 점프. 위 검색/칩으로 바로 찾아간다.
// to: 그 용어를 배우는 레슨 id (onGo로 이동). '⚛️'=React, '🟨'=JS.

const TERMS = [
  // ── ⚛️ React ──────────────────────────────
  { t: '컴포넌트', cat: 'react', to: 1, def: '화면 한 조각을 그리는 함수. JSX를 return한다. 대문자로 시작한다.' },
  { t: 'JSX', cat: 'react', to: 1.45, def: 'HTML처럼 생겼지만 자바스크립트다. 빌드 도구가 함수 호출로 바꾼다 → 결과는 객체.' },
  { t: 'props', cat: 'react', to: 2.1, def: '부모가 자식에게 내려주는 값. 자식은 읽기만 한다(못 바꾼다).' },
  { t: 'children (합성)', cat: 'react', to: 2.3, def: '여는/닫는 태그 사이에 넣은 내용. props.children으로 받아 껍데기를 만든다.' },
  { t: '캡슐화', cat: 'react', to: 1.5, def: '내부 구현을 감추고 <이름 />이라는 일관된 사용법만 드러내는 것.' },
  { t: 'state', cat: 'react', to: 3.1, def: '컴포넌트가 소유하고 스스로 바꾸는 데이터. 바뀌면 다시 그려진다.' },
  { t: 'useState', cat: 'react', to: 3.1, def: '[값, 바꾸는 함수]를 돌려주는 훅. 값은 set 함수로만 바꾼다.' },
  { t: '스냅샷 (snapshot)', cat: 'react', to: 3.2, def: '한 번의 렌더에서 state는 고정된 값이다. setCount(count+1)을 여러 번 해도 +1인 이유.' },
  { t: '상태 끌어올리기 (lifting state up)', cat: 'react', to: 3.5, def: '여러 형제가 공유할 state를 공통 부모로 올리고, props로 내리고 콜백으로 받는 것.' },
  { t: '콜백 prop', cat: 'react', to: 3.5, def: '자식에게 넘긴 함수. 자식이 "일이 생겼다"고 부모에게 값으로 알리는 통로.' },
  { t: '리렌더링', cat: 'react', to: 3.6, def: 'state·props가 바뀌면 그 컴포넌트(와 자식)를 다시 그리는 것.' },
  { t: '이벤트 전파 (버블링)', cat: 'react', to: 3.3, def: '자식 클릭이 부모 onClick까지 타고 올라가는 것. stopPropagation으로 막는다.' },
  { t: 'key', cat: 'react', to: 5, def: 'map으로 만든 목록의 각 요소에 주는 고유값(보통 id). 리액트가 어느 항목인지 구분한다.' },
  { t: '조건부 렌더링', cat: 'react', to: 4.5, def: '삼항(A?B:C)·&&로 "무엇을 그릴지" 고르는 것. {숫자 && ...}의 0 함정 주의.' },
  { t: 'controlled input', cat: 'react', to: 4, def: '입력값을 state로 쥐고 value+onChange로 다루는 입력창. 단방향 데이터 흐름.' },
  { t: 'useEffect', cat: 'react', to: 8.1, def: '렌더가 끝난 뒤 할 일(부수 효과)을 적는 훅. 지금의 props·state에 화면 밖을 동기화한다.' },
  { t: '의존성 배열', cat: 'react', to: 8.1, def: 'useEffect의 둘째 인자. 그 값이 바뀔 때만 effect를 다시 실행한다. []=한 번, 생략=매 렌더.' },
  { t: '정리 (cleanup)', cat: 'react', to: 8.2, def: 'effect가 return한 함수. 타이머·구독을 뒷정리한다(다음 실행·언마운트 전).' },
  { t: '부수 효과 (side effect)', cat: 'react', to: 8.1, def: '렌더 순수성 밖의 일 — fetch·타이머·DOM 직접 조작 등. 렌더 중이 아니라 effect에서.' },
  { t: 'Context', cat: 'react', to: 7.1, def: 'prop을 줄줄이 넘기지 않고, Provider로 감싼 곳 어디서든 값을 꺼내 쓰게 하는 통로.' },
  { t: 'prop drilling', cat: 'react', to: 7.1, def: '중간 컴포넌트를 거쳐 props를 여러 단계 내려보내는 번거로움. Context로 해결.' },
  { t: 'useReducer', cat: 'react', to: 10, def: '흩어진 상태 로직을 reducer 한 곳에 모으는 훅. dispatch로 action을 보낸다.' },
  { t: 'reducer / action / dispatch', cat: 'react', to: 10, def: 'reducer(현재 state, action)→새 state인 순수 함수. dispatch(action)로 "무엇을 할지"만 보낸다.' },
  { t: 'memo / useMemo / useCallback', cat: 'react', to: 11, def: '불필요한 재계산·재렌더를 건너뛰는 최적화. 값·함수를 기억(메모)해 재사용한다.' },
  { t: 'useRef', cat: 'react', to: 12, def: '리렌더를 일으키지 않는 상자. DOM 참조(focus)나 값 기억에 쓴다(.current).' },
  { t: '커스텀 훅', cat: 'react', to: 12, def: 'use로 시작하는 내 함수. 상태 로직을 담아 여러 컴포넌트가 재사용한다.' },
  { t: '훅 규칙', cat: 'react', to: 3.81, def: '훅은 컴포넌트 최상위에서만 호출. if·반복문·이벤트 핸들러 안에서 부르면 안 된다.' },
  { t: '불변성 (immutability)', cat: 'react', to: 3.2, def: '원본을 바꾸지 말고 새 값을 만들어 넣기. 객체는 {...obj}, 배열은 [...arr]로.' },
  { t: '순수 함수', cat: 'react', to: 3.6, def: '같은 입력이면 같은 출력, 바깥을 건드리지 않는 함수. 렌더·reducer가 그래야 한다.' },

  // ── 🟨 JS ─────────────────────────────────
  { t: '표현식 vs 문 (expression / statement)', cat: 'js', to: 'js-expr', def: '표현식 = 값이 되는 것(1+2). 문 = 실행되는 명령(if·for). JSX 중괄호엔 표현식만.' },
  { t: '항 · 인자 (term / factor)', cat: 'js', to: 'js-expr', def: '식을 쪼갠 조각. +로 나눈 조각이 항, 더 안쪽 *로 나눈 조각이 인자(상대적).' },
  { t: '화살표 함수', cat: 'js', to: 'js-arrow', def: 'const f = (x) => x*2 처럼 짧게 쓰는 함수. 한 줄이면 return 생략(암묵 반환).' },
  { t: '삼항 연산자', cat: 'js', to: 'js-arrow', def: '조건 ? A : B — 조건이 참이면 A, 거짓이면 B라는 값을 만든다.' },
  { t: '템플릿 리터럴', cat: 'js', to: 'js-arrow', def: '백틱 `안녕 ${name}` — 문자열 안에 ${}로 값을 꽂는다.' },
  { t: '함수는 값이다 (일급 함수)', cat: 'js', to: 'js-func', def: '함수도 변수에 담고, 인자로 넘기고, 실행한다. 괄호 ()가 실행 스위치.' },
  { t: '콜백 (callback)', cat: 'js', to: 'js-func', def: '남에게 넘겨 두고, 그쪽이 나중에 대신 불러 주는 함수. onClick={fn}, map(fn).' },
  { t: 'truthy / falsy', cat: 'js', to: 'js-truthy', def: '불리언이 아닌 값도 조건에서 참/거짓 취급. falsy는 6개(false·0·""·null·undefined·NaN).' },
  { t: '단락 평가 (short-circuit)', cat: 'js', to: 'js-truthy', def: 'A && B는 A가 거짓이면 A를 그대로 반환. A || B는 A가 참이면 A. 기본값·가드에 쓴다.' },
  { t: 'map · filter', cat: 'js', to: 'js-array', def: 'map=각 원소를 변환해 새 배열, filter=조건 통과한 것만 새 배열. 원본은 안 바뀐다.' },
  { t: '구조 분해 (destructuring)', cat: 'js', to: 'js-destructure', def: 'const {name, age} = user / const [a, b] = arr 로 값을 한 번에 꺼내 변수에 담기.' },
  { t: '스프레드 (...)', cat: 'js', to: 'js-destructure', def: '{...obj}, [...arr]로 펼쳐 복사. {...obj, key: 새값}으로 한 필드만 덮어쓴다.' },
  { t: '얕은 복사', cat: 'js', to: 'js-destructure', def: '스프레드는 한 겹만 새로 복사한다. 중첩된 안쪽 객체는 여전히 같은 참조.' },
  { t: 'Promise', cat: 'js', to: 'js-async', def: '"나중에 값이 올 상자". 도착하면 .then(값 => ...)이 실행된다.' },
  { t: 'async / await', cat: 'js', to: 'js-async', def: '.then 사슬 대신 const x = await fetchX()로 "기다렸다가" 다음 줄로. 비동기를 동기처럼.' },
  { t: '비동기 (asynchronous)', cat: 'js', to: 'js-async', def: '결과가 지금이 아니라 나중에 오는 것. 그동안 코드·화면은 멈추지 않는다.' },
]

const CATS = { react: '⚛️ React', js: '🟨 JS' }

export default function Glossary({ onGo }) {
  const [q, setQ] = useState('')

  const jump = (i) => {
    const el = document.getElementById(`g-${i}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const kw = q.trim().toLowerCase()
  const match = (x) => !kw || x.t.toLowerCase().includes(kw) || x.def.toLowerCase().includes(kw)
  const shown = TERMS.map((x, i) => ({ ...x, i })).filter(match)

  return (
    <section>
      <header className="lesson-header">
        <span className="badge concept-badge">📖 용어 사전</span>
        <h2>JS·React 용어 총정리</h2>
        <p>은근히 어려운 말들을 한 곳에. 한 줄 정의 + 처음 배우는 레슨으로 점프한다.</p>
      </header>

      <div className="card" style={{ position: 'sticky', top: 0, zIndex: 2 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="🔎 용어·설명 검색 (예: 콜백, 의존성, truthy)"
          style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid var(--border)', borderRadius: 8 }}
        />
        {/* 용어 칩 — 클릭하면 그 정의로 점프 */}
        <div className="button-row" style={{ flexWrap: 'wrap', marginTop: 10, gap: 6 }}>
          {shown.length === 0
            ? <span className="demo-desc" style={{ margin: 0 }}>검색 결과가 없다.</span>
            : shown.map((x) => (
              <button key={x.i} className="chip" onClick={() => jump(x.i)} title="정의로 점프">
                {x.cat === 'react' ? '⚛️' : '🟨'} {x.t}
              </button>
            ))}
        </div>
      </div>

      {['react', 'js'].map((cat) => {
        const items = shown.filter((x) => x.cat === cat)
        if (items.length === 0) return null
        return (
          <div key={cat}>
            <h3 className="section-title">{CATS[cat]}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map((x) => (
                <div className="card" id={`g-${x.i}`} key={x.i} style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                    <b style={{ fontSize: 15 }}>{x.t}</b>
                    <button className="chip" style={{ fontSize: 12 }} onClick={() => onGo(x.to)}>레슨으로 → </button>
                  </div>
                  <p className="demo-desc" style={{ margin: '6px 0 0', lineHeight: 1.6 }}>{x.def}</p>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      <p className="section-desc" style={{ marginTop: 16 }}>
        📌 용어가 헷갈리면 여기로 돌아와 검색하면 된다. "레슨으로 →"를 누르면 그 용어를 처음 배우는 곳으로 이동한다.
      </p>
    </section>
  )
}
