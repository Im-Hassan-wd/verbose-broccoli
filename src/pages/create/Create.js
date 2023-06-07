import { useState } from "react";

//styles
import "./Create.css";

// hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useDocument } from "../../hooks/useDocument";
import { useTheme } from "../../hooks/useTheme";

export default function Create() {
  const { user } = useAuthContext();
  const { color } = useTheme();
  const { document: currrentUser } = useDocument("users", user.uid);

  const localColor = localStorage.getItem("color");

  const { addDocument, response } = useFirestore("posts");
  const [add, setAdd] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);

  const handleFileChange = (e) => {
    setImage(null);
    let selected = e.target.files[0];

    if (!selected) {
      setImageError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setImageError("Selected file must be an image");
      return;
    }

    setImageError(null);
    setImage(selected);
    console.log("thumbnail updated");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const author = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
      headline: currrentUser.headline,
    };

    const post = {
      title,
      content,
      comments: [],
      likes: [],
      share: "",
      bookmarks: [],
      expands: 0,
      views: [],
      author,
    };

    await addDocument(post, image);
    if (!response.error) {
      // resetting the fields
      setTitle("");
      setContent(null);
      setImage("");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <button>Publish</button>
      <div className="text">
        <i
          onClick={() => setAdd(!add)}
          className={add ? "fi fi-rr-circle-xmark" : "fi fi-rr-add"}
        ></i>
        {!add ? (
          <div className="input">
            <input
              type="text"
              required
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <textarea
              required
              placeholder="Write a post..."
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>
        ) : null}
      </div>
    </form>
  );
}
