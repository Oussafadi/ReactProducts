import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export default function Products() {
   const [products,setProducts] =useState([  
        { id:1 , name: "Computer" , price:5000 , checked:false } ,
        { id:2 , name: "Tablet" , price:5000 , checked:false } ,
        { id:3 , name: "Phone" , price:5000 , checked:true } ,
    ])

  return (
    <>
        <div className=" font-bold px-6 py-4 shadow-lg rounded-md border-2 border-indigo-300 m-5 text-3xl text "> Products </div>
     <div className="flex align-center justify-center">
        <table className="table-auto shadow-lg">
            <thead>
                <tr>
                    <th className="px-4 py-4 border-2 rounded-md border-indigo-300">Product ID</th>
                    <th className="px-4 py-4 border-2  rounded-md border-indigo-300"> Name</th>
                    <th className="px-4 py-4 border-2 rounded-md border-indigo-300"> Price </th>
                    <th className="px-4 py-4 border-2 rounded-md border-indigo-300"> Action</th>
                </tr>
            </thead>
            <tbody>
             {products.map((p) => (
                     <tr key={p.id} >
                        <td   className=" text-center   px-4 py-4"> {p.id }</td>
                        <td className=" text-center  px-4 py-4">{p.name}</td>
                        <td className=" text-center  px-4 py-4">{p.price}</td>
                        <td className=" text-center  px-4 py-4">
                            <button className=" bg-white rounded-lg border-2 border-green-600 text-green-600 text-xl px-2 py-1">
                              <FontAwesomeIcon icon={  p.checked ? faCheckCircle : faCircle }></FontAwesomeIcon>
                            </button>
                           
                        </td>
                     </tr>
             ))
             }
            </tbody>
        </table>
      </div>
     </> 
  )
}
