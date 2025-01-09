import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import NotFound from "./pages/NotFound";


export const router = createBrowserRouter([
  {
    path:'/signup',
    element:<Signup />
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/',
    element:<Home/>
  },{
    path:'*',
    element:<NotFound/>
  }
])