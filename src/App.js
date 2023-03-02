import { Routes, Route } from "react-router-dom";
import LayoutAddmin from "./layout/LayoutAdmin/LayoutProduct";
import LayoutContact from "./layout/LayoutAdmin/LayoutContact";
import Layoutinfo from "./layout/LayoutAdmin/LayoutinformationUser";
import LayoutUser from "./layout/Layoutuser/LayoutUser";
import Login from "./pageUser/Login";
import Register from "./pageUser/Register";
import LayoutBlog from "./layout/LayoutAdmin/LayoutBlog";
import LayoutOder from "./layout/LayoutAdmin/LayoutOder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<LayoutUser />} />
        <Route path="/admin" element={<LayoutAddmin />} />
        <Route path="/adminContact" element={<LayoutContact />} />
        <Route path="/InformationUser" element={<Layoutinfo />} />
        <Route path="/adminBlog" element={<LayoutBlog />} />
        <Route path="/adminOder" element={<LayoutOder />} />
      </Routes>
    </>
  );
}

export default App;
