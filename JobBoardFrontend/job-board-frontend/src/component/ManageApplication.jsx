import React, { useState, useEffect } from 'react';
import {
  BadgeCheck,
  UserMinus,
  FileText,
  CalendarCheck
} from 'lucide-react';
import api from './api';

export default function ManageApplications() {
  const [activeTab, setActiveTab] = useState('All');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({}); // Track loading state for individual actions

  const tabs = [
    { label: 'All' },
    { label: 'Pending' },
    { label: 'Accepted' },
    { label: 'Rejected' },
  ];

  const handleTabClick = (label) => setActiveTab(label);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await api.get('/applications', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          withCredentials: true,
        });
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  // Function to handle shortlisting application
  const handleShortlistApplication = async (applicationId) => {
    try {
      // Set loading state for this specific application
      setActionLoading(prev => ({ ...prev, [applicationId]: 'shortlisting' }));

      // Get employeeId from localStorage or context (adjust according to your auth system)
      const employeeId = localStorage.getItem('employeeId') || '1'; // Replace with actual employee ID

      console.log(localStorage.getItem('token'))
      // Make API call to shortlist the application
      const response = await api.post(
        `/${applicationId}/shortlist`,{},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          withCredentials: true,
        }
      );

      // Update the application status in the local state
      setApplications(prevApps =>
        prevApps.map(app =>
          app.id === applicationId
            ? { ...app, status: 'Accepted' }
            : app
        )
      );

      // Show success message (you can use a toast library or alert)
      alert('Application shortlisted successfully! Email notification sent to the job seeker.');

    } catch (error) {
      console.error('Error shortlisting application:', error);
      alert('Failed to shortlist application. Please try again.');
    } finally {
      // Remove loading state
      setActionLoading(prev => {
        const newState = { ...prev };
        delete newState[applicationId];
        return newState;
      });
    }
  };

  // Function to handle rejecting application
  const handleRejectApplication = async (applicationId) => {
    try {
      setActionLoading(prev => ({ ...prev, [applicationId]: 'rejecting' }));

      const employeeId = localStorage.getItem('employeeId') || '1';

      // You'll need to create a similar endpoint for rejection in your backend
      const response = await api.post(
        `/applications/${applicationId}/reject?employeeId=${employeeId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          withCredentials: true,
        }
      );

      setApplications(prevApps =>
        prevApps.map(app =>
          app.id === applicationId
            ? { ...app, status: 'Rejected' }
            : app
        )
      );

      alert('Application rejected successfully!');

    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Failed to reject application. Please try again.');
    } finally {
      setActionLoading(prev => {
        const newState = { ...prev };
        delete newState[applicationId];
        return newState;
      });
    }
  };

  const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Accepted: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  const filteredApplications =
    activeTab === 'All'
      ? applications
      : applications.filter((app) => app.status === activeTab);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-violet-600 text-white p-4 rounded-t-xl shadow-md">
        <h2 className="text-lg font-semibold">Manage Applications</h2>
      </div>

      <div className="bg-white p-6 rounded-b-xl shadow-md">
        <h3 className="text-xl font-bold mb-4">
          Applications{' '}
          <span className="text-sm text-gray-500">
            ({filteredApplications.length} shown)
          </span>
        </h3>

        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`px-4 py-1.5 rounded-full border font-medium text-sm transition-all duration-200 ${activeTab === tab.label
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              onClick={() => handleTabClick(tab.label)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-500">Loading applications...</p>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="text-lg font-semibold">{app.jobSeeker?.name ?? 'Unknown Seeker'}</h4>
                    <p className="text-sm text-gray-500">
                      {app.job?.title ?? 'Unknown Job'} at {app.job?.company?.companyName ?? 'Unknown Company'}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[app.status] || 'bg-gray-200 text-gray-700'}`}
                  >
                    {app.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-1">
                  Applied on {new Date(app.appliedDate).toLocaleDateString()}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {app.status === 'Pending' && (
                    <>
                      <button 
                        onClick={() => handleShortlistApplication(app.id)}
                        disabled={actionLoading[app.id] === 'shortlisting'}
                        className={`flex items-center gap-1 px-3 py-1.5 text-sm text-white rounded-full transition-colors ${
                          actionLoading[app.id] === 'shortlisting' 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        <BadgeCheck size={16} /> 
                        {actionLoading[app.id] === 'shortlisting' ? 'Shortlisting...' : 'Shortlist'}
                      </button>
                      
                      <button 
                        onClick={() => handleRejectApplication(app.id)}
                        disabled={actionLoading[app.id] === 'rejecting'}
                        className={`flex items-center gap-1 px-3 py-1.5 text-sm text-white rounded-full transition-colors ${
                          actionLoading[app.id] === 'rejecting' 
                            ? 'bg-red-400 cursor-not-allowed' 
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                      >
                        <UserMinus size={16} /> 
                        {actionLoading[app.id] === 'rejecting' ? 'Rejecting...' : 'Reject'}
                      </button>
                      
                      <a
                        href={`http://localhost:8080${app.resumeUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                      >
                        <FileText size={16} /> View Resume
                      </a>
                    </>
                  )}

                  {app.status === 'Accepted' && (
                    <>
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                      >
                        <FileText size={16} /> View Resume
                      </a>
                    </>
                  )}

                  {app.status === 'Rejected' && (
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                    >
                      <FileText size={16} /> View Resume
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}