import React, { useEffect, useState } from "react";

const EntryComment = ({ submitComment, entryId, setNewComment }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  useEffect(() => {
    return () => {
      setNewComment(false);
    };
  }, []);

  return (
    <div className="post-comment">
      <textarea
        className="textarea-comment"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Write a comment..."
      ></textarea>
      <button
        className="btn btn-primary"
        onClick={() => {
          submitComment(entryId, comment);
          setComment("");
        }}
      >
        Post comment
      </button>
    </div>
  );
};

export default EntryComment;
