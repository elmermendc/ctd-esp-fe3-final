import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { ContextGlobal } from './utils/global.context';

const Navbar = () => {

  const { theme, setTheme } = useContext(ContextGlobal);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className={theme === 'dark' ? 'dark' : 'light'}>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
        <li><Link to="/favs">Favoritos</Link></li>
      </ul>
      <button onClick={toggleTheme} className="theme-toggle-button">
        {theme === 'dark' ? '🌞' : '🌜'}
      </button>
    </nav>
  )
}

export default Navbar