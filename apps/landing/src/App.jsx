import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = React.useState(false);

  React.useEffect(() => {
    if (location.pathname !== '/') {
      setShowNavbar(true);
      return;
    }

    setShowNavbar(false);
  }, [location.pathname]);

  return (
    <>
      {location.pathname === '/' ? <Navbar isVisible={showNavbar} /> : null}
      <Routes>
        <Route path="/" element={<Home onHeroCtaVisibilityChange={setShowNavbar} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;