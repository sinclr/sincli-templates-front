// src/core/layouts/AppLayout.jsx
import { useBreakpoint } from "../hooks/useBreakpoint";
import Navbar from "../components/navigation/Navbar";

const AppLayout = ({ children }) => {
  const { isMobile } = useBreakpoint();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className={`${isMobile ? "pb-16" : ""}`}>{children}</main>
    </div>
  );
};

export default AppLayout;
