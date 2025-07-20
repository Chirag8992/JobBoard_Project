import React, { useEffect, useState } from 'react';
import api from './api';

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState({
    name: '',
    username: '',
    email: '',
    company: ''
  });

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await api.get('/employee/object', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          withCredentials: true,
        });
        console.log(response);
        setEmployee({
          name: response.data.name || '',
          username: response.data.username || '',
          email: response.data.email || '',
          company: response.data.company?.companyName || ''
        });
      } catch (err) {
        console.error('Failed to load employee:', err);
      }
    }

    fetchEmployee();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-violet-600 text-white p-4 rounded-t-xl shadow-md">
        <h2 className="text-lg font-semibold">Employee Profile</h2>
      </div>

      <div className="bg-white p-6 rounded-b-xl shadow-md max-w-xl mx-auto mt-4">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            EM
          </div>
          <h3 className="text-xl font-bold">{employee.name}</h3>
          <p className="text-gray-500 text-sm">{employee.company}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Full Name</label>
            <p className="w-full border rounded-lg px-4 py-2 bg-gray-100">{employee.name}</p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Username</label>
            <p className="w-full border rounded-lg px-4 py-2 bg-gray-100">{employee.username}</p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <p className="w-full border rounded-lg px-4 py-2 bg-gray-100">{employee.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
