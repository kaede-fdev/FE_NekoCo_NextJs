import { COOKIES_KEY } from "@/utils/cookies/keys";
import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

type User = {
  id: string;
  username: string;
  appUserName: string;
  avatarUrl: string;
  role: string;
};

type AppState = {
  currentUser: User;
};

const initialState: AppState = {
  currentUser: {
    id: "",
    username: "",
    appUserName: "",
    avatarUrl: "",
    role: "USER",
  },
};
const cookiesAge = 7 * 24 * 24 * 60;
export const counterSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.currentUser.username = action.payload.email;
      state.currentUser.id = action.payload.id;
      state.currentUser.appUserName = action.payload.appUserName;
      setCookie(COOKIES_KEY.AccessToken, action.payload.accessToken, {
        maxAge: cookiesAge,
      });
      setCookie(COOKIES_KEY.RefreshToken, action.payload.refreshToken, {
        maxAge: cookiesAge*2,
      });
      setCookie(COOKIES_KEY.UID, action.payload.id, {
        maxAge: cookiesAge*2,
      })
      setCookie(COOKIES_KEY.UName, action.payload.email, {
        maxAge: cookiesAge*2,
      })
    },
  },
});

export const {loginReducer} = counterSlice.actions;
export default counterSlice.reducer;
