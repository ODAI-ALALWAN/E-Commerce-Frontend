import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import  { baseUrl }  from "../../services/Api";



export const Get_Product = createAsyncThunk("Productlist/Get_Product", async (_ ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        const  { data }  = await baseUrl.get('api/v1/products',{headers : {
            Authorization:'Bearer ' + token
          }})
        return data
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
}) 




export const Add_Product = createAsyncThunk(
    "Productlist/Add_Product",
    async (product ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        const  { data }  = await baseUrl.post('api/v1/products', product ,{
            headers : {        
            Authorization:'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
            
        }})
        return data
    }catch (error){
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
}) 

export const Delete_Product = createAsyncThunk(
    "Productlist/Delete_Product",
    async (productId ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        await baseUrl.delete(`api/v1/products/${productId}`, {
            headers: {        
              Authorization: 'Bearer ' + token,
            }
          });
        return productId;
    }catch (error){
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
}) 








export const Productlist = createSlice({
    initialState: {
        loader : false ,
        data : [] ,
        error: null
    },
    name:"Productlist",
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(Get_Product.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Get_Product.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Get_Product.fulfilled , (state , {payload}) => {
            state.loader = false
            state.data = payload.data || payload;
            state.error = null;
        })
        builder.addCase(Add_Product.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Add_Product.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Add_Product.fulfilled , (state , {payload}) => {
            state.loader = false;
            state.data = [...state.data, payload];
            state.error = null;
            
        })
        builder.addCase(Delete_Product.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Delete_Product.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Delete_Product.fulfilled , (state, { meta }) => {
            state.loader = false;
            state.error = null;
            state.data = state.data.filter((product) => product._id !== meta.arg);
        })


    }
    
})



export default Productlist.reducer;