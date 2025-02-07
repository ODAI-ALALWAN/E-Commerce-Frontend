import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import { baseUrl } from "../../services/Api";


export const GET_COUPONS = createAsyncThunk ( 
    'coupon/GET_COUPONS' ,
     async (_ ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        const  { data }  = await baseUrl.get('api/v1/coupon',{headers : {
            Authorization:'Bearer ' + token
          }} )

        return data
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
})

export const GET_COUPONS_By_Id = createAsyncThunk(
    "coupon/GET_COUPONS_By_Id",
    async ( couponId ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        const { data } =  await baseUrl.get(`api/v1/coupon/${couponId}`,{headers : {
            Authorization:'Bearer ' + token
          }})
        return data
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
}) 


export const CREATE_COUPONS = createAsyncThunk ( 
    'coupon/CREATE_COUPONS',
     async ( formData ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        const  { data }  = await baseUrl.post('api/v1/coupon', formData ,
            {
            headers : {
            Authorization:'Bearer ' + token,
          }})

        return data
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
})

export const UPDATE_COUPON = createAsyncThunk(
    "coupon/UPDATE_COUPON",
    async ({ couponId, updatedData }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("Token");
        const { data } = await baseUrl.put(
          `api/v1/coupon/${couponId}`,
          updatedData,
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
  
export const DELETE_COUPON = createAsyncThunk(
    "coupon/DELETE_COUPON",
    async (couponId ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        await baseUrl.delete(`api/v1/coupon/${couponId}`, {
            headers: {        
              Authorization: 'Bearer ' + token,
            }
          });
        return couponId;
    }catch (error){
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
}) 




export const CouponSlice = createSlice({    
    name :'coupon',
    initialState: {
        loader : false ,
        data : []
    },
    reducers:{

    },
    extraReducers : (builder) => {
        builder.addCase(GET_COUPONS.pending , (state , { payload }) => {
            state.loader = true
        })
        builder.addCase(GET_COUPONS.rejected , (state , { payload }) => {
            state.loader = true
            state.errorMessage = payload
        })
        builder.addCase(GET_COUPONS.fulfilled , (state , {payload}) => {
            state.loader = false
            state.data = payload.data
        })
        builder.addCase(GET_COUPONS_By_Id.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(GET_COUPONS_By_Id.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(GET_COUPONS_By_Id.fulfilled , (state, { payload, error }) => {
            state.loader = false;
            state.error = null;
            state.data = Array.isArray(payload.data) ? payload.data : [payload.data];
        })
        builder.addCase(CREATE_COUPONS.pending , (state , { payload }) => {
            state.loader = true
        })
        builder.addCase(CREATE_COUPONS.rejected , (state , { payload }) => {
            state.loader = true
            state.errorMessage = payload
        })
        builder.addCase(CREATE_COUPONS.fulfilled , (state , {payload}) => {
            state.loader = false;
            state.data = [...state.data, payload];
            state.error = null;
        })
        builder.addCase(UPDATE_COUPON.pending, (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(UPDATE_COUPON.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(UPDATE_COUPON.fulfilled , (state, { meta }) => {
            state.loader = false;
            state.error = null;
            state.data = state.data.map((coupon) =>
                coupon._id === meta.arg ? { ...coupon, ...meta.payload } : coupon
            );
        })
        builder.addCase(DELETE_COUPON.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(DELETE_COUPON.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(DELETE_COUPON.fulfilled , (state, { meta }) => {
            state.loader = false;
            state.error = null;
            state.data = state.data.filter((coupon) => coupon._id !== meta.arg);
        })
}
})



export default CouponSlice.reducer