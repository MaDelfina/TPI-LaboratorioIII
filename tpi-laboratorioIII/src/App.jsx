import './App.css'
import ListProduct from './components/ListProduct/ListProduct'
import FormProduct from './components/formProduct/FormProduct'
import AdminUsers from './components/adminUsers/AdminUsers'
import Header from './components/header/Header'
import Login from './components/login/Login'
import MainLayout from './components/mainLayout/MainLayout'
import Register from './components/register/Register'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/home/Home';
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
          <AdminUsers/>
        </MainLayout>
      ),
    },
    {
      path: '/addProduct',
      element: (
        <MainLayout>
          <FormProduct />
        </MainLayout>
      ),
    },
    {
      path: '/order',
      element: (
        <MainLayout>
          {/* <Order/>  todabia no existe */}
        </MainLayout>
      ),
    },
    {
      path: '/products',
      element: (
        <MainLayout>
          <ListProduct />
        </MainLayout>
      ),
    },
    {
      path: '/login',
      element: (
        <MainLayout>
          <Login />
        </MainLayout>
      ),
    },
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
