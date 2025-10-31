import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* --- Left: Brand Info --- */}
        <div style={styles.section}>
          <h2 style={styles.logo}>HopeHub</h2>
          <p style={styles.text}>
            Connecting hearts to those in need — from food to clothes, every
            donation brings hope. Together, we make giving simple, meaningful,
            and impactful.
          </p>
        </div>

        {/* --- Middle: Quick Links --- */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Quick Links</h3>
          <ul style={styles.list}>
            <li>
              <a href="/" style={styles.link}>
                Home
              </a>
            </li>
            <li>
              <a href="/about" style={styles.link}>
                About Us
              </a>
            </li>
            <li>
              <a href="/donate" style={styles.link}>
                Donate
              </a>
            </li>
            <li>
              <a href="/ngos" style={styles.link}>
                Find NGOs
              </a>
            </li>
            <li>
              <a href="/contact" style={styles.link}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* --- Right: Contact + Social --- */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Get in Touch</h3>
          <p style={styles.contact}>
            <FaEnvelope style={{ color: "#FF7043" }} /> &nbsp; support@hopehub.org
          </p>
          <div style={styles.socials}>
            <a href="#" style={styles.socialIcon}>
              <FaFacebookF />
            </a>
            <a href="#" style={styles.socialIcon}>
              <FaInstagram />
            </a>
            <a href="#" style={styles.socialIcon}>
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div style={styles.bottomBar}>
        © {new Date().getFullYear()} <span style={{ color: "#FF7043" }}>HopeHub</span> 
        &nbsp;
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "linear-gradient(135deg, #007C91, #00ACC1)", // Teal gradient
    color: "#fff",
    padding: "60px 10% 20px",
    marginTop: "60px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "40px",
  },
  section: {
    flex: "1 1 250px",
    minWidth: "250px",
  },
  logo: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "15px",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#FFCCBC",
  },
  text: {
    fontSize: "0.95rem",
    color: "#E0F7FA",
    lineHeight: "1.6",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    display: "block",
    color: "#E0F7FA",
    textDecoration: "none",
    marginBottom: "10px",
    transition: "color 0.3s ease",
  },
  contact: {
    fontSize: "0.95rem",
    color: "#E0F7FA",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
  },
  socials: {
    display: "flex",
    gap: "15px",
    marginTop: "15px",
  },
  socialIcon: {
    color: "#FF7043",
    fontSize: "1.3rem",
    transition: "transform 0.3s, color 0.3s",
  },
  bottomBar: {
    marginTop: "40px",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#E0F2F1",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    paddingTop: "15px",
  },
};

// Add hover effects via CSS injection
Object.assign(styles.link, {
  ":hover": { color: "#FF7043" },
});

export default Footer;
