import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "../../component/NavbarAdmin";
import AddminHome from "../../pageAdmin/ManagementProduct";
import AdminContact from "../../pageAdmin/ManagementContact";
function LayoutAddmin() {
  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route path="/" element={<AddminHome />} />
        <Route path="/addmin" element={<AddminHome />} />
      </Routes>
    </>
  );
}

export default LayoutAddmin;
