// 단순 컴포넌트 ③ — 정해진 안내 문구만 보여준다. 로직이 전혀 없다.
// Greeting, Clock과 '생김새'는 다르지만, "JSX를 return하는 함수"라는 본질은 똑같다.

export default function Announcement() {
  return <div className="announcement">📢 오늘은 리액트 컴포넌트를 배우는 날이다.</div>
}
