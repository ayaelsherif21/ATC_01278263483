import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [showModel, setShowModel] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("currMode") ?? "dark");

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("currMode", newTheme);
    setTheme(newTheme);
  };

  return (
    <header className="container flex">
  <div className="Logo">
    <img className='navLogo' src="../../images/o-logo1.png" alt="Logo" />
  </div>

  <button 
    onClick={() => setShowModel(true)} 
    className='icon-menu navmenu flex'
  />

  <nav>
    <ul className='flex'>
      <Link to="/"><button>Home</button></Link>
      <Link to="/my-bookings"><button>My Bookings</button></Link>
      <Link to="/admin"><button>Admin</button></Link>
    </ul>
  </nav>

  {/* هنا نجمع الأزرار وأيقونة المود */}
  <div className="header-right">
    <Link to="/login"><button className="btn-auth login-btn">Login</button></Link>
    <Link to="/register"><button className="btn-auth register-btn">Register</button></Link>
    <button onClick={toggleTheme} className='mode flex'>
      {theme === "dark" ? (
        <span className='icon-moon-stars'></span>
      ) : (
        <span className='icon-sun'></span>
      )}
    </button>
  </div>

  {showModel && (
    <div className="fixed">
      <ul className='model'>
        <li>
          <button className='icon-clear' onClick={() => setShowModel(false)} />
        </li>
        <nav>
          <ul className='flex'>
            <Link to="/"><button>Home</button></Link>
            <Link to="/my-bookings"><button>My Bookings</button></Link>
            <Link to="/admin"><button>Admin</button></Link>
            <Link to="/login"><button className="btn-auth login-btn">Login</button></Link>
            <Link to="/register"><button className="btn-auth register-btn">Register</button></Link>
          </ul>
        </nav>
      </ul>
    </div>
  )}
</header>

  );
}
