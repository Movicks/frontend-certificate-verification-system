import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { AuthResponse, LoginCredentials, SignupData, User } from "@/types/auth"
import { authAPI, setAuthToken, setCurrentUser, removeAuthToken } from "@/lib/auth-client"

export interface AuthState {
  user: User | null
  token: string | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
}

export const loginThunk = createAsyncThunk<AuthResponse, LoginCredentials>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await authAPI.login(credentials)
    return res
  } catch (e: any) {
    return rejectWithValue(e.message ?? "Login failed") as any
  }
})

export const signupThunk = createAsyncThunk<AuthResponse, SignupData>("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.signup(data)
    return res
  } catch (e: any) {
    return rejectWithValue(e.message ?? "Signup failed") as any
  }
})

export const logoutThunk = createAsyncThunk<void>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await authAPI.logout()
  } catch (e: any) {
    return rejectWithValue(e.message ?? "Logout failed") as any
  }
})

export const getCurrentUserThunk = createAsyncThunk<User>("auth/currentUser", async (_, { rejectWithValue }) => {
  try {
    const user = await authAPI.getCurrentUser()
    return user
  } catch (e: any) {
    return rejectWithValue(e.message ?? "Get user failed") as any
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = "succeeded"
        state.user = action.payload.user
        state.token = action.payload.token ?? null as any
        setAuthToken(action.payload.token)
        setCurrentUser(action.payload.user)
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed"
        state.error = (action.payload as string) ?? action.error.message ?? "Login failed"
      })

      .addCase(signupThunk.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(signupThunk.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = "succeeded"
        state.user = action.payload.user
        state.token = action.payload.token ?? null as any
        setAuthToken(action.payload.token)
        setCurrentUser(action.payload.user)
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = "failed"
        state.error = (action.payload as string) ?? action.error.message ?? "Signup failed"
      })

      .addCase(logoutThunk.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.status = "succeeded"
        state.user = null
        state.token = null
        removeAuthToken()
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.status = "failed"
        state.error = (action.payload as string) ?? action.error.message ?? "Logout failed"
      })

      .addCase(getCurrentUserThunk.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded"
        state.user = action.payload
      })
      .addCase(getCurrentUserThunk.rejected, (state, action) => {
        state.status = "failed"
        state.error = (action.payload as string) ?? action.error.message ?? "Get user failed"
      })
  },
})

export const { resetError, setUser } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
export const selectUser = (state: RootState) => state.auth.user
export const selectRole = (state: RootState) => state.auth.user?.role ?? null
export const selectIsAuthenticated = (state: RootState) => !!state.auth.user
export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectAuthError = (state: RootState) => state.auth.error

export default authSlice.reducer