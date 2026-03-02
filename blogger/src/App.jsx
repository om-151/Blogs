import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BlogsDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScrollToTop from "./pages/ScrollToTop";

function App() {
  const [clientAuth, setClientAuth] = useState(() => {
    const token = localStorage.getItem("clientToken");
    return token ? { token } : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("clientToken");
    setClientAuth(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar clientAuth={clientAuth} handleLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs clientAuth={clientAuth} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs/:id" element={<BlogsDetails clientAuth={clientAuth} />} />
            <Route
              path="/login"
              element={
                clientAuth ? (
                  <Navigate to="/blogs" replace />
                ) : (
                  <Login setClientAuth={setClientAuth} />
                )
              }
            />
            <Route
              path="/register"
              element={
                clientAuth ? (
                  <Navigate to="/blogs" replace />
                ) : (
                  <Register setClientAuth={setClientAuth} />
                )
              }
            />
          </Routes>
        </main>
        {/* pass logout handler down so Navbar can call it */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
