'use client'
import { resendVerifyEmail } from '@/apis/authAPI';
import { Button, Input } from '@nextui-org/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function page() {
    const [email, setEmail] = useState<string>('');
    const router = useRouter();
    const handleResendEmail = async () => {
        try {
            if(email && email.trim() != "" ) {
                await resendVerifyEmail(email);
                toast.success("Resend verify email success!")
                router.push('/auth/login');
            } else {
                toast.error("Enter your email!")
            }
        } catch (error) {
            if(axios.isAxiosError(error)) {
                toast.error(error.response?.data.message)
            }
        }
    }
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-[80%] lg:w-[40%] h-fit p-[20px] bg-[#ffffff1e] rounded-xl flex flex-col gap-[20px]'>
                <div>
                    <h1 className='font-bold text-[24px]'>Resend verify email</h1>
                    <p>Enter your email below:</p>
                </div>
                <div>
                    <Input variant='bordered' radius='sm' type='email' label="Email address" onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div>
                    <Button radius='sm' onClick={() => handleResendEmail()}>Resend</Button>
                </div>
            </div>
        </div>
    )
}

export default page
