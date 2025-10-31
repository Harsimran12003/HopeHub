import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ngos from "../data/ngos";
import Navbar from "../components/Navbar";

const NGODetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const ngoId = parseInt(id, 10);
  const ngo = ngos.find((n) => n.id === ngoId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", occasion: "", message: "" });

  if (!ngo) return <p style={{ textAlign: "center", marginTop: "50px", fontSize: "1.5rem" }}>NGO not found</p>;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Request Data:", formData);
    alert("Request sent successfully!");
    setIsModalOpen(false);
    setFormData({ name: "", email: "", occasion: "", message: "" });
  };

  return (
    <>
    <Navbar />
    <div style={{ maxWidth: "1000px", margin: "30px auto", padding: "20px", background: "#f5f5f5", borderRadius: "10px" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", color: "#0077b6", fontWeight: "bold", fontStyle: "italic" }}>{ngo.name}</h1>
        <button style={{ background: "#00ACC1", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }} onClick={() => setIsModalOpen(true)}>Send Request</button>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <img src={ngo.image} alt={ngo.name} style={{ width: "100%", maxWidth: "400px", borderRadius: "10px", objectFit: "cover" }} />
        <div style={{ flex: 1, minWidth: "250px" }}>
          <p style={{ marginBottom: "15px" }}>{ngo.description}</p>
          <h3 style={{ marginTop: "15px", fontWeight: "bold", color: "#0077b6" }}>Contact Information</h3>
          <p>{ngo.contact}</p>
          <h3 style={{ marginTop: "15px", fontWeight: "bold", color: "#0077b6" }}>Address</h3>
          <p>{ngo.address}</p>
          <h3 style={{ marginTop: "15px", fontWeight: "bold", color: "#0077b6" }}>Timings</h3>
          <p>{ngo.timings}</p>
          <h3 style={{ marginTop: "15px", fontWeight: "bold", color: "#0077b6" }}>Available Dates</h3>
          <p>{ngo.dates}</p>
          <h3 style={{ marginTop: "15px", fontWeight: "bold", color: "#0077b6" }}>Events They Provide</h3>
          <ul>{ngo.events.map((event, idx) => <li key={idx}>{event}</li>)}</ul>
        </div>
      </div>

      <button style={{ marginTop: "20px", padding: "8px 12px", borderRadius: "6px", border: "none", background: "#26c6da", color: "#fff", fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate(-1)}>← Back to Celebrations</button>

      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10000 }}>
          <div style={{ background: "#fff", borderRadius: "10px", padding: "20px 30px", width: "400px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ marginBottom: "15px", color: "#0077b6", fontWeight: "bold", textAlign: "center" }}>Send Request to {ngo.name}</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginTop: "10px", fontWeight: "bold" }}>Your Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ marginTop: "5px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
              <label style={{ marginTop: "10px", fontWeight: "bold" }}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ marginTop: "5px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
              <label style={{ marginTop: "10px", fontWeight: "bold" }}>Occasion</label>
              <input type="text" name="occasion" value={formData.occasion} onChange={handleChange} placeholder="Birthday, Anniversary, etc." required style={{ marginTop: "5px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
              <label style={{ marginTop: "10px", fontWeight: "bold" }}>Message / Details</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Additional details for NGO..." style={{ marginTop: "5px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", resize: "vertical" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                <button type="submit" style={{ background: "#00ACC1", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Send</button>
                <button type="button" style={{ background: "#e0e0e0", color: "#333", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }} onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default NGODetailPage;
