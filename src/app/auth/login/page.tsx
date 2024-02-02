"use client";
import { useRouter } from 'next/navigation'
import React from 'react';
import {api} from "~/trpc/react";



export default function LoginPage() {
	const router = useRouter();
	const [error , setError] = React.useState<string | null>(null);


	const loginMutation = api.auth.login.useMutation();

	
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	
		event.preventDefault();
		const data = new FormData(event.currentTarget);
	
		loginMutation.mutate({
			username: data.get("username") as string,
			password: data.get("password") as string
		},{
			onSuccess: (data) => {
				console.log("success", data);
				if(data.success){
						
					router.replace("/");
				}
			},
			onError: (error) => {
				console.log("error", error);
				setError("Login failed");
			}
		})
	};
	return (
		<>	
			{error ? (
				<div>{error}</div>
			) : null}
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