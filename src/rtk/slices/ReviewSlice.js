import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl } from "../../services/Api"



export const Get_Review_By_Id = createAsyncThunk("ReviewList/Get_Review_By_Id", async ( id ,{rejectWithValue }) => {
    try{
        const { data } =  await baseUrl.get(`api/v1/products/${id}/reviews`)
        return data
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
}) 


export const ReviewList = createSlice({
    initialState: {
        loader : false ,
        data : [] ,
        error: null
    },
    name:"ReviewList",
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(Get_Review_By_Id.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Get_Review_By_Id.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Get_Review_By_Id.fulfilled , (state, { payload, error }) => {
            state.loader = false;
            state.error = null;
            state.data = Array.isArray(payload.data) ? payload.data : [payload.data];
        })
    }

    
    
})

export default ReviewList.reducer;