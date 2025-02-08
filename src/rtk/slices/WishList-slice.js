import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../services/Api";




export const Add_ToWishList = createAsyncThunk(
    "wishList/Add_ToCart",
    async ({ productId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("Token")
            if (!token) throw new Error("User is not authenticated");

            const { data } = await baseUrl.post(
                'api/v1/wishlist',
                { productId }, 
                {
                    headers: {
                         Authorization: `Bearer ${token}` ,
                        'Content-Type': 'application/json',
                    },
                }
            );
            
            return data;

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
    }
);

export const GETLogged_User_Wishlist = createAsyncThunk(
  "wishList/GETLogged_User_Wishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token")
      const { data } = await baseUrl.get('api/v1/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      });

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

export const Remove_Item_From_WishList = createAsyncThunk(
  "wishList/Remove_Item_From_WishList",
  async (ItemId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token")
      await baseUrl.delete(`api/v1/wishlist/${ItemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return ItemId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const Wishlist = createSlice({
  name: 'wishList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(Add_ToWishList.pending, (state) => {
            state.loader = true;
            state.error = null;
        })
        .addCase(Add_ToWishList.fulfilled, (state, action) => {
            state.loader = false;
            state.data = action.payload;
        })
        .addCase(Add_ToWishList.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
        })
        .addCase(GETLogged_User_Wishlist.pending, (state) => {
        state.loading = true;
        })
        .addCase(GETLogged_User_Wishlist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload || [];
        state.error = null;
        })
        .addCase(GETLogged_User_Wishlist.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        })
        .addCase(Remove_Item_From_WishList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => item._id !== payload);
        });
  },
});

export default Wishlist.reducer;
