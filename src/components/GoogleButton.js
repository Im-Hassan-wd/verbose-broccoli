import { useEffect, useState } from "react";

// styles
import "./GoogleButton.css";
import GoogleImg from "../assets/img/google.png";

export default function GoogleButton({ isPending, text, error, handleSign }) {
  const [customError, setCustomError] = useState(null);

  useEffect(() => {
    if (error && error.includes("No document to update")) {
      setCustomError("You don't have an account yet");
    } else {
      setCustomError(error);
    }
  }, [error]);

  return (
    <>
      <div
        onClick={handleSign}
        className="google-button"
        tabIndex={0}
        role="button"
      >
        <img src={GoogleImg} alt="google" className="google-icon" />
        {!isPending && <div className="google-text">{text}</div>}
        {isPending && <div className="google-text">Loading...</div>}
      </div>
      {customError && <div className="error">{customError}</div>}
    </>
  );
}
