import { useState } from "react";
import { useHistory } from "react-router-dom";

// styles
import "./Searchbar.css";

export default function Searchbar({ setMobileMenu }) {
  const [term, setTerm] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/search?q=${term}`);

    setTerm("");
    setMobileMenu(false);
  };

  return (
    <div className="searchbar">
      <form className="seachbar-input-div" onSubmit={handleSubmit}>
        <i className="fi fi-rr-search"></i>

        <input
          type="text"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          required
          placeholder="Explore chatter..."
        />
      </form>
    </div>
  );
}
