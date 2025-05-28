import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 