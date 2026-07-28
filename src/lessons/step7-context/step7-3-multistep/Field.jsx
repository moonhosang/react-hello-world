// 재사용 입력 한 줄 — 라벨 + input(또는 select) + 안내 한 줄.
// 상태를 갖지 않는 순수 표시용 컴포넌트다. 값·변경은 스텝이 useForm()에서
// 꺼내 이 컴포넌트에 넘긴다(스텝 ↔ Context, 이 컴포넌트는 그저 화면만 그린다).
//
// props:
//   label    : 라벨 문구
//   name     : input/select의 name (스텝의 setField가 어떤 필드인지 구분하는 열쇠)
//   type     : 'text' | 'email' | 'select' (기본 'text')
//   value    : 현재 값 (스텝이 useForm의 form에서 꺼내 내려줌)
//   onChange : 값이 바뀔 때 부를 콜백 (스텝이 setField로 이어줌)
//   options  : type='select'일 때 쓰는 [{ value, label }] 배열
//   hint     : 입력칸 아래 안내 한 줄 (선택)
export default function Field({ label, name, type = 'text', value, onChange, options, hint }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {/* 라벨 — htmlFor/id로 클릭 시 입력칸에 포커스가 가도록 묶는다 */}
      <label
        htmlFor={name}
        style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 6 }}
      >
        {label}
      </label>

      {/* select와 input은 태그만 다르고 value·onChange 처리는 같다. type으로 갈라 그린다. */}
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
            border: '1px solid var(--border)',
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
        // controlled input — value는 Context의 form, 변경은 onChange로 위임한다.
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          style={{ marginBottom: 0 }}
        />
      )}

      {/* 안내 한 줄 — hint가 있을 때만 조건부로 그린다 */}
      {hint && (
        <p style={{ margin: '6px 0 0', color: 'var(--muted)', fontSize: 13 }}>{hint}</p>
      )}
    </div>
  )
}
