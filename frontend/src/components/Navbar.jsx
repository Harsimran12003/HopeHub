import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // ✅ Update layout dynamically when window is resized
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Hover effect using inline style manipulation
  const handleMouseEnter = (e) => {
    e.target.style.transform = "translateY(-2px)";
    e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    e.target.style.filter = "brightness(95%)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
    e.target.style.filter = "brightness(100%)";
  };

  return (
    <nav style={styles.navbar}>
      {/* === Left Section (Logo + Brand) === */}
      <div style={styles.left}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <span style={styles.brandName}>HopeHub</span>
      </div>

      {/* === Hamburger Button (Visible on Mobile) === */}
      {isMobile && (
        <div style={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
        </div>
      )}

      {/* === Navigation Links === */}
      <div
        style={{
          ...styles.center,
          ...(isMobile
            ? isOpen
              ? styles.showMenu
              : styles.hideMenu
            : {}),
        }}
      >
        <Link
          to="/"
          style={styles.homeBtn}
          onClick={() => setIsOpen(false)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Home
        </Link>

        <Link
          to="/login"
          style={styles.loginBtn}
          onClick={() => setIsOpen(false)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={styles.joinBtn}
          onClick={() => setIsOpen(false)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Join Us
        </Link>
      </div>
    </nav>
  );
};

/* === Shared Button Styling === */
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
    background: "rgba(0, 172, 193, 0.9)",
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
    height: "45px",
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

  homeBtn: {
    ...buttonBase,
    backgroundColor: "#42A5F5", // Blue
  },
  loginBtn: {
    ...buttonBase,
    backgroundColor: "#FF7043", // Orange
  },
  joinBtn: {
    ...buttonBase,
    backgroundColor: "#66BB6A", // Green
  },

  hamburger: {
    display: "flex",
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
    display: "none",
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

export default Navbar;
