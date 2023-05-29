import { useGoogle } from "../hooks/useGoogle";

// styles
import "./GoogleButton.css";
import GoogleImg from "../assets/img/google.png";

export default function GoogleButton({ text }) {
  const {
    googleSignIn,
    isPending: googlePending,
    error: googleError,
  } = useGoogle();

  return (
    <div
      className="google-button"
      tabIndex={0}
      role="button"
      onClick={googleSignIn}
    >
      <img src={GoogleImg} alt="google" className="google-icon" />
      {!googlePending && <div className="google-text">{text}</div>}
      {googlePending && <div className="google-text">Loading...</div>}
    </div>
  );
}
