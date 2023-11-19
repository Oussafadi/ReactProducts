import React, { useEffect, useState } from 'react'
import { saveProduct,getProduct , updateProduct } from '../app/functions'
import { useParams } from 'react-router-dom';

export default function EditProduct() {
     const [name,setName] = useState("");
     const [price,setPrice] = useState(0);
     const [checked,setChecked] = useState(false);

     const {id} =useParams();
      
     useEffect(()=> {
       handleGetProductById(id);
     },[]);

     const handleUpdateProduct = (e)=> {
           e.preventDefault();
       let product={id,name , price , checked};
        updateProduct(product).then(res=> {
             alert("Product updated with success");
        }).catch(e => {
          alert("Product did not get updated");
          console.log(e);
        });
     };

     const handleGetProductById = (id) => {
        getProduct(id).then(res => {
            let product = res.data;
            setName(product.name);
            setPrice(product.price);
            setChecked(product.checked);
          });
     };
  return (
        <>
           <div className=" font-bold px-6 py-4 shadow-lg rounded-md border-2 border-indigo-300 m-5 text-3xl text "> Edit Product
           </div>
           <div className='container'>
           <div className=" mt-2 flex justify-center content-center">
          
            <form onSubmit={handleUpdateProduct} className=" shadow-lg flex flex-col px-6 py-6 w-1/2  border-2 border-indigo-300 rounded-lg">
            <h2 className='text-3xl font-bold text-center mb-6 underline '> Product informations:</h2>
              <div className="flex flex-row mb-2">
                <label className="basis-1/2 text-lg text-center font-semibold " htmlFor='name'>Name :</label>
                <input onChange={(e)=> setName(e.target.value)} value={name}  className="basis-1/2  py-1 px-1 border text-center rounded-md border-black" id='name' type='text' placeholder='Product name ...' required />
              </div>
              <div  className="flex flex-row mb-2">
                <label  className="basis-1/2 text-lg text-center font-semibold" htmlFor='price'>Price :</label>
                <input onChange={(e)=> setPrice(e.target.value)} value={price}  className="basis-1/2 py-1 px-1 border text-center rounded-md border-black" id='price' type='text' placeholder='Product price ...' required />
              </div> 
              <div className="mb-2 flex justify-center content-center h-6 ">
                <input checked={checked} onChange={(e)=> setChecked(!checked)} value={checked} id="check" name="check" type="checkbox" className="mt-2 mx-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                <label className='text-lg text-center font-semibold' htmlFor='check'> Checked </label>
              </div>
              <div className=' mt-4 mb-2 w-full flex justify-center content-center'>
                <button className=' text-white cursor-pointer hover:w-full w-1/2 py-2 px-3  bg-green-500 text-lg font-semibold border border-black rounded-full'>Save</button>
              </div>
            </form>
            </div>
            </div>  

        </>
  )
}
