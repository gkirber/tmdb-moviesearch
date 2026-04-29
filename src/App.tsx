import { Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/MainPage/MainPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  )
}

export default App
