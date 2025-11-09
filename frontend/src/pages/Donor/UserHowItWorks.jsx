import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description:
        "Register as an NGO, or Public User (Donor). NGOs need admin approval.",
    },
    {
      number: "2",
      title: "Connect & Donate",
      description:
        "Public users can choose NGOs and donate food, clothes, or other items. View and engage with NGO activities.",
    },
    {
      number: "3",
      title: "NGO Actions",
      description:
        "NGOs send food requests to caterers, receive donations, and post updates showcasing their impact.",
    },
    {
      number: "4",
      title: "Timeline Updates",
      description:
        "NGOs share photos and videos of donations, events, and celebrations on the community timeline.",
    },
    {
      number: "5",
      title: "Community Engagement",
      description:
        "Public users like posts, stay connected with causes they support, and see their impact.",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Sidebar>
      <section className="how-section" style={styles.section}>
        <h2 style={styles.heading}>
          How <span style={{ color: "#00ACC1" }}>HopeHub</span> Works
        </h2>
        <p style={styles.subHeading}>Simple steps to make a meaningful impact</p>

        {/* First Row (3 cards) */}
        <div className="how-row" style={styles.row}>
          {steps.slice(0, 3).map((step, index) => (
            <div
              key={index}
              style={{
                ...styles.card,
                transform:
                  hoveredIndex === index ? "translateY(-6px)" : "translateY(0)",
                boxShadow:
                  hoveredIndex === index
                    ? "0 10px 25px rgba(0, 0, 0, 0.2)"
                    : "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={styles.numberCircle}>{step.number}</div>
              <h3 style={styles.cardTitle}>{step.title}</h3>
              <p style={styles.cardText}>{step.description}</p>
            </div>
          ))}
        </div>

        {/* Second Row (2 cards, centered) */}
        <div className="how-row-center" style={styles.rowCenter}>
          {steps.slice(3).map((step, index) => (
            <div
              key={index + 3}
              style={{
                ...styles.card,
                transform:
                  hoveredIndex === index + 3
                    ? "translateY(-6px)"
                    : "translateY(0)",
                boxShadow:
                  hoveredIndex === index + 3
                    ? "0 10px 25px rgba(0, 0, 0, 0.2)"
                    : "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
              onMouseEnter={() => setHoveredIndex(index + 3)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={styles.numberCircle}>{step.number}</div>
              <h3 style={styles.cardTitle}>{step.title}</h3>
              <p style={styles.cardText}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </Sidebar>
  );
};

const styles = {
  section: {
    textAlign: "center",
    padding: "60px 40px",
    background: "linear-gradient(135deg, #E0F7FA 0%, #FFF8F2 100%)",
    minHeight: "100vh",
    borderRadius: "16px",
    margin: "30px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#004D40",
  },
  subHeading: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "50px",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "30px",
    marginBottom: "40px",
  },
  rowCenter: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "30px",
  },
  card: {
    width: "290px",
    backgroundColor: "#fff",
    padding: "25px 20px",
    borderRadius: "14px",
    textAlign: "left",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  numberCircle: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #00ACC1, #26C6DA)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "15px",
    boxShadow: "0 4px 8px rgba(0, 172, 193, 0.4)",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#006064",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "0.95rem",
    color: "#444",
    lineHeight: "1.5",
  },
};

// ✅ Responsive Styling (Media Queries)
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@media (max-width: 1024px) {
  .how-section {
    padding: 50px 30px !important;
  }
  .how-row, .how-row-center {
    gap: 25px !important;
  }
}

@media (max-width: 768px) {
  .how-section {
    padding: 40px 20px !important;
    margin: 15px !important;
  }
  .how-section h2 {
    font-size: 2rem !important;
  }
  .how-section p {
    font-size: 0.95rem !important;
  }
  .how-row, .how-row-center {
    flex-direction: column !important;
    align-items: center !important;
  }
  .how-row .card, .how-row-center .card {
    width: 90% !important;
  }
}

@media (max-width: 480px) {
  .how-section {
    padding: 30px 15px !important;
  }
  .how-section h2 {
    font-size: 1.7rem !important;
  }
  .how-section p {
    font-size: 0.9rem !important;
  }
  .how-row .card, .how-row-center .card {
    width: 100% !important;
  }
  .numberCircle {
    width: 40px !important;
    height: 40px !important;
    font-size: 16px !important;
  }
}
`;
document.head.appendChild(styleSheet);

export default HowItWorks;
