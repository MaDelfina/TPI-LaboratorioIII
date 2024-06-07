import './App.css'
import ListProduct from './components/ListProduct/ListProduct'
import FormProduct from './components/formProduct/FormProduct'
import AdminUsers from './components/adminUsers/AdminUsers'
import Login from './components/login/Login'
import MainLayout from './components/mainLayout/MainLayout'
import Register from './components/register/Register'
import ShoppingCart from './components/shoppingCart/ShoppingCart'
import Home from "./components/home/Home"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <MainLayout>
          <Home/>
        </MainLayout>
      ),
    },
    {
      path: '/adminUser',
      element: (
        <MainLayout>
          <AdminUsers></AdminUsers>
          {/* <AdminUser/> todabia no existe */}
        </MainLayout>
      ),
    },
    {
      path: '/addProduct',
      element: (
        <MainLayout>
          <Dashboard>
          <FormProduct />
          </Dashboard>
        </MainLayout>
      ),
    },
    {
      path: '/order',
      element: (
        <MainLayout>
          <Dashboard>
            <ShoppingCart/>
          </Dashboard>
        </MainLayout>
      ),
    },
    {
      path: '/products',
      element: (
        <MainLayout>
          <Dashboard>
          <ListProduct />
          </Dashboard>
        </MainLayout>
      ),
    },
    {
      path: '/login',
      element: (
        <MainLayout>

          <Login/>


        </MainLayout>
      ),
    },
    //El registrer supongo que se accede con un boton en login. 
    {
      path: '/registrer',
      element: (
        <MainLayout>
          <Register />
        </MainLayout>
      ),
    },
    {
      path: '/*',
      element: (
        <MainLayout />
        // <NotFound/> no existe todavia
      ),
    },

  ])


  return <RouterProvider router={router} />
}

export default App
