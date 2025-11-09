import React, { useEffect } from "react";

const TicketNavbar = () => {
  useEffect(() => {
    // Inject keyframes only once
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

      /* ✅ Responsive Adjustments */
      @media (max-width: 768px) {
        .ticket-bar {
          flex-direction: column;
          padding: 8px 20px;
          font-size: 14px;
          text-align: center;
          gap: 6px;
        }

        .ticket-bar .icon {
          font-size: 20px;
          margin-bottom: 3px;
        }
      }

      @media (max-width: 480px) {
        .ticket-bar {
          font-size: 13px;
          padding: 8px 15px;
        }

        .ticket-bar .icon {
          font-size: 18px;
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <div className="ticket-bar" style={styles.ticket}>
      <span className="icon" style={styles.icon}>🌟</span>
      <span style={styles.text}>Connect. Donate. Transform Lives.</span>
      <span style={styles.subtext}>Every action counts!</span>
    </div>
  );
};

const styles = {
  ticket: {
    position: "sticky",
    top: "69px",
    background: "linear-gradient(90deg, #FF7043, #FF8A65)",
    color: "#fff",
    padding: "5px 35px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "16px",
    letterSpacing: "0.5px",
    zIndex: 99,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    fontFamily: "'Poppins', sans-serif",
    animation: "fadeIn 1s ease-in-out",
    lineHeight: "1.5",
    minHeight: "40px",
    flexWrap: "wrap", // ✅ ensures no overflow
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

export default TicketNavbar;
