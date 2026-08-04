// 🟨 JS 5강 · 배열 map · filter   (배우는 것: 배열을 '새 배열'로 변환·선별하는 법)
// React 리스트 렌더링(7장)의 핵심 전제 — 배열.map(item => <li>...</li>) 이 한 줄이 여기서 나온다.
// 콜백은 전부 화살표 함수다(JS 2강 연결). 둘 다 원본을 바꾸지 않는다(불변성 → React state의 규칙).

import { useState } from 'react'
import QuickQuiz from '../../../components/QuickQuiz.jsx'

const mono = 'var(--font-mono)'
// 배열 원소 칩 — 원본(파랑)·결과(초록)·탈락(빨강 취소선)
const numChip = (kind, active) => ({
  border: `1.5px solid ${kind === 'out' ? '#16a34a' : kind === 'drop' ? '#dc2626' : '#2563eb'}`,
  color: kind === 'out' ? '#16a34a' : kind === 'drop' ? '#dc2626' : '#2563eb',
  textDecoration: kind === 'drop' ? 'line-through' : 'none',
  background: active ? 'rgba(37,99,235,0.12)' : 'transparent',
  borderRadius: 8, padding: '3px 10px', fontFamily: mono, fontSize: 13, fontWeight: 700,
})

// JS 1·2강 해부기와 같은 색칩 — 조각의 역할별 색
const ROLE = {
  expression: { name: '식', color: '#7c3aed' },
  term: { name: '조건/항', color: '#2563eb' },
  operator: { name: '연산자', color: '#dc2626' },
  value: { name: '값', color: '#16a34a' },
}
const chipStyle = (role) => ({
  border: `1.5px solid ${ROLE[role]?.color ?? '#888'}`,
  color: ROLE[role]?.color ?? '#888',
  background: 'transparent',
  borderRadius: 8,
  padding: '3px 9px',
  fontFamily: mono,
  fontSize: 13,
  fontWeight: 600,
})
// 해부기 스텝 카드 + 범례 (J1 ExprDissector와 동일한 모양)
function StepCards({ steps, shown }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {steps.slice(0, shown).map((s, i) => (
        <div className="card" key={i} style={{ padding: '10px 12px' }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: s.note ? 3 : 8 }}>{s.title}</div>
          {s.note && <div className="demo-desc" style={{ margin: '0 0 8px' }}>🔑 {s.note}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            {s.parts.map((p, j) => <span key={j} style={chipStyle(p.role)}>{p.label}</span>)}
            {s.result && <b style={{ marginLeft: 8, fontSize: 15 }}>{s.result}</b>}
          </div>
        </div>
      ))}
    </div>
  )
}
function Legend() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
      {Object.values(ROLE).map((r) => (
        <span key={r.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: r.color, display: 'inline-block' }} />
          {r.name}
        </span>
      ))}
    </div>
  )
}

// 엄선된 예시 — 임의 입력 파싱 대신 고정 배열 + 두 콜백으로 (콜백은 전부 화살표 함수)
const NUMS = [1, 2, 3, 4]
const CIRCLED = ['①', '②', '③', '④']
const OPS = [
  {
    code: 'nums.map(n => n * 2)', kind: 'map',
    make: (n, i) => ({
      keep: true, out: n * 2,
      title: `${CIRCLED[i]} 원소 ${n} 을 콜백 n => n * 2 에 넣는다`,
      note: `n 자리에 ${n} 이 들어간다 — 식 ${n} * 2 를 평가한다`,
      parts: [
        { label: String(n), role: 'term' },
        { label: '→', role: 'operator' },
        { label: `${n} * 2`, role: 'expression' },
        { label: '=', role: 'operator' },
        { label: String(n * 2), role: 'value' },
      ],
      result: `→ 새 배열에 ${n * 2} 담기 ✅`,
    }),
    final: (arr) => ({
      title: `⑤ 완성 — 콜백 ${NUMS.length}번 호출 끝`,
      note: `원소 ${NUMS.length}개 → 결과 ${arr.length}개, map은 항상 같은 길이다`,
      parts: [{ label: `[${arr.join(', ')}]`, role: 'value' }],
      result: '← 반환되는 새 배열',
    }),
  },
  {
    code: 'nums.filter(n => n > 2)', kind: 'filter',
    make: (n, i) => ({
      keep: n > 2, out: n,
      title: `${CIRCLED[i]} 원소 ${n} 을 콜백 n => n > 2 에 넣는다`,
      note: `n 자리에 ${n} 이 들어간다 — 조건 ${n} > 2 를 평가하면 ${n > 2}`,
      parts: [
        { label: String(n), role: 'term' },
        { label: '→', role: 'operator' },
        { label: `${n} > 2`, role: 'expression' },
        { label: '=', role: 'operator' },
        { label: String(n > 2), role: 'value' },
      ],
      result: n > 2 ? `→ true — 새 배열에 ${n} 그대로 남기기 ✅` : '→ false — 버린다 ❌',
    }),
    final: (arr) => ({
      title: `⑤ 완성 — 콜백 ${NUMS.length}번 호출 끝`,
      note: `원소 ${NUMS.length}개 → 결과 ${arr.length}개, filter는 truthy만 남아 짧아질 수 있다`,
      parts: [{ label: `[${arr.join(', ')}]`, role: 'value' }],
      result: '← 반환되는 새 배열',
    }),
  },
]

// 라이브 해부기 — "다음 원소 적용"을 누를 때마다 원소 하나가 콜백을 통과하는 과정을 카드로 쪼갠다.
function MapFilterLab() {
  const [opIdx, setOpIdx] = useState(0)
  const [shown, setShown] = useState(0) // 몇 장의 카드를 펼쳤나 (원소 4장 + 완성 1장)
  const op = OPS[opIdx]
  const elemSteps = NUMS.map((n, i) => op.make(n, i))
  const finalArr = elemSteps.filter((s) => s.keep).map((s) => s.out)
  const steps = [...elemSteps, op.final(finalArr)]
  const done = shown >= steps.length
  const result = elemSteps.slice(0, Math.min(shown, NUMS.length)).filter((s) => s.keep).map((s) => s.out)
  const pick = (i) => { setOpIdx(i); setShown(0) }

  return (
    <div>
      <div className="button-row">
        {OPS.map((o, i) => (
          <button key={i} className={'chip' + (i === opIdx ? ' on' : '')} onClick={() => pick(i)}>{o.code}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', margin: '12px 0 4px' }}>
        <span style={{ fontSize: 12, color: 'var(--muted)', width: 52, flex: 'none' }}>원본</span>
        <span style={{ fontFamily: mono, fontSize: 13 }}>nums = [</span>
        {NUMS.map((n, i) => (
          <span key={i} style={{ ...chipStyle('term'), background: i === shown && shown < NUMS.length ? 'rgba(37,99,235,0.12)' : 'transparent' }}>{n}</span>
        ))}
        <span style={{ fontFamily: mono, fontSize: 13 }}>]</span>
      </div>

      <div style={{ marginTop: 8 }}>
        {shown === 0
          ? <div className="demo-desc" style={{ margin: 0 }}>▶ "다음 원소 적용"을 눌러 원소가 하나씩 콜백을 통과하는 걸 보라.</div>
          : <StepCards steps={steps} shown={shown} />}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginTop: 10 }}>
        <span style={{ fontSize: 12, color: 'var(--muted)', width: 52, flex: 'none' }}>새 배열</span>
        <span style={{ fontFamily: mono, fontSize: 13 }}>[</span>
        {result.map((v, i) => <span key={i} style={chipStyle('value')}>{v}</span>)}
        <span style={{ fontFamily: mono, fontSize: 13 }}>]</span>
        {result.length === 0 && <span style={{ color: 'var(--muted)', fontSize: 12.5 }}>(아직 비어 있다)</span>}
      </div>

      <div className="button-row" style={{ marginTop: 10 }}>
        <button className="chip on" disabled={done} onClick={() => setShown((v) => Math.min(steps.length, v + 1))}>
          {done ? '✅ 끝' : shown < NUMS.length ? `▶ 다음 원소 적용 (n=${NUMS[shown]})` : '▶ 최종 배열 확인'}
        </button>
        <button className="chip" onClick={() => setShown(0)}>↺ 처음</button>
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        몇 번을 눌러도 위의 <b>원본 <code>nums</code>는 [1, 2, 3, 4] 그대로</b>다 — map·filter는 원본을 건드리지 않고 <b>새 배열을 반환</b>한다(불변).
      </p>
      <Legend />
    </div>
  )
}

// 체이닝 + React 리스트 미리보기 — filter(...).map(...)이 실제 <li> 목록이 되는 걸 본다.
const NAMES = ['김하늘', '이준호', '박서준', '최유나']
function NameListDemo() {
  const [onlyJun, setOnlyJun] = useState(false)
  const shown = onlyJun ? NAMES.filter((n) => n.includes('준')) : NAMES
  return (
    <div>
      <div className="button-row">
        <button className={'chip' + (!onlyJun ? ' on' : '')} onClick={() => setOnlyJun(false)}>전체 — map만</button>
        <button className={'chip' + (onlyJun ? ' on' : '')} onClick={() => setOnlyJun(true)}>'준' 포함만 — filter 후 map</button>
      </div>
      <pre className="err-code" style={{ marginTop: 10 }}>{onlyJun
        ? `names.filter(n => n.includes('준'))   // ① 조건에 맞는 이름만 남기고
     .map(n => <li key={n}>{n}</li>)   // ② 남은 것들을 <li>로 변환`
        : `names.map(n => <li key={n}>{n}</li>)   // 이름 하나 → <li> 하나 (같은 길이)`}</pre>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          {NAMES.map((n) => <span key={n} style={numChip(shown.includes(n) ? 'src' : 'drop')}>{n}</span>)}
        </div>
        <span style={{ fontSize: 18 }}>→</span>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13.5 }}>
          {shown.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </div>
      <p className="demo-desc" style={{ marginTop: 10 }}>
        원소 수만큼 <code>&lt;li&gt;</code>가 생긴다. 이게 React <b>7장 리스트 렌더링</b>의 전부다 —
        데이터 배열을 <code>map</code>으로 JSX 배열로 바꿔 화면에 놓는다.
      </p>
    </div>
  )
}

export default function JsArrayMethods() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🟨 JS 5</span>
        <h2>배열 map · filter — 새 배열을 만드는 두 도구</h2>
        <p>map은 원소를 <b>변환</b>하고, filter는 원소를 <b>골라낸다</b>. 둘 다 원본을 두고 <b>새 배열을 반환</b>한다 — React 리스트 렌더링의 핵심 전제다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <b>map(콜백)</b>은 각 원소를 콜백으로 변환해 <b>같은 길이의 새 배열</b>을,
          <b> filter(콜백)</b>은 콜백이 truthy인 원소만 남긴 <b>더 짧을 수 있는 새 배열</b>을 만든다.
          콜백은 <b>화살표 함수</b>(JS 2강)고, <b>원본은 절대 바뀌지 않는다</b>(불변성).
        </p>
      </div>

      {/* ① map */}
      <h3 className="section-title">① map — 원소마다 변환, 같은 길이</h3>
      <span className="learn-tag">📎 학습 포인트 · "각 원소 x를 → 이렇게 바꿔라"를 화살표 함수로 넘긴다</span>
      <p className="section-desc" style={{ marginTop: 0 }}>
        🔤 <b>map</b>은 "지도"이자 수학의 "<b>대응(사상)</b>" — 지도가 실제 땅의 각 지점을 종이 위 한 점에 대응시키듯,
        <code>map</code>은 원소 하나를 결과 하나에 <b>1:1로 대응</b>시킨다. 그래서 길이가 안 변한다.
      </p>
      <div className="card">
        <div className="file-label">📄 map은 1:1 변환이다</div>
        <pre className="err-code">{`const nums = [1, 2, 3, 4]
const doubled = nums.map(n => n * 2)   // [2, 4, 6, 8]  ← 새 배열
//                  └ 콜백: 원소 하나(n)를 받아 변환한 값을 돌려준다
// 원소 4개 → 결과도 4개. 항상 '같은 길이'다.`}</pre>
      </div>
      <p className="section-desc" style={{ marginTop: 0 }}>
        ⚛️ <b>React에선 이게 map의 주 용도다</b> — 데이터 배열을 돌려 <b>각 원소를 화면 조각(JSX 엘리먼트)으로</b> 만든다.
        <code>{'users.map(u => <UserCard key={u.id} user={u} />)'}</code> → <b>데이터 배열이 곧 컴포넌트 목록</b>이 된다.
        (JSX 엘리먼트는 결국 <b>자바스크립트 객체</b>다 → JS 1강·React 2장.)
      </p>
      <ul className="section-list">
        <li>콜백 <code>n =&gt; n * 2</code>가 <b>원소마다 한 번씩</b> 호출되고, 반환값들이 모여 새 배열이 된다.</li>
        <li><code>n * 2</code>는 <b>식</b>(JS 1강)이다 — 화살표 함수의 본문이 식이면 그 값이 그대로 반환된다.</li>
        <li>React에선 <code>{'배열.map(item => <li>...</li>)'}</code>로 <b>JSX 목록</b>을 만든다 (→ ⑤).</li>
      </ul>

      {/* ② filter */}
      <h3 className="section-title">② filter — 조건에 맞는 것만, 짧아질 수 있다</h3>
      <span className="learn-tag">📎 학습 포인트 · 콜백은 true/false를 돌려주는 '심사위원'이다</span>
      <p className="section-desc" style={{ marginTop: 0 }}>
        🔤 <b>filter</b>는 커피·정수기 <b>필터</b>와 같은 말 — "걸러내다". 체에 거르듯 <b>조건을 통과한 원소만</b> 남고 나머지는 버려진다.
      </p>
      <div className="card">
        <div className="file-label">📄 filter는 선별이다</div>
        <pre className="err-code">{`const nums = [1, 2, 3, 4]
const big = nums.filter(n => n > 2)    // [3, 4]  ← 새 배열
//                      └ 콜백이 truthy인 원소만 '그대로' 남는다
// 변환은 없다. 통과 or 탈락 — 그래서 길이가 줄 수 있다.`}</pre>
      </div>
      <p className="section-desc" style={{ marginTop: 0 }}>
        ⚛️ <b>React에선</b> "보여줄 것만" 추릴 때 쓴다 — <b>완료 안 된 할 일</b>, <b>검색어에 맞는 항목</b>만 <code>filter</code>로 골라,
        그 결과를 다시 <code>map</code>으로 화면에 놓는다.
      </p>
      <ul className="section-list">
        <li>map은 <b>바꾸고</b>(길이 유지), filter는 <b>고른다</b>(길이 감소 가능) — 역할이 다르다.</li>
        <li>filter는 원소를 <b>변형하지 않는다</b>. 남긴 원소는 원본 값 그대로다.</li>
        <li>모두 탈락하면 <b>빈 배열 <code>[]</code></b>이 된다 — 에러가 아니다.</li>
      </ul>

      {/* ③ 라이브 실습기 */}
      <h3 className="section-title">③ 라이브 실습기 — 원소 하나씩 콜백에 넣어 보기</h3>
      <span className="learn-tag">📎 학습 포인트 · map/filter = "콜백을 원소 수만큼 호출해 새 배열을 조립"하는 반복이다</span>
      <div className="card">
        <div className="file-label">📄 콜백을 골라 "▶ 다음 원소 적용"으로 한 원소씩 통과시켜 보라</div>
        <MapFilterLab />
      </div>

      {/* ④ 불변성 */}
      <h3 className="section-title">④ 원본은 안 바뀐다 — 불변성</h3>
      <span className="learn-tag">📎 학습 포인트 · '바꾸기'가 아니라 '새로 만들기' — React state 업데이트의 규칙이다</span>
      <div className="card">
        <div className="file-label">📄 실행 후에도 nums는 그대로다</div>
        <pre className="err-code">{`const nums = [1, 2, 3, 4]
const doubled = nums.map(n => n * 2)     // [2, 4, 6, 8]
const big = nums.filter(n => n > 2)      // [3, 4]

console.log(nums)   // [1, 2, 3, 4]  ← 두 번을 거쳐도 원본 그대로 ✅`}</pre>
      </div>
      <ul className="section-list">
        <li>map·filter는 <b>반환값(새 배열)</b>으로만 결과를 준다 — JS 1강의 "식은 값을 만들 뿐, 변수를 안 바꾼다"와 같은 이치다.</li>
        <li>React state는 <b>직접 수정 금지</b>다. <code>list.push(x)</code>처럼 원본을 바꾸면 React가 변화를 못 알아챈다 →
          그래서 <code>setList(list.filter(...))</code>처럼 <b>새 배열을 만들어 넘기는</b> 게 표준이다.</li>
      </ul>

      {/* ⑤ 체이닝 + React 연결 */}
      <h3 className="section-title">⑤ 체이닝 — filter(...).map(...) 그리고 React 목록</h3>
      <span className="learn-tag">📎 학습 포인트 · 반환값이 배열이니 점(.)을 이어 다음 메서드를 또 부를 수 있다</span>
      <p className="section-desc">
        map·filter가 <b>새 배열을 반환</b>하니, 그 결과에 바로 <code>.map</code>을 이어 부를 수 있다 — 이게 <b>체이닝</b>이다.
        "조건에 맞는 것만 골라(filter) → 화면 조각으로 변환(map)"은 React에서 매일 쓰는 조합이다.
      </p>
      <div className="card">
        <div className="file-label">🔬 React 7장 미리보기 — 배열이 목록이 되는 순간</div>
        <NameListDemo />
      </div>
      <div className="card">
        <div className="file-label">🔑 참고 · key는 뭔가</div>
        <p className="section-desc" style={{ margin: 0 }}>
          <code>{'<li key={n}>'}</code>의 <b>key</b>는 React가 목록의 각 항목을 <b>구별하는 이름표</b>다.
          map으로 만든 JSX 목록엔 key가 필요하다 — 없으면 경고가 뜬다. 자세한 건 <b>React 7장 리스트 렌더링</b>에서 다룬다.
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead">📖 한 줄 요약</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          <b>map</b>은 변환(같은 길이), <b>filter</b>는 선별(짧아질 수 있음) — 둘 다 <b>원본을 두고 새 배열을 반환</b>한다.
          그래서 체이닝이 되고, React는 <code>{'배열.map(item => <li key={...}>...</li>)'}</code>로 목록을 그린다.
        </p>
      </div>

      <h3 className="section-title">🧩 확인 드릴 — map·filter 결과 예측하기</h3>
      <span className="learn-tag">📎 학습 포인트 · map은 변환(같은 길이), filter는 선별(짧아짐) · 원본 불변 — 다섯 번 확인한다</span>
      <QuickQuiz
        intro="같은 규칙(map=변환·filter=선별·원본 불변)을 배열만 바꿔 다섯 번 확인한다. 결과를 예측해 보라."
        questions={[
          {
            q: '무엇이 나오나?',
            code: `[1, 2, 3, 4].map(n => n * 2)`,
            options: ['[2, 4, 6, 8]', '[1, 2, 3, 4]', '[8]'],
            codeOptions: true,
            answer: 0,
            explain: 'map은 각 원소를 콜백(n => n * 2)으로 변환한 새 배열을 준다. 원소 4개 → 결과도 4개(같은 길이).',
          },
          {
            q: '무엇이 나오나?',
            code: `[1, 2, 3, 4].filter(n => n > 2)`,
            options: ['[3, 4]', '[1, 2]', '[true, true, false, false]'],
            codeOptions: true,
            answer: 0,
            explain: 'filter는 콜백이 true인 원소만 그대로 남긴다. 3, 4만 n > 2가 참이라 [3, 4]다 — 변환이 아니라 선별이다.',
          },
          {
            q: '원소 4개짜리 배열에 map을 하면 결과 배열의 길이는?',
            options: ['항상 4 (같은 길이)', '조건에 따라 줄어들 수 있다', '항상 1'],
            answer: 0,
            explain: 'map은 원소 하나를 결과 하나에 1:1로 대응시키므로 길이가 그대로다. 길이가 줄 수 있는 건 filter다.',
          },
          {
            q: '아래를 실행한 뒤 nums는 무엇인가?',
            code: `const nums = [1, 2, 3, 4]
nums.map(n => n * 2)
console.log(nums)`,
            options: ['[1, 2, 3, 4] (그대로)', '[2, 4, 6, 8]', '[]'],
            codeOptions: true,
            answer: 0,
            explain: 'map·filter는 원본을 건드리지 않고 새 배열을 반환할 뿐이다. 반환값을 변수에 안 받았어도 nums는 그대로다(불변).',
          },
          {
            q: '무엇이 나오나?',
            code: `[1, 2].filter(n => n > 5)`,
            options: ['[] (빈 배열)', 'undefined', '에러가 난다'],
            codeOptions: true,
            answer: 0,
            explain: '조건을 통과하는 원소가 하나도 없으면 빈 배열 []이 된다. 에러가 아니다.',
          },
        ]}
      />
    </section>
  )
}
