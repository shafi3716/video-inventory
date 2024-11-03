import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './page/Login';
import Register from './page/Register';

const App: React.FC = () => {
  return (
   <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
