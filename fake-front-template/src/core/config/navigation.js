// src/core/config/navigation.js
export const getNavigationConfig = (projectType = "default") => {
  const userItems = [
    {
      id: "settings",
      label: "Paramètres",
      icon: "Settings",
      path: "/settings",
    },
    { id: "user", label: "Profil", icon: "User", path: "/user" },
  ];

  const mainItems = [
    { id: "home", label: "Accueil", icon: "Home", path: "/" },
    { id: "feature1", label: "Feature 1", icon: "Star", path: "/feature1" },
    { id: "feature2", label: "Feature 2", icon: "BarChart", path: "/feature2" },
  ];

  return { mainItems, userItems };
};
