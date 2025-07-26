// src/App.jsx
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./core/layouts/AppLayout";
import HomePage from "./features/home/HomePage";
import SettingsPage from "./core/pages/SettingsPage";
import UserPage from "./core/pages/UserPage";
import storageService from "./core/services/storageService";

function App() {
  // Initialiser le thème au montage de l'app
  useEffect(() => {
    storageService.initializeTheme();
  }, []);

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route
            path="/feature1"
            element={
              <div className="p-6 text-center">Feature 1 - À développer</div>
            }
          />
          <Route
            path="/feature2"
            element={
              <div className="p-6 text-center">Feature 2 - À développer</div>
            }
          />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
