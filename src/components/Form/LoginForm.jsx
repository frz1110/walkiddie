import './LoginForm.css';
import loadingIcon from '../../media/loading-icon.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';
import { login as loginAction } from '../../actions/auth';

const initialState = {
  email: '',
  password: ''
}

function LoginForm({ login }) {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const {email, password} = formData;

  const handleSubmit = async e => {
      e.preventDefault();
      setLoading(true);
      const res = await login(email, password);
      if (!res.login) {
        setLoading(false);
        alert('Login gagal: Email atau Kata Sandi Salah')
      }
  }

  // const continueWithGoogle = async () => {
  //   try {
  //       const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:3000`)

  //       window.location.replace(res.data.authorization_url);
  //   } catch (err) {

  //   }
  // };

  return (
    <div id="login">
      <h1>Masuk <span id="walkiddie">Walkiddie</span></h1>
      <div id="login-option">
        <form role="form" onSubmit={handleSubmit}>
          <label htmlFor="email" style={{
            textAlign:'left'
          }}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="Tuliskan alamat email..."
            onChange={e => onChange(e)}
            required
            disabled={loading}
          />
          <label htmlFor="password" style={{
            textAlign:'left',
            paddingTop: '5px'
          }}>Kata Sandi</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Tuliskan kata sandi..."
            onChange={e => onChange(e)}
            required
            disabled={loading}
          />
          <button className="wkd-dark-green-button" type="submit" disabled={loading}>Masuk</button>
          <p id="reset-password"><Link to="/reset-password">Lupa kata sandi?</Link></p>
          {loading && <img src={loadingIcon} id="loading-icon" alt="loading..." />}
        </form>
        <div id="atau">
          <div className="line" />
          <p>atau</p>
          <div className="line" />
        </div>
        <div id="other-method">
          <button id="login-google">
            <img
              id="google-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google logo"
            />
            <span>
              Masuk dengan google
            </span>
          </button>
        </div>
      </div>
      <p id="daftar">Belum punya akun? <Link to="/daftar-investor">Daftar disini</Link></p>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login: loginAction })(LoginForm);
