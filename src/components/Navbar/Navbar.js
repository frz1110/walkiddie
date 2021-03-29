import './Navbar.css';
import './ButtonColor.css';
import { ReactComponent as WalkiddieLogo } from './walkiddie.svg';
import { NavLink, Link } from 'react-router-dom'
import NavProfile from '../NavProfile/NavProfile';

const Navbar = ({isLoggedIn, changeIsLoggedIn}) => {
  return ( 
    <div className="navbar-container" data-testid='navbar'>
      <nav className="navbar">
        <div className="nav-logo">
          <NavLink to="/" data-testid='nav-logo'>
            <WalkiddieLogo />
          </NavLink>
        </div>
        <div className="nav-menu">
            <NavLink to="/bantuan" activeClassName="active">Bantuan</NavLink>
        </div>
        <div className={ isLoggedIn ? "nav-buttons" : "nav-buttons guest"}>
          {!isLoggedIn && <button className="light-tosca-button"><Link to="/masuk">Masuk</Link></button>}
          {!isLoggedIn && <button className="dark-green-button"><Link to="/daftar-investor">Buat Akun</Link></button>}
          {isLoggedIn && <NavProfile handleLogout={changeIsLoggedIn} data-testid='nav-profile'/>}
        </div>
      </nav>
    </div>
    );
}
 
export default Navbar;