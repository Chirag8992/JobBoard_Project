import { useEffect, useState } from "react";
import {
  Search, MapPin, DollarSign, Clock, Building2,
  Bookmark, BookmarkCheck, SlidersHorizontal
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from './api';

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    role: '',
    city: '',
    salary: ''
  });
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    api.get("/job", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    })
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const applyForJob = async (jobId) => {
    let resumeUrl = localStorage.getItem('resumeUrl');

    if (!resumeUrl || resumeUrl.trim() === '') {
      try {
        const usernameRes = await api.get("/Jobseeker/name", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const username = usernameRes.data;

        const jsRes = await api.get(`/Jobseeker/${username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        resumeUrl = jsRes.data.resumeUrl;
        if (resumeUrl) localStorage.setItem('resumeUrl', resumeUrl);
      } catch (err) {
        console.error("Error checking resume:", err);
      }
    }

    if (!resumeUrl || resumeUrl.trim() === '') {
      alert("⚠️ Please upload your resume before applying.");
      navigate("/jobseekerProfile#resume");
      return;
    }

    try {
      // const usernameRes = await api.get("/Jobseeker/name", {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      // const username = usernameRes.data;

      const jsRes = await api.get(`/Jobseeker/object`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const jobSeeker = jsRes.data;
      const job = jobs.find(j => j.jobId === jobId);

    if (!job) {
      alert("❌ Job not found!");
      return;
    }
      await api.post('/application', {
        job,
        jobSeeker,
        resumeUrl
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Applied successfully!");
    } catch (err) {
      console.error("Error applying:", err);
      alert("❌ Failed to apply.");
    }
  };

  const handleSearch = () => {
    const filtered = jobs.filter(job => {
      const roleMatch = !searchFilters.role ||
        job.title.toLowerCase().includes(searchFilters.role.toLowerCase());
      const cityMatch = !searchFilters.city ||
        job.location.toLowerCase().includes(searchFilters.city.toLowerCase());
      const salaryMatch = !searchFilters.salary ||
        job.salary.toLowerCase().includes(searchFilters.salary.toLowerCase());

      return roleMatch && cityMatch && salaryMatch;
    });
    setFilteredJobs(filtered);
  };

  const handleInputChange = (field, value) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }));
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const clearFilters = () => {
    setSearchFilters({ role: '', city: '', salary: '' });
    setFilteredJobs(jobs);
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
            <p className="text-lg text-gray-600">Discover opportunities that match your skills and aspirations</p>
          </div>

          {/* Search */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title"
                  value={searchFilters.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={searchFilters.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Salary"
                  value={searchFilters.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Search Jobs
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Job Listing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {!loading && filteredJobs.map(job => (
              <div key={job.jobId} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <Building2 className="w-4 h-4 mr-1" />
                      {job.company?.companyName}
                    </p>
                  </div>
                  <button onClick={() => toggleSaveJob(job.jobId)}>
                    {savedJobs.has(job.jobId) ? (
                      <BookmarkCheck className="text-blue-600" />
                    ) : (
                      <Bookmark className="text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-700 mb-2">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.requirements &&
                    job.requirements
                      .split(',')
                      .map((req, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                        >
                          {req.trim()}
                        </span>
                      ))}
                </div>
                <div className="text-sm text-gray-600 flex flex-wrap justify-between">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {getTimeAgo(job.createdAt || job.updatedAt || new Date())}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => applyForJob(job.jobId)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Apply Now
                  </button>
                  <span className="text-xs text-gray-500">
                    Posted by: {job.employee?.name || "HR"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {!loading && filteredJobs.length === 0 && (
            <p className="text-center text-gray-600 mt-10">No jobs found. Try different filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobPage;
