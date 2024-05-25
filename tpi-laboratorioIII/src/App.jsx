import './App.css'

import ListProduct from './components/ListProduct/ListProduct'
import Header from './components/header/Header'
import Login from './components/login/Login'
import Register from './components/register/Register'


function App() {
  return (
    <>
    <Header/>
      <Login></Login>
      <ListProduct/>
      <Register/>

    </>
  )
}

export default App
