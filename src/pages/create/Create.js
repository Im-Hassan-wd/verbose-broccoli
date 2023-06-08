import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const { addDocument, response } = useFirestore("posts");
  const [add, setAdd] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);

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
    if (selected.size > 5000000) {
      setImageError("Image file size must be less than 5MB");
      return;
    }

    setImageError(null);
    setImage(selected);
    console.log("thumbnail updated");
    setAdd(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const author = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
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
      history.push("/");
    }
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      {response.isPending ? (
        <button className="btn" disabled>
          Publishing...
        </button>
      ) : (
        <button className="btn">Publish</button>
      )}
      <div className="text">
        <i
          onClick={() => setAdd(!add)}
          className={add ? "add fi fi-rr-circle-xmark" : "add fi fi-rr-add"}
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
            {image && (
              <>
                <img src={imageUrl} alt="profile" className="image" />
              </>
            )}
            <textarea
              name="content"
              required
              placeholder="Write a post..."
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>
        ) : (
          <div className="files">
            <input
              id="file"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="file" role="button" tabIndex={1}>
              <i className="fi fi-rr-picture"></i>
            </label>
            <label>
              <i className="fi fi-rr-video-camera-alt"></i>
            </label>
          </div>
        )}
      </div>
    </form>
  );
}
