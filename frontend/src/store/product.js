import {create} from "zustand"; // create function

// create a hook
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message:"Pease fill in all the fields."}
        }

        const res = await fetch("/api/products", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]})) //product.config.js data
        return {success: true, message:"Product Created Successfully."}
    },

    //fetch products from database
    fetchProducts: async () => {
        const res = await fetch("/api/products"); // fetch the end point, api for products
        const data = await res.json(); // extract the result, and put it in data
        set({ products: data.data});
    } // ->useEffect in homepage

})); // global state