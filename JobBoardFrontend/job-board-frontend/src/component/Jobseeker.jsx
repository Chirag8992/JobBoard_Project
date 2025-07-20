import React, { useEffect, useState } from 'react';
import { Briefcase, Calendar, Building, User, Bell, Search, Mail, CheckCircle } from 'lucide-react';
import api from './api';
import { Link } from 'react-router-dom';
import ResumeUpload from './addResume';

function JobApplicationDashboard() {
  const [applications, setApplications] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [username, setusername] = useState("");
  const [showResumeUpload, setShowResumeUpload] = useState(false);

  let token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usernameRes = await api.get("/Jobseeker/name", {
          headers: { Authorization: ` Bearer ${token}` },
          withCredentials: true,
        });

        const fetchedUsername = usernameRes.data;
        setusername(fetchedUsername);

        const appsRes = await api.get(`/Jobseeker/${fetchedUsername}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setApplications(appsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const stats = {
    applied: applications.length,
    interviews: applications.filter(app => app.status === 'Interview').length,
    offers: applications.filter(app => app.status === 'Accepted').length
  };

  const filteredApplications = selectedFilter === 'all'
    ? applications
    : applications.filter(app => app.status && app.status.toLowerCase().includes(selectedFilter.toLowerCase()));

  const statusMeta = {
    'Pending': { icon: Mail, color: 'text-yellow-500 bg-yellow-50' },
    'Accepted': { icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    'Rejected': { icon: Briefcase, color: 'text-red-600 bg-red-50' },
    'Interview': { icon: Calendar, color: 'text-blue-600 bg-blue-50' }
  };

  const getStatusBadge = (status) => {
    if (!status) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-gray-400 bg-gray-100">
          <Mail className="w-4 h-4 mr-1" />
          Not Set
        </span>
      );
    }
    
    const meta = statusMeta[status] || {};
    const Icon = meta.icon || Mail;
    const colorClass = meta.color || 'text-gray-400 bg-gray-100';
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass} transition-all duration-200 hover:scale-105`}>
        <Icon className="w-4 h-4 mr-1" />
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">JobTracker</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/Jobpage" className="text-gray-600 hover:text-gray-900 transition-colors">
                Job Search
              </Link>
              <Link to="/jobseekerProfile" className="text-gray-600 hover:text-gray-900 transition-colors">
                Profile
              </Link>
              <button
                onClick={() => setShowResumeUpload(!showResumeUpload)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Resume
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium text-gray-900">{username || 'User'}</div>
                  <div className="text-xs text-gray-500">Job Seeker</div>
                </div>
                <div className="relative">
                  <button className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Resume Upload Section */}
      {showResumeUpload && (
  <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full relative">
      <button
        onClick={() => setShowResumeUpload(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
      >
        ×
      </button>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload Your Resume</h2>
      <ResumeUpload
        onUploadSuccess={(url) => {
          localStorage.setItem("resumeUrl", url);
          setShowResumeUpload(false);
        }}
      />
    </div>
  </div>
)}


      {/* Header */}
      <div className="bg-blue-600 text-white p-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-8 h-8" />
            <h1 className="text-3xl font-bold">My Applications</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-4xl font-bold text-white mb-2">{stats.applied}</div>
              <div className="text-blue-100 font-medium">Applied</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-4xl font-bold text-white mb-2">{stats.interviews}</div>
              <div className="text-blue-100 font-medium">Interviews</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-4xl font-bold text-white mb-2">{stats.offers}</div>
              <div className="text-blue-100 font-medium">Accepted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {['all', 'pending', 'interview', 'accepted', 'rejected'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${selectedFilter === filter
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50 hover:scale-105'
                }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Job Title</th>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Company</th>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Applied Date</th>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((app, index) => (
                  <tr key={app.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group" style={{ animationDelay: `${index * 100}ms` }}>
                    <td className="px-8 py-6">
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {app.job ? app.job.title : 'N/A'}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Building className="w-4 h-4" />
                        {app.job && app.job.company ? app.job.company.companyName : 'N/A'}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {getStatusBadge(app.status)}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg">No applications found for the selected filter.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobApplicationDashboard;