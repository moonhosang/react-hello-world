// 🟨 JS 3강 · 함수는 값이다   (배우는 것: 정의 vs 호출 · 함수를 변수에 담기 · 넘기기 vs 호출 · 인라인 함수)
// onClick={fn}, map(fn), 콜백 — React의 절반이 "함수를 값으로 다루기" 위에 서 있다.
// 입문자가 제일 많이 터지는 곳: onClick={greet} (O) vs onClick={greet()} (X).

import { useState } from 'react'
import QuickQuiz from '../../../components/QuickQuiz.jsx'
import TechTags from '../../../components/TechTags.jsx'

const mono = 'var(--font-mono)'

// ⑨ 클로저 — 함수가 '만들어질 때의 바깥 변수'를 기억한다.
// makeCounter를 부를 때마다 새 count가 생기고, 돌려준 함수가 그 count를 계속 붙잡는다(독립).
const makeCounter = () => {
  let count = 0 // 바깥(지역) 변수
  return () => ++count // 이 함수가 자기 count를 '기억'한다 = 클로저
}
function ClosureDemo() {
  const [a] = useState(makeCounter) // 각자 독립된 count를 품은 함수 (첫 렌더에 한 번 생성)
  const [b] = useState(makeCounter)
  const [log, setLog] = useState([])
  const hit = (label, fn) => setLog((l) => [`${label} → ${fn()}`, ...l].slice(0, 8))
  return (
    <div>
      <div className="button-row">
        <button className="chip on" onClick={() => hit('A a()', a)}>A 세기</button>
        <button className="chip on" onClick={() => hit('B b()', b)}>B 세기</button>
        <button className="chip" onClick={() => setLog([])}>지우기</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10, fontFamily: mono, fontSize: 12.5, minHeight: 42 }}>
        {log.length === 0 ? <span style={{ color: 'var(--muted)' }}>A·B를 번갈아 눌러 보라 — 각자 따로 센다.</span> : log.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        A와 B는 <b>같은 <code>makeCounter</code></b>로 만들었지만 <b>각자 자기 <code>count</code></b>를 기억한다 — A를 눌러도 B는 그대로다.
        <code> count</code>는 <code>makeCounter</code>가 끝나면 사라질 지역 변수인데, <b>돌려준 함수가 계속 붙잡고 있어</b> 살아남는다. 이게 <b>클로저</b>다.
      </p>
    </div>
  )
}

// JS 1·2강 해부기와 같은 색칩
const ROLE = {
  expression: { name: '식', color: '#7c3aed' },
  term: { name: '함수/코드', color: '#2563eb' },
  operator: { name: '연산자', color: '#dc2626' },
  value: { name: '값', color: '#16a34a' },
}
const chipStyle = (role) => ({
  border: `1.5px solid ${ROLE[role]?.color ?? '#888'}`,
  color: ROLE[role]?.color ?? '#888',
  background: 'transparent', borderRadius: 8, padding: '3px 9px', fontFamily: mono, fontSize: 13, fontWeight: 600,
})
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

// ① 정의 vs 호출 — 괄호 유무 라이브
function DefVsCall() {
  const [mode, setMode] = useState(0)
  const greet = () => { alert('👋 안녕!'); return '👋 안녕!' }
  const MODES = [
    {
      label: '① 변수에 담기', code: 'const f = greet', exec: false,
      desc: <>함수를 f에 <b>담았다</b>(괄호 없이). 실행이 아니라서 <b>alert가 안 뜬다</b> — 이제 <code>f()</code>로 부를 수 있다.</>,
    },
    {
      label: '② 매개변수로 전달', code: 'onClick={greet}   //  받는 함수에 넘김 (예: run(greet))', exec: false,
      desc: <>greet를 <b>넘겼다</b>(괄호 없이). 이것도 실행이 아니라 <b>alert가 안 뜬다</b> — 받은 쪽(React·run)이 <b>나중에</b> 대신 부른다.</>,
    },
    {
      label: '③ 실행 greet()', code: 'greet()', exec: true,
      desc: <>괄호 <code>()</code>로 <b>실행</b>했다 → <b style={{ color: '#16a34a' }}>alert가 지금 떴다!</b> 그리고 결과 '👋 안녕!'을 반환한다.</>,
    },
  ]
  const m = MODES[mode]
  const pick = (k) => { setMode(k); if (MODES[k].exec) greet() }
  return (
    <div>
      <div className="button-row">
        {MODES.map((x, k) => (
          <button key={k} className={'chip' + (k === mode ? ' on' : '')} onClick={() => pick(k)}>{x.label}</button>
        ))}
      </div>
      <div className="tree-box" style={{ marginTop: 10, fontFamily: mono, fontSize: 13 }}>
        <div style={{ color: '#2563eb', fontWeight: 700 }}>{m.code}</div>
        <div style={{ marginTop: 4, color: m.exec ? '#16a34a' : 'var(--muted)' }}>
          {m.exec ? '✅ 실행됨 — alert 떴다' : '⏸ 실행 안 됨 — 함수 값을 옮길 뿐 (alert 안 뜸)'}
        </div>
      </div>
      <p className="demo-desc" style={{ margin: '8px 0 0' }}>{m.desc}</p>
      <p className="demo-desc" style={{ margin: '6px 0 0' }}>
        🔑 <b>①담기·②전달은 alert가 안 뜬다</b>(괄호 없음 = 실행 아님, 함수를 옮길 뿐). <b>③실행만</b> 뜬다.
        괄호 없는 <code>greet</code>는 쓸모없는 게 아니라, 바로 이 <b>담기·전달용 '재료'</b>다 — 받은 쪽이 나중에 부른다(→ ②③).
      </p>
    </div>
  )
}

// ④ 넘기기 vs 호출 함정 — 실제로 눌러 보면 ❌ 버튼은 죽어 있다. (greet는 순수 함수라 렌더 중 실행돼도 안전)
function CallVsPass() {
  const [showBad, setShowBad] = useState(false)
  const greet = () => { alert('👋 안녕! — greet()가 방금 실행됐다'); return '👋 안녕!' }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* ❌ 렌더 때 실행 */}
      <div className="card" style={{ padding: '10px 12px', borderColor: '#dc2626' }}>
        <div className="file-label" style={{ color: '#dc2626' }}>❌ onClick={'{greet()}'} — 괄호 붙임</div>
        <div className="button-row">
          <button className="chip" onClick={() => { greet(); setShowBad(true) }}>❗ 이 코드를 렌더해 보기</button>
          {showBad && <button className="chip" onClick={() => setShowBad(false)}>↺ 리셋</button>}
        </div>
        {showBad && (
          <div style={{ marginTop: 8 }}>
            <button className="chip" style={{ opacity: 0.55, cursor: 'not-allowed' }}>❌ 남은 버튼 (눌러도 반응 없음)</button>
          </div>
        )}
        <p className="demo-desc" style={{ margin: '8px 0 0' }}>
          "렌더해 보기"를 누른 순간 <b>클릭도 안 했는데 alert가 떴다</b> — <code>onClick={'{greet()}'}</code>의 괄호 때문에
          greet()가 <b>화면을 그리는 시점에 실행</b>된 것이다. 그리고 onClick엔 greet의 <b>반환값(문자열)</b>만 들어가
          <b> 남은 버튼은 죽어</b> 있다.
        </p>
      </div>
      {/* ✅ 클릭 때 실행 */}
      <div className="card" style={{ padding: '10px 12px', borderColor: '#16a34a' }}>
        <div className="file-label" style={{ color: '#16a34a' }}>✅ onClick={'{() => greet()}'} — 함수를 넘김</div>
        <button className="chip on" onClick={() => greet()}>✅ 눌러 봐</button>
        <p className="demo-desc" style={{ margin: '8px 0 0' }}>
          이건 <b>클릭할 때만</b> alert가 뜬다 — 함수를 <b>넘겨 뒀다가</b> 클릭하는 순간 실행되니까. 이게 우리가 원하는 동작이다.
        </p>
      </div>
    </div>
  )
}

// ④ 함정 해부 — onClick={greet()}가 렌더 중 어떻게 풀리나
const TRAP_STEPS = [
  { title: '① onClick={greet()} — 괄호가 붙어 있다', parts: [{ label: 'onClick={ greet() }', role: 'expression' }] },
  { title: '② 괄호 때문에 렌더 중 greet() 가 지금 실행된다', parts: [{ label: 'greet()', role: 'term' }, { label: '→', role: 'operator' }, { label: "'👋 안녕!'", role: 'value' }], note: '클릭과 무관하게, 화면을 그리는 시점에 이미 실행돼 버린다' },
  { title: '③ onClick 에는 그 반환값(문자열)이 들어간다', parts: [{ label: "onClick={ '👋 안녕!' }", role: 'expression' }], note: 'onClick에 함수가 아니라 문자열이 들어간 셈이다' },
  { title: '④ 그래서 클릭해도 아무 일이 없다', parts: [{ label: '(클릭 → 실행할 함수가 없음)', role: 'value' }], result: '❗ 함수 자체를 넘겨야 했다: onClick={greet}' },
]
function TrapDissect() {
  const [shown, setShown] = useState(0)
  const done = shown >= TRAP_STEPS.length
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        {shown === 0
          ? <div className="demo-desc">▶ "다음 단계로 쪼개기"를 눌러 왜 죽는지 따라가 보라.</div>
          : <StepCards steps={TRAP_STEPS} shown={shown} />}
      </div>
      <div className="button-row">
        <button className="chip on" disabled={done} onClick={() => setShown((v) => Math.min(TRAP_STEPS.length, v + 1))}>
          {done ? '✅ 끝까지 쪼갬' : '▶ 다음 단계로 쪼개기'}
        </button>
        <button className="chip" onClick={() => setShown(0)}>↺ 처음</button>
      </div>
      <Legend />
    </div>
  )
}

// ② 라이브 — const f = greet 로 담은 함수도 f() 로 부를 수 있다 (화면 로그로 확인)
function VarStoreDemo() {
  const [out, setOut] = useState([])
  const greet = () => '👋 안녕!'
  const f = greet // 같은 함수를 f에 담는다 (괄호 없이!)
  const run = (label, result) => setOut((o) => [`${label} → ${result}`, ...o].slice(0, 6))
  return (
    <div>
      <div className="button-row">
        <button className="chip" onClick={() => run('greet()', greet())}>greet() 실행</button>
        <button className="chip" onClick={() => run('f()', f())}>f() 실행 <span style={{ opacity: 0.5 }}>(f = greet)</span></button>
        <button className="chip" onClick={() => setOut([])}>지우기</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10, fontFamily: mono, fontSize: 12.5, minHeight: 42 }}>
        {out.length === 0 ? <span style={{ color: 'var(--muted)' }}>버튼을 눌러 결과를 보라.</span> : out.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        <code>const f = greet</code>로 <b>같은 함수</b>를 f에 담았다(괄호 없이!). 그래서 <b>f()도 greet()와 똑같이</b> 결과를 낸다 — 함수가 값이라 담아서 부를 수 있는 것이다.
      </p>
    </div>
  )
}

// ③ 라이브 — 함수를 '넘기면' 받은 쪽이 부른다 (doTwice가 넘긴 함수를 두 번 호출)
function CallbackDemo() {
  const [out, setOut] = useState([])
  const sayHi = () => setOut((o) => [`👋 sayHi 실행됨 (#${o.length + 1})`, ...o].slice(0, 8))
  function doTwice(fn) { fn(); fn() } // 받은 함수를 여기서 두 번 부른다
  return (
    <div>
      <pre className="err-code" style={{ margin: '0 0 10px' }}>{`function doTwice(fn) {   // fn 자리에 '함수'를 받는다
  fn()                  // 받은 함수를 여기서
  fn()                  //   두 번 부른다
}
const sayHi = () => log('👋 sayHi 실행됨')   // (화면 로그에 찍는다 — 아래 데모는 몇 번째인지 #1·#2도 붙인다)

doTwice(sayHi)   // sayHi를 '넘긴다'(괄호 없이!) → doTwice 안에서 fn()으로 2번 실행`}</pre>
      <div className="button-row">
        <button className="chip on" onClick={() => doTwice(sayHi)}>doTwice(sayHi) 실행</button>
        <button className="chip" onClick={() => setOut([])}>지우기</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10, fontFamily: mono, fontSize: 12.5, minHeight: 42 }}>
        {out.length === 0 ? <span style={{ color: 'var(--muted)' }}>버튼을 눌러 보라 — sayHi가 몇 번 실행되나?</span> : out.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        <code>doTwice(sayHi)</code> — sayHi를 <b>괄호 없이 '넘겼을' 뿐</b>인데, doTwice가 안에서 <code>fn()</code>으로 <b>두 번 불렀다</b> → 로그가 한 번에 <b>2줄</b> 늘어난다. 이게 <b>map</b>(원소마다)·<b>onClick</b>(클릭 때)이 하는 일과 똑같다.
      </p>
    </div>
  )
}

// ⑤ 라이브 — 인라인 함수로 '그 버튼의 id'를 넘긴다 (인자 넘기기 + 나중에 실행)
function InlineArgDemo() {
  const [out, setOut] = useState('(아직 안 눌림)')
  const removeItem = (id) => setOut(`remove(${id}) 실행 — ${id}번 항목 삭제됨`)
  return (
    <div>
      <div className="button-row">
        {[1, 2, 3].map((id) => (
          <button key={id} className="chip" onClick={() => removeItem(id)}>id={id} 삭제</button>
        ))}
        <button className="chip" onClick={() => setOut('(아직 안 눌림)')}>지우기</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10, fontFamily: mono, fontSize: 13 }}>{out}</div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        각 버튼은 <code>{'onClick={() => removeItem(id)}'}</code> — 인라인으로 감싸 <b>그 버튼의 id</b>를 넘긴다. 클릭해야 실행되고, 어느 걸 눌렀는지 결과로 보인다.
      </p>
    </div>
  )
}

// ⑥ onClick 형태 총정리 — 6가지를 하나씩 골라 '언제 실행되나 · 판정 · 왜'를 본다.
const FORMS = [
  {
    tag: 'handleClick', code: 'onClick={handleClick}', when: '클릭할 때', ok: true,
    why: '중괄호 안에 handleClick만 있고 괄호 ()가 없다 = "지금 실행"이 아니라 함수 그 자체를 React에게 건넨 것이다. React는 이 함수를 기억해 뒀다가 사용자가 버튼을 누르는 순간 대신 불러 준다. 넘길 인자가 없을 때 가장 짧고 깔끔한 정석이다.',
  },
  {
    tag: 'handleClick()', code: 'onClick={handleClick()}', when: '❗ 렌더될 때 (지금)', ok: false,
    why: '괄호 ()가 붙었다 = "지금 실행하라"는 뜻이다. 그래서 버튼을 화면에 그리는 순간(렌더 시점) handleClick()이 이미 실행돼 버린다 — 아직 아무도 클릭하지 않았는데도! 게다가 onClick에는 handleClick(함수)이 아니라 그 함수가 돌려준 결과값(보통 undefined)이 들어간다. 결국 클릭해도 실행할 함수가 없어 버튼이 죽는다. 입문자가 가장 많이 밟는 함정이다(④에서 라이브로 겪은 그것).',
  },
  {
    tag: '() => f()', code: 'onClick={() => handleClick()}', when: '클릭할 때', ok: true,
    why: '() => … 는 "이걸 나중에 실행할 함수"를 새로 하나 만든 것이다(화살표 함수, JS 2강). 그 함수 안에서 handleClick()을 부른다. React에 넘어가는 건 이 화살표 함수라서, 렌더 때는 실행되지 않고 클릭할 때 비로소 안쪽 handleClick()이 돈다. handleClick에 인자를 넘겨야 하거나(예: handleClick(id)) 클릭 때 여러 줄을 실행할 때 이 꼴을 쓴다.',
  },
  {
    tag: '() => alert()', code: "onClick={() => alert('hi')}", when: '클릭할 때', ok: true,
    why: 'alert도 함수다. 클릭 때 경고창을 띄우려고 alert(\'hi\')를 그냥 onClick에 쓰면 ②번처럼 렌더 때 실행돼 버린다. 그래서 () => 로 감싸 "클릭 때 alert(\'hi\')를 실행할 함수"로 만든다. 따로 이름 붙일 것도 없는 짧은 즉석 동작에 딱 좋다.',
  },
  {
    tag: 'function(){}', code: 'onClick={function () { handleClick() }}', when: '클릭할 때', ok: true,
    why: 'function(){ … } 은 이름 없는 함수를 만드는 옛날 방식(익명 함수 표현식)이다. () => { … } 화살표와 하는 일이 똑같다 — 클릭 때 안쪽이 실행된다. 다만 화살표가 더 짧고 읽기 쉬워 요즘 React 코드에선 이 긴 꼴을 거의 안 쓴다. 보면 "아, 화살표랑 같은 거구나" 하면 된다.',
  },
  {
    tag: '() => f (괄호X)', code: 'onClick={() => handleClick}', when: '❗ 클릭해도 아무 일 없음', ok: false,
    why: '언뜻 ③번과 똑같아 보이지만, 안쪽 handleClick 뒤에 괄호 ()가 없다. 그래서 이 화살표 함수는 클릭 때 handleClick을 "돌려주기(return)"만 하고 부르지는 않는다 — 함수를 반환했을 뿐 실행은 안 한 것이다. 결과적으로 클릭해도 아무 일이 없다. ()를 깜빡 빠뜨려 생기는, 에러도 안 나서 찾기 어려운 조용한 버그다. 실행하려면 () => handleClick() 처럼 안쪽 괄호를 꼭 붙인다.',
  },
]
function OnClickLab() {
  const [i, setI] = useState(0)
  const f = FORMS[i]
  return (
    <div>
      <div className="button-row">
        {FORMS.map((x, k) => (
          <button key={k} className={'chip' + (k === i ? ' on' : '')} onClick={() => setI(k)} style={{ fontFamily: mono, fontSize: 12 }}>{x.tag}</button>
        ))}
      </div>
      <div className="card" style={{ marginTop: 10, padding: '10px 12px', borderColor: f.ok ? '#16a34a' : '#dc2626' }}>
        <pre className="err-code" style={{ margin: 0 }}>{f.code}</pre>
        <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap', fontSize: 13 }}>
          <span>⏱ 실행 시점: <b>{f.when}</b></span>
          <span style={{ fontWeight: 700, color: f.ok ? '#16a34a' : '#dc2626' }}>{f.ok ? '✅ 정상' : '❌ 함정'}</span>
        </div>
        <p className="demo-desc" style={{ margin: '6px 0 0' }}>{f.why}</p>
      </div>
    </div>
  )
}

// 🎯 고쳐보기 — id를 넘겨 remove(id)를 호출해야 하는 삭제 버튼. 맞는 형태를 고른다.
const FIX_OPTS = [
  { code: 'onClick={remove(id)}', ok: false, msg: '❌ 렌더될 때 remove(id)가 지금 실행돼 버린다 — 화면 그리자마자 삭제된다.' },
  { code: 'onClick={remove}', ok: false, msg: '❌ 실행은 클릭 때 되지만, id를 못 넘긴다 — id 자리에 React가 이벤트 객체(e)를 넣어 remove(e)로 불린다(⑧ 참고).' },
  { code: 'onClick={() => remove(id)}', ok: true, msg: '✅ 정답! 인라인으로 감싸, 클릭 때 remove(id)가 실행된다. 인자를 넘길 땐 이 꼴이다.' },
]
function OnClickFixQuiz() {
  const [pick, setPick] = useState(null)
  return (
    <div>
      <p className="demo-desc" style={{ marginTop: 0 }}>
        상황: 목록의 삭제 버튼이 <b>그 항목의 id</b>를 넘겨 <code>remove(id)</code>를 <b>클릭 때</b> 부르게 하려 한다. 맞는 것은?
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {FIX_OPTS.map((o, k) => (
          <button key={k} className={'chip' + (pick === k ? ' on' : '')} onClick={() => setPick(k)} style={{ fontFamily: mono, fontSize: 12.5, textAlign: 'left' }}>
            {o.code}
          </button>
        ))}
      </div>
      {pick !== null && (
        <p className="demo-desc" style={{ marginTop: 8, fontWeight: 600, color: FIX_OPTS[pick].ok ? '#16a34a' : '#dc2626' }}>
          {FIX_OPTS[pick].msg}
        </p>
      )}
    </div>
  )
}

// ⑧ 우리도 button처럼 — onPick(값)을 부르는 '제공자' 컴포넌트
function ColorPicker({ onPick }) {
  // 자식: 색 버튼이 눌리면, 부모가 준 onPick 을 '그 색과 함께' 부른다 (button의 onClick(e)와 같은 자리)
  return (
    <div className="button-row">
      {['🔴 빨강', '🟢 초록', '🔵 파랑'].map((c) => (
        <button key={c} className="chip" onClick={() => onPick(c)}>{c}</button>
      ))}
    </div>
  )
}
function CustomEventDemo() {
  const [picked, setPicked] = useState('(아직 안 고름)')
  return (
    <div>
      <ColorPicker onPick={(color) => setPicked(`자식이 넘긴 값 → ${color}`)} />
      <div className="tree-box" style={{ marginTop: 10, fontFamily: mono, fontSize: 13 }}>부모가 받음: <b>{picked}</b></div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        자식(ColorPicker)의 색 버튼을 누르면 자식이 <code>onPick(색)</code>을 부른다 → 부모가 넘겨 둔 함수가 <b>그 색과 함께</b> 실행돼 위에 표시된다.
        <b> button이 onClick(e)를 부르는 것과 똑같은 구조</b>다.
      </p>
    </div>
  )
}

export default function JsFunctions({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🟨 JS 3</span>
        <h2>함수는 값이다 — 담고, 넘기고, 실행한다</h2>
        <p>함수는 값이다. 변수에 담거나, 다른 함수에 넘기거나, 실행할 수 있다. React의 onClick·map이 전부 여기서 나온다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <code>greet</code>는 <b>함수 그 자체(값)</b>, <code>greet()</code>는 <b>실행해서 나온 결과</b>. <b>괄호 유무</b>가 전부다.
          함수를 <b>넘길 땐 <code>greet</code></b>(괄호 없이), 실행이 필요하면 <b>인라인 <code>{'() => greet()'}</code></b>로 감싼다.
        </p>
      </div>

      {/* 핵심 프레임 — 함수로 하는 3가지 */}
      <div className="card" style={{ borderColor: 'var(--brand)' }}>
        <div className="file-label">🧭 먼저 기억할 것 — 함수(값)로 하는 건 담기·넘기기·실행 셋뿐</div>
        <pre className="err-code">{`(먼저 '선언'으로 함수를 만든다:  function greet() { … }  또는  () => { … })

담기    — 변수에 담는다        const f = greet
넘기기  — 다른 함수에 건넨다    onClick={greet}   arr.map(greet)   (괄호 없이!)
실행    — 괄호로 부른다        greet()   remove(id)`}</pre>
        <p className="section-desc" style={{ margin: '2px 0 0' }}>
          <b>괄호 <code>()</code>가 곧 '실행'</b>이다. 헷갈림의 90%는 <b>'실행'</b>을 <b>'담기·넘기기'</b>와 섞어서 생긴다 —
          "이건 지금 <b>실행</b>인가, 나중에 부를 함수를 <b>담는/넘기는</b> 건가?"만 물으면 대부분 풀린다.
        </p>
      </div>

      {/* ① 그대로 두기 vs 실행 */}
      <h3 className="section-title">① 함수를 쓰는 두 갈래 — 그대로 두기(담기·전달) vs 실행</h3>
      <span className="learn-tag">📎 학습 포인트 · 선언된 함수는 둘 중 하나로 쓴다 — 괄호 없이 '그대로'(담기·전달) or 괄호 붙여 '실행'. 괄호가 스위치다</span>
      <p className="section-desc">
        함수를 한 번 <b>선언</b>해 두면, 쓰는 길은 <b>둘</b>이다:
        <b> 괄호 없이 그대로</b> 두어 <b>변수에 담거나(할당) 남에게 전달</b>하거나(나중에 부르려고),
        아니면 <b>괄호를 붙여 지금 실행</b>하거나. 이 스위치가 바로 <code>()</code>다.
      </p>
      <div className="card">
        <div className="file-label">📄 함수 하나 — 선언한 뒤, 담기·넘기기·실행</div>
        <pre className="err-code">{`function greet() { alert('👋 안녕!'); return '👋 안녕!' }   // 선언 — 함수를 만든다

const f = greet     // 담기   — 변수에 담는다   (괄호 없음 → 실행 안 됨, alert 안 뜸)
onClick={greet}     // 넘기기 — 남에게 건넨다   (괄호 없음 → 실행 안 됨, alert 안 뜸)
greet()             // 실행   — 괄호로 부른다   → alert가 '지금' 뜨고 '👋 안녕!' 반환`}</pre>
      </div>
      <div className="card">
        <div className="file-label">🔬 눌러서 차이를 보라 · 📄 DefVsCall · functions-as-values/index.jsx</div>
        <DefVsCall />
      </div>

      {/* ② 함수를 변수에 담기 */}
      <h3 className="section-title">② 함수를 변수에 담는다 — 함수도 값이니까</h3>
      <span className="learn-tag">📎 학습 포인트 · 함수는 숫자·문자열처럼 변수에 담긴다 (일급 함수) — 셋 중 <b>'담기'</b></span>
      <div className="card">
        <div className="file-label">📄 담을 땐 괄호 없이, 부를 땐 괄호</div>
        <pre className="err-code">{`const f = greet     // ✅ 함수 '자체'를 f에 담는다 (호출 아님 — 괄호 없음)
f()                 // → '👋 안녕!'   f로도 부를 수 있다

const x = greet()   // ⚠️ 이건 '실행 결과'를 담은 것 — x는 문자열 '👋 안녕!'
// 화살표 함수는 처음부터 이 꼴이다:
const hi = () => '👋 안녕!'   // 이름 없는 함수를 만들어 hi에 담았다 (JS 2강)`}</pre>
      </div>
      <div className="card">
        <div className="file-label">🔬 눌러 보기 — f() 도 greet() 와 똑같다 · 📄 VarStoreDemo · index.jsx</div>
        <VarStoreDemo />
      </div>
      <ul className="section-list">
        <li>함수를 <b>변수·배열·객체</b>에 담고, <b>다른 함수에 넘기고</b>, <b>반환</b>할 수 있다 — 값이라서 그렇다(일급 함수).</li>
        <li><code>const [count, setCount] = useState(0)</code>의 <b>setCount도 '함수 값'</b>이다 — React가 만들어 건네준 함수를 우리가 받은 것.</li>
      </ul>
      <div className="card">
        <div className="file-label">🏷️ 이름 있는 함수 vs 익명 함수 — 이름이 없으면 어떻게 부르나</div>
        <pre className="err-code">{`function greet() { … }        // 이름 있음 → 어디서든 greet 로 부를 수 있다
() => { … }                   // 이름 없음(익명) → 그 자체론 나중에 '못 부른다' (부를 이름이 없다)

// 그래서 익명 함수는 두 가지 방법으로 산다:
const f = () => { … }         // ② 변수에 담아 '이름'을 준다      → 이제 f() 로 부른다
const g = function () { … }   //    (옛 방식도 똑같이 담으면 g() 로 부름 — 화살표가 짧아 요즘은 () =>)
onClick={() => remove(id)}    // 안 담고 '그 자리에서' 만들어 바로 넘긴다(인라인) → 이름 필요 없음`}</pre>
      </div>
      <ul className="section-list">
        <li><b>익명 함수</b>(<code>{'() => {}'}</code>, <code>function(){'{}'}</code>)는 <b>이름이 없어 그 자체로는 나중에 못 부른다</b> — 부를 이름이 없기 때문이다.</li>
        <li>그래서 둘 중 하나로 쓴다: <b>변수에 담아 이름을 주거나</b>(②), <b>그 자리에서 바로 넘겨</b> 즉석 사용(콜백·onClick, → ⑤ 인라인).</li>
        <li>즉 <b>이름 있는 함수 = 재사용</b>(여러 곳에서 부름), <b>익명 함수 = 한 번 쓰고 마는 즉석용</b>이 보통이다.</li>
      </ul>

      {/* ③ 콜백 */}
      <h3 className="section-title">③ 함수를 넘긴다 = 콜백(callback)</h3>
      <span className="learn-tag">📎 학습 포인트 · 함수를 인자로 넘기면, 받은 쪽이 '원할 때' 그 함수를 부른다 — 셋 중 <b>'넘기기'</b>, '실행'은 받은 쪽이 한다</span>
      <div className="card">
        <div className="file-label">📄 넘긴 함수를 안에서 부른다</div>
        <pre className="err-code">{`function doTwice(fn) {   // fn 자리에 '함수'를 받는다
  fn()                  // 받은 함수를 여기서 두 번
  fn()
}
doTwice(greet)          // greet를 '넘긴다'(괄호 없이!) → 안에서 fn()으로 실행됨

// 이미 매일 쓰고 있었다:
[1,2,3].map(n => n * 2)         // map에 함수를 넘긴다
button.onClick = handleClick    // 클릭 때 부르라고 함수를 넘긴다`}</pre>
      </div>
      <div className="card">
        <div className="file-label">🔬 눌러 보기 — 넘긴 함수를 doTwice가 두 번 부른다 · 📄 CallbackDemo · index.jsx</div>
        <CallbackDemo />
      </div>
      <ul className="section-list">
        <li><b>넘기는 사람</b>은 함수만 건네고, <b>부르는 시점</b>은 받은 쪽이 정한다 — map은 원소마다, onClick은 클릭 때.</li>
        <li>그래서 넘길 땐 <b>괄호 없이 <code>greet</code></b>다. <code>greet()</code>로 넘기면 "실행한 결과"를 넘기는 것이라 뜻이 달라진다(→ ④).</li>
      </ul>

      {/* ④ 함정 */}
      <h3 className="section-title">④ ⚠️ 최대 함정 — onClick={'{greet}'} vs onClick={'{greet()}'}</h3>
      <span className="learn-tag">📎 학습 포인트 · 괄호를 붙이면 '렌더 때 지금' 실행돼 버린다 — 넘길 땐 괄호 없이 함수 자체를</span>
      <div className="card">
        <div className="file-label">🔴 직접 눌러 보라 — ❌ 버튼은 죽어 있다 · 📄 CallVsPass · index.jsx</div>
        <CallVsPass />
      </div>
      <div className="card">
        <div className="file-label">🔬 왜 죽나 — onClick={'{greet()}'} 한 겹씩 쪼개기 · 📄 TrapDissect · index.jsx</div>
        <TrapDissect />
      </div>
      <div className="card">
        <div className="file-label">📄 그래서 onClick엔 '무엇'이 전달되나?</div>
        <pre className="err-code">{`onClick={greet}     // onClick = greet (함수 그 자체)
                    //   → React가 '클릭할 때' greet() 를 대신 부른다  ✅

onClick={greet()}   // greet() 가 '먼저 실행'되고, 그 반환값이 나온다
                    //   → onClick = '👋 안녕!' (문자열!)  또는 반환이 없으면 undefined  ❌
                    //   → onClick에 '함수'가 아니라 '값'이 들어가, 클릭 때 부를 게 없다`}</pre>
      </div>
      <p className="section-desc">
        핵심은 <b>onClick이 "클릭할 때 부를 함수"를 기대</b>한다는 것이다. <code>greet</code>는 그 <b>함수를 그대로</b> 주지만,
        <code> greet()</code>는 함수가 아니라 <b>그 함수가 돌려준 결과</b>(문자열·undefined)를 준다. 그래서 React는 클릭 때 부를 함수가 없어
        아무 일도 못 한다 (개발자 도구 콘솔에 "onClick이 함수가 아니라 문자열이다" 류의 경고가 뜨기도 한다).
      </p>

      {/* ⑤ 인라인 함수 */}
      <h3 className="section-title">⑤ 인라인 함수 — 인자를 넘기면서 '나중에' 실행하기</h3>
      <span className="learn-tag">📎 학습 포인트 · 인자를 넘겨야 하면 () => greet('철수') 로 감싼다 — 클릭 때 안쪽이 실행된다</span>
      <div className="card">
        <div className="file-label">📄 인자가 있으면 화살표로 감싼다</div>
        <pre className="err-code">{`// 인자 없으면 — 함수 자체를 그냥 넘긴다
<button onClick={greet}>

// 인자를 넘겨야 하면? greet('철수')는 '호출'이라 그냥 쓰면 ④ 함정에 빠진다.
<button onClick={greet('철수')}>   // ❌ 렌더 때 실행돼 버림

// ✅ 화살표로 감싸 "나중에 실행할 함수"로 만든다 (이름 없는 인라인 함수)
<button onClick={() => greet('철수')}>   // 클릭 때 안쪽 greet('철수')가 실행`}</pre>
      </div>
      <div className="card">
        <div className="file-label">🔬 눌러 보기 — 인라인으로 그 버튼의 id를 넘긴다 · 📄 InlineArgDemo · index.jsx</div>
        <InlineArgDemo />
      </div>
      <div className="card">
        <div className="file-label">📄 이벤트 객체 (e) — 핸들러가 자동으로 받는 인자</div>
        <pre className="err-code">{`// React는 클릭할 때 '이벤트 객체'를 인자로 넘겨준다 → 이름은 보통 e (또는 event)
<button onClick={handleClick}>        // function handleClick(e) { … } 의 e로 들어온다
<button onClick={(e) => save(e)}>      // 인라인도 (e) => 로 받아 안으로 넘길 수 있다

// e로 뭘 하나 — "무슨 일이 일어났나" 정보가 담겨 있다
onChange={(e) => setText(e.target.value)}   // e.target.value — 입력한 값 읽기
onSubmit={(e) => e.preventDefault()}        // e.preventDefault() — 폼 새로고침 막기

// 인자도 넘기고 e도 쓰려면 — 둘 다 인라인에서
onClick={(e) => remove(id, e)}`}</pre>
      </div>
      <ul className="section-list">
        <li><b>이벤트 객체 <code>e</code></b>는 React가 핸들러의 <b>첫 인자로 자동으로 넣어 준다</b> — 내가 안 넘겨도 온다. <code>onClick={'{handleClick}'}</code>이면 handleClick(e)의 e로 들어온다. (<b>누가</b> 넣어주는지는 <b>⑧</b>에서 직접 만들어 본다.)</li>
        <li>인라인에서 <b>내 인자</b>를 넘기면서 <code>e</code>도 쓰려면 <code>{'(e) => remove(id, e)'}</code>처럼 <b>둘 다</b> 쓴다.</li>
        <li><b>인라인 함수</b> = 이름 없이 그 자리에서 만든 함수. <code>{'() => greet("철수")'}</code>는 "클릭하면 <code>greet('철수')</code>를 실행하라"는 <b>함수 값</b>이다.</li>
        <li>정리 규칙: <b>인자 없음 → <code>onClick={'{greet}'}</code></b>, <b>인자 있음 → <code>onClick={'{() => greet(인자)}'}</code></b>.</li>
      </ul>

      {/* ⑥ onClick 형태 총정리 + 고쳐보기 */}
      <h3 className="section-title">⑥ onClick 형태 총정리 — 6가지를 하나씩</h3>
      <span className="learn-tag">📎 학습 포인트 · 괄호·화살표 유무로 "언제 실행되나"가 갈린다. 넘길 땐 함수, 인자 있으면 () =&gt; 로 감싸기</span>
      <div className="card">
        <div className="file-label">🔬 형태를 골라 "언제 실행되나 · 판정 · 왜"를 확인하라 · 📄 OnClickLab · index.jsx</div>
        <OnClickLab />
      </div>
      <div className="card">
        <div className="file-label">📋 한눈 정리</div>
        <pre className="err-code">{`onClick={handleClick}          // ✅ 함수 넘김 — 클릭 때 실행 (인자 없을 때 정석)
onClick={() => handleClick()}  // ✅ 인라인 — 인자/여러 문장 있을 때
onClick={() => alert('hi')}    // ✅ 즉석 동작을 인라인으로
onClick={function(){ … }}      // ✅ 익명 함수 (동작 같음, 요즘 잘 안 씀)

onClick={handleClick()}        // ❌ 렌더 때 즉시 실행 → 클릭 죽음
onClick={() => handleClick}    // ❌ 반환만 하고 호출 안 함 (안쪽 () 빠뜨림)`}</pre>
      </div>
      <div className="card">
        <div className="file-label">🎯 고쳐보기 — 인자를 넘기는 삭제 버튼 · 📄 OnClickFixQuiz · index.jsx</div>
        <OnClickFixQuiz />
      </div>
      <ul className="section-list">
        <li>규칙 하나로: <b>인자 없음 → <code>{'{handleClick}'}</code></b>, <b>인자 있음 → <code>{'{() => handleClick(x)}'}</code></b>.</li>
        <li>헷갈릴 때 자문: "이건 <b>지금 실행</b>(괄호 붙음)인가, <b>나중에 부를 함수</b>(괄호 없음/화살표로 감쌈)인가?"</li>
      </ul>

      {/* ⑦ React 활용 */}
      <h3 className="section-title">⑦ ⚛️ React에서 — '함수를 넘기는' 곳들</h3>
      <span className="learn-tag">📎 학습 포인트 · 이벤트·리스트·state setter·자식 콜백 — React는 온통 '함수를 값으로 넘기는' 일이다</span>
      <div className="card">
        <div className="file-label">📄 오늘 개념이 React에서 나타나는 자리</div>
        <pre className="err-code">{`<button onClick={handleClick}>        // ① 이벤트 — 함수 '자체'를 넘김 (괄호 없이!)
<button onClick={() => remove(id)}>   // ⑤ 인자 있으면 인라인으로 감싼다
{items.map(item => <Row item={item} />)}  // ③ map에 함수를 넘긴다
setCount(c => c + 1)                   // ② setter에 '함수'를 넘겨 최신값 기준 갱신
<Child onSave={handleSave} />          // 콜백 prop — 함수를 자식에게 넘긴다
useEffect(() => { … }, [])             // effect도 '함수를 넘기는' 것`}</pre>
      </div>
      <ul className="section-list">
        <li>전부 <b>"함수를 값으로 넘긴다"</b>는 오늘 개념이다 — 괄호를 붙여 <b>지금 실행</b>하는 게 아니라, <b>나중에 부를 함수</b>를 건네는 것.</li>
        <li>자식에게 함수를 넘기는 <b>콜백 prop</b>(<code>onSave={'{handleSave}'}</code>)은 React <b>2단계 props</b>와 <b>상태 끌어올리기</b>의 핵심이다 — 자식이 "일이 생겼다"고 부모에게 알리는 통로다.</li>
        <li>그래서 이 강을 지나면 <code>onClick</code>·<code>map</code>·<code>useEffect</code>·콜백 prop이 <b>전부 같은 원리</b>로 보인다.</li>
      </ul>

      {/* ⑧ e는 누가 넘기나 + 내가 이벤트를 만든다 */}
      <h3 className="section-title">⑧ e는 누가 넘기나 — 그리고 내가 직접 이벤트를 만든다</h3>
      <span className="learn-tag">📎 학습 포인트 · onClick={'{fn}'}은 "클릭 때 fn(e)를 대신 불러 줘"라는 뜻 — 부르는 쪽(button)이 e를 넣는다. 우리 컴포넌트도 똑같이 만든다</span>
      <p className="section-desc">
        초보가 제일 헷갈리는 것: <b>e는 내가 안 넘겼는데 어디서 왔지?</b> 답 — <b>button이 넣어 준다.</b>
        onClick에 함수를 <b>넘겨 두면</b>, 클릭이 일어날 때 <b>button이 그 함수를 <code>e</code>와 함께 대신 부른다</b>(<code>fn(e)</code>).
        즉 "부르는 쪽이 인자를 넣는" 것이다 — ③ 콜백 그대로다.
      </p>
      <div className="card">
        <div className="file-label">📄 &lt;button&gt;이 내부에서 하는 일 (아주 단순화한 목업)</div>
        <pre className="err-code">{`function 브라우저버튼({ onClick }) {
  // 진짜로 클릭되면, 브라우저가 이벤트 객체 e를 만들어서…
  function 클릭발생(e) {
    onClick(e)          // ⭐👉 핵심! 네가 넘겨 둔 함수를 'e와 함께' 대신 부른다!
  }
  // …(실제 DOM 버튼에 클릭발생을 연결해 둔다)
}

// 그래서 이렇게 쓰면:
<button onClick={(e) => console.log(e.target)} />
// 클릭 순간 button이 onClick(e) 를 부른다 → 네 화살표의 e로 그 객체가 들어온다`}</pre>
      </div>
      <p className="section-desc">
        이제 <b>우리도 button처럼</b> 이벤트를 '제공'하는 컴포넌트를 만들어 보자. 자식이 <b>onPick</b>이라는 콜백 prop을 받고,
        자기 버튼이 눌리면 <code>onPick(값)</code>을 부른다 — button이 <code>onClick(e)</code>를 부르는 것과 <b>똑같은 구조</b>다.
      </p>
      <div className="card">
        <div className="file-label">📄 ColorPicker — onPick(색)을 부르는 '제공자'</div>
        <pre className="err-code">{`function ColorPicker({ onPick }) {              // onPick = 부모가 넘겨준 함수를 받는다
  return colors.map(c =>
    <button onClick={() => onPick(c)}>{c}</button>
    // ⭐👉 핵심! onPick(c) — 부모 함수를 '값 c와 함께' 부른다 (button의 onClick(e)와 똑같은 자리)
  )
}

<ColorPicker onPick={(color) => setPicked(color)} />
// ⭐👉 핵심! onPick 에 함수를 '넘긴다'(괄호 없이!) → 자식이 색 고를 때 이 함수가 color와 함께 실행`}</pre>
      </div>
      <div className="card">
        <div className="file-label">🔬 눌러 보기 — 자식이 값을 넘겨 준다 · 📄 ColorPicker + CustomEventDemo · index.jsx</div>
        <CustomEventDemo />
      </div>
      <ul className="section-list">
        <li>button의 <code>onClick(e)</code>나 우리 <code>onPick(색)</code>이나 <b>구조가 같다</b> — 넘겨받은 함수를, <b>부르는 쪽이 값과 함께 부른다.</b></li>
        <li>이게 React의 <b>콜백 prop</b>이자 <b>상태 끌어올리기</b>다 — 자식이 "이런 일이 생겼다(색 골랐다)"고 부모에게 <b>값으로 알리는</b> 통로다 (→ React 2단계·상태 공유).</li>
        <li>정리: <b>이벤트는 마법이 아니다.</b> "함수를 넘겨 두면(②③), 일이 생길 때 그쪽이 값과 함께 불러 준다"가 전부다.</li>
      </ul>

      {/* ⑨ 클로저 */}
      <h3 className="section-title">⑨ 🧠 클로저 — 함수가 '바깥 값'을 기억한다</h3>
      <span className="learn-tag">📎 학습 포인트 · 함수는 만들어질 때의 바깥 변수를 계속 기억한다 · 만들 때마다 그 기억은 '독립'이다</span>
      <p className="section-desc">
        함수가 값이라 <b>담고·넘기고·실행</b>한다고 했다. 하나 더 — 함수는 <b>자기가 만들어질 때 곁에 있던 바깥 변수</b>를 계속 <b>기억</b>한다.
        이걸 <b>클로저(closure)</b>라 한다.
      </p>
      <div className="card">
        <div className="file-label">📄 makeCounter — 돌려준 함수가 바깥 count를 붙잡는다</div>
        <pre className="err-code">{`function makeCounter() {
  let count = 0            // 바깥(지역) 변수
  return () => ++count     // 이 함수가 count를 '기억'한다 (클로저)
}

const a = makeCounter()   // a는 자기만의 count(=0)를 품는다
const b = makeCounter()   // b는 '또 다른' count(=0)를 품는다 (독립)
a()  // 1
a()  // 2
b()  // 1  ← a와 안 섞인다`}</pre>
      </div>
      <div className="card">
        <div className="file-label">🔬 눌러 보기 — A·B가 각자 센다 · 📄 ClosureDemo · index.jsx</div>
        <ClosureDemo />
      </div>
      <ul className="section-list">
        <li><code>count</code>는 <code>makeCounter</code>가 끝나면 사라질 지역 변수인데, <b>돌려준 함수가 계속 붙잡고 있어</b> 살아남는다.</li>
        <li><b>만들 때마다 독립</b> — <code>makeCounter()</code>를 부를 때마다 <b>새 <code>count</code></b>가 생긴다. 그래서 a와 b가 안 섞인다.</li>
        <li>⚛️ <b>React 곳곳이 클로저다</b> — 이벤트 핸들러·<code>setInterval</code> 콜백이 <b>그때의 state·props를 기억</b>하고, useEffect의 정리 함수가 <b>그 실행의 값</b>을 붙잡는다. <b>9-6의 <code>alive</code> 플래그</b>가 "실행마다 자기 것을 기억"하는 게 바로 이 원리다.</li>
      </ul>
      <TechTags items={[{ label: '⚛️ 9-6 · alive가 클로저인 이유', to: 8.45 }]} onGo={onGo} />

      <div className="concept">
        <p className="concept-lead">📖 한 줄 요약</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          함수는 값이라 <b>담기·넘기기·실행</b> 셋뿐이고, <b>괄호 <code>()</code>가 실행 스위치</b>다.
          <code> greet</code>는 함수(값) — <b>담고 넘긴다</b>. <code>greet()</code>는 <b>실행</b> — 결과가 나온다.
          React에 <b>넘길 땐 괄호 없이</b>(<code>onClick={'{greet}'}</code>), 인자가 필요하면 <b>인라인 <code>{'() => greet(x)'}</code></b>로 감싼다.
        </p>
      </div>

      <h3 className="section-title">🧩 확인 드릴 — 넘기기 vs 실행, 손에 익히기</h3>
      <span className="learn-tag">📎 학습 포인트 · 괄호 ()가 붙으면 '지금 실행', 없으면 '넘기기'다 — 다섯 번 확인해 손에 익힌다</span>
      <QuickQuiz
        intro="같은 개념(함수는 값 · 괄호=실행)을 상황만 바꿔 다섯 번 확인한다. 보기를 하나 골라 보라 — 바로 정답과 이유가 나온다."
        questions={[
          {
            q: 'greet는 alert를 부르는 함수다. 아래 마지막 줄을 실행하면 alert가 뜰까?',
            code: `const greet = () => alert('안녕!')
const f = greet   // 이 줄`,
            options: ['바로 alert가 뜬다', '안 뜬다 (아무 일도 안 일어난다)', '에러가 난다'],
            answer: 1,
            explain: "괄호가 없으니 실행이 아니라 함수를 f에 '담기'만 한 것이다. f() 라고 불러야 그때 alert가 뜬다.",
          },
          {
            q: '클릭할 때 sayHi가 실행되게 하려면 onClick에 무엇을 줘야 하나?',
            code: `function sayHi() { alert('hi') }`,
            options: ['onClick={sayHi()}', 'onClick={sayHi}', 'onClick=sayHi'],
            codeOptions: true,
            answer: 1,
            explain: "onClick={sayHi} — 함수를 '넘겨' 두면 클릭 때 React가 불러 준다. sayHi()는 렌더 도중 즉시 실행되고, onClick엔 그 반환값이 들어가 버튼이 죽는다.",
          },
          {
            q: '이 버튼을 화면에 그리면 alert는 언제 뜰까?',
            code: `<button onClick={sayHi()}>눌러</button>`,
            options: ['버튼을 클릭할 때', '화면을 그리는 순간(클릭 안 해도) 바로', '영영 안 뜬다'],
            answer: 1,
            explain: '괄호가 붙어 sayHi()가 렌더 도중 즉시 실행된다. 클릭과 무관하게 그리자마자 뜨고, onClick엔 반환값이 들어가 버튼은 죽는다.',
          },
          {
            q: '클릭할 때 remove(3)이 실행되게 하려면?',
            options: ['onClick={remove(3)}', 'onClick={() => remove(3)}', 'onClick={remove, 3}'],
            codeOptions: true,
            answer: 1,
            explain: '인자를 넘겨야 하면 () => remove(3) 으로 감싼다. onClick={remove(3)}은 렌더 때 즉시 실행돼 버린다.',
          },
          {
            q: 'double = n => n*2 일 때, [1, 2, 3].map(double)에서 double은 어떻게 쓰이나?',
            code: `const double = n => n * 2;
[1, 2, 3].map(double)`,
            options: ['map이 double을 각 원소마다 대신 불러 준다 → [2, 4, 6]', 'double을 지금 한 번만 실행한다', '에러 — 괄호가 없다'],
            answer: 0,
            explain: "double을 괄호 없이 '넘기면', map이 원소마다 double(원소)를 대신 불러 준다. onClick={fn}과 똑같은 '넘기기'다.",
          },
        ]}
      />
    </section>
  )
}
