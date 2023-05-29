// styles
import "./GoogleButton.css";
import GoogleImg from "../assets/img/google.png";

export default function GoogleButton({ text, error, handleSign }) {
  return (
    <div
      onClick={handleSign}
      className="google-button"
      tabIndex={0}
      role="button"
    >
      <img src={GoogleImg} alt="google" className="google-icon" />
      <div className="google-text">{text}</div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
