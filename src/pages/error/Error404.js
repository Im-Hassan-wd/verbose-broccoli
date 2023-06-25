import { Link } from "react-router-dom";
// styles
import "./Error404.css";

export default function Error404() {
  return (
    <div className="error-container">
      {/* <img src={Notfound} alt="Error 404" className="error-image" /> */}
      <h2 className="error-heading">Oops! Page Not Found</h2>
      <p className="error-message">
        The page you are looking for does not exist.
      </p>
      <Link to="/posts" className="home-link">
        Go back to homepage
      </Link>
    </div>
  );
}
