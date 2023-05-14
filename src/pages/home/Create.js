import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";
import { useTheme } from "../../hooks/useTheme";

export default function Create() {
  const { user } = useAuthContext();
  const { mode, color } = useTheme();
  const history = useHistory();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const { addDocument, response } = useFirestore("posts");

  const handleFileChange = (e) => {
    setImage(null);
    let selected = e.target.files[0];
    console.log(selected);

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
    };

    const post = {
      content,
      comments: [],
      likes: [],
      share: "",
      impressions: [],
      author,
    };

    await addDocument(post, image);
    if (!response.erro) {
      history.push("/");
    }
  };

  return (
    <form className={`create-post ${mode}`} onSubmit={handleSubmit}>
      <div className="create-post-header">
        <Avatar src={user.photoURL} />
        <input
          type="text"
          placeholder="What's on your mind?"
          onChange={(e) => setContent(e.target.value)}
          value={content}
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
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
          </label>
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
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
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
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
              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
        </div>
        <div className="form-btn">
          <button className="edit">
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>

            <span>Draft</span>
          </button>
          {!response.isPending && <button>Post</button>}
          {response.isPending && <button disabled>Posting...</button>}
        </div>
      </div>
    </form>
  );
}
