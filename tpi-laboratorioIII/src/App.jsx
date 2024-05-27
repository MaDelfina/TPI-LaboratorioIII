import './App.css'

import ListProduct from './components/ListProduct/ListProduct'
import Footer from './components/footer/Footer'
import Login from './components/login/Login'
import Register from './components/register/Register'


function App() {
  return (
    <>
      <Login></Login>
      <ListProduct/>
      <Register/>
      <Footer/>
    </>
  )
}

export default App
