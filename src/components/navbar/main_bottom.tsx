'use client';
// File: src/app/accounts/auths/page.tsx
import React, { useState } from "react";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import NavbarMainDrawer from "./main_drawer";
import { BsMenuButtonWide, BsFillPostcardHeartFill } from "react-icons/bs";
import { RiHomeSmile2Fill } from "react-icons/ri";


// Define simple inline SVG icons instead of importing from external library
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);


export default function BottomNavBar() {
    // Use React hooks to manage state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	// determine if the current user is an employee
	const [, setIsUser] = useState(false);
	const [ isEmployee, setIsEmployee ] = useState(false);
	// Check if the user is an employee (this could be based on user data or role)
	React.useEffect(() => {
		const userData = sessionStorage.getItem("user_data");
		if (userData) {
			setIsUser(true); // Assuming userData contains user info
			const parsedData = JSON.parse(userData);
			if (["employee", "business", "admin"].includes(parsedData.role)) {
				setIsEmployee(true)
			} else {
				setIsEmployee(false)
			}
		} else {
			setIsEmployee(false); // Default to false if no user data
		}
	}, []);

    // Main navigation bar with buttons for Home, Favourites, Menu, and Profile
    return (    
      <nav className=" fixed bottom-0 left-0 right-0 
        h-[80px] flex justify-around items-center z-50 py-2 px-4 mb-2
      ">
					<div className="bg-white/60 backdrop-blur-xs w-full h-full flex justify-around items-center rounded-2xl shadow-md">
						<button
							onClick={() => (window.location.href = "/")}
							className="flex flex-col items-center text-gray-800 text-xs cursor-pointer"
						>
							<RiHomeSmile2Fill size={34} className="mb-1" />
						</button>
						<button
							onClick={() => (window.location.href = "/accounts/members/favorites/")}
							className="flex flex-col items-center text-gray-800 text-xs cursor-pointer"
						>
							<BsFillPostcardHeartFill size={34} className="mb-1 text-red-500" />
						</button>
						<button
							onClick={() => setIsDrawerOpen(true)}
							className="flex flex-col items-center text-gray-800 text-xs cursor-pointer pt-1"
						>
							<BsMenuButtonWide size={30} className="mb-1" />
						</button>
						<button
							onClick={() => (window.location.href = "/accounts/")}
							className="flex flex-col items-center text-gray-800 text-xs cursor-pointer"
						>
							<FaUser size={30} className="mb-1" />
						</button>
              {/* … existing buttons … */}
              {isEmployee && (
                <button
                  onClick={() => (window.location.href = "/accounts/boutiques")}
                  className="flex flex-col items-center text-gray-800 text-xs cursor-pointer"
                >
                  <FaShoppingBag size={30} className="mb-1" />
                </button>
              )}
					</div>

					{/* Backdrop and Drawer */}
					<>
						{/* Backdrop */}
						<div
							className={`
								fixed inset-0 bg-white/20 backdrop-blur-[2px] z-40
								transition-opacity duration-300 ease-in-out
								${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
							`}
							onClick={() => setIsDrawerOpen(false)}
						/>

						{/* Drawer */}
						<aside
							className={`
								fixed top-0 right-0 h-full bg-white/90 backdrop-blur-[2px]
								shadow-lg z-50 p-4 flex flex-col rounded-l-xl w-[80vw] lg:w-[30vw]
								transform transition-transform duration-300 ease-in-out
								${isDrawerOpen ? "translate-x-0" : "translate-x-full"}
							`}
						>
							<div className="flex justify-end">
								<button
									onClick={() => setIsDrawerOpen(false)}
									className="p-2 rounded-md hover:bg-gray-300"
									aria-label="Close menu"
								>
									<XIcon className="h-6 w-6 text-gray-700" />
								</button>
							</div>
							<NavbarMainDrawer />
						</aside>
					</>
      </nav>
    )
}