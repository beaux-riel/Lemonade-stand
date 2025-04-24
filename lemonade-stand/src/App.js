import logo from './logo.svg';
import './styles/tailwind.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <header className="text-center">
        <img src={logo} alt="logo" className="w-48 h-48 mx-auto mb-4"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
