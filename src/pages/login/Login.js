import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useGoogle } from "../../hooks/useGoogle";
import GoogleButton from "../../components/GoogleButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textType, setTextType] = useState(false);
  const { login, isPending, error } = useLogin();
  const {
    googleSignIn,
    error: signinError,
    isPending: signinPending,
  } = useGoogle();

  const handleInputType = (e) => {
    setTextType(!textType);
    textType
      ? e.target.previousElementSibling.setAttribute("type", "password")
      : e.target.previousElementSibling.setAttribute("type", "text");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-img-div">
        <div className="text">
          <h1>Chatter</h1>
          <p>
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>
        </div>
        <img src="./img/bg.png" alt="intro" className="auth-img" />
      </div>

      <div className="auth-content">
        <div className="link">
          <Link to="/signup">Register</Link>
          <Link className="active" to="/login">
            Login
          </Link>
        </div>

        <h3>Welcome back!</h3>

        <div className="input-div">
          <label htmlFor="email">
            <i className="fi fi-rr-envelope"></i>
          </label>
          <input
            id="email"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email Address"
          />
        </div>

        <div className="input-div">
          <label htmlFor="password">
            <i className="fi fi-rr-lock"></i>
          </label>
          <input
            id="password"
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
          <i
            onClick={handleInputType}
            className={textType ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye"}
          ></i>
        </div>

        {!isPending && <button className="btn">Login</button>}
        {isPending && (
          <button className="btn" disabled>
            Logging In...
          </button>
        )}

        <GoogleButton
          handleSign={googleSignIn}
          error={signinError}
          isPending={signinPending}
          text="Signin with Google"
        />

        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
}
