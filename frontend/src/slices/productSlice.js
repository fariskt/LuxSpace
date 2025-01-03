import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axiosInstance from "../api/apiClient";
import { useDispatch } from "react-redux";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/products?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response?.data?.message || "Unknown error");
    }
  }
);

export const fetchProductByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/products/category/${category}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response?.data.message);
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

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (
    { page = 1, limit = 10, name = "", category = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/api/products?page=${page}&limit=${limit}&name=${name}&category=${category}`
      );
      return response.data; // Expecting the backend to send { success, data, totalProducts, pageLength, currentPage }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Unknown error");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProduct: [],
    productById: {},
    productLength: 0,
    totalPages: 0,
    currentPage: 1,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // setFilteredProducts: (state, action) => {
    //   state.filteredProduct = action.payload.data;
    // },
  },
  extraReducers: (builder) => {
    builder
      //fetch products
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.productLength = action.payload.totalProducts;
        (state.currentPage = action.payload.currentPage),
          (state.totalPages = action.payload.pageLength);
        state.status = "succeeded";
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      })
      //fetch product by category
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        (state.status = "succeeded"),
          (state.filteredProduct = action.payload.data);
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.pageLength;
        state.productLength = action.payload.totalProducts;
      })
      .addCase(fetchProductByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      //search products
      .addCase(searchProducts.fulfilled, (state, action) => {
        (state.status = "succeeded"),
          (state.filteredProduct = action.payload.data),
          (state.productLength = action.payload.totalProducts),
          (state.currentPage = action.payload.currentPage),
          (state.totalPages = action.payload.pageLength);
      })
      .addCase(searchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      //fetch product by id
      .addCase(fetchProductById.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.productById = action.payload);
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
