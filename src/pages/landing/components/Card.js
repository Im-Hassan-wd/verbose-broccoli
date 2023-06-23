export default function Card({ title, image, body }) {
  return (
    <li className="card">
      <div className="card-img">
        <img src={image} alt="card preview" />
      </div>
      <h3 className="card-title">{title}</h3>
      <div className="card-body">{body} </div>
    </li>
  );
}
