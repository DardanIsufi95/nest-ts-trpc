"use client";

import React from 'react';

import { signIn } from 'next-auth/react';

export default function LoginPage(){
	const handleSubmit = (event: React.MouseEvent<HTMLFormElement , MouseEvent>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		console.log("data", data);
		
		signIn('credentials', {
			username: data.get('username'),
			password: data.get('password'),
			callbackUrl: `${window.location.origin}/`,
		}).then((error) => {
			console.log("errodasdasdasdr", error);
		}).catch((error) => {
			console.log("errodasdasdasdr", error);
		});

	};
  
	return (
		<>
			<form onSubmit={handleSubmit}>
		
				<input name='username' id='email' type='text' autoComplete='email' required />

				<label htmlFor='password'>Password</label>
				<input
					id='password'
					type='password'
					autoComplete='current-password'
					name='password'
					required
				/>	
				<button type='submit'>Sign in</button>
			</form>
			
			
		</>
	);	
  }