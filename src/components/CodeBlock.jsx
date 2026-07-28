import { useState } from 'react'

// 접이식 코드 블록. ?raw로 가져온 긴 소스를 기본은 '접어' 두고,
// 헤더(📄 파일명)를 눌러 펼친다. 라이브 데모가 먼저 보이고 코드는 필요할 때만 본다.
export default function CodeBlock({ file, code, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const lines = code.split('\n').length
  return (
    <div className={'code-block' + (open ? ' open' : '')}>
      <button className="code-block-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="cb-chev">▸</span>
        <span className="cb-file">📄 {file}</span>
        <span className="cb-meta">{lines}줄 · {open ? '접기' : '코드 보기'}</span>
      </button>
      {open && <pre className="concept-flow cb-pre">{code}</pre>}
    </div>
  )
}
