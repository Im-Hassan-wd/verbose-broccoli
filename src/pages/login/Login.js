import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

// styles
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="logo">
        <i className="fi fi-sr-comment-quote"></i>
        <span>Chatter</span>
      </div>

      <h3>Welcome!</h3>
      <p>Login to your account</p>

      <div className="input-div">
        <i className="fi fi-rr-envelope"></i>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email Address"
        />
      </div>

      <div className="input-div">
        <i className="fi fi-rr-lock"></i>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
      </div>

      <small>
        Don't have an account? <Link to="/signup">Signup</Link>
      </small>

      <div className="btn-wrap">
        {!isPending && <button className="btn">Login</button>}
        {isPending && (
          <button className="btn" disabled>
            logging in...
          </button>
        )}
      </div>
      {error && <small className="error">{error}</small>}
    </form>
  );
}
