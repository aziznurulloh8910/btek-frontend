import React from 'react';
import {
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
// import CharacterDetail from './pages/CharacterDetail';
// import CharacterList from './pages/CharacterList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Home /></RequireAuth>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/profile',
    element: <RequireAuth><Profile /></RequireAuth>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
