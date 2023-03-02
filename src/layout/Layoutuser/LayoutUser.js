import Footer from "../../component/Footer";
import Navbar from "../../component/NavbarUser";
import { Routes, Route } from "react-router-dom";
import Home from "../../pageUser/Home";
import Details from "../../pageUser/Details";
import Cart from "../../pageUser/Cart";
import Products from "../../pageUser/Products";
import Contact from "../../pageUser/Contact";
import Payments from "../../pageUser/Payments";
function LayoutUser() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
      <Footer />
    </>
  );
}

export default LayoutUser;
