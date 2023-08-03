'use client';

import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/Store';
import { changePage, closeAuth } from '@/redux/features/auth-slice';
import { useRouter } from 'next/navigation';

type CreateAccountProps = {};

const CreateAccount: React.FC<CreateAccountProps> = () => {
	const { push } = useRouter();
	//firebase hooks
	const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
	const [updateProfile, profileUpdating, profileUpdateError] = useUpdateProfile(auth);
	const [signInWithEmailAndPassword, userLogin, signingIn, signInError] = useSignInWithEmailAndPassword(auth);

	const dispatch = useDispatch<AppDispatch>();

	const [inputs, setInputs] = useState({
		email: '',
		username: '',
		profileURL: '',
		password: '',
		confirmPassword: '',
	});

	const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (inputs.password !== inputs.confirmPassword) {
			return alert('Your passwords do not match, please fix!');
		}

		try {
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser) {
				return;
			}
			const login = await signInWithEmailAndPassword(inputs.email, inputs.password);
			if (!login) {
				dispatch(changePage('login'));
				return;
			}
			if (inputs.profileURL) {
				updateProfile({
					displayName: inputs.username,
					photoURL: inputs.profileURL,
				});
			} else {
				updateProfile({ displayName: inputs.username });
			}
			push('/dashboard');
		} catch (error: any) {
			alert(error.message.replace('Firebase: Error ', 'Failed signup! '));
		}
	};

	useEffect(() => {
		if (error) alert(error.message.replace('Firebase: Error ', 'Failed signup! ').replace('Firebase: ', 'Failed signup! '));
	}, [error]);

	return (
		<form className='Modal-body' onSubmit={handleSignup}>
			<h3 className='Modal-heading'>Join the Code Clan</h3>
			<div className='flex flex-col gap-5'>
				<label className='focus-within:border-grey-100 relative block rounded-md border border-grey-200 w-full'>
					<input
						type='email'
						name='email'
						id='email'
						onChange={handleChangeInputs}
						className='peer w-full border-none bg-transparent p-3 text-sm text-grey-100 placeholder:text-transparent outline-none'
						placeholder='name@company.com'
					/>
					<span className='pointer-events-none absolute start-2 top-0 -translate-y-1/2 rounded bg-grey-300 px-1 text-xs text-grey-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-100'>
						Your Email
					</span>
				</label>

				<label className='focus-within:border-grey-100 relative block rounded-md border border-grey-200 w-full'>
					<input
						type='text'
						name='username'
						id='username'
						className='peer w-full border-none bg-transparent p-3 text-sm text-grey-100 placeholder:text-transparent outline-none'
						placeholder='Joe Codes'
						onChange={handleChangeInputs}
					/>
					<span className='pointer-events-none absolute start-2 top-0 -translate-y-1/2 rounded bg-grey-300 px-1 text-xs text-grey-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-100'>
						Your Username
					</span>
				</label>

				<label className='focus-within:border-grey-100 relative block rounded-md border border-grey-200 w-full'>
					<input
						type='text'
						name='profileURL'
						id='profileURL'
						className='peer w-full border-none bg-transparent p-3 text-sm text-grey-100 placeholder:text-transparent outline-none'
						placeholder='https://photobucket.com/myface.jpg'
						onChange={handleChangeInputs}
					/>
					<span className='pointer-events-none absolute start-2 top-0 -translate-y-1/2 rounded bg-grey-300 px-1 text-xs text-grey-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-100'>
						Your ProfileURL (optional)
					</span>
				</label>

				<label className='focus-within:border-grey-100 relative block rounded-md border border-grey-200 w-full'>
					<input
						type='password'
						name='password'
						id='password'
						className='peer w-full border-none bg-transparent p-3 text-sm text-grey-100 placeholder:text-transparent outline-none'
						placeholder='Harder-toguess_thanthis1234'
						onChange={handleChangeInputs}
					/>
					<span className='pointer-events-none absolute start-2 top-0 -translate-y-1/2 rounded bg-grey-300 px-1 text-xs text-grey-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-100'>
						Your Password
					</span>
				</label>

				<label className='focus-within:border-grey-100 relative block rounded-md border border-grey-200 w-full'>
					<input
						type='password'
						name='confirmPassword'
						id='confirm-password'
						className='peer w-full border-none bg-transparent p-3 text-sm text-grey-100 placeholder:text-transparent outline-none'
						placeholder='Harder-toguess_thanthis1234'
						onChange={handleChangeInputs}
					/>
					<span className='pointer-events-none absolute start-2 top-0 -translate-y-1/2 rounded bg-grey-300 px-1 text-xs text-grey-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-100'>
						Confirm Password
					</span>
				</label>

				<button
					type='submit'
					className='rounded bg-primary px-4 py-2 text-grey-100 hover:bg-opacity-80'>
					Join
				</button>
			</div>
		</form >
	);
};

export default CreateAccount;
