// 재사용 입력 한 줄 — 라벨 + input(또는 select) + 에러 메시지.
// 이 컴포넌트는 상태를 갖지 않는다(제어는 부모가 한다).
// 부모에게서 value·onChange를 받아 화면에 '표시'만 하고,
// 입력이 바뀌면 그대로 onChange로 부모에게 올려보낸다 — props로 하는 부모↔자식 소통의 표본이다.
//
// type='select'면 options를 받아 <select>를 그린다. 그 외에는 평범한 <input>이다.
// (텍스트든 셀렉트든 부모의 공통 onChange 하나로 값을 받는다 — e.target.name으로 필드를 구분)
//
// props:
//   label    : 라벨 문구 (선택 필드는 "닉네임 (선택)"처럼 부모가 표기해 내려준다)
//   name     : input/select의 name (부모의 공통 onChange가 어떤 필드인지 구분하는 열쇠)
//   type     : 'text' | 'email' | 'select' 등 (기본 'text')
//   value    : 현재 값 (부모 state에서 내려옴 → controlled)
//   onChange : 값이 바뀔 때 부르는 콜백 (부모의 공통 핸들러)
//   error    : 보여줄 에러 문구. 없으면(빈 값) 에러 줄을 그리지 않는다.
//   options  : type='select'일 때만 쓰는 [{ value, label }] 배열
export default function Field({ label, name, type = 'text', value, onChange, error, options }) {
  const invalid = Boolean(error)

  return (
    <div style={{ marginBottom: 14 }}>
      {/* 라벨 — htmlFor/id로 클릭 시 입력칸에 포커스가 가도록 묶는다 */}
      <label
        htmlFor={name}
        style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 6 }}
      >
        {label}
      </label>

      {/* select와 input은 태그만 다를 뿐, value·onChange·에러 테두리 처리는 똑같다.
          type으로 갈라 같은 역할("표시")을 한 컴포넌트 안에서 담당한다. */}
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '9px 10px',
            borderRadius: 8,
            border: '1px solid',
            borderColor: invalid ? 'var(--red)' : 'var(--border)',
            background: 'var(--panel)',
            color: 'var(--text)',
            fontSize: 14,
          }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        // controlled input — value는 부모 state, 변경은 onChange로 부모에게 위임한다.
        // 에러가 있으면 테두리를 빨갛게 물들여 눈으로도 잡히게 한다.
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          style={{
            marginBottom: 0,
            borderColor: invalid ? 'var(--red)' : 'var(--border)',
          }}
        />
      )}

      {/* 에러 줄 — error가 있을 때만 조건부로 그린다(조건부 렌더링).
          error가 undefined/빈 문자열이면 이 줄 자체가 사라진다. */}
      {error && (
        <p style={{ margin: '6px 0 0', color: 'var(--red)', fontSize: 13 }}>
          ⚠ {error}
        </p>
      )}
    </div>
  )
}
