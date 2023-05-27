// styles
import "./Interest.css";

// components and hooks
import { useTheme } from "../hooks/useTheme";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { useState } from "react";

const interests = [
  { src: "./img/tech.png", value: "Technology" },
  { src: "./img/music.png", value: "Entertaiment" },
  { src: "./img/sport.png", value: "Sport" },
  { src: "./img/art.png", value: "Art" },
  { src: "./img/reading.png", value: "Reading" },
];

// intresest to add when populated
const selectedInterets = [];

export default function Interest() {
  const { color } = useTheme();
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("users");

  const [isClicked, setIsClicked] = useState({});

  const handleClick = (interest, index) => {
    setIsClicked((state) => ({
      ...state,
      [index]: !state[index],
    }));

    if (!selectedInterets.includes(interest)) {
      selectedInterets.push(interest);
    }
  };

  const handleSubmit = async () => {
    await updateDocument(user.uid, {
      interests: selectedInterets,
    });
  };

  return (
    <div className="interest-container ">
      <div className="interest">
        {response.error && <div className="error">An error occurred</div>}
        <h2>Interest</h2>
        <p>
          Posts are personalized based on your interests and search history.
          Learn how this works
        </p>
        <ul>
          {interests.map((i, index) => (
            <li
              key={i.value}
              onClick={() => handleClick(i.value, index)}
              className={isClicked[index] ? "active" : ""}
            >
              <img className="interest-img" src={i.src} alt={i.value} />
              <p>{i.value}</p>
              <i className="fi fi-sr-badge-check"></i>
            </li>
          ))}
        </ul>
        <div>
          <button className={`color-${color}`} onClick={handleSubmit}>
            Confirm interests
          </button>
        </div>
      </div>
    </div>
  );
}
