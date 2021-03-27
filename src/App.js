import logo from './logo.svg';
import './App.css';
import RegistrasiInvestor from './components/RegistrasiInvestor/RegistrasiInvestor';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
      <Router>
        <div className="App">
          <div className="content">
            <Switch>
              <Route path="/masuk">
                
              </Route>
              <Route path="/daftar-investor" component={RegistrasiInvestor}>
                
              </Route>
              <Route path="/daftar-mitra">
                
              </Route>
              <Route path="/bantuan">
                
              </Route>
              <Route exact path="/">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Hello World!
                  </p>
                  <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn React
                  </a>
                </header>
                <Link to='/daftar-investor'>Registrasi disini</Link>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
