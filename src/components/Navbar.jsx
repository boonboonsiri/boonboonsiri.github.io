import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';

const navItems = [
  { to: '/photography', label: 'Photography' },
  { to: '/posts', label: 'Posts' }
];

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Primary">
        <div className="navbar-left">
          <Link className="brand" to="/">
            Boon Boonsiri
          </Link>

          <div className="nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' is-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
