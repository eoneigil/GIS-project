import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");sessionStorage

  if (isLoggedIn !== "true") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
