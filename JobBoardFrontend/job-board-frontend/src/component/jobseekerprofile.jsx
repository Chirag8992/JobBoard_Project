import React, { useEffect, useState } from 'react';
import api from './api';

export default function JobseekerProfile() {
  const [jobseeker, setJobseeker] = useState({
    name: '',
    email: '',
    skills: '',
    resumeLink: ''
  });

  useEffect(() => {
    async function fetchJobseeker() {
      try {
        const response = await api.get('/Jobseeker/object', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          withCredentials: true,
        });
        console.log(response)
        setJobseeker({
          name: response.data.name || '',
          email: response.data.email || '',
          skills: response.data.skills || '',
          
          resumeLink:response.data.resumeURL || ''
        });
      }catch (err) {
        console.error('Failed to load jobseeker:', err);
      }
    }

    fetchJobseeker();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-violet-600 text-white p-4 rounded-t-xl shadow-md">
        <h2 className="text-lg font-semibold">Jobseeker Profile</h2>
      </div>

      <div className="bg-white p-6 rounded-b-xl shadow-md max-w-xl mx-auto mt-4">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
            JS
          </div>
          <h3 className="text-xl font-bold">{jobseeker.name}</h3>
          <p className="text-gray-500 text-sm">Aspiring Frontend Developer</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Full Name</label>
            <p className="w-full border rounded-lg px-4 py-2 bg-gray-100">{jobseeker.name}</p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <p className="w-full border rounded-lg px-4 py-2 bg-gray-100">{jobseeker.email}</p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Skills</label>
            <p className="w-full border rounded-lg px-4 py-2 bg-gray-100">{jobseeker.skills}</p>
          </div>

          

          <div>
            <label className="text-sm font-medium block mb-1">Resume Link</label>
            <a
              href={jobseeker.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:underline break-all"
            >
              {jobseeker.resumeLink}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
