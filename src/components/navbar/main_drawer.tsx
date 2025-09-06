import React from 'react'

const NavbarMainDrawer = () => {
  return (
    <>
			<nav className="mt-6 flex flex-col space-y-4">
					<a href="/accounts" className="text-gray-800 hover:bg-white rounded p-2" >
						Profile
					</a>
					Boutique
					<div className="text-gray-800 bg-gray-100 rounded p-2 mt-1">
						<button
							type="button"
							className="text-gray-800 hover:bg-white rounded p-2 w-full text-left"
						>
							Accessories
						</button>
						<button
							type="button"
							className="text-gray-800 hover:bg-white rounded p-2 w-full text-left"
						>
							One-Pieces
						</button>
						<button
							type="button"
							className="text-gray-800 hover:bg-white rounded p-2 w-full text-left"
						>
							Tops & Outerwear
						</button>
						<button
							type="button"
							className="text-gray-800 hover:bg-white rounded p-2 w-full text-left"
						>
							Bottoms
						</button>
					</div>
					<a href="/about" className="text-gray-800 hover:bg-white rounded p-2">
						About Udamma ?
					</a>
					<a href="/settings" className="text-gray-800 hover:bg-white rounded p-2">
						Settings
					</a>
					<a href="" className="text-red-500 hover:bg-white rounded p-2"
					 onClick={() => { sessionStorage.removeItem('access_token');
						 			sessionStorage.removeItem('refresh_token');
									sessionStorage.removeItem('user_data');}
					}>
						Logout
					</a>
			</nav>
    </>
  )
}

export default NavbarMainDrawer