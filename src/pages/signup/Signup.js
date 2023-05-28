import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

// styles
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError("Image file size must be less than 1000kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated");
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="logo">
        <i className="fi fi-sr-comment-quote"></i>
        <span>Chatter</span>
      </div>

      <h3>Welcome!</h3>
      <p>Join the world largest content creation community (:</p>

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
          placeholder="Passoword"
        />
      </div>
      <div className="input-div">
        <i className="fi fi-rr-user"></i>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          placeholder="Choose a display name"
        />
      </div>

      <div className="input-div">
        <i className="fi fi-rr-picture"></i>
        <input required type="file" onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </div>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      {!isPending && <button className="btn">Sign up</button>}
      {isPending && (
        <button className="btn" disabled>
          Signing Up...
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
