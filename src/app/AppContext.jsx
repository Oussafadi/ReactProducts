import { createContext , useState } from "react";

export const Context = createContext();

export const useProducts = ()=>{
    const state = {
        elements:[],
        currentPage:1,
        pageSize:3,
        keyword:"",
        totalPages:0,
       };

       const products =useState(state);
       return products ;
};