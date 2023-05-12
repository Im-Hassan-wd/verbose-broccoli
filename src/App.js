import { BrowserRouter, Switch, Route } from "react-router-dom/";
import "./App.css";

// pages & components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Post from "./pages/post/Post";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      {/* {authIsReady && ( */}
      <BrowserRouter>
        <Sidebar />
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/posts/:id">
              <Post />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
      {/* )} */}
    </div>
  );
}

export default App;
