import axios from "axios";
import axiosClient from '../utils/axiosClient'
import { LoginFields, RegisterFields} from "@/utils/types/Auth";

export const END_POINT = {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "auth/logout",
    RESEND_VERIFY: "/email/resendVerifyEmail?email="
}

export const register = (value:RegisterFields) => {
    return axiosClient.post(END_POINT.REGISTER, value);
}
export const login = (value:LoginFields) => {
    return axiosClient.post(END_POINT.LOGIN, value);
}
export const resendVerifyEmail = (value:string) => {
    return axiosClient.patch(END_POINT.RESEND_VERIFY+`${value}`);
}