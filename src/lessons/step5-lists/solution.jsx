const fruits = ['🍎 사과', '🍌 바나나', '🍇 포도', '🍓 딸기']

export default function SolutionList() {
  return (
    <div className="demo-card">
      <ul className="plain-list">
        {fruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  )
}
