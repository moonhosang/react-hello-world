// 7-2 · 폼 제출 (방명록)
// 제출은 <form onSubmit>으로 받고, 맨 처음에 e.preventDefault()로 새로고침을 막는다.
// 그다음 폼 값을 원하는 대로 쓴다 — 여기선 방명록 목록에 추가한다.

import { useState } from 'react'
import SourceTrace from '../../../components/SourceTrace.jsx'

// 제출 흐름 — onSubmit → preventDefault → 검증 → 목록 추가 → 폼 비우기.
const SUBMIT_CODE = `function handleSubmit(e) {
  e.preventDefault()                       // ① 새로고침 막기
  if (form.name.trim() === '' ||
      form.msg.trim() === '') return       // ② 빈 값이면 중단
  setEntries([{ id: nextId++, ...form },
              ...entries])                 // ③ 목록 맨 앞에 추가
  setForm({ name: '', msg: '' })           // ④ 폼 비우기
}

<form onSubmit={handleSubmit}>
  <button type="submit">남기기</button>
</form>`

const SUBMIT_STEPS = [
  {
    hl: [11, 12],
    tag: '① 제출',
    t: '남기기(또는 Enter) → onSubmit 발생',
    d: (<><code>type="submit"</code> 버튼을 누르거나 Enter를 치면 <code>&lt;form&gt;</code>의 <code>onSubmit={'{handleSubmit}'}</code>이 실행된다.</>),
  },
  {
    hl: [2],
    tag: '② preventDefault',
    t: '새로고침(기본 동작) 막기',
    d: (<>핸들러 <b>맨 처음</b>에 <code>e.preventDefault()</code>. 이걸 빼면 브라우저가 폼 기본 동작으로 <b>페이지를 새로고침</b>해 입력값이 다 날아간다.</>),
  },
  {
    hl: [3, 4],
    tag: '③ 검증',
    t: '빈 값이면 return으로 중단',
    d: (<>이름·메시지가 비었으면 <code>return</code>으로 <b>일찍 끝낸다</b>(아래 추가 코드로 안 감). 빈 방명록이 쌓이지 않게.</>),
  },
  {
    hl: [5, 6],
    tag: '④ 추가',
    t: '새 배열로 목록 맨 앞에 추가',
    d: (<><code>setEntries([새항목, ...entries])</code> — 기존을 편 <b>새 배열</b>(불변성) 맨 앞에 넣는다. <code>{'{ id, ...form }'}</code>으로 지금 폼 값을 복사해 담는다.</>),
    note: 'entries = [새 글, ...기존]',
  },
  {
    hl: [7],
    tag: '⑤ 비우기',
    t: 'setForm으로 입력창을 비운다',
    d: (<><code>setForm({'{ name: "", msg: "" }'})</code>로 입력을 초기화. 두 <code>setState</code>가 리렌더를 일으켜 <b>목록엔 새 글, 입력창은 빈 상태</b>가 된다.</>),
    note: "form = { name: '', msg: '' }",
  },
]

let nextId = 1

export default function Step6_2() {
  const [form, setForm] = useState({ name: '', msg: '' })
  const [entries, setEntries] = useState([])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault() // ★ 새로고침(폼 기본 동작) 막기
    if (form.name.trim() === '' || form.msg.trim() === '') return
    setEntries([{ id: nextId++, ...form }, ...entries]) // 목록 맨 앞에 추가
    setForm({ name: '', msg: '' }) // 폼 비우기
  }

  return (
    <section>
      <header className="lesson-header">
        <span className="badge form-badge">7-2</span>
        <h2>폼 제출</h2>
        <p><code>&lt;form onSubmit&gt;</code>과 <code>preventDefault</code>로 제출을 처리한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>제출 핸들러 맨 처음에 e.preventDefault()로 새로고침을 막고 폼 값을 쓴다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          제출은 <code>&lt;form onSubmit=&#123;...&#125;&gt;</code>로 받는다. 핸들러 <b>맨 처음</b>에
          <code> e.preventDefault()</code>로 새로고침을 막고, 그다음 폼 값을 쓴다.
        </p>
      </div>

      <div className="card">
        <div className="file-label">📄 step7-2-submit/index.jsx · 방명록</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>이름</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="이름" />
          </div>
          <div className="form-row">
            <label>메시지</label>
            <input name="msg" value={form.msg} onChange={handleChange} placeholder="한마디 남겨 보자" />
          </div>
          <button type="submit">남기기</button>
        </form>

        <ul className="plain-list">
          {entries.length === 0 ? (
            <li className="demo-desc">아직 방명록이 없다. 위에서 남겨 보자 ✍️</li>
          ) : (
            entries.map((en) => (
              <li key={en.id}>
                <b>{en.name}</b> — {en.msg}
              </li>
            ))
          )}
        </ul>
      </div>

      <span className="learn-tag">📎 학습 포인트 · 제출 → preventDefault → 검증 → 목록 추가 → 폼 비우기 순서로 돈다</span>
      <SourceTrace file="방명록 — 제출 흐름" code={SUBMIT_CODE} steps={SUBMIT_STEPS} />

      <div className="try-it">
        <h4>💡 알아두기</h4>
        <ul>
          <li><code>e.preventDefault()</code>를 빼면 제출 시 페이지가 새로고침되어 값이 날아간다.</li>
          <li>제출 후 <code>setForm(&#123;...&#125;)</code>로 입력을 비워 주는 게 자연스럽다.</li>
        </ul>
      </div>
    </section>
  )
}
