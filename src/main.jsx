import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 리액트 앱의 시작점(entry point)이다.
// index.html 안의 <div id="root">를 찾아서 그 안에 <App />을 그려준다.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
