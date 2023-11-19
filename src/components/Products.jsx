import { faCheckCircle, faCircle, faTrash,faSearch,faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { checkProduct, deleteProduct, getProducts } from '../app/functions'
import { useNavigate } from 'react-router-dom'

export default function Products() {
   const [products,setProducts] =useState({
    elements:[],
    currentPage:1,
    pageSize:3,
    keyword:"",
    totalPages:0,
   });

   const [query,setQuery] = useState("");
   const navigate = useNavigate();

    useEffect(() => {
         handleGetProducts(products.keyword,products.currentPage,products.pageSize);
    }, []);

    const handleGetProducts = (keyword,page,pageSize) => {
       getProducts(keyword,page,pageSize).then(res => {
        const totalElements= res.headers['x-total-count'];
        let totalPages=Math.floor(totalElements/pageSize);
        if(totalElements % pageSize !=0) { ++totalPages;};
        setProducts({...products,elements:res.data,keyword:keyword,currentPage:page,pageSize:pageSize,totalPages:totalPages});
       }
       ).catch(err => {
        console.log(err);
       })
    };

    const handleDelete = (p) => {
           deleteProduct(p).then(res => {
            const newProducts = products.elements.filter((product) => product.id!= p.id);
            setProducts({...products,elements:newProducts});
           })
           
    };

    const handleCheck = (p) => {
          checkProduct(p).then(res => {
            const newProducts = products.elements.map(product=> {
                if(product.id == p.id) {
                    product.checked=!product.checked ;
                }
                return product ;
              })
              setProducts({...products,elements:newProducts});
          }).catch(err => {
            console.log(err);
           })
         
    };

    const handlePage = (p) => {
       if(p==0 || p> products.totalPages) { return;}
        handleGetProducts(products.keyword,p,products.pageSize);
    };

    const handleSearch = (e) => {
      e.preventDefault();
     // setProducts({...products,keyword:query});
      handleGetProducts(query,1,products.pageSize);
    };

    
  return (
    <>
        <div className=" font-bold px-6 py-4 shadow-lg rounded-md border-2 border-indigo-300 m-5 text-3xl text "> Products </div>
        <div className='mt-4 mb-4'>
         <form onSubmit={handleSearch}>
          <div className='flex justify-center '>
          <input onChange={(e)=> setQuery(e.target.value)} className='py-1 mr-1 px-1 border text-center rounded-md border-black' value={query} id='query' type='text' placeholder='Search ...' />
          <button className='text-white cursor-pointer py-1 px-3  bg-indigo-500 text-lg font-semibold border border-black rounded-full' >
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </button>
          </div>    
         </form>
        </div>
     <div className="flex align-center justify-center">
        <table className="table-auto shadow-lg border rounded-md">
            <thead>
                <tr>
                    <th className="px-4 py-4 border rounded-md border-indigo-300">Product ID</th>
                    <th className="px-4 py-4 border  rounded-md border-indigo-300"> Name</th>
                    <th className="px-4 py-4 border rounded-md border-indigo-300"> Price </th>
                    <th  className="px-4 py-4 border rounded-md border-indigo-300"> Checked</th>
                    <th  className="px-4 py-4 border rounded-md border-indigo-300"> Actions </th>
                </tr>
            </thead>
            <tbody>
             {products.elements.map((p) => (
                     <tr key={p.id} >
                        <td   className=" text-center   px-4 py-4"> {p.id }</td>
                        <td className=" text-center  px-4 py-4">{p.name}</td>
                        <td className=" text-center  px-4 py-4">{p.price}</td>
                        <td className=" text-center  px-4 py-4">
                            <button onClick={() => handleCheck(p)} className=" bg-white hover:bg-slate-300 rounded-lg border-2 border-green-600 text-green-600 text-xl px-2 py-1">
                              <FontAwesomeIcon icon={  p.checked ? faCheckCircle : faCircle }></FontAwesomeIcon>
                            </button>
                            
                        </td>
                        <td className="px-4 py-4">
                        <button onClick={() => handleDelete(p)} className=" mr-2 bg-white  hover:bg-slate-300 rounded-lg border-2 border-red-600 text-red-600 text-xl px-2 py-1">
                              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>
                            <button onClick={()=> navigate(`/editProduct/${p.id}`)} className=" bg-white  hover:bg-slate-300 rounded-lg border-2 border-indigo-400 text-indigo-400 text-xl px-2 py-1">
                              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                            </button>

                       </td>
                     </tr>
             ))
             }
            </tbody>
        </table>
       
      </div>
      <div className=' mt-4 flex justify-center content-center'>
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a onClick={()=> handlePage((products.currentPage-1))} className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span className="sr-only">Previous</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
          </svg>
        </a>
        {
          new Array(products.totalPages).fill(0).map((v,index)=> (
            <a key={index} onClick={()=> handlePage(index+1)} className={ products.currentPage==index+1 ? "cursor-pointer relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}>{index +1 }</a>
          ))
        }
        <a onClick={()=> handlePage((products.currentPage+1))} className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span className="sr-only">Next</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </a>
      </nav>
      </div>
     </> 
  )
}
