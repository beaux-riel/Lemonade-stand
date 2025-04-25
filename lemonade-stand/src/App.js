import React from 'react';
import SupabaseTest from './components/SupabaseTest';
import './styles/tailwind.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-600">Lemonade Stand</h1>
        <p className="text-gray-600">A platform for managing lemonade stands and their products</p>
      </header>
      <main className="w-full max-w-md">
        <SupabaseTest />
      </main>
    </div>
  );
}

export default App;
