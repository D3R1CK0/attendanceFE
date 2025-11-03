import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AddStudent from './pages/AddStudent'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addstudent' element={<AddStudent/>}/>
      </Routes>
    </>
  )
}

export default App
