import React, { useState } from "react";
import NGOSidebar from "../../components/NGOSidebar";

const ScheduledPickups = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  const [pickups, setPickups] = useState([
    { id: 1, donor: "Sarita", item: "Clothes", date: "2025-10-01", status: "Pending", pickupPerson: "" },
    { id: 2, donor: "Manish Sharma", item: "Books", date: "2025-10-05", status: "Scheduled", pickupPerson: "" },
    { id: 3, donor: "Vijay Kumar", item: "Food Packets", date: "2025-10-07", status: "Completed", pickupPerson: "" },
  ]);

  // Dummy list of pickup persons
  const pickupPersons = ["Rahul", "Varun", "Pranav"];

  // Temporary selected persons for each row
  const [selectedPersons, setSelectedPersons] = useState({});

  const handleSelectChange = (id, person) => {
    setSelectedPersons((prev) => ({ ...prev, [id]: person }));
  };

  const handleAssign = (id) => {
    const person = selectedPersons[id];
    if (!person) return; 

    const updatedPickups = pickups.map((pickup) =>
      pickup.id === id ? { ...pickup, pickupPerson: person } : pickup
    );
    setPickups(updatedPickups);
    alert(`Assigned ${person} to pickup from ${pickups.find(p => p.id === id).donor}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <NGOSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Scheduled Pickups</h1>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-[#00ACC1] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Donor</th>
                <th className="px-4 py-3 text-left">Item</th>
                <th className="px-4 py-3 text-left">Pickup Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Pickup Person</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pickups.map((pickup) => (
                <tr key={pickup.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{pickup.donor}</td>
                  <td className="px-4 py-3">{pickup.item}</td>
                  <td className="px-4 py-3">{pickup.date}</td>
                  <td className="px-4 py-3">{pickup.status}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <select
                      value={selectedPersons[pickup.id] || ""}
                      onChange={(e) => handleSelectChange(pickup.id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="">Select Person</option>
                      {pickupPersons.map((person, index) => (
                        <option key={index} value={person}>
                          {person}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleAssign(pickup.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                    >
                      Assign
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 cursor-pointer">
                      Mark Done
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduledPickups;
