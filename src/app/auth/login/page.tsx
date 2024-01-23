"use client";

import React from 'react';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import { signIn } from 'next-auth/react';

export default function LoginPage(){
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);


		
		signIn('credentials', {
			username: data.get('email'),
			password: data.get('password'),
			callbackUrl: `${window.location.origin}/`,
		});

	};
  
	return (
	<Container component="main" maxWidth="xs">
		<Box
		  sx={{
			marginTop: 8,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		  }}
		>
		  	<Typography component="h1" variant="h5">
				Sign in
		  	</Typography>
		  	<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
				Sign In
				</Button>
		  	</Box>
		</Box>
	</Container>
	);
  }