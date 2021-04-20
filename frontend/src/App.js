import './App.css';
import React, {useState, useEffect} from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Navigation from "./Navigation";
import WaterGallery from "./WaterGallery";
import ManufacturerGallery from "./ManufacturerGallery";
import Profile from "./Profile";
import LoginPage from "./pages/LoginPage/LoginPage"
import DetailsPage from './pages/DetailsPage/DetailsPage';
import AddStuff from './AddStuff';

function App() {
    const [isUserAuthenticated, setUserAuthenticated] = useState(false);

    function renderApp() {
      if (!isUserAuthenticated)
        return <LoginPage onAuthChange={setUserAuthenticated} />

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
              content={<WaterGallery />}
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
              content={<Profile />}
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
            <DetailsPage />
          )}
        />
      </Router>
      );
    }

    return renderApp();
}

export default App;
