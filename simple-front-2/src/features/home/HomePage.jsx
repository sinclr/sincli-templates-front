// src/features/home/HomePage.jsx

import { useState } from "react";
import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";

function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenue sur my-sincli-app
        </h1>
        <p className="text-xl text-gray-600">
          Votre application fullstack est prête à démarrer !
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <h2 className="text-xl font-semibold mb-2">Frontend React</h2>
          <p className="text-gray-600">
            Vite + React + Tailwind CSS pour une expérience de développement
            moderne
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">Backend Serverless</h2>
          <p className="text-gray-600">
            AWS Lambda + API Gateway + DynamoDB pour une architecture scalable
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">Outils Sincli</h2>
          <p className="text-gray-600">
            Déployez vos lambdas et gérez vos données avec les commandes sincli
          </p>
        </Card>
      </div>

      <div className="text-center">
        <Card className="inline-block">
          <h3 className="text-lg font-semibold mb-4">Compteur de test</h3>
          <p className="text-3xl font-bold mb-4">{count}</p>
          <div className="space-x-4">
            <Button onClick={() => setCount(count + 1)}>Incrémenter</Button>
            <Button variant="secondary" onClick={() => setCount(0)}>
              Réinitialiser
            </Button>
          </div>
        </Card>
      </div>

      <footer className="mt-16 text-center text-gray-500">
        <p>
          Consultez la documentation dans{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">docs/</code>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
