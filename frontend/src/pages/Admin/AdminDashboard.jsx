import React from 'react';
import { dummyNGOs, dummyDonations, dummyUsers } from '../../data/dummyData';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard = () => {
    // Calculate Stats
    const totalNGOs = dummyNGOs.length;
    const activeNGOs = dummyNGOs.filter(n => n.active).length;
    const totalDonations = dummyDonations.length;
    const pendingDonations = dummyDonations.filter(d => d.status === 'Pending').length;
    const totalDonors = dummyUsers.length;
    const blockedDonors = dummyUsers.filter(u => u.status === 'Blocked').length;

    return (
        
        <div className="ml-[270px] p-6 max-w-[1280px] mx-auto">
            <AdminSidebar />
            <h1 className="text-3xl font-bold mb-2">Dashboard Overview 📊</h1>
            <p className="mb-6 text-gray-700">Welcome back, Admin. Here's a quick summary of the platform's current status.</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-2xl font-bold text-[#00ACC1]">{totalNGOs}</h3>
                    <p className="mt-1 text-gray-700">Total NGOs Registered</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-2xl font-bold text-[#00ACC1]">{activeNGOs}</h3>
                    <p className="mt-1 text-gray-700">Active NGOs</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-2xl font-bold text-[#FF7043]">{totalDonations}</h3>
                    <p className="mt-1 text-gray-700">Total Donations Received</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-2xl font-bold text-[#FF7043]">{pendingDonations}</h3>
                    <p className="mt-1 text-gray-700">Donations Pending Pickup</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-2xl font-bold text-gray-800">{totalDonors}</h3>
                    <p className="mt-1 text-gray-700">Total Registered Donors</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-2xl font-bold text-gray-800">{blockedDonors}</h3>
                    <p className="mt-1 text-gray-700">Blocked Donors</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <button className="bg-[#00ACC1] text-white font-bold px-4 py-2 rounded mr-3 hover:bg-[#009bb3] transition">
                    Add New NGO
                </button>
                <button className="bg-[#FF7043] text-white font-bold px-4 py-2 rounded hover:bg-[#e66030] transition">
                    Review Pending Donations
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
