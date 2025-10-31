import React from "react";
import { useNavigate } from "react-router-dom";
import videoBg from "../assets/video.mp4";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.heroContainer}>
      <video autoPlay loop muted style={styles.video}>
        <source src={videoBg} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
       <div style={styles.overlay}>
        <h1 style={styles.title}>Share What You Have, Spread Hope</h1>
        <p style={styles.subtitle}>
          Connect NGOs with donors to share food, clothes, and essentials — 
          ensuring no one is left in need. Every contribution creates a ripple of kindness.
        </p>
        <div style={styles.buttons}>
          <button
            className="hero-btn ngo-btn"
            style={styles.ngoBtn}
            onClick={() => navigate("/login")}
          >
            I am an NGO
          </button>
          <button
            className="hero-btn donor-btn"
            style={styles.donorBtn}
            onClick={() => navigate("/register")}
          >
            I want to Donate
          </button>
        </div>
      </div>

      {/* Inject hover CSS styles */}
      <style>{`
        .hero-btn {
          transition: all 0.3s ease;
        }

        .ngo-btn:hover {
          background-color: #008B9A;
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(0, 172, 193, 0.4);
        }

        .donor-btn:hover {
          background-color: #E65A2D;
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(255, 112, 67, 0.4);
        }

        .hero-btn:active {
          transform: scale(0.97);
        }
      `}</style>
    </div>
  );
};

const styles = {
  heroContainer: {
    position: "relative",
    width: "100%",
    height: "calc(100vh - 60px)",
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.45)",
    color: "#F5F5F5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "0 20px",
  },
  title: {
    marginTop: "70px",
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "20px",
    lineHeight: "1.2",
  },
  subtitle: {
    fontSize: "1.2rem",
    maxWidth: "700px",
    marginBottom: "30px",
  },
  buttons: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  ngoBtn: {
    padding: "12px 24px",
    backgroundColor: "#00ACC1",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  donorBtn: {
    padding: "12px 24px",
    backgroundColor: "#FF7043",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default HeroSection;
