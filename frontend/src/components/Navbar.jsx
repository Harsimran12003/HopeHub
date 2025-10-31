import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      {/* Left - Logo + Brand */}
      <div style={styles.left}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <span style={styles.brandName}>HopeHub</span>
      </div>

      {/* Hamburger Button (for mobile) */}
      <div style={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
      </div>

      {/* Center Links */}
      <div
        style={{
          ...styles.center,
          ...(isOpen ? styles.showMenu : styles.hideMenu),
        }}
      >
        <Link to="/" style={styles.homeBtn} onClick={() => setIsOpen(false)}>
          Home
        </Link>

        <Link to="/login" style={styles.loginBtn} onClick={() => setIsOpen(false)}>
          Login
        </Link>

        <Link to="/register" style={styles.joinBtn} onClick={() => setIsOpen(false)}>
          Join Us
        </Link>
      </div>
    </nav>
  );
};

/* === Base Button Styling === */
const buttonBase = {
  padding: "10px 18px",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "600",
  transition: "all 0.3s ease",
  letterSpacing: "0.5px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 40px",
    background: "rgba(0, 172, 193, 0.9)", // translucent glass-like
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logo: {
    height: "48px",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
  },
  brandName: {
    fontStyle: "italic",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: "1px",
  },

  center: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  // Buttons (same colors, but modern hover)
  homeBtn: {
    ...buttonBase,
    backgroundColor: "#42A5F5", // blue
  },
  loginBtn: {
    ...buttonBase,
    backgroundColor: "#FF7043", // orange
  },
  joinBtn: {
    ...buttonBase,
    backgroundColor: "#66BB6A", // green
  },

  hamburger: {
    display: "none",
    flexDirection: "column",
    cursor: "pointer",
  },
  bar: {
    width: "26px",
    height: "3px",
    backgroundColor: "#fff",
    margin: "4px 0",
    borderRadius: "2px",
    transition: "0.3s ease",
  },
  hideMenu: {
    display: "flex",
  },
  showMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "65px",
    right: "25px",
    background: "rgba(0, 172, 193, 0.95)",
    padding: "15px 25px",
    borderRadius: "12px",
    gap: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
};

// === Hover Animation (JS workaround for inline styles) ===
document.addEventListener("mouseover", (e) => {
  const link = e.target.closest("a");
  if (link) {
    link.style.transform = "translateY(-2px)";
    link.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    link.style.filter = "brightness(95%)";
  }
});
document.addEventListener("mouseout", (e) => {
  const link = e.target.closest("a");
  if (link) {
    link.style.transform = "translateY(0)";
    link.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
    link.style.filter = "brightness(100%)";
  }
});

// === Responsive tweak for small screens ===
if (window.innerWidth <= 768) {
  styles.center.display = "none";
  styles.hamburger.display = "flex";
}

export default Navbar;
