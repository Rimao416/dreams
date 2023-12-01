import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { API } from "../../config"
export const getBlogs=createAsyncThunk(
    "blogs",
    async (_, {rejectWithValue})=>{
        try {
            const response=await API.get("/articles")
            console.log(response)
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)
const blogSlice=createSlice({
    name:"blogs",
    initialState:{
        blogs:[],
        loading:false,
        error:false,
        status:"idle"
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBlogs.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(getBlogs.fulfilled,(state,action)=>{
            return{
                ...state,
                loading:false,
                blogs:action.payload.data
            }
        })
        builder.addCase(getBlogs.rejected,(state,action)=>{
            console.log(action)
            state.loading=false
            state.error=true
        })
    }
})
export default blogSlice.reducer