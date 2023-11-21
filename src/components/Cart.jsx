import React, { useContext } from 'react'
import { Context } from '../app/AppContext'

export default function Cart() {

      const [products,setProducts] = useContext(Context);


  return (
    <div className='relative'>
         <span class="absolute -top-1 left-4 rounded-full bg-indigo-700 w-5 h-5 text-xs text-white flex items-center justify-center"> {products.elements.length }</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-sm font-medium leading-5 text-gray-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
    </div>
  )
}
