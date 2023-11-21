import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Context } from '../app/AppContext';

export default function SearchBar({handleGetProducts}) {
    const [products,setProducts] = useContext(Context);
    const [query,setQuery] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
       // setProducts({...products,keyword:query});
        handleGetProducts(query,1,products.pageSize);
      };
  return (
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
  )
}
