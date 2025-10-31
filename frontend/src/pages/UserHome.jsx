import React from "react";
import Sidebar from "../components/Sidebar";
import { FaCalendarAlt, FaHandHoldingHeart, FaTruck, FaGift } from "react-icons/fa";

const UserHome = () => {
  return (
    <Sidebar>
      <div style={styles.container}>
        {/* Welcome Banner */}
        <div style={styles.banner}>
          <h1 style={styles.welcomeText}>Welcome </h1>
          <p style={styles.subText}>
            Manage your donations, pickups, and celebrations — all in one place.
          </p>
        </div>

        {/* Quick Actions */}
        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <FaCalendarAlt style={styles.icon} />
            <h3>Upcoming Events</h3>
            <p>View and manage your upcoming celebrations easily.</p>
          </div>

          <div style={styles.card}>
            <FaHandHoldingHeart style={styles.icon} />
            <h3>Your Donations</h3>
            <p>Track your recent donations and impact made.</p>
          </div>

          <div style={styles.card}>
            <FaTruck style={styles.icon} />
            <h3>Pickup Schedule</h3>
            <p>Check or update your pickup requests quickly.</p>
          </div>

          <div style={styles.card}>
            <FaGift style={styles.icon} />
            <h3>Available Services</h3>
            <p>Explore all the services we offer just for you.</p>
          </div>
        </div>

        {/* Quote / Message Section */}
        <div style={styles.quoteSection}>
          <p style={styles.quote}>
            “The best way to find yourself is to lose yourself in the service of others.”
          </p>
          <p style={styles.author}>– Mahatma Gandhi</p>
        </div>
      </div>
    </Sidebar>
  );
};

const styles = {
  container: {
    padding: "30px",
    background: "#f7f9fb",
    minHeight: "100vh",
    color: "#333",
    fontFamily: "'Poppins', sans-serif",
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
    margin: "0",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
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
    fontSize: "2rem",
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

export default UserHome;
