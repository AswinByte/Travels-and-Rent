import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "24px",
          background: "#F1F5F9",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;