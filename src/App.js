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

function App() {
  const { user, authIsReady } = useAuthContext();
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            {user && <Navbar />}
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                {user && <Home />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/" />}
                {!user && <Signup />}
              </Route>
              <Route path="/settings">
                {!user && <Redirect to="/" />}
                {user && <Settings />}
              </Route>
              <Route path="/posts/:id">
                {!user && <Redirect to="/login" />}
                {user && <Post />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
