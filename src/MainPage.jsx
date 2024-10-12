import { useMemo } from 'react';

function MainPage() {
  const name = useMemo(() => {
    return localStorage.getItem("name");
  }, []);

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      {/* Здесь можно добавить остальной контент главной страницы */}
    </div>
  );
}

export default MainPage;