import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  FaBirthdayCake,
  FaGift,
  FaUsers,
  FaHandHoldingHeart,
} from "react-icons/fa";

const Card = ({ icon, title, text }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        ...(hover ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={styles.iconContainer}>{icon}</div>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardText}>{text}</p>
    </div>
  );
};

const AboutUsSection = () => {
  return (
    <Sidebar>
      <div style={styles.pageContainer}>
        <section style={styles.section}>
          {/* Left side text */}
          <div style={styles.left}>
            <h2 style={styles.heading}>About HopeHub</h2>
            <p style={styles.text}>
              HopeHub is a social impact platform connecting donors with those
              in need. Whether it’s cooked food, clothes, blankets, or school
              supplies, HopeHub bridges the gap between generous hearts and
              orphanages, old-age homes, and verified NGOs.
            </p>
            <p style={styles.text}>
              Transform birthdays, anniversaries, and festivals into moments of
              compassion by sharing happiness with underprivileged communities.
              Every small act of kindness makes a meaningful difference.
            </p>
            <p style={styles.text}>
              With easy access to nearby verified NGOs, donors can track their
              impact and contribute with confidence — turning care into action.
            </p>
          </div>

          {/* Right side feature cards */}
          <div style={styles.right}>
            <Card
              icon={<FaBirthdayCake size={40} color={styles.icon.color} />}
              title="Birthday Celebrations"
              text="Make birthdays meaningful by donating food or essentials."
            />
            <Card
              icon={<FaHandHoldingHeart size={40} color={styles.icon.color} />}
              title="Anniversary Giving"
              text="Celebrate milestones by supporting those who need it most."
            />
            <Card
              icon={<FaGift size={40} color={styles.icon.color} />}
              title="Festival Donations"
              text="Spread festive joy through clothes and gift donations."
            />
            <Card
              icon={<FaUsers size={40} color={styles.icon.color} />}
              title="Community Impact"
              text="Join thousands of donors creating a culture of giving."
            />
          </div>
        </section>
      </div>
    </Sidebar>
  );
};

const styles = {
  pageContainer: {
    background: "#f7f9fb",
    minHeight: "100vh",
    padding: "30px",
  },
  section: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "60px 5%",
    background: "linear-gradient(135deg, #E3F2F2 0%, #FFF8F2 100%)",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    gap: "40px",
  },
  left: {
    flex: "1 1 45%",
    minWidth: "320px",
    background:
      "linear-gradient(135deg, rgba(0,172,193,1), rgba(38,198,218,1), rgba(77,208,225,1))",
    color: "#fff",
    padding: "35px",
    borderRadius: "14px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  },
  heading: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#fff",
    letterSpacing: "0.5px",
  },
  text: {
    fontSize: "1rem",
    color: "#F1F1F1",
    lineHeight: "1.7",
    marginBottom: "15px",
  },
  right: {
    flex: "1 1 45%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "25px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "25px 20px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  },
  iconContainer: {
    backgroundColor: "#E0F7FA",
    borderRadius: "50%",
    width: "70px",
    height: "70px",
    margin: "0 auto 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    margin: "10px 0",
    color: "#212121",
  },
  cardText: {
    fontSize: "0.95rem",
    color: "#555",
    lineHeight: "1.5",
  },
  icon: {
    color: "#FF7043",
  },
};

// ✅ Add responsive adjustments
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@media (max-width: 900px) {
  section {
    flex-direction: column !important;
  }
  .right {
    grid-template-columns: 1fr !important;
  }
}
`;
document.head.appendChild(styleSheet);

export default AboutUsSection;
