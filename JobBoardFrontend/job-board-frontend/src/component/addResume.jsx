import React, { useState, useEffect } from 'react';
import api from './api';

export default function ResumeUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const storedUrl = localStorage.getItem('resumeUrl');
    if (storedUrl) {
      setResumeUrl(storedUrl);
    } else {
      setShowUpload(true);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should not exceed 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const response = await api.post('/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const uploadedUrl = response.data;
      localStorage.setItem('resumeUrl', uploadedUrl);
      setResumeUrl(uploadedUrl);
      setShowUpload(false);
      onUploadSuccess(uploadedUrl);
      alert('Resume uploaded!');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleChangeResume = () => {
    setShowUpload(true);
    setFile(null);
  };

  const renderPreview = () => {
  if (resumeUrl.endsWith('.pdf')) {
    return (
     
      <div className="space-y-2">
        <a
          href={`http://localhost:8080${resumeUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View PDF Resume
        </a>
        <p className="text-sm text-gray-600">PDF will open in a new tab</p>
      </div>
      
    );
  }
  return (
    <a
      href={`http://localhost:8080${resumeUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      View / Download Resume
    </a>
  );
};

  return (
    <div className="p-4 border rounded bg-white shadow space-y-4">
      {resumeUrl && !showUpload ? (
        <div>
          <p className="text-green-700 font-medium">Resume Uploaded:</p>
          {renderPreview()}
          <button
            onClick={handleChangeResume}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Change Resume
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </div>
      )}
    </div>
  );
}
