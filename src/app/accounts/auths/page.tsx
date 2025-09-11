'use client';
import NavbarMain from '@/components/navbar/main';
import React from 'react';
import FormLogin from './login';
import FormUserRegistration from './registration/users';

const AccountAuth = () => {
  const [showLogin, setShowLogin] = React.useState(true);
  const [showRegistration, setShowRegistration] = React.useState(false);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  const [showResetPassword, setShowResetPassword] = React.useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = React.useState(false);
  const [showVerifyPhone, setShowVerifyPhone] = React.useState(false);

  return (
    <div className='text-gray-800 bg-gray-50 min-h-screen'>
        <NavbarMain />
        <div className='container mx-auto p-3 lg:p-6 w-full '>
          {showLogin && (
            <div className='flex flex-col items-center justify-center w-full'>
              <div className="w-full max-w-md p-4 bg-gray-100 shadow-xl rounded-lg ">
                <FormLogin />
                <p className='flex  gap-2 mt-3 text-gray-500 items-center justify-center text-md'>
                  <span className='text-gray-500'> Don&apos;t have an account?</span>
                  <span className='font-bold text-blue-500 hover:text-blue-700 cursor-pointer'
                    onClick={() => { setShowLogin(false); setShowRegistration(true); setShowForgotPassword(false);
                      setShowResetPassword(false); setShowVerifyEmail(false); setShowVerifyPhone(false); }}
                  >
                    Sign up
                  </span> 
                </p>
                <p className='flex gap-2 text-gray-500 items-center justify-center text-md'>
                  <span className='text-gray-500'> Forgot your password?</span>
                  <span className='font-bold text-blue-500 hover:text-blue-700 cursor-pointer'
                    onClick={() => { setShowLogin(false); setShowRegistration(false); setShowForgotPassword(true);
                      setShowResetPassword(false); setShowVerifyEmail(false); setShowVerifyPhone(false); }}
                  >
                    Reset it
                  </span> 
                </p>
              </div>
            </div>
          )}
          {showRegistration && (
            <div className="flex flex-col gap-4 bg-gray-100 p-4 mb-3 rounded-lg shadow-md">
              <FormUserRegistration />
              <p className="flex gap-2 text-gray-500 items-center justify-center text-md">
                <span className="text-gray-500">Already have an account?</span>
                <span
                  className="font-bold text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => { setShowLogin(true); setShowRegistration(false); }}
                >
                  Login
                </span>
                
              </p>
            </div>
          )}
          {showForgotPassword && (
            <div className="flex flex-col gap-4 bg-gray-100 p-4 mb-3 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">Forgot Password</h2>
              {/* Add your forgot password form here */}
              <p className="flex flex-wrap gap-1 text-gray-500">
                <span className="text-gray-500">|| Remembered your password?</span>
                <span
                  className="font-bold text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => { setShowLogin(true); setShowForgotPassword(false); }}
                >
                  Click here
                </span>
                to login
              </p>
            </div>
          )}
          {showResetPassword && (
            <div className="flex flex-col gap-4 bg-gray-100 p-4 mb-3 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">Reset Password</h2>
              {/* Add your reset password form here */}
            </div>
          )}
          {showVerifyEmail && (
            <div className="flex flex-col gap-4 bg-gray-100 p-4 mb-3 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">Verify Email</h2>
              {/* Add your verify email form here */}
            </div>
          )}
          {showVerifyPhone && (
            <div className="flex flex-col gap-4 bg-gray-100 p-4 mb-3 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">Verify Phone</h2>
              {/* Add your verify phone form here */}
            </div>
          )}
        </div>
    </div>
  )
}

export default AccountAuth;