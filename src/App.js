import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Activate from './page/Aktivasi/Aktivasi';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import RegistrasiInvestor from './page/RegistrasiInvestor/RegistrasiInvestor';
import RegistrasiMitra from './page/RegistrasiMitra/RegistrasiMitra';
import Login from './page/Login';
import { Provider } from 'react-redux';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/masuk">
              <Login />
            </Route>
            <Route path="/daftar-investor">
              <RegistrasiInvestor />
            </Route>
            <Route path="/daftar-mitra">
              <RegistrasiMitra />
            </Route>
            <Route path="/bantuan">

            </Route>
            <Route path="/aktivasi/:uid/:token">
                <Activate />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
      </Router>
    </Provider>
  );
}

export default App;
