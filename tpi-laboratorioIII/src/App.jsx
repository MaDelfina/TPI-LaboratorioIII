import './App.css'

import ListProduct from './components/ListProduct/ListProduct'
import Header from './components/header/Header'
import Login from './components/login/Login'
import MainLayout from './components/mainLayout/MainLayout'
import Register from './components/register/Register'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'



function App() {
  
  const router = createBrowserRouter([
    {
      path:'/',
      element:(
        <MainLayout>
          {/* <Home/> home todabia no existe */}
        </MainLayout>
      ),
    },
    {
      path:'/adminUser',
      element:(
        <MainLayout>
          {/* <AdminUser/> todabia no existe */}
        </MainLayout>
      ),
    },
    {
      path:'/addProduct',
      element:(
        <MainLayout>
          {/* <FormProduct/> todabia no existe */}
        </MainLayout>
      ),
    },
    {
      path:'/order',
      element:(
        <MainLayout>
          {/* <Order/>  todabia no existe */}
        </MainLayout>
      ),
    },
    {
      path:'/products',
      element:(
        <MainLayout>
          <ListProduct/>
        </MainLayout>
      ),
    },
    {
      path:'/login',
      element:(
        <MainLayout>
        <Login/>
        </MainLayout>
      ),
    },
    //El registrer supongo que se accede con un boton en login. 
    {
      path:'/registrer',
      element:(
        <MainLayout>
          <Register/> 
        </MainLayout>
      ),
    },
    {
      path:'/*',
      element:(
        <MainLayout/> 
        // <NotFound/> no existe todavia
      ),
    },

  ])


  return <RouterProvider router={router}/>
}

export default App
