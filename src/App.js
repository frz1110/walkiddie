import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route path="/masuk-investor">
              
            </Route>
            <Route path="/daftar-investor">
              
            </Route>
            <Route path="/masuk-mitra">
              
            </Route>
            <Route path="/daftar-mitra">
              
            </Route>
            <Route path="/tentang">
              
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
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
