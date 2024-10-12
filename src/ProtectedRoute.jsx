import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn"); // Проверяем sessionStorage

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (isLoggedIn !== "true") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
