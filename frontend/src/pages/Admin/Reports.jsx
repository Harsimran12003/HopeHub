import React, { useState } from 'react';
import { adminProfile } from '../../data/dummyData';
import AdminSidebar from '../../components/AdminSidebar';

const Reports = () => {
  const [profile, setProfile] = useState(adminProfile);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert(`Simulating profile update for email: ${profile.email}`);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert(' Passwords do not match!');
      return;
    }
    if (newPassword.length < 6) {
      alert('⚠️ Password must be at least 6 characters long.');
      return;
    }
    alert(' Password changed successfully (simulated).');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex min-h-screen bg-[#f9fafb] text-gray-800">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main
        className="flex-1 p-8 overflow-y-auto transition-all duration-300"
        style={{ marginLeft: '260px' }} // matches sidebar width
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-[#00ACC1] mb-2">
            Admin Settings 
          </h1>
          <p className="text-gray-600 mb-8">
            Manage your profile details and update your password securely.
          </p>

          {/* Profile Information Card */}
          <section
            className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-[#00ACC1] mb-4">
              Profile Information
            </h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={profile.username}
                  disabled
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 cursor-not-allowed"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#00ACC1] text-white px-5 py-2 rounded-lg hover:bg-[#0092a7] transition-colors"
              >
                Update Profile
              </button>
            </form>
          </section>

          {/* Password Change Card */}
          <section
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-[#FF7043] mb-4">
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF7043]"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF7043]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#FF7043] text-white px-5 py-2 rounded-lg hover:bg-[#e66035] transition-colors"
              >
                Change Password
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Reports;
