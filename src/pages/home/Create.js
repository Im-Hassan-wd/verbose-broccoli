import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useDocument } from "../../hooks/useDocument";
import Avatar from "../../components/Avatar";
import { useTheme } from "../../hooks/useTheme";
import RichTextEditor from "./RichTextEditor";
// import natural from "natural";

export default function Create() {
  const { user } = useAuthContext();
  const { color } = useTheme();
  const { document: currrentUser } = useDocument("users", user.uid);

  const localColor = localStorage.getItem("color");

  const { addDocument, response } = useFirestore("posts");
  const [convertedContent, setConvertedContent] = useState(null);
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
      content: convertedContent,
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
      setConvertedContent(null);
      setImage("");
    }
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="create-post-header">
        <Avatar src={user.photoURL} />
        <RichTextEditor
          setConvertedContent={setConvertedContent}
          convertedContent={convertedContent}
        />
      </div>

      <input
        type="file"
        id="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {imageError && <div className="error">{imageError}</div>}

      <div className="action">
        <div className="icons">
          <label htmlFor="file">
            <i className="fi fi-rr-picture"></i>
          </label>
          <i className="fi fi-rr-camera"></i>
          <i className="fi fi-rr-clip"></i>
          <i className="fi fi-rr-grin"></i>
        </div>
        {image && <img src={image.name} alt="selected image" />}

        <div className="form-btn">
          <div className="edit">
            <i className="fi fi-rr-edit"></i>
            <span>Draft</span>
          </div>
          {!response.isPending && (
            <button
              style={
                localColor
                  ? { backgroundColor: `#${localColor}` }
                  : { backgroundColor: `#${color}` }
              }
            >
              Post
            </button>
          )}
          {response.isPending && (
            <button
              style={
                localColor
                  ? { backgroundColor: `#${localColor}` }
                  : { backgroundColor: `#${color}` }
              }
              disabled
            >
              Posting...
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
