import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Activate from './page/Aktivasi/Aktivasi';
import DaftarToko from './page/DaftarToko/DaftarToko';
import HomepageInvestor from './page/HomepageInvestor/HomepageInvestor';
import HomepagePemilikToko from './page/HomepagePemilikToko/HomepagePemilikToko';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import RegistrasiInvestor from './page/RegistrasiInvestor/RegistrasiInvestor';
import RegistrasiMitra from './page/RegistrasiMitra/RegistrasiMitra';
import Profile from './page/Profile/Profile';
import Login from './page/Login';
import Layout from './hocs/Layout';
import { fetch_user } from './util/prerender';
import { Provider } from 'react-redux';
import MembuatInvestasi from './page/MembuatInvestasi/MembuatInvestasi'

import store from './store';

function App() {
  const [loading, setLoading] = useState(true);
  if (loading) fetch_user(store, setLoading);
  if (loading) return <p>Loading...</p>;
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <Layout>
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
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/aktivasi/:uid/:token" component={Activate}>
              </Route>
              <Route path="/daftar-toko">
                <DaftarToko />
              </Route>
              <Route path="/investasi">
                <MembuatInvestasi />
              </Route>
            <Route path="/investor">
              <HomepageInvestor />
            </Route>
            <Route path="/pemilik-toko">
              <HomepagePemilikToko />
            </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Layout>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
