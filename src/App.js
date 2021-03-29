import './App.css';
import RegistrasiInvestor from './components/RegistrasiInvestor/RegistrasiInvestor';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Switch>
              <Route path="/masuk">
                
              </Route>
              <Route path="/daftar-investor">
                <RegistrasiInvestor />
              </Route>
              <Route path="/daftar-mitra">
                
              </Route>
              <Route path="/bantuan">
                
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
