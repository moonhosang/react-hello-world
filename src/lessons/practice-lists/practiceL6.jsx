// ⚫ 처음부터 (다른 예시) — '할 일 목록'을 빈 화면에서 처음부터 만든다.
// 태그 목록에서 익힌 것과 같은 기술(배열 state · 추가 · map+key · 빈 안내)을 다른 소재로 한 번 더.
//
// 할 일:
//   TODO A: useState로 todos(배열)와 text(입력) state를 만든다.
//   TODO B: add 함수 — 입력값을 다듬어 [...todos, t]로 추가하고 입력을 비운다.
//   TODO C: 입력창·추가 버튼·목록(map+key)·빈 목록 안내를 그린다.

export default function PracticeL6() {
  // TODO A: 여기에 useState 두 개

  // TODO B: 여기에 add 함수

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO C: 입력 + 추가 버튼 + 목록(또는 빈 안내) */}
      여기에 할 일 목록을 만들자
    </div>
  )
}
