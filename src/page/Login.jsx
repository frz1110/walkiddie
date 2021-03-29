import './Login.css';
import LoginForm from '../components/Form/LoginForm';
import { ReactComponent as Logo } from '../walkiddie.svg';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function Login({ isAuthenticated }) {
  if (isAuthenticated) return <Redirect to="/" />
  return (<main>
    <Logo width="178px" height="178px" />
    <LoginForm />
  </main>)
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Login);
