import { useHistory } from "react-router-dom";

// styles
import "./Interest.css";

// components and hooks
import { useTheme } from "../hooks/useTheme";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { useDocument } from "../hooks/useDocument";

const interests = [
  { src: "./img/tech.png", value: "Technology" },
  { src: "./img/music.png", value: "Entertaiment" },
  { src: "./img/sport.png", value: "Sport" },
  { src: "./img/art.png", value: "Art" },
  { src: "./img/reading.png", value: "Reading" },
];

// intresest to add when populated
const selectedInterets = [];
console.log(selectedInterets);

export default function Interest() {
  const history = useHistory();
  const { mode, color } = useTheme();
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("users");

  const handleClick = async (interest) => {
    selectedInterets.push(interest);

    await updateDocument(user.uid, {
      interests: selectedInterets,
    });
    if (!response.error) {
      console.log(selectedInterets);
    }
  };

  return (
    <div className={`interest-container ${mode}`}>
      <div className={`interest ${mode}`}>
        <h2>Interest</h2>
        <p>
          Posts are personalize based on your interests and search history.
          Learn how this works
        </p>
        <ul>
          {interests.map((i) => (
            <li key={i.value} onClick={() => handleClick(i.value)}>
              <img src={i.src} alt={i.value} />
              <p>{i.value}</p>
            </li>
          ))}
        </ul>
        <div>
          <button
            className={`color-${color}`}
            onClick={() => history.push("/")}
          >
            Confirm interests
          </button>
        </div>
      </div>
    </div>
  );
}
