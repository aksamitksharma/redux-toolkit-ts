import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Users = {
    id: number
    name: string
}

type InitialState = {
    loading: boolean
    users: Users[]
    error: string
}
const initialState: InitialState = {
    loading: false,
    users: [],
    error: ''
}

export  const fecthUsers = createAsyncThunk('user/fecthUsers', () => {
 return axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((res)=>res.data)
    
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fecthUsers.pending, (state) => {
            state.loading= true
        })
        builder.addCase(fecthUsers.fulfilled, (state, action: PayloadAction<Users[]>) => {
            state.loading = false,
            state.users = action.payload,
            state.error = ''
        })
        builder.addCase(fecthUsers.rejected, (state, action) => {
            state.loading = false,
            state.users = [],
            state.error = action.error.message || "Something went wrmg!"
        })
    }
})

export default userSlice.reducer