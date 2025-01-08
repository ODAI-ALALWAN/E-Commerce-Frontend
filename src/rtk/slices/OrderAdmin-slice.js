import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../services/Api";



export const GET_All_Order = createAsyncThunk ('adminOrder/GET_All_Order' , async (_ ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        const  { data }  = await baseUrl.get('api/v1/order',{headers : {
            Authorization:'Bearer ' + token
          }})
        return data
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
}) 


export const AdminOrderSlice = createSlice ({
    name :'adminOrder',
    initialState: {
        loader : false ,
        data : [],
        error: null
    },
    reducers:{

    },
    extraReducers : (builder) => {
        builder.addCase(GET_All_Order.pending , (state , { payload }) => {
            state.loader = true
        })
        builder.addCase(GET_All_Order.rejected , (state , { payload }) => {
            state.loader = true
            state.errorMessage = payload
        })
        builder.addCase(GET_All_Order.fulfilled , (state , {payload}) => {
            state.loader = false
            state.data = payload.data || payload;

           
        })

    }
})

export default AdminOrderSlice.reducer