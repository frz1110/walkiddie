import './Navbar.css';
import './ButtonColor.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ReactComponent as WalkiddieLogo } from '../../walkiddie.svg';
import { NavLink, Link } from 'react-router-dom'
import NavProfile from '../NavProfile/NavProfile';
import { connect } from 'react-redux';
import { logout, load_profile } from '../../actions/auth';
import profile from '../../page/Profile/user.svg';

const Navbar = ({isLoggedIn, handleLogout, userData}) => {
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [income, setIncome] = useState('');

  const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
    }
};


  useEffect(() => {
        const fetchData = async () => {
            try {
              setEmail(userData.email)
              setName(userData.first_name)
              setRole(userData.role)
              const result = await load_profile()(email);
              setImage(result.res.data.profile_picture);
              const ringkasan_investasi = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/ringkasan-investor/`, config);
              const pendapatan_investasi = 0
              if (ringkasan_investasi.data.length>0) {
                  pendapatan_investasi = ringkasan_investasi.data[0].pendapatan
              }
              setIncome(pendapatan_investasi);
            }
            catch (err) {
              setImage(profile)
            }
        }
        fetchData();
    }, );

  return ( 
    <div className="wkd-navbar-container" data-testid='navbar'>
      <nav className="wkd-navbar">
        <div className="wkd-nav-logo">
          <NavLink to="/" data-testid='nav-logo'>
            <WalkiddieLogo />
          </NavLink>
        </div>
        {!isLoggedIn && <div className="wkd-nav-dummy"/>}
        <div className="wkd-nav-menu">
            <NavLink to="/bantuan" activeClassName="wkd-active">Bantuan</NavLink>
        </div>
        <div className={ isLoggedIn ? "wkd-nav-buttons" : "wkd-nav-buttons wkd-guest"}>
          {!isLoggedIn && <button className="wkd-nav-button wkd-light-tosca-button"><Link to="/masuk"><span>Masuk </span></Link></button>}
          {!isLoggedIn && <button className="wkd-nav-button wkd-dark-green-button"><Link to="/daftar-investor">Daftar</Link></button>}
          {isLoggedIn && <p data-testid='pendapatan-investasi'>Rp{income}</p>}
          {isLoggedIn && <NavProfile handleLogout={handleLogout} image={image} name={name} role={role} data-testid='nav-profile'/>}
        </div>
      </nav>
    </div>
    );
}
 
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isAuthenticated,
  userData: state.auth.user
})
export default connect(mapStateToProps, {handleLogout: logout})(Navbar);
