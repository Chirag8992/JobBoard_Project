import React, { useState, useEffect } from 'react';
import api from './api';

export default function CompanyProfile() {
  const [company, setCompany] = useState({
    companyName: '',
    location: '',
    description: ''
  });

  useEffect(() => {
    async function fetchCompany() {
      try {
        const response = await api.get('/company/name', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          withCredentials: true,
        });
        setCompany({
          companyName: response.data.companyName || '',
          location: response.data.location || '',
          description: response.data.description || ''
        });
      } catch (err) {
        console.error('Failed to load company:', err);
      }
    }

    fetchCompany();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-violet-600 text-white p-4 rounded-t-xl shadow-md">
        <h2 className="text-lg font-semibold">Company Profile</h2>
      </div>

      <div className="bg-white p-6 rounded-b-xl shadow-md max-w-xl mx-auto mt-4">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            TC
          </div>
          <h3 className="text-xl font-bold">{company.companyName}</h3>
          <p className="text-gray-500 text-sm">Leading software development company</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Company Name</label>
            <p className="w-full border rounded-lg px-4 py-2 bg-gray-100">{company.companyName}</p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Location</label>
            <p className="w-full border rounded-lg px-4 py-2 bg-gray-100">{company.location}</p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Description</label>
            <p className="w-full border rounded-lg px-4 py-2 bg-gray-100 whitespace-pre-line">{company.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
