// styles
import "./GoogleButton.css";
import GoogleImg from "../assets/img/google.png";

export default function GoogleButton({ text }) {
  return (
    <div className="google-button" tabIndex={0} role="button">
      <img src={GoogleImg} alt="google" className="google-icon" />
      <div className="google-text">{text}</div>
    </div>
  );
}
