
import TicketNavbar from "../components/TicketNavbar";
import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";



const UserDashboard = () => {
  return (
    <div style={styles.container}>
      <Navbar />
      
      <TicketNavbar />
      <HeroSection />
  
      <AboutUsSection />
      <HowItWorks />
      <Features />
      <Footer />
       
    

    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh", // Ensure full viewport height
    display: "flex",
    flexDirection: "column",
  },
};

export default UserDashboard;
