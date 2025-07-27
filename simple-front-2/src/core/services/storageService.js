// src/core/services/storageService.js
class StorageService {
  // LocalStorage avec fallback
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Storage unavailable:", error);
    }
  }

  getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn("Error reading from storage:", error);
      return null;
    }
  }

  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn("Error removing from storage:", error);
    }
  }

  // Gestion des préférences utilisateur
  saveUserPreferences(prefs) {
    this.setItem("user_preferences", prefs);
  }

  getUserPreferences() {
    return (
      this.getItem("user_preferences") || {
        theme: "light",
        language: "fr",
        notifications: true,
      }
    );
  }

  // Gestion du thème spécifiquement
  getTheme() {
    const preferences = this.getUserPreferences();
    return preferences.theme || "light";
  }

  setTheme(theme) {
    const preferences = this.getUserPreferences();
    this.saveUserPreferences({ ...preferences, theme });
  }

  // Nettoyage à la déconnexion
  clearUserData() {
    this.removeItem("auth_token");
    this.removeItem("user_data");
    // On garde les préférences même après déconnexion
    // this.removeItem("user_preferences");
  }

  // Méthode pour initialiser le thème au démarrage de l'app
  initializeTheme() {
    const theme = this.getTheme();
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
}

export default new StorageService();
