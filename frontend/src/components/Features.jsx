import React from "react";

const Features = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div> {/* gradient layer */}
      <div style={styles.cards}>
        <div style={styles.card}>Connect</div>
        <div style={styles.card}>Donate</div>
        <div style={styles.card}>Transform Lives</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    padding: "80px 20px",
    textAlign: "center",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(220,240,255,0.6), rgba(245,235,255,0.7))",
    zIndex: -1,
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 1,
  },
  card: {
    padding: "40px 60px",
    backgroundColor: "#26c6da", // lighter teal for modern look
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.3rem",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)", // softer shadow
    transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
  },
};

export default Features;
