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
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard'
import Protected from './components/routes/protected/Protected'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Protected>
          <MainLayout>
            <Home/>
          </MainLayout>
        </Protected>
      ),
    },
    {
      path: '/adminUser',
      element: (
        <Protected>
          <MainLayout>
            <AdminUsers></AdminUsers>
            {/* <AdminUser/> todabia no existe */}
          </MainLayout>
        </Protected>
      ),
    },
    {
      path: '/addProduct',
      element: (
        <Protected>
          <MainLayout>
            <Dashboard>
              <FormProduct />
            </Dashboard>
          </MainLayout>
        </Protected>
      ),
    },
    {
      path: '/order',
      element: (
        <Protected>
          <MainLayout>
            <Dashboard>
              <ShoppingCart/>
            </Dashboard>
          </MainLayout>
        </Protected>
      ),
    },
    {
      path: '/products',
      element: (
        <Protected>
          <MainLayout>
            <Dashboard>
              <ListProduct />
            </Dashboard>
          </MainLayout>
        </Protected>
      ),
    },
    {
      path: '/login',
      element: (
        <Login />
      ),
    },
    {
      path: '/register',
      element: (
        <Register />
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
