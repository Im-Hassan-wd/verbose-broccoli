// styles
import "./Interest.css";

const interests = [
  { src: "./tech.png", value: "Technology" },
  { src: "", value: "Entertaiment" },
  { src: "", value: "Sport" },
  { src: "", value: "Art" },
  { src: "", value: "Reading" },
];

export default function Interest() {
  return (
    <div>
      <h2>Interest</h2>

      <ul>
        {interests.map((i) => (
          <li key={i.value}>
            <img src={i.src} alt={i.value} />
          </li>
        ))}
      </ul>
    </div>
  );
}
