import { useHistory } from "react-router-dom";

// styles
import "./Confirm.css";

// hooks
import { useFirestore } from "../hooks/useFirestore";
import { useDocument } from "../hooks/useDocument";
import { useCollection } from "../hooks/useCollection";

export default function Confirm({ title, item, type, setIsConfirm, post }) {
  const history = useHistory();

  const { deleteDocument: deletePostDoc, response: postResponse } =
    useFirestore("posts");
  const { deleteDocument: deleteBookmarkDoc, response: bookmarkResponse } =
    useFirestore("bookmarks");
  const { documents } = useCollection("bookmarks");

  // bookmark to delete
  const bookmark =
    documents &&
    documents.filter((document) => {
      return document.postId === post.id;
    });

  const handleDelete = async () => {
    await deletePostDoc(post.id);
    if (bookmark.length > 0) {
      await deleteBookmarkDoc(bookmark[0].id);
      if (!bookmarkResponse.error) {
        console.log("bookmark deleted");
      }
    }
    if (!postResponse.error) {
      if (history.location.pathname.includes("posts post")) {
        history.push("/");
      }
      console.log("post deleted successfully");
    }
  };

  return (
    <div className="confirm-overlay">
      <div className="confirm-popup">
        <h3>{title}</h3>
        <p>
          Are sure you want to {type} this {item}?
        </p>
        <p>You can't undo this action.</p>
        <div className="error">
          <span>
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
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>

            <h4>Warning</h4>
          </span>
          <span>
            {type}ing this post will also remove it from bookmarks and all
            places this post is referred
          </span>
        </div>
        <div className="btns">
          <button onClick={() => setIsConfirm(false)}>Cancel</button>
          {!postResponse.isPending && (
            <button onClick={handleDelete}>Delete</button>
          )}
          {postResponse.isPending && (
            <button onClick={handleDelete} disabled>
              Deleting...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
