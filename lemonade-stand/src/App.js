import React from 'react';
import ComponentShowcase from './components/ComponentShowcase';
import './styles/tailwind.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-lemonade-yellow shadow-playful py-6 mb-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-display text-gray-800">Lemonade Stand</h1>
          <p className="text-gray-700">A platform for managing lemonade stands and their products</p>
        </div>
      </header>
      <main>
        <ComponentShowcase />
      </main>
    </div>
  );
}

export default App;
