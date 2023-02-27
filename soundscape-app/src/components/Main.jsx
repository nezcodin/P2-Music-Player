import { Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Menu } from './Menu'

export const Main = () => {
  return (
    <div>
      <h2>Main Component</h2>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}