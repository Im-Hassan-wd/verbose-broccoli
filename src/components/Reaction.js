// import { useTheme } from "../hooks/useTheme";
import { useState } from "react";
import { timestamp } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
// styles
import "./Reaction.css";
import { useTheme } from "../hooks/useTheme";

export default function Reaction({ post }) {
  const { updateDocument, response } = useFirestore("posts");
  const { user } = useAuthContext();
  const { color } = useTheme();
  const localColor = localStorage.getItem("color");

  const likedPost = () => {
    return post.likes.filter((like) => like.uid === user.uid);
  };

  const like = likedPost();

  // like to add
  const handleLike = async () => {
    const likeToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
      uid: user.uid,
    };

    // check whether post has been liked by user
    if (like.length && like[0].uid === user.uid) {
      console.log("you already like this post");
    } else {
      await updateDocument(post.id, {
        likes: [...post.likes, likeToAdd],
      });
    }
  };

  return (
    <div className="reaction">
      <button
        className={
          like.length && like[0].uid === user.uid
            ? localColor
              ? `color-${localColor}`
              : `color-${color}`
            : "reactions"
        }
        onClick={handleLike}
      >
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
            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
          />
        </svg>
        <span className="like r-span">
          Like
          {like.length >= 1 && <span>d</span>}
        </span>
        <span className="count">{post.likes.length}</span>
      </button>

      <button className="reactions">
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
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
        <span className="r-span">Comment </span>
        <span className="count">{post.comments.length}</span>
      </button>
      <button className="reactions">
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
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
          />
        </svg>
        <span className="r-span">Share</span>
        <span className="count">0</span>
      </button>
    </div>
  );
}
