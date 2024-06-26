import { createBrowserRouter } from "react-router-dom";
import Home from './pages/public/home/index'
import UploadProduct from "./pages/admin/product/UploadProduct";
import Cart from "./pages/public/Cart/index"
import CardDetails from "./pages/public/home/CardDetails";
import SplitBill from "./pages/public/SplitBill";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard"
import Product from "./pages/admin/product/index"
import Payment from "./pages/public/payment/index"
import OrderStatus from "./pages/public/payment/Status"
import Transaction from "./pages/admin/Transaction";
import Order from "./pages/admin/Order";
import AdminCart from "./pages/admin/Cart/index"

const routers = createBrowserRouter([
    {
        path : '/:tableId',
        element : <Home/>
    },
    {
        path : '/admin/upload',
        element : <UploadProduct/>
    },
    {
        path:'/:tableId/details/:id',
        element: <CardDetails/>
    },
    {
        path:'/:tableId/cart',
        element:<Cart/>
    },
    {
        path:'/:tableId/split',
        element:<SplitBill/>
    },
    {
        path:'/admin/login',
        element:<Login/>
    },
    {
        path:'/admin/home',
        element: <Dashboard/>
    },
    {
        path:'/admin/products',
        element: <Product/>
    },
    {
        path:'/payment/:id',
        element:<Payment/>
    },
    {
        path:'/order-status',
        element: <OrderStatus/>
    },{
        path:'/admin/transactions',
        element:<Transaction/>
    },
    {
        path:'/admin/cart',
        element:<AdminCart/>
    },
    {
        path:'/admin/order',
        element:<Order/>
    }
])

export default routers