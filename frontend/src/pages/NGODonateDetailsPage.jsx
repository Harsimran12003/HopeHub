import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ngos from "../data/donate";
import Navbar from "../components/Navbar";

const NGODonateDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ngoId = parseInt(id, 10);
  const ngo = ngos.find((n) => n.id === ngoId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", items: "", message: "" });

  if (!ngo) return <p style={{ textAlign: "center", marginTop: "50px", fontSize: "1.5rem" }}>NGO not found</p>;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Request sent successfully!");
    setIsModalOpen(false);
    setFormData({ name: "", email: "", items: "", message: "" });
  };

  return (
    <>

    <div style={{ maxWidth: "1000px", margin: "30px auto", padding: "20px", background: "#f5f5f5", borderRadius: "10px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", color: "#0077b6", fontWeight: "bold" }}>{ngo.name}</h1>
        <button 
          style={{ background: "#00ACC1", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }} 
          onClick={() => setIsModalOpen(true)}
        >
          Schedule Pickup
        </button>
      </div>

      {/* Content */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <img src={ngo.image} alt={ngo.name} style={{ width: "100%", maxWidth: "400px", borderRadius: "10px", objectFit: "cover" }} />
        <div style={{ flex: 1, minWidth: "250px" }}>
          <p style={{ marginBottom: "15px" }}>{ngo.description}</p>
          <h3 style={{ marginTop: "15px", fontWeight: "bold", color: "#0077b6" }}>Population Info</h3>
          <p>👶 Kids: {ngo.population.kids} | 👴 Old Age: {ngo.population.oldAge} | 👥 Total: {ngo.population.total}</p>

          <h3 style={{ marginTop: "15px", fontWeight: "bold", color: "#0077b6" }}>Requirements</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
            {ngo.requirements.map((req, idx) => (
              <div key={idx} style={{ padding: "10px 15px", background: "#26c6da", color: "#fff", borderRadius: "8px", fontWeight: "bold" }}>
                {req.item}: {req.quantity}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button 
        style={{ marginTop: "20px", padding: "8px 12px", borderRadius: "6px", border: "none", background: "#26c6da", color: "#fff", fontWeight: "bold", cursor: "pointer" }} 
        onClick={() => navigate(-1)}
      >
        ← Back to Donate
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10000 }}>
          <div style={{ background: "#fff", borderRadius: "10px", padding: "20px 30px", width: "400px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ marginBottom: "15px", color: "#0077b6", fontWeight: "bold", textAlign: "center" }}>Send Pickup Request</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
              <label style={styles.label}>Your Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />

              <label style={styles.label}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} />

              <label style={styles.label}>Items to Donate</label>
              <input type="text" name="items" value={formData.items} onChange={handleChange} placeholder="Food, Clothes, Stationary..." style={styles.input} required />

              <label style={styles.label}>Message / Details</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Additional details..." style={styles.textarea} />

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                <button type="submit" style={styles.submitBtn}>Send</button>
                <button type="button" style={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

const styles = {
  label: { marginTop: "10px", fontWeight: "bold" },
  input: { marginTop: "5px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" },
  textarea: { marginTop: "5px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", resize: "vertical" },
  submitBtn: { background: "#00ACC1", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" },
  cancelBtn: { background: "#e0e0e0", color: "#333", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" },
};

export default NGODonateDetailsPage;
