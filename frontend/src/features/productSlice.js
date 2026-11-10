import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 10, name, category }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/products?page=${page}&limit=${limit}&name=${name}&category=${category}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response?.data?.message || "Unknown error");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/products/${id}`);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response?.data.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/products", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      return response.data;
    } catch (error) {
      
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, product }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/products/${productId}`,product, {
        headers: {'Content-Type': 'multipart/form-data'}
      });
      return response.data.data;
    } catch (error) {
      console.log(error.response);
      rejectWithValue(error.response?.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/products/${productId}`);
      return response.data.data;
    } catch (error) {
      console.log(error.response);

      rejectWithValue(error.response?.data.message);
    }
  }
);
export const fetchAllCategories = createAsyncThunk(
  "products/fetchallcategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/products/categories`);      
      return response.data.data;
    } catch (error) {

      rejectWithValue(error.response?.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productById: {},
    productLength: 0,
    categories: [],
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch products
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.productLength = action.payload.totalProducts;
        (state.currentPage = action.payload.currentPage),
        (state.totalPages = action.payload.pageLength);
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
         state.error = action.error.message;
      })
      //fetch product by id
      .addCase(fetchProductById.fulfilled, (state, action) => {
        (state.loading = false), (state.productById = action.payload);
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      //add product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //fetch all category
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {                
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
