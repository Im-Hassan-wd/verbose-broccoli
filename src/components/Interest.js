import { useHistory } from "react-router-dom";

// styles
import "./Interest.css";

// components and hooks
import { useTheme } from "../hooks/useTheme";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { useDocument } from "../hooks/useDocument";
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
  const history = useHistory();
  const { mode, color } = useTheme();
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("users");

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (interest) => {
    if (!selectedInterets.includes(interest)) {
      selectedInterets.push(interest);
    }
    setIsClicked(true);
  };

  const handleSubmit = async () => {
    await updateDocument(user.uid, {
      interests: selectedInterets,
    });
  };

  return (
    <div className="interest-container ">
      <div className="interest">
        <h2>Interest</h2>
        <p>
          Posts are personalized based on your interests and search history.
          Learn how this works
        </p>
        <ul>
          {interests.map((i) => (
            <li
              key={i.value}
              onClick={() => handleClick(i.value)}
              className={isClicked ? "active" : ""}
            >
              <img className="interest-img" src={i.src} alt={i.value} />
              <p>{i.value}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
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
