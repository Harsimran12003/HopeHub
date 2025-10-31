import React, { useState } from "react";

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
    <section style={styles.section}>
      <h2 style={styles.heading}>
        How <span style={{ color: "#D84315" }}>Hope Hub</span> Works
      </h2>
      <p style={styles.subHeading}>Simple steps to make a meaningful impact</p>

      {/* First row (3 cards) */}
      <div style={styles.row}>
        {steps.slice(0, 3).map((step, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              transform:
                hoveredIndex === index ? "scale(1.05)" : "scale(1)",
              boxShadow:
                hoveredIndex === index
                  ? "0 8px 25px rgba(0,0,0,0.2)"
                  : "0 4px 15px rgba(0,0,0,0.1)",
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

      {/* Second row (2 cards, centered) */}
      <div style={styles.rowCenter}>
        {steps.slice(3).map((step, index) => (
          <div
            key={index + 3}
            style={{
              ...styles.card,
              transform:
                hoveredIndex === index + 3 ? "scale(1.05)" : "scale(1)",
              boxShadow:
                hoveredIndex === index + 3
                  ? "0 8px 25px rgba(0,0,0,0.2)"
                  : "0 4px 15px rgba(0,0,0,0.1)",
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
  );
};

const styles = {
  section: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#4E342E",
  },
  subHeading: {
    fontSize: "1rem",
    color: "#607D8B",
    marginBottom: "40px",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "25px",
    marginBottom: "30px",
  },
  rowCenter: {
    display: "flex",
    justifyContent: "center", // centers the last 2 cards
    gap: "25px",
  },
  card: {
    width: "300px",
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "left",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  numberCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#E64A19",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "15px",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#3E2723",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "0.95rem",
    color: "#5D4037",
  },
};

export default HowItWorks;
