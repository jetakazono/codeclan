"use client"

import { auth } from '@/firebase/firebase';
import React, { ReactHTMLElement, useEffect, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import {changePage, closeAuth} from '@/redux/features/auth-slice'
import {useDispatch} from 'react-redux'
import { AppDispatch } from "@/redux/Store";



type ForgotPasswordProps = {};

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const [email,setEmail] = useState('')
  const dispatch = useDispatch<AppDispatch>()
    

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
  }


  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth)
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {

          const success = await sendPasswordResetEmail(email)
          if (success) {
              toast.success("Password reset email sent! Check inbox for instructions", {position:'top-center',autoClose:2000} )
              dispatch(changePage('login'))
          } 
      }
      catch (error: any) {
          alert(error.message.replace('Firebase: Error ', 'Reset password failed! '))
          
      }
  }
  useEffect(() => {
      if (error) alert(error.message.replace('Firebase: Error ', 'Reset password failed! '))
  }, [error])



  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleResetPassword}>
    <h3 className='text-xl font-medium text-white'>Forgotten your password?</h3>
    <h4 className='text-xs font-medium text-white'>Don't worry, it happens to the best of us... enter your email to get a reset link</h4>
<div>
    <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
        Your Email
    </label>
    <input onChange={handleChange} type="email" name="email" id="email" className="
    border-2 outline-none sm:text-sm rounded-1g focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
    placeholder='nevillelongbottom@rememberall.com'
    />
</div>


<button type="submit" className="w-full text-white focus:ring-blue-300 font-medium rounded-1g
text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">
    Get Reset Link
</button>


</form>)
};
export default ForgotPassword;
