import './LoginForm.css';
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

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const {email, password} = formData;

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div id="login">
      <h1>Masuk <span id="walkiddie">Walkiddie</span></h1>
      <div id="login-option">
        <form role="form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="Tuliskan alamat email..."
            onChange={e => onChange(e)}
            required
          />
          <label htmlFor="password">Kata Sandi</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Tuliskan kata sandi..."
            onChange={e => onChange(e)}
            required
          />
          <button type="submit">Masuk</button>
          <p id="reset-password"><Link to="/reset-password">Lupa kata sandi?</Link></p>
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
      <p id="daftar">Belum punya akun? <Link to="/daftar-investor">daftar disini</Link></p>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login: loginAction })(LoginForm);
