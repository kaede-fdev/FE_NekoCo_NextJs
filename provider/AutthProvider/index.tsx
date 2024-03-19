import { RegisterFields } from "@/utils/types/Auth";
import axios from "axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { register } from "@/apis/authAPI";
import { COOKIES_KEY } from "@/utils/cookies/keys";

const initialContextValue = {
};
const AuthContext = createContext(initialContextValue);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [refreshTokenValid, setRefreshTokenValid] = useState<boolean>(true);
  const router = useRouter();
  const path = usePathname();
  const isRefreshTokenValid = (): boolean => {
    const refreshToken = getCookie(COOKIES_KEY.RefreshToken);
    if (refreshToken) {
      return true;
    }
    return false;
  };
  const getUserHadBeenLogin = () => {
    const userId = getCookie(COOKIES_KEY.UID);
    if (userId) {
      return userId;
    }
    return null;
  };
  useEffect(() => {
    const checkRefreshTokenValid = () => {
      if (!isRefreshTokenValid()) {
        setRefreshTokenValid(false);
      }
    };
    const checkUserHadBeenLoginBefore = () => {
      const userInfo = getUserHadBeenLogin();
      setUserInfo(userInfo);
    };
    checkRefreshTokenValid();
    checkUserHadBeenLoginBefore();
  }, []);
  const redirectToLoginPage = () => {
    router.push("/auth/login");
  };
  const isPathIgnore = () => {
    if(path.includes('/auth/')) {
        return true;
    } 
    return false;
  }
  const isShouldRedirectToLogin = () => {
    if(!refreshTokenValid && userInfo == null && !isPathIgnore()) {
        return true;
    } return false;
  }
  useEffect(() => {
    if (isShouldRedirectToLogin()) {
      redirectToLoginPage();
    }
  }, [refreshTokenValid, userInfo]);

  const contextValue = {
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
