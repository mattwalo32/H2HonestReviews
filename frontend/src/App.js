import './App.css';
import React, {useState, useEffect} from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Navigation from "./Navigation";
import WaterGallery from "./pages/WaterGalleryPage/WaterGallery";
import ManufacturerGallery from "./ManufacturerGallery";
import Profile from "./Profile";
import LoginPage from "./pages/LoginPage/LoginPage"
import DetailsPage from './pages/DetailsPage/DetailsPage';
import AddStuff from './AddStuff';

function App() {
    const [isUserAuthenticated, setUserAuthenticated] = useState(false);
    const [userData, setUserData] = useState({});

    function renderApp() {
      if (!isUserAuthenticated)
        return <LoginPage onAuthChange={setUserAuthenticated} onUserDataChange={setUserData} />

      return (
      <Router>
        <Route
          path="/"
          exact
          component={() => (
            <Navigation content={<Home />} page="home" needsAuth={false} />
          )}
        />
        <Route
          path="/gallery"
          component={() => (
            <Navigation
              content={<WaterGallery userData={userData}/>}
              page="gallery"
              needsAuth={false}
            />
          )}
        />
        <Route
          path="/manufacturers"
          component={() => (
            <Navigation
              content={<ManufacturerGallery />}
              page="manufacturers"
              needsAuth={false}
            />
          )}
        />
        <Route
          path="/profile"
          component={() => (
            <Navigation
              content={<Profile userData={userData} />}
              page="profile"
              needsAuth={false}
            />
          )}
        />
        <Route
          path="/addstuff"
          component={() => (
            <Navigation
              content={<AddStuff />}
              page="addstuff"
              needsAuth={false}
            />
          )}
        />
        <Route
          path="/waters/:waterId"
          component={() => (
            <DetailsPage userData={userData} />
          )}
        />
      </Router>
      );
    }

    return renderApp();
}

export default App;
