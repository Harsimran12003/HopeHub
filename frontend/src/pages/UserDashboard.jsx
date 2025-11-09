import TicketNavbar from "../components/TicketNavbar";
import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserDashboard = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
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

export default UserDashboard;
