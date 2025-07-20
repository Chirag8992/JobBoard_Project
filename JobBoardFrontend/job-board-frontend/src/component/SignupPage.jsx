import React, { useState } from 'react';
import {Link } from "react-router-dom"
import api from './api'

export default function SignupForm() {

  const [formData, setFormData] = useState({
    name: '',
    username:'',
    email: '',
    password: '',
    role: 'Job Seeker'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      let res;
      if(formData.role=== 'Employer'){
         res = await api.post('register/employee', formData)
      }
      else{
         res = await api.post('register/Jobseeker',formData)
      }
      console.log('Form submitted:', formData , " responce " , res);
    }catch(error){
        console.error('Error :' ,error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md min-h-[500px]"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up for JobHub</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input 
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="JohnDoe123"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">I want to</label>
          <select 
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Job Seeker">Find Jobs (Job Seeker)</option>
            <option value="Employer">Post Jobs (Employer)</option>
          </select>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account? <Link to="/LoginPage" className="text-blue-600 hover:underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}
