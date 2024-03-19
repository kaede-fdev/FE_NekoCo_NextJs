"use client";
import { login } from "@/apis/authAPI";
import { loginReducer } from "@/redux/slices/userInfo";
import { LoginFields } from "@/utils/types/Auth";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function Login() {
  const [loginValues, setLoginValues] = useState<LoginFields>({
    username: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      if (loginValues.username.trim() == "") {
        toast.error("Empty email address!");
        return;
      }
      if (loginValues.password.trim() == "") {
        toast.error("Password must be not empty!");
        return;
      }
      if (loginValues.password && loginValues.username) {
        const res = await login(loginValues);
        dispatch(loginReducer(res.data.body.data));
        toast.success("Login success!");
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == 423) {
          toast.error(error.response.data.message);
        }
      }
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="w-[80%] lg:w-[40%] h-fit p-[20px] rounded-xl bg-[#ffffff1e] flex flex-col gap-[10px]">
        <div className="text-[32px] font-bold text-center w-full">
          <h1>Log In </h1>
          <p className="text-[16px] font-normal">Sign In to the system!</p>
        </div>
        <div className="lg:p-[20px] flex flex-col gap-[20px]">
          <Input
            variant="bordered"
            size="sm"
            type="email"
            label="Email"
            onChange={(event) =>
              setLoginValues({
                ...loginValues,
                username: event.target.value,
              })
            }
          />
          <Input
            variant="bordered"
            size="sm"
            type="password"
            label="Password"
            onChange={(event) =>
              setLoginValues({
                ...loginValues,
                password: event.target.value,
              })
            }
          />
          <Button className="font-bold" onClick={() => handleLogin()}>
            Login{" "}
          </Button>
        </div>
        <div className="lg:px-[20px] flex flex-col">
          <p className="text-[12px] lg:text-[14px]">
            Don't have account?{" "}
            <a href="/auth/register" className="underline underline-offset-2">
              create new account!
            </a>
          </p>
          <p className="text-[12px] lg:text-[14px]">
            Are you forgot your password?{" "}
            <a
              href="/auth/reset_password"
              className="underline underline-offset-2"
            >
              Reset password!
            </a>
          </p>
          <p className="text-[12px] lg:text-[14px]">
            Doesn't verify yet?{" "}
            <a
              href="/auth/resend_email"
              className="underline underline-offset-2"
            >
              resend an email!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
