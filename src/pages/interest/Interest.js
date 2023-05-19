// styles
import "./Interest.css";

import { useTheme } from "../../hooks/useTheme";

const interests = [
  { src: "./img/tech.png", value: "Technology" },
  { src: "./img/music.png", value: "Entertaiment" },
  { src: "./img/sport.png", value: "Sport" },
  { src: "./img/art.png", value: "Art" },
  { src: "./img/reading.png", value: "Reading" },
];

export default function Interest() {
  const { mode, color } = useTheme();

  return (
    <div className={`interest ${mode}`}>
      <h2>Interest</h2>
      <p>
        Posts are personalize based on your interests and search history. Learn
        how this works
      </p>
      <ul>
        {interests.map((i) => (
          <li key={i.value}>
            <img src={i.src} alt={i.value} />
            <p>{i.value}</p>
          </li>
        ))}
      </ul>
      <div>
        <button className={`color-${color}`}>Confirm interests</button>
      </div>
    </div>
  );
}
