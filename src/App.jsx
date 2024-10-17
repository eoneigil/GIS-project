import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entrance from './Entrance.jsx';
import MainPage from './components/MainPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { UserProvider } from './context/UserContext.jsx';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Entrance />} />
          <Route path="/main" element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;