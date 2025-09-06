'use client';

import React, { useEffect, useState } from 'react';
import NavbarMain from "@/components/navbar/main";
import AccountBottomNavBar from '@/components/navbar/main_bottom';
import MemberAccountDetails from './members/page';

interface User {
	username: string;
	// add other user properties here as needed
}

export default function AccountPage() {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);
	const API_URL = process.env.NEXT_PUBLIC_API_URL;


	useEffect(() => {
		// Store current URL for redirection after login
		if (typeof window !== 'undefined') {
			sessionStorage.setItem("redirection", window.location.href);
			const token = sessionStorage.getItem("access_token");

			if (!token) {
				window.location.href = "/accounts/auths";
				return;
			}

			fetch(`${API_URL}/accounts/users/api/`, {	
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error("Unauthorized");
					}
					return res.json();
				})
				.then((data) => {
					setUser(data);
					sessionStorage.setItem("user_data", JSON.stringify(data));
				})
				.catch((error) => {
					console.error("Error fetching user:", error);
					window.location.href = "/accounts/auths";
				})
				.finally(() => setLoading(false));
		}
	}, []);

	if (loading) return <div className="p-6 text-center text-gray-500">Loading account...</div>;

	return (
		<>
			<NavbarMain />
			<AccountBottomNavBar />
			<div className="container mx-auto p-3 lg:p-6 w-full">
				<h1 className="text-xl font-bold ">Welcome, {user?.username}</h1>
			</div>
			<div className="container mx-auto p-3 lg:p-6 w-full">
				<MemberAccountDetails/>
			</div>
		</>
	);
}
