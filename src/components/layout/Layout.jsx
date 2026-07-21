import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedBackground from "../ui/AnimatedBackground";
import ScrollToTop from "../common/ScrollToTop";

const Layout = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollToTop />
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-0 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
