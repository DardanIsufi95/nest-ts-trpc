"use client"
import React from 'react';

import { signIn } from '~/server/auth/auth';
const handleSubmit = (event: React.MouseEvent<HTMLFormElement , MouseEvent>) => {
	"use server"
	event.preventDefault();
	const data = new FormData(event.currentTarget);

	console.log("data", data);
	
	signIn('credentials', {
		username: data.get('username'),
		password: data.get('password'),
		callbackUrl: `${window.location.origin}/`,
	}).then((res) => {
		console.log("res", res);
	}).catch((error) => {
		console.log("error", error);
	});

};

export default function LoginPage(){
	
  
	return (
		<>
			<form action={handleSubmit}>
		
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