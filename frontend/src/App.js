import './App.css';
import React, {useState, useEffect} from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Navigation from "./Navigation";
import WaterGallery from "./WaterGallery";
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
<<<<<<< HEAD
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
          path="/waters/:waterid"
=======
          path="/waters/:waterId"
>>>>>>> 9d108ce00d8f21ae2633dbecc740202ce74d9476
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
