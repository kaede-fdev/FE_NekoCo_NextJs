"use client";
import { register } from "@/apis/authAPI";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import MeowCoLogo from "@/assets/logo/MeowCoLogo.png";
import Image from "next/image";
import { useAuth } from "@/provider/AutthProvider";
import { RegisterFields } from "@/utils/types/Auth";
import { useTheme } from "next-themes";
import GoogleLogo from "@/assets/logo/GoogleLogo.png";
import FacebookLogo from "@/assets/logo/FacebookLogo.png";
import toast from "react-hot-toast";

type RegisterValue = {
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
  }, []);
  const [registerValue, setRegisterValue] = useState<RegisterValue>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const validateEmail = (value:any) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validatePassword = (value:any) => value.match(/^(?=.*[a-z])(?=.*[!@#?])[A-Za-z!@#?.0-9]{8,100}$/);
  
  const isInvalidEmail = React.useMemo(() => {
    if(registerValue.email === "") return false;
    return validateEmail(registerValue.email) ? false : true;
  }, [registerValue.email]);
  const isValidPassword = React.useMemo(() => {
    if(registerValue.password ==="") return false;
    return validatePassword(registerValue.password) ? false : true;
  }, [registerValue.password])

  const handleRegisterNewUser = async () => {
    try {
      if(isInvalidEmail) return;
      if(isValidPassword) return;
      if(registerValue.password === registerValue.confirmPassword) {
        const registerFields:RegisterFields = {
          email: registerValue.email,
          password: registerValue.confirmPassword,
          userRole: "USER"
        }
        await register(registerFields);
        toast.success("Register success! Check your email to verify!")
        router.push('/auth/login');
      }
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.status == 302) router.push("/auth/login")
        toast.error("Register process failed!")
      }
    }
  };

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center bg-black">
      <div className="w-[80%] lg:w-[46%] h-fit p-[20px] rounded-xl bg-[#ffffff1e] flex lg:flex-row flex-col-reverse">
        <div className="lg:w-[50%] flex flex-col gap-[10px]">
          <div className="text-center">
            <h1 className="text-[32px] text-white font-bold">Sign In</h1>
            <p className="text-white">Create your new account!</p>
          </div>
          <div className="w-full lg:p-[20px] flex gap-4 flex-col">
            <Input
              value={registerValue.email}
              variant="bordered"
              type="email"
              label="Email"
              size="sm"
              isInvalid={isInvalidEmail}
              color={isInvalidEmail ? "danger" : "default"}
              errorMessage={isInvalidEmail && "Please enter a valid email!"}
              onChange={(event) => setRegisterValue({
                ...registerValue,
                email: event.target.value
              })}
            ></Input>
            <Input
              value={registerValue.password}
              variant="bordered"
              type="password"
              label="Password"
              size="sm"
              isInvalid={isValidPassword}
              color={isValidPassword ? "danger" : "default"}
              errorMessage={isValidPassword && "Please enter a strong password!"}
              onChange={(event) => setRegisterValue({
                ...registerValue,
                password: event.target.value
              })}
            ></Input>
            <Input
              variant="bordered"
              type="password"
              label="Confirm password"
              size="sm"
              onChange={(event) => setRegisterValue({
                ...registerValue,
                confirmPassword: event.target.value
              })}
            ></Input>
            <div className="flex flex-row items-center justify-center gap-[20px]">
              <Button className="font-bold lg:hidden" radius="sm" onClick={() => router.push('/auth/login')}>Log In</Button>
              <Button className="font-bold" radius="sm" onClick={() => handleRegisterNewUser()}>Register</Button>
            </div>
          </div>
        </div>

        <div className="lg:w-[50%] flex justify-center items-center text-center whitespace-break-spaces gap-[1px] flex-col text-white">
          <Image
            src={MeowCoLogo}
            width={400}
            height={400}
            className="w-[100px] h-[100px] rounded-[50%] object-cover overflow-hidden"
            alt="Logo"
          />
          <div className="flex flex-col gap-[20px]  items-center">
            <p className="text-[16px] lg:p-[14px]">
              Find friends and build more relationships at MeowCo, enjoy your
              time!
            </p>
            <Button
              radius="sm"
              variant="ghost"
              className="w-[120px] font-bold hidden lg:block"
              onClick={() => router.push("/auth/login")}
            >
              Log In Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
