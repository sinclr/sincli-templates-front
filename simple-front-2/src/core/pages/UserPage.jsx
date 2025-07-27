// src/core/pages/UserPage.jsx
import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";

const UserPage = () => {
  const handleEdit = () => {
    console.log("Modifier le profil");
  };

  const handleDelete = () => {
    console.log("Supprimer le compte");
  };

  const handleLogout = () => {
    console.log("Déconnexion");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Profil utilisateur
      </h1>

      <Card>
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              John Doe
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              john.doe@example.com
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button onClick={handleEdit} className="w-full">
            Modifier le profil
          </Button>
          <Button onClick={handleLogout} variant="secondary" className="w-full">
            Se déconnecter
          </Button>
          <Button onClick={handleDelete} variant="danger" className="w-full">
            Supprimer le compte
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserPage;
