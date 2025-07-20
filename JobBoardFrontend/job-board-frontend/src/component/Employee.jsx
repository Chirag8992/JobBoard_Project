import { useEffect, useState } from "react";
import {
  Building2,
  PlusCircle,
  FileText,
  LogOut,
  User,
  Briefcase,
  Users,
  Calendar,
  UserCheck,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import {Link} from "react-router-dom"
import api from "./api"

function Employee() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [username , setusername] = useState("chirag")

  const token = localStorage.getItem('token');
  api.get("/employee/name", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    }).then(result=>{
      setusername(result.data)
    })

  useEffect(() => {
    setLoading(true);
    console.log(localStorage.getItem('token'))
    
    if (!token) {
      console.error("No token found");
      setLoading(false);
      return;
    }

    api.get("/application", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    }).then((result) => {
      console.log("API Response:", result); 
      setApplications(result.data || []); 
      setLoading(false);
    }).catch((err) => {
      console.error("Error fetching applications", err);
      setLoading(false);
    });
  }, []);

  const stats = {
    
    applications: applications.length,
    interviews: applications.filter(app => app.status === "Interview").length,
    hires: applications.filter(app => app.status === "hired").length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "reviewed": return "bg-blue-100 text-blue-800";
      case "Interview": return "bg-purple-100 text-purple-800";
      case "hired": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending": return <Clock className="w-4 h-4" />;
      case "reviewed": return <Eye className="w-4 h-4" />;
      case "Interview": return <Users className="w-4 h-4" />;
      case "hired": return <CheckCircle className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-800">HireHub</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/copamnyProfile"
                  onClick={() => setActiveTab("companies")}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <Building2 className="w-5 h-5" />
                  <span>Company Profile </span>
                </Link>
                <Link to="/addJobs"
                  onClick={() => setActiveTab("post-job")}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Post New Job</span>
                </Link>
                <Link to="/Manageapplication"
                  onClick={() => setActiveTab("applications")}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <FileText className="w-5 h-5" />
                  <span>Manage Applications</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/employeeprofile">
              <div className="flex items-center space-x-2 text-gray-600">
                
                  <User className="w-5 h-5" />
                
                <span className="hidden sm:inline">{username}</span>
              </div>
              </Link>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200">
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-3xl font-bold text-blue-600">{stats.activeJobs}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div> */}

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-3xl font-bold text-green-600">{stats.applications}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-3xl font-bold text-purple-600">{stats.interviews}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hires</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.hires}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <UserCheck className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              Recent Applications
            </h2>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading applications...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600">No applications found.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Position
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {getInitials(application.jobSeeker?.name || application.candidateName)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.jobSeeker?.name || application.candidateName || "Unknown"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.job.title || application.jobTitle || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.appliedDate || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status || 'Pending')}`}>
                          {getStatusIcon(application.status || 'Pending')}
                          <span className="ml-1 capitalize">{application.status || 'Pending'}</span>
                        </span>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;