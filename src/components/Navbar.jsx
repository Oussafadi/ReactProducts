import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Products from "./Products"
import AddProduct from "./AddProduct"
import { useEffect, useState } from "react"
import EditProduct from "./EditProduct"
import Cart from "./Cart"


function Navbar() {

    const [activeRoute,setActiveRoute] = useState("");
    useEffect(() => {
       const path = window.location.pathname ;
       setActiveRoute(path.slice(1,path.length));
 } , []);
    
   return ( 
   <>
   <BrowserRouter>
   <nav className="bg-gray-200">
     <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
     <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
             <div className="flex flex-shrink-0 items-center">
                 <img className="h-8 w-auto" src="vite.svg" alt="Your Company"/>
            </div>
           <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
             <Link onClick={()=>setActiveRoute("Home")} to="/Home" className= {activeRoute=="Home" ? " text-white  bg-indigo-500 rounded-md px-3 py-2 text-sm font-medium" : " text-black hover:bg-indigo-500 rounded-md px-3 py-2 text-sm font-medium" }>Home</Link>
             <Link onClick={()=>setActiveRoute("Products")} to="/Products" className={activeRoute=="Products" ? " text-white  bg-indigo-500 rounded-md px-3 py-2 text-sm font-medium" : " text-black hover:bg-indigo-500 rounded-md px-3 py-2 text-sm font-medium" }>Products</Link>
             <Link onClick={()=>setActiveRoute("AddProduct")} to="/AddProduct" className={activeRoute=="AddProduct" ? " text-white  bg-indigo-500 rounded-md px-3 py-2 text-sm font-medium" : " text-black hover:bg-indigo-500 rounded-md px-3 py-2 text-sm font-medium" }>Add Product</Link>        
              </div>
           </div>
         </div>
        <div className="cursor-pointer" > <Cart/> </div>
      </div>
      </div>
    </nav>
     <Routes>
        <Route path="/Home" element={<Home/>}>  </Route>
        <Route path="/Products" element={<Products/>}>  </Route>
         <Route path="/AddProduct" element={<AddProduct/>}>  </Route>
         <Route path="/EditProduct/:id" element={<EditProduct/>}>  </Route> 
    </Routes>
   </BrowserRouter>
    </>
   )
}




export default Navbar