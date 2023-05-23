import { useLocation } from "react-router-dom";

// styles
import "./Search.css";

// hooks and components
import { useCollection } from "../../hooks/useCollection";
import { useEffect } from "react";
import PostList from "../../components/PostList";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const { documents, error } = useCollection("posts");

  const posts =
    documents &&
    documents.filter(
      (doc) =>
        doc.content.toLowerCase().includes(query.toLocaleLowerCase()) ||
        doc.author.displayName.toLowerCase().includes(query.toLocaleLowerCase())
    );

  return (
    <>
      {posts && (
        <div className="search">
          <h2 className="navigation">
            Posts including "{query}" ({posts.length})
          </h2>
          <PostList posts={posts} />
        </div>
      )}
    </>
  );
}
