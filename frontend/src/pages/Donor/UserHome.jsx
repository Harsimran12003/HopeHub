import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { FaCalendarAlt, FaHandHoldingHeart, FaTruck } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const UserHome = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let token = null;
        const stored = localStorage.getItem("userInfo");
        if (stored) {
          const parsed = JSON.parse(stored);
          token = parsed?.token || parsed?.data?.token || null;
        }
        if (!token) token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found.");
          return;
        }

        const res = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
        setFormData(res.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Sidebar>
      <div style={styles.container}>
        {/* Welcome Banner */}
        <div style={styles.banner}>
          <h2 style={styles.welcomeText}>
            Welcome Back{user ? `, ${user.fullName || user.name}!` : "!"}
          </h2>
          <p style={styles.subText}>
            Manage your donations, pickups, and celebrations — all in one place.
          </p>
        </div>

        {/* Quick Actions */}
        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <FaCalendarAlt style={styles.icon} />
            <h3><b>Manage Requests</b></h3>
            <p>View and manage your upcoming celebrations easily.</p>
          </div>

          <div style={styles.card}>
            <FaHandHoldingHeart style={styles.icon} />
            <h3><b>Your Donations</b></h3>
            <p>Track your recent donations and see your impact.</p>
          </div>

          <div style={styles.card}>
            <FaTruck style={styles.icon} />
            <h3><b>Pickup Schedule</b></h3>
            <p>Check or update your pickup requests quickly.</p>
          </div>
        </div>

        {/* Inspiration Quote */}
        <div style={styles.quoteSection}>
          <p style={styles.quote}>
            “The smallest act of kindness is worth more than the grandest intention.”
          </p>
          <p style={styles.author}>– Oscar Wilde</p>
        </div>
      </div>
    </Sidebar>
  );
};

const styles = {
  container: {
    padding: "30px",
    background: "#f7f9fb",
    color: "#333",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.3s ease",
  },
  banner: {
    background: "linear-gradient(135deg, #00ACC1, #26c6da, #4dd0e1)",
    color: "#fff",
    padding: "40px 30px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    marginBottom: "40px",
  },
  welcomeText: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: "700",
  },
  subText: {
    marginTop: "10px",
    fontSize: "1rem",
    opacity: "0.9",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
    marginBottom: "40px",
  },
  card: {
    background: "#fff",
    borderRadius: "15px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  icon: {
    color: "#00ACC1",
    fontSize: "2.2rem",
    marginBottom: "10px",
  },
  quoteSection: {
    marginTop: "50px",
    textAlign: "center",
    background: "#fff",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  quote: {
    fontStyle: "italic",
    fontSize: "1.1rem",
    color: "#333",
  },
  author: {
    marginTop: "10px",
    fontWeight: "600",
    color: "#00ACC1",
  },
};

// Add responsive styles dynamically
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@media (max-width: 1024px) {
  .user-banner h2 {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .user-banner h2 {
    font-size: 1.6rem;
  }
  .user-banner p {
    font-size: 0.95rem;
  }
  div[style*="padding: 30px"] {
    padding: 20px !important;
  }
}

@media (max-width: 480px) {
  .user-banner {
    padding: 25px 15px !important;
  }
  .user-banner h2 {
    font-size: 1.4rem;
  }
  .user-banner p {
    font-size: 0.9rem;
  }
  div[style*="grid-template-columns"] {
    grid-template-columns: 1fr !important;
  }
  div[style*="padding: 25px"] {
    padding: 18px !important;
  }
}
`;
document.head.appendChild(styleSheet);

export default UserHome;
