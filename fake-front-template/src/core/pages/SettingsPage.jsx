// src/core/pages/SettingsPage.jsx
import { useState, useEffect } from "react";
import { themeConfig } from "../config/theme";
import storageService from "../services/storageService";
import Toggle from "../../shared/ui/Toggle";
import Card from "../../shared/ui/Card";

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Charger la préférence au montage du composant
  useEffect(() => {
    const preferences = storageService.getUserPreferences();
    const savedTheme = preferences.theme === "dark";
    setIsDarkMode(savedTheme);

    // Appliquer le thème sauvegardé
    if (savedTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Mettre à jour le DOM
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Sauvegarder la préférence
    const currentPreferences = storageService.getUserPreferences();
    storageService.saveUserPreferences({
      ...currentPreferences,
      theme: newMode ? "dark" : "light",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Paramètres
      </h1>

      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Apparence
          </h2>
          <Toggle
            enabled={isDarkMode}
            onChange={toggleDarkMode}
            label="Mode sombre"
          />
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            À propos
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Application
              </span>
              <span className="text-gray-900 dark:text-white">
                {themeConfig.projectName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Version</span>
              <span className="text-gray-900 dark:text-white">
                {themeConfig.version}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Type de projet
              </span>
              <span className="text-gray-900 dark:text-white">
                {themeConfig.projectType}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
