import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import GoogleButton from "../../components/GoogleButton";

// styles
import "./Signup.css";
import { useGoogle } from "../../hooks/useGoogle";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [headline, setHeadline] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();
  const { googleSignUp, signupError, isPending: signupPending } = useGoogle();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password, displayName, headline, thumbnail);
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
    if (selected.size > 1000000) {
      setThumbnailError("Image file size must be less than 1000kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated");
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form sign-form">
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
          <Link className="active" to="/signup">
            Register
          </Link>
          <Link to="/login">Login</Link>
        </div>

        <h3>Register as a Writer/Reader</h3>

        {/* <GoogleButton
          handleSign={googleSignUp}
          error={signupError}
          isPending={signupPending}
          text="Sign up with Google"
        />

        <p> or </p> */}

        <div className="input-div">
          <label htmlFor="name">
            <i className="fi fi-rr-id-card-clip-alt"></i>
          </label>
          <input
            id="name"
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
          />
        </div>

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
            placeholder="Passoword"
          />
        </div>

        <div className="input-div">
          <label htmlFor="displayName">
            <i className="fi fi-rr-user"></i>
          </label>
          <input
            id="displayName"
            required
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            placeholder="Choose a display name"
          />
        </div>

        <div className="input-div">
          <label htmlFor="headline">
            <i className="fi fi-rr-briefcase"></i>
          </label>
          <input
            id="headline"
            required
            type="text"
            onChange={(e) => setHeadline(e.target.value)}
            value={headline}
            placeholder="Headline"
          />
        </div>

        <div className="input-div">
          <label htmlFor="file">
            <i className="fi fi-rr-picture"></i>
          </label>
          <input id="file" required type="file" onChange={handleFileChange} />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </div>

        {!isPending && <button className="btn">Sign up</button>}
        {isPending && (
          <button className="btn" disabled>
            Signing Up...
          </button>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
}
