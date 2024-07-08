import { fetchTokens, fetchUser } from "@/api/user";
import { SigninFormType, TrackItem, User } from "@/tipes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ email, password }: SigninFormType) => {
    const user = await fetchUser({ email, password });
    return user;
  }
);

export const getToken = createAsyncThunk(
  "user/getTokens",
  async ({ email, password }: SigninFormType) => {
    const tokens = await fetchTokens({ email, password });
    return tokens;
  }
);
type AuthStateType = {
  user: null | User;
  tokens: {
    access: null | string;
    refresh: null | string;
  };
};

const initialState: AuthStateType = {
  user: null,
  tokens: {
    access: null,
    refresh: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens.access = null;
      state.tokens.refresh = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(
        getToken.fulfilled,
        (state, action: PayloadAction<{ access: null; refresh: null }>) => {
          state.tokens.access = action.payload.access;
          state.tokens.refresh = action.payload.refresh;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
