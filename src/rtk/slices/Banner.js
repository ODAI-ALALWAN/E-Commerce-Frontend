import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl } from "../../services/Api";



export const GET_Banner = createAsyncThunk("BannerList/GET_Banner", async (_ ,{rejectWithValue }) => {
    try{ 
        const token = localStorage.getItem("Token")
        const  { data }  = await baseUrl.get("api/v1/banner",{headers : {
            Authorization:'Bearer ' + token
          }} )

        return data
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
})

export const Add_Banner = createAsyncThunk(
    "BannerList/Add_Banner",
    async (formData ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        const  { data }  = await baseUrl.post('api/v1/banner', formData ,{
            headers : {        
            Authorization:'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
            
        }})
        return data
    }catch (error){
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
}) 

export const Get_Banner_By_Id = createAsyncThunk(
    "CategroyList/Get_Banner_By_Id",
     async ( Id ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        const { data } =  await baseUrl.get(`api/v1/banner/${Id}`,{headers : {
            Authorization:'Bearer ' + token
          }})
        return data
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
}) 
export const Update_Banner_By_Id = createAsyncThunk(
    "CategroyList/Update_Banner_By_Id",
    async ({ Id, formData }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("Token");
        const { data } = await baseUrl.put(
          `api/v1/banner/${Id}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data", 
            },
          }
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "An error occurred");
      }
    }
);
  

export const Delete_Banner = createAsyncThunk(
    "CategroyList/Delete_Banner",
    async (categroyId ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        await baseUrl.delete(`api/v1/banner/${categroyId}`, {
            headers: {        
              Authorization: 'Bearer ' + token,
            }
          });
        return categroyId;
    }catch (error){
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
}) 






const BannerList = createSlice({
    name:"BannerList",
    initialState: {
        loader : false ,
        data : []
    },
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(GET_Banner.pending ,  (state , { payload }) => {
            state.loader = true
        })
        builder.addCase(GET_Banner.rejected , (state , { payload }) => {
            state.loader = true
            state.errorMessage = payload
        })
        builder.addCase(GET_Banner.fulfilled , (state , {payload}) => {
            state.loader = false
            state.data = payload.data
           
        })
        builder.addCase(Add_Banner.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Add_Banner.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Add_Banner.fulfilled , (state , {payload}) => {
            state.loader = false;
            state.data = [...state.data, payload];
            state.error = null;
            
        })
        builder.addCase(Delete_Banner.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Delete_Banner.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Delete_Banner.fulfilled , (state, { meta }) => {
            state.loader = false;
            state.error = null;
            state.data = state.data.filter((product) => product._id !== meta.arg);
        })
        builder.addCase(Get_Banner_By_Id.pending , (state , {payload}) => {
                    state.loader = true
                    state.error = null;
                    
        })
        builder.addCase(Get_Banner_By_Id.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Get_Banner_By_Id.fulfilled , (state, { payload, error }) => {
            state.loader = false;
            state.error = null;
            state.data = Array.isArray(payload.data) ? payload.data : [payload.data];
        })
        builder.addCase(Update_Banner_By_Id.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Update_Banner_By_Id.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Update_Banner_By_Id.fulfilled , (state, { meta }) => {
            state.loader = false;
            state.error = null;
            state.data = state.data.map((categroy) =>
                categroy._id === meta.arg ? { ...categroy, ...meta.payload } : categroy
                );
            
        })
        
    }
    
})



export default BannerList.reducer;