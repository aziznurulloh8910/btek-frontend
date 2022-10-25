import React from 'react';
import {
  createBrowserRouter, Navigate, RouterProvider, useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
// import CharacterDetail from './pages/CharacterDetail';
// import CharacterList from './pages/CharacterList';

function RequireAuth({ children }) {
  const location = useLocation();
  const token = window.localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Home /></RequireAuth>,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
