import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useTheme } from "./hooks/useTheme";
import "./App.css";

// pages & components & hooks
import Analytic from "./pages/analytics/Analytic";
import Analytics from "./pages/analytics/Analytics";
import Settings from "./pages/settings/Settings";
import Sidebar from "./components/Sidebar";
import Signup from "./pages/signup/Signup";
import Search from "./pages/search/Search";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Post from "./pages/post/Post";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Create from "./pages/create/Create";
import Bookmark from "./pages/bookmark/Bookmark";
import Landing from "./pages/landing/Landing";

function App() {
  const { user, authIsReady } = useAuthContext();
  const { mode } = useTheme();
  const localMode = localStorage.getItem("mode");

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
    <div className={localMode ? `App ${localMode}` : `App ${mode}`}>
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
                <Landing />
              </Route>
              <Route exact path="/posts">
                {user ? <Home sw={screenWidth} /> : <Redirect to="/login" />}
              </Route>
              <Route path="/create-post">
                {user ? <Create /> : <Redirect to="/" />}
              </Route>
              <Route path="/login">
                {!user ? <Login /> : <Redirect to="/posts" />}
              </Route>
              <Route path="/signup">
                {!user ? <Signup /> : <Redirect to="/posts" />}
              </Route>
              <Route exact path="/bookmarks">
                {user ? <Bookmark /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/posts/:id">
                {user ? <Post /> : <Redirect to="/" />}
              </Route>
              <Route path="/posts/:id/analytics">
                {user ? <Analytics /> : <Redirect to="/" />}
              </Route>
              <Route path="/my-posts/analytic">
                {user ? <Analytic /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/settings">
                {user ? <Settings /> : <Redirect to="/" />}
              </Route>
              <Route path="/search">
                {user ? <Search /> : <Redirect to="/" />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
