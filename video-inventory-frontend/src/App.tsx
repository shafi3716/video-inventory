import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AuthRedirect from './context/AuthRedirect';
import ProtectedRoute from './context/ProtectedRoute';
import Admin from './page/Admin';
import Login from './page/Login';
import Register from './page/Register';
import User from './page/User';

const App: React.FC = () => {
  return (
   <Router>
      <div>
        <Routes>
          <Route path="/" element={<AuthRedirect><Login /></AuthRedirect>} />
          <Route path="/register" element={<ProtectedRoute><Register /> </ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /> </ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><User /> </ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
