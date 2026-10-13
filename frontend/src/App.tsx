import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Reservations from "./pages/Reservations";
import AdminDashboard from "./pages/Admin/Dashboard";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/Common/WhatsAppButton";

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles: Record<string, string> = {
      "/": "Coffee & fresh favourites",
      "/menu": "Our menu",
      "/gallery": "Gallery",
      "/about": "Our story",
      "/reservations": "Book a table",
      "/contact": "Visit us",
    };
    document.title = (titles[pathname] || "Page") + " | Déelectaa Café";
  }, [pathname]);
  return null;
}
function App() {
  return (
    <Router>
      <RouteEffects />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="*"
              element={
                <div className="page-not-found">
                  <h1>Let’s find your way back.</h1>
                  <p>This page isn’t available.</p>
                  <Link to="/" className="button">
                    Back to home
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>
        <WhatsAppButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
