import { createBrowserRouter } from "react-router-dom";
import Rdp from './src/components/Rdp'
import Checkout from "./src/components/Checkout";
import Configure from "./src/components/Configure";
export const router = createBrowserRouter([
  {
    path:'/',
    element:<Rdp/>
  },
  {
    path:'/checkout',
    element:<Checkout/>
  },{
    path:'/configure',
    element:<Configure/>
  }
]
)