"use client"

import React, { useEffect, useState } from 'react';
import {useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useUpdateProfile} from 'react-firebase-hooks/auth'
import {auth} from '@/firebase/firebase'
import {useDispatch} from 'react-redux'
import { AppDispatch } from "@/redux/Store";
import { changePage, closeAuth } from '@/redux/features/auth-slice';

type CreateAccountProps = {};

const CreateAccount: React.FC<CreateAccountProps> = () => {
  //firebase hooks
const [
  createUserWithEmailAndPassword,
  user,
  loading,
  error,
] = useCreateUserWithEmailAndPassword(auth);
const [updateProfile, profileUpdating, profileUpdateError] = useUpdateProfile(auth); 
const [signInWithEmailAndPassword, userLogin, signingIn, signInError] =
    useSignInWithEmailAndPassword(auth);


const dispatch = useDispatch<AppDispatch>()

  const [inputs, setInputs] = useState({email:'',username:'',password:'', confirmPassword: ''})
  

  const handleChangeInputs = (e:React.ChangeEvent<HTMLInputElement>) => {
      setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSignup =  async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      return alert('Your passwords do not match, please fix!')
    }

      try {
        const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if(!newUser) {
            return
      }
      const login = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!login) {
        dispatch(changePage('login'))
        return
      }
        updateProfile({displayName: inputs.username})
        dispatch(closeAuth())
      }
      catch (error:any)
      {
          alert(error.message.replace('Firebase: Error ', 'Failed signup! '))
      }
      
  }

  useEffect(() => {
      if (error) alert(error.message.replace('Firebase: Error ', 'Failed signup! ').replace('Firebase: ', 'Failed signup! '))
  }, [error])
  
  return (
  <form className="space-y-6 px-6 pb-4" onSubmit={handleSignup}>
  <h3 className='text-xl font-medium text-white'>Join the Code Clan!</h3>
<div>
  <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
      Your Email
  </label>
  <input type="email" name="email" id="email" className="
  border-2 outline-none sm:text-sm rounded-1g focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
  bg-gray-600 border-gray-500 placeholder-gray-400 text-white
  "
  placeholder='name@company.com'
  onChange={handleChangeInputs}
  />
</div>
<div>
  <label htmlFor="username" className="text-sm font-medium block mb-2 text-gray-300">
      Your Username
  </label>
  <input type="text" name="username" id="username" className="
  border-2 outline-none sm:text-sm rounded-1g focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
  bg-gray-600 border-gray-500 placeholder-gray-400 text-white
  "
  placeholder='Joe Codes'
  onChange={handleChangeInputs}
  />
</div>
<div>
  <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
      Your Password
  </label>
  <input type="password" name="password" id="password" className="
  border-2 outline-none sm:text-sm rounded-1g focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
  bg-gray-600 border-gray-500 placeholder-gray-400 text-white
  "
  placeholder='Harder-toguess_thanthis1234'
  onChange={handleChangeInputs}
  />
</div>
<div>
  <label htmlFor="confirm-password" className="text-sm font-medium block mb-2 text-gray-300">
      Confirm Password
  </label>
  <input type="password" name="confirmPassword" id="confirm-password" className="
  border-2 outline-none sm:text-sm rounded-1g focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
  bg-gray-600 border-gray-500 placeholder-gray-400 text-white
  "
  placeholder='Harder-toguess_thanthis1234'
  onChange={handleChangeInputs}
  />
</div>

<button type="submit" className="w-full text-white focus:ring-blue-300 font-medium rounded-1g
text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">
  Join the Clan!
</button>
</form>
)
};


export default CreateAccount;
