import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useTheme } from "./hooks/useTheme";
import "./App.css";

// pages & components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Post from "./pages/post/Post";
import Settings from "./pages/settings/Settings";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Analytics from "./pages/analytics/Analytics";
import Interest from "./pages/interest/Interest";

function App() {
  const { user, authIsReady } = useAuthContext();
  const { mode } = useTheme();

  // states
  const [mobileMenu, setMobileMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    // cleanup function
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <div className={`App ${mode}`}>
      {mobileMenu && (
        <div className="backdrop" onClick={() => setMobileMenu(false)}></div>
      )}
      {authIsReady && (
        <BrowserRouter>
          {user && (
            <Sidebar
              screenWidth={screenWidth}
              mobileMenu={mobileMenu}
              setMobileMenu={setMobileMenu}
            />
          )}
          <div className="container">
            {user && (
              <Navbar
                screenWidth={screenWidth}
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
              />
            )}
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                {user && <Home />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/interest" />}
                {!user && <Login />}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/interest" />}
                {!user && <Signup />}
              </Route>
              <Route path="/interest">
                {!user && <Redirect to="/login" />}
                {user && <Interest />}
              </Route>
              <Route exact path="/posts/:id">
                {!user && <Redirect to="/login" />}
                {user && <Post />}
              </Route>
              <Route path="/posts/:id/analytics">
                {!user && <Redirect to="/login" />}
                {user && <Analytics />}
              </Route>
              <Route path="/settings">
                {!user && <Redirect to="/login" />}
                {user && <Settings />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
