import { faCheckCircle, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { checkProduct, deleteProduct, getProducts } from '../app/functions'

export default function Products() {
   const [products,setProducts] =useState([ 
    ])

    useEffect(() => {
         handleGetProducts();
    }, [])

    const handleGetProducts = () => {
       getProducts().then(res => {
        setProducts(res.data);
       }
       ).catch(err => {
        console.log(err);
       })
    }

    const handleDelete = (p) => {
           deleteProduct(p).then(res => {
            const newProducts = products.filter((product) => product.id!= p.id);
            setProducts(newProducts);
           })
           
    };

    const handleCheck = (p) => {
          checkProduct(p).then(res => {
            const newProducts = products.map(product=> {
                if(product.id == p.id) {
                    product.checked=!product.checked ;
                }
                return product ;
              })
              setProducts(newProducts);
          }).catch(err => {
            console.log(err);
           })
         
    };

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
                    <th  className="px-4 py-4 border-2 rounded-md border-indigo-300"> Checked</th>
                    <th  className="px-4 py-4 border-2 rounded-md border-indigo-300"> Actions </th>
                </tr>
            </thead>
            <tbody>
             {products.map((p) => (
                     <tr key={p.id} >
                        <td   className=" text-center   px-4 py-4"> {p.id }</td>
                        <td className=" text-center  px-4 py-4">{p.name}</td>
                        <td className=" text-center  px-4 py-4">{p.price}</td>
                        <td className=" text-center  px-4 py-4">
                            <button onClick={() => handleCheck(p)} className=" bg-white rounded-lg border-2 border-green-600 text-green-600 text-xl px-2 py-1">
                              <FontAwesomeIcon icon={  p.checked ? faCheckCircle : faCircle }></FontAwesomeIcon>
                            </button>
                            
                        </td>
                        <td className=" text-center  px-4 py-4">
                        <button onClick={() => handleDelete(p)} className=" bg-white rounded-lg border-2 border-red-600 text-red-600 text-xl px-2 py-1">
                              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
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
