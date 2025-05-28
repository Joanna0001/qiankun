import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string
  isLoggedIn: boolean
}

const initialState: UserState = {
  name: '',
  isLoggedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.name = action.payload
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.name = ''
      state.isLoggedIn = false
    }
  }
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer 