'use client';
import React, { useState } from 'react';

const FormLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/token/api/`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful!');
        console.log('JWT:', result.access);
        // Optionally: store token in localStorage or context
        sessionStorage.setItem('access_token', result.access);
        sessionStorage.setItem('refresh_token', result.refresh);
        // Redirect to another page in sessionStorage
        const redirection = sessionStorage.getItem('redirection');
        if (redirection) {
          window.location.href = redirection;
        }
      } else {
        alert('Login failed: ' + JSON.stringify(result));
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Network error.');
    }
  };

  return (
    <div className="">
      <div className="">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
