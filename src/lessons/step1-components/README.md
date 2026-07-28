# 1단계 · 컴포넌트 그 자체 — 함수가 화면이 된다

> 📂 이 강의의 파일 (컴포넌트 5개)
> - `Greeting.jsx` — 단순 ① 사용자 칩 (아바타 + 이름 + 직위)
> - `Clock.jsx` — 단순 ② 시각 (컴포넌트 안에서 자바스크립트 쓰기)
> - `Announcement.jsx` — 단순 ③ 공지 배너
> - `WeatherWidget.jsx` — **복잡** 내부 구조가 여러 겹인 위젯
> - `Dashboard.jsx` — **조립** 위 컴포넌트들을 모은 큰 컴포넌트 (공지 3개 + 사용자 칩 2개 재사용)
> - `public/vanilla/step1-components/dashboard.html` — 같은 화면을 **순수 HTML**로 만든 것 (복붙 방식, 대비용)
> - `index.jsx` — 이 다섯을 배치하고, 리액트 ↔ 순수 HTML을 나란히 비교하는 화면

## 컴포넌트란?

리액트에서 화면은 **컴포넌트**라는 함수들의 조립이다.

```jsx
function Greeting() {
  return <p>안녕하세요! 👋</p>
}
```

규칙 3가지:
1. 이름은 **대문자**로 시작 (`Greeting` ⭕ / `greeting` ❌)
2. **JSX를 return** 한다
3. 만든 컴포넌트는 `<Greeting />` 처럼 **HTML 태그같이** 사용

## 단순하든 복잡하든, 본질은 같다

이 강의의 5개 컴포넌트는 생김새가 다 다르다.

- 단순: `Greeting`, `Clock`, `Announcement` — 짧은 JSX 하나
- 복잡: `WeatherWidget` — 헤더 + 큰 숫자 + 상세 목록. props·state 없이도 구조는 커질 수 있다.

하지만 전부 **"JSX를 return하는 함수"** 라는 점은 똑같다. 표현만 다르다.

## ⭐ HTML 대비 진짜 장점 — 재사용

순수 HTML이라면 같은 마크업을 **복사-붙여넣기** 해야 한다.
그리고 문구 하나를 바꾸려면 붙여넣은 **모든 자리를 찾아** 고쳐야 한다.

컴포넌트는 다르다. **한 번 정의하고, 여러 곳에서 재사용**한다.

```jsx
// Greeting은 한 곳(Greeting.jsx)에만 정의
<Greeting />              // 화면 위쪽에서 사용
...
<Dashboard />            //  └ Dashboard 안에서도 같은 Greeting 사용
```

`Greeting.jsx` **한 파일만** 고치면, 그걸 쓴 **모든 자리가 동시에** 바뀐다.
→ 강의 화면에서 `Greeting`이 단독으로도, `Dashboard` 안에도 나오는 걸 확인해 보자.

### 순수 HTML과 비교하면 확실하다

강의 ③에는 **똑같은 대시보드**를 두 방식으로 나란히 뒀다.

| | 리액트 (`Dashboard.jsx`) | 순수 HTML (`dashboard.html`) |
|---|---|---|
| 공지 3개 · 사용자 칩 2개 | `<Announcement />`·`<Greeting />`를 여러 번 (정의는 각 1곳) | 같은 마크업을 **통째로 복붙** |
| 문구/아바타 변경 | 컴포넌트 파일 **1곳**만 수정 | 복붙한 **모든 곳** 손으로 수정 |
| 실수 위험 | 없음 | 하나 빠뜨리면 화면이 어긋남 |

공지가 3개가 아니라 30개라면? 순수 HTML은 30곳을 고쳐야 한다.
**이것이 컴포넌트(재사용)가 순수 HTML을 이기는 지점이다.**

## 조립 (composition)

큰 컴포넌트도 결국 **작은 컴포넌트들의 조합**이다.

```jsx
function Dashboard() {
  return (
    <div>
      <Announcement />
      <Greeting />
      <Clock />
      <WeatherWidget />
    </div>
  )
}
```

> 컴포넌트가 다른 컴포넌트를 감싸 내부를 숨기는 **캡슐화**는 별도 개념 페이지에서 다룬다.
> → [개념 · 캡슐화](../../concepts/encapsulation/README.md)

## JSX 규칙 2가지

**① return은 하나의 덩어리만** — 여러 요소는 하나로 감싼다.

```jsx
return (
  <>              {/* 빈 태그 <>...</> 로 감싸기 (Fragment) */}
    <h1>제목</h1>
    <p>내용</p>
  </>
)
```

**② 자바스크립트 값은 중괄호 `{ }`** — `Clock.jsx`, `WeatherWidget.jsx`에서 계산한 값을 `{ }`로 넣는 걸 보자.

---

## 🛠️ 직접 해보기

1. `MyName.jsx`를 새로 만들어 `Dashboard.jsx`에 끼워 넣어 보자.
2. `WeatherWidget.jsx`의 `temp`를 20으로 바꾸면 `mood` 문구가 어떻게 달라지나?

## 🔎 확인해보기 — 재사용을 직접 체감하기

공지 문구를 아래처럼 바꿔 보자. 단, **리액트와 순수 HTML 두 곳 모두**에서.

> "📢 오늘은 리액트 컴포넌트를 배우는 날이다." → "📢 나는 리액트 컴포넌트를 배운다."

1. **리액트**: `Announcement.jsx` **한 곳**만 고친다. (`Dashboard.jsx`가 3번 재사용 → 공지 3개가 한 번에 바뀜)
2. **순수 HTML**: `public/vanilla/step1-components/dashboard.html`에서 복붙된 **3곳**을 모두 고친다.

💬 **`Dashboard.jsx`와 `dashboard.html`, 두 곳에서 각각 몇 군데를 고쳤나? 어떤 차이를 느꼈는가?**
→ 이게 바로 컴포넌트(재사용)의 힘이다.

> 그런데 `Greeting`은 항상 똑같은 인사만 한다. 매번 **다른 이름**으로 인사하려면?
> → 다음 단계 **props**에서 해결한다.

→ 이전: [0단계](../step0-why-react/README.md) · 다음: [2단계 · props](../step2-props/README.md)
