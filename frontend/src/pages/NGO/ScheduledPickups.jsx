import React, { useState, useEffect } from "react";
import NGOSidebar from "../../components/NGOSidebar";
import {
  getApprovedDonations,
  updateDonationStatus,
} from "../../services/donationService";

const ScheduledPickups = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const [pickups, setPickups] = useState([]);
  const [pickupPersons, setPickupPersons] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getApprovedDonations();
        setPickups(data);
      } catch (error) {
        console.error("Error fetching pickups:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const handleAssign = async (id) => {
    const person = pickupPersons[id];
    if (!person) return alert("Please enter a pickup person name");

    try {
      await updateDonationStatus(id, {
        pickupPerson: person,
        status: "Scheduled",
      });
      setPickups((prev) =>
        prev.map((p) =>
          p._id === id
            ? { ...p, pickupPerson: person, status: "Scheduled" }
            : p
        )
      );
      alert(`Assigned ${person} successfully`);
    } catch (error) {
      console.error("Error assigning person:", error);
    }
  };

  const handleMarkDone = async (id) => {
    try {
      await updateDonationStatus(id, { status: "Completed" });
      setPickups((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status: "Completed" } : p
        )
      );
    } catch (error) {
      console.error("Error marking done:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading pickups...
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <NGOSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-x-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center md:text-left">
          Scheduled Pickups
        </h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full border-collapse text-xs sm:text-sm md:text-base">
            <thead className="bg-[#00ACC1] text-white">
              <tr className="text-left">
                <th className="px-2 sm:px-4 py-3">Donor</th>
                <th className="px-2 sm:px-4 py-3">Item(s)</th>
                <th className="px-2 sm:px-4 py-3">Pickup Date</th>
                <th className="px-2 sm:px-4 py-3">Status</th>
                <th className="px-2 sm:px-4 py-3">Pickup Person</th>
                <th className="px-2 sm:px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {pickups.map((pickup) => (
                <tr
                  key={pickup._id}
                  className="border-b hover:bg-gray-50 transition text-gray-800"
                >
                  {/* Donor */}
                  <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                    {pickup.name}
                  </td>

                  {/* Items */}
                  <td className="px-2 sm:px-4 py-3 max-w-[150px] sm:max-w-xs truncate">
                    {pickup.items.map((i, idx) => (
                      <span key={idx}>
                        {i.itemName} ({i.quantity}){" "}
                      </span>
                    ))}
                  </td>

                  {/* Pickup Date */}
                  <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                    {pickup.preferredDate}
                  </td>

                  {/* Status */}
                  <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        pickup.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : pickup.status === "Scheduled"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {pickup.status}
                    </span>
                  </td>

                  {/* Pickup Person */}
                  <td className="px-2 sm:px-4 py-3 align-top">
                    {pickup.status !== "Completed" ? (
                      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                        <input
                          type="text"
                          placeholder="Enter name"
                          value={pickupPersons[pickup._id] || ""}
                          onChange={(e) =>
                            setPickupPersons({
                              ...pickupPersons,
                              [pickup._id]: e.target.value,
                            })
                          }
                          className="border rounded px-2 py-1 text-xs sm:text-sm w-full sm:w-auto"
                        />
                        <button
                          onClick={() => handleAssign(pickup._id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-xs sm:text-sm"
                        >
                          Assign
                        </button>
                      </div>
                    ) : (
                      pickup.pickupPerson || "-"
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-2 sm:px-4 py-3">
                    {pickup.status === "Scheduled" && (
                      <button
                        onClick={() => handleMarkDone(pickup._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-xs sm:text-sm w-full sm:w-auto"
                      >
                        Mark Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pickups.length === 0 && (
          <p className="text-center text-gray-600 mt-4">
            No scheduled pickups found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ScheduledPickups;
