import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import { useState } from "react";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const changeIsLoggedIn = () => {
    setisLoggedIn(!isLoggedIn);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} changeIsLoggedIn={changeIsLoggedIn} />
        <div className="content">
          <Switch>
            <Route path="/masuk">
              
            </Route>
            <Route path="/daftar-investor">
              
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
