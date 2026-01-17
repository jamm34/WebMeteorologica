import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import ThemeToggle from './components/ThemeToggle'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Dashboard />
    </>
  )
}

export default App
