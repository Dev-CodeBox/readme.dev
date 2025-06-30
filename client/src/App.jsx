import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Editor from './components/Editor'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </>
  )
}

export default App
