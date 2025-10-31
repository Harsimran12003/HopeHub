import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar"; // adjust import path
import { dummyDonations, dummyNGOs } from "../../data/dummyData";

const getNgoName = (id) => {
  const ngo = dummyNGOs.find((n) => n.id === id);
  return ngo ? ngo.name : "Unassigned";
};

const ManageDonations = () => {
  const [donations, setDonations] = useState(dummyDonations);

  // Dummy assign function
  const assignDonation = (donationId) => {
    const availableNGO = dummyNGOs.find((n) => n.active);
    if (availableNGO) {
      setDonations(
        donations.map((d) =>
          d.id === donationId
            ? {
                ...d,
                assignedNGOId: availableNGO.id,
                status: "In-progress",
              }
            : d
        )
      );
      alert(
        `Donation ${donationId} assigned to ${availableNGO.name}. Status updated to In-progress.`
      );
    } else {
      alert("No active NGOs to assign.");
    }
  };

  // Dummy update function
  const updateStatus = (donationId, newStatus) => {
    setDonations(
      donations.map((d) =>
        d.id === donationId ? { ...d, status: newStatus } : d
      )
    );
    alert(`Status for donation ${donationId} updated to ${newStatus}.`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar currentView="donations" onViewChange={() => {}} />

      {/* Main content */}
      <div className="flex-1 ml-[250px] p-8 transition-all">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Donation Management 📦
        </h1>

        {/* Header Section */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-700">
            View All Donations
          </h2>
          <div className="text-sm text-gray-500">
            Total Donations:{" "}
            <span className="font-semibold text-[#00ACC1]">
              {donations.length}
            </span>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-6 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-[#00ACC1] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Item</th>
                <th className="py-3 px-4 text-left">Donor Name</th>
                <th className="py-3 px-4 text-left">Pickup Location</th>
                <th className="py-3 px-4 text-left">Assigned NGO</th>
                <th className="py-3 px-4 text-left">Status</th>
                
              </tr>
            </thead>
            <tbody>
              {donations.map((d, index) => (
                <tr
                  key={d.id}
                  className={`border-b hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {d.item}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{d.donorName}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {d.pickupLocation}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {getNgoName(d.assignedNGOId)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        d.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : d.status === "In-progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  
                    
                      
                    
                  
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {donations.length === 0 && (
            <div className="text-center py-6 text-gray-500 italic">
              No donations available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageDonations;
