import React from "react";

const TicketNavbar = () => {
  return (
    <div style={styles.ticket}>
      <span style={styles.icon}>🌟</span>
      <span style={styles.text}>Connect. Donate. Transform Lives.</span>
      <span style={styles.subtext}> Every action counts!</span>
    </div>
  );
};

const styles = {
  ticket: {
    position: "sticky",
    top: "69px",
    background: "linear-gradient(90deg, #FF7043, #FF8A65)",
    color: "#fff",
    padding: "5px 35px", // More vertical breathing room
    textAlign: "center",
    fontWeight: "600",
    fontSize: "16px",
    letterSpacing: "0.5px",
    zIndex: 99,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // centers content vertically
    gap: "10px",
    fontFamily: "'Poppins', sans-serif",
    animation: "fadeIn 1s ease-in-out",
    lineHeight: "1.5",
    minHeight: "40px", // keeps visual balance consistent
  },
  icon: {
    fontSize: "22px",
    animation: "spinStar 3s linear infinite",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700",
  },
  subtext: {
    opacity: 0.9,
    fontWeight: "500",
  },
};

// animations
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes spinStar {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);

export default TicketNavbar;
