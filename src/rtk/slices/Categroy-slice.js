import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl } from "../../services/Api";



export const GET_Categroy = createAsyncThunk("CategroyList/GET_Categroy", async (_ ,{rejectWithValue }) => {
    try{ 
        const token = localStorage.getItem("Token")
        const  { data }  = await baseUrl.get("api/v1/categories",{headers : {
            Authorization:'Bearer ' + token
          }} )

        return data
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
})


export const Add_Categroy = createAsyncThunk(
    "CategroyList/Add_Categroy",
    async (categroy ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        const  { data }  = await baseUrl.post('api/v1/categories', categroy ,{
            headers : {        
            Authorization:'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
            
        }})
        return data
    }catch (error){
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
}) 



export const Delete_Categroy = createAsyncThunk(
    "CategroyList/Delete_Categroy",
    async (categroyId ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        await baseUrl.delete(`api/v1/categories/${categroyId}`, {
            headers: {        
              Authorization: 'Bearer ' + token,
            }
          });
        return categroyId;
    }catch (error){
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
}) 






const CategroyList = createSlice({
    initialState: {
        loader : false ,
        data : []
    },
    name:"CategroyList",
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(GET_Categroy.pending ,  (state , { payload }) => {
            state.loader = true
        })
        builder.addCase(GET_Categroy.rejected , (state , { payload }) => {
            state.loader = true
            state.errorMessage = payload
        })
        builder.addCase(GET_Categroy.fulfilled , (state , {payload}) => {
            state.loader = false
            state.data = payload.data
           
        })
        builder.addCase(Add_Categroy.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Add_Categroy.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Add_Categroy.fulfilled , (state , {payload}) => {
            state.loader = false;
            state.data = [...state.data, payload];
            state.error = null;
            
        })
        builder.addCase(Delete_Categroy.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Delete_Categroy.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Delete_Categroy.fulfilled , (state, { meta }) => {
            state.loader = false;
            state.error = null;
            state.data = state.data.filter((product) => product._id !== meta.arg);
        })
    }
    
})



export default CategroyList.reducer;