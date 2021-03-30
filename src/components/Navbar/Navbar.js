import './Navbar.css';
import './ButtonColor.css';
import { ReactComponent as WalkiddieLogo } from '../../walkiddie.svg';
import { NavLink, Link } from 'react-router-dom'
import NavProfile from '../NavProfile/NavProfile';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({isLoggedIn, handleLogout}) => {
  return ( 
    <div className="wkd-navbar-container" data-testid='navbar'>
      <nav className="wkd-navbar">
        <div className="wkd-nav-logo">
          <NavLink to="/" data-testid='nav-logo'>
            <WalkiddieLogo />
          </NavLink>
        </div>
        <div className="wkd-nav-menu">
            <NavLink to="/bantuan" activeClassName="wkd-active">Bantuan</NavLink>
        </div>
        <div className={ isLoggedIn ? "wkd-nav-buttons" : "wkd-nav-buttons wkd-guest"}>
          {!isLoggedIn && <button className="wkd-nav-button wkd-light-tosca-button"><Link to="/masuk">Masuk</Link></button>}
          {!isLoggedIn && <button className="wkd-nav-button wkd-dark-green-button"><Link to="/daftar-investor">Buat Akun</Link></button>}
          {isLoggedIn && <NavProfile handleLogout={handleLogout} data-testid='nav-profile'/>}
        </div>
      </nav>
    </div>
    );
}
 
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {handleLogout: logout})(Navbar);
