// src/shared/utils/dates.js
// // Utilitaires pour la manipulation des dates

export const formatDate = (date, format = "DD/MM/YYYY") => {
  if (!date) return "";

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  switch (format) {
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "DD MMM YYYY":
      const monthNames = [
        "Jan",
        "Fév",
        "Mar",
        "Avr",
        "Mai",
        "Juin",
        "Juil",
        "Août",
        "Sep",
        "Oct",
        "Nov",
        "Déc",
      ];
      return `${day} ${monthNames[d.getMonth()]} ${year}`;
    default:
      return d.toLocaleDateString("fr-FR");
  }
};

export const formatDateTime = (date) => {
  if (!date) return "";

  const d = new Date(date);
  return (
    d.toLocaleDateString("fr-FR") +
    " " +
    d.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

export const getRelativeTime = (date) => {
  if (!date) return "";

  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "À l'instant";
  if (diffMins < 60)
    return `Il y a ${diffMins} minute${diffMins > 1 ? "s" : ""}`;
  if (diffHours < 24)
    return `Il y a ${diffHours} heure${diffHours > 1 ? "s" : ""}`;
  if (diffDays < 30) return `Il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;

  return formatDate(date);
};
