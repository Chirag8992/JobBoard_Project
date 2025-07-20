import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Building,
  Clock,
  FileText
} from 'lucide-react';
import api from './api';

export default function AddJob() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    companyId: ''
  });

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch companies from backend
    api.get('/company',{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    })
      .then(res => setCompanies(res.data))
      .catch(err => {
        console.error('Error fetching companies:', err);
        alert("Failed to load companies");
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const combinedSalary = `${formData.salaryMin} - ${formData.salaryMax}`;

    const payload = {
      title: formData.title,
      location: formData.location,
      salary: combinedSalary,
      type: formData.type,
      description: formData.description,
      requirements: formData.requirements,
      company: { companyId: formData.companyId }
    };

    console.log('Submitting Job:', payload);

    api.post('/job', payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      withCredentials: true
    }).then(res => {
      alert("Job posted successfully");
    }).catch(err => {
      console.error(err);
      alert("Failed to post job");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Post New Job</h1>
          </div>
        </div>

        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <Briefcase className="text-blue-600" /> Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Backend Developer"
                className="w-full mt-1 px-4 py-3 border rounded-xl"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <Clock className="text-blue-600" /> Job Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl bg-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                  <DollarSign className="text-green-600" /> Min Salary
                </label>
                <input
                  type="text"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleInputChange}
                  placeholder="e.g. 50000"
                  className="w-full mt-1 px-4 py-3 border rounded-xl"
                />
              </div>
              <div>
                <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                  <DollarSign className="text-green-600" /> Max Salary
                </label>
                <input
                  type="text"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleInputChange}
                  placeholder="e.g. 90000"
                  className="w-full mt-1 px-4 py-3 border rounded-xl"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="text-red-600" /> Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. Mumbai"
                className="w-full mt-1 px-4 py-3 border rounded-xl"
              />
            </div>

            {/* Company Selection */}
            <div>
              <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <Building className="text-blue-600" /> Company
              </label>
              <select
                name="companyId"
                value={formData.companyId}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl bg-white text-black"
                required
              >
                <option value="" className='text-black'>Select Company</option>
                {companies.map((company) => (
                  <option key={company.companyId} value={company.companyId}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <FileText className="text-purple-600" /> Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                placeholder="Write a detailed job description..."
                className="w-full mt-1 px-4 py-3 border rounded-xl"
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <FileText className="text-purple-600" /> Requirements
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={4}
                placeholder="List the requirements..."
                className="w-full mt-1 px-4 py-3 border rounded-xl"
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Post Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
