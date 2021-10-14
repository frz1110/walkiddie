import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Activate from './page/Aktivasi/Aktivasi';
import DaftarToko from './page/DaftarToko/DaftarToko';
import VerifToko from './page/DaftarToko/VerifikasiToko';
import PengadaanMainan from './page/PengadaanMainan/PengadaanMainan';
import DetailPengadaan from './page/DetailPengadaan/DetailPengadaan';
import ListOwnedPengadaan from './page/ListOwnedPengadaan/ListOwnedPengadaan';
import HomepageInvestor from './page/HomepageInvestor/HomepageInvestor';
import HomepagePemilikToko from './page/HomepagePemilikToko/HomepagePemilikToko';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Registrasi from './page/Registrasi/Registrasi';
import Profile from './page/Profile/Profile';
import Login from './page/Login';
import ResetPassword from './page/ResetPassword/ResetPassword';
import ResetPasswordConfirm from './page/ResetPassword/ResetPasswordConfirm';
import RingkasanSales from './page/RingkasanSales/RingkasanSales';
import Layout from './hocs/Layout';
import { fetch_user } from './util/prerender';
import { Provider } from 'react-redux';
import MembuatInvestasi from './page/MembuatInvestasi/MembuatInvestasi';
import OnboardingFaq from './page/OnboardingFaq/OnboardingFaq';
import DetailInvestasi from './page/DetailInvestasi/DetailInvestasi';

import store from './store';
import HomepageOperator from './page/HomepageOperator/HomepageOperator';

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
                <Registrasi role="Investor" />
              </Route>
              <Route path="/daftar-mitra">
                <Registrasi role="Mitra" />
              </Route>
              <Route path="/daftar-operator">
                <Registrasi role="Operator" />
              </Route>
              <Route path="/bantuan">
                <OnboardingFaq />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/aktivasi/:uid/:token" component={Activate}>
              </Route>
              <Route path="/daftar-toko">
                <DaftarToko />
              </Route>
              <Route path="/verif-toko">
                <VerifToko />
              </Route>
              <Route path="/pengadaan-mainan">
                  <PengadaanMainan />
                </Route>
                <Route path={"/investasi/:pk"} component={MembuatInvestasi}>
                </Route>
                <Route path="/list-pengadaan">
                  <HomepageInvestor />
                </Route>
                <Route path={"/detail-pengadaan/:pk"} component={DetailPengadaan}>
                </Route>
                <Route path={"/detail-investasi/:pk"} component={DetailInvestasi}> 
                 {/* The route above passes an object of mergedData to DetailInvestasi, 
                 the object is provided by ListOwnedPengadaan page, this URL is also
                 called from there */}
                </Route>
                <Route path="/pemilik-toko">
                  <HomepagePemilikToko />
                </Route>
                <Route path="/investor">
                  <ListOwnedPengadaan />
                </Route>
                <Route path="/operator">
                  <HomepageOperator />
                </Route>
                <Route path="/reset-password">
                  <ResetPassword />
                </Route>
                <Route path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
              <Route path="/investasi">
                <MembuatInvestasi />
              </Route>
              <Route path="/ringkasan-sales">
                <RingkasanSales />
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
