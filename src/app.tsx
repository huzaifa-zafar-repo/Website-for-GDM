import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { CustomCursor } from "@/components/custom-cursor";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Products } from "@/components/products";
import { Story } from "@/components/story";

const HomePage = () => (
  <main>
    <Hero />
    <About />
    <Features />
    <Story />
    <Contact />
  </main>
);

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        <CustomCursor />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};
export default App;
