import React, { useEffect, useState } from "react";
import Reply from "./Reply";
import DeleteConfimation from "./DeleteConfimation";

export const Comment = ({ comment, currentUser, onDeleteClick }) => {
  const [replies, setReplies] = useState(comment.replies);
  const [currentReply, setCurrentReply] = useState("");
  const [deleteReply, setDeleteReply] = useState("");
  const [showConfimation, setShowConfirmation] = useState(false);

  // reply
  function show_reply_form(id) {
    if (id == currentReply) {
      setCurrentReply("");
    } else {
      setCurrentReply(id);
      console.log(`CurrentReply: ${currentReply}`);
    }
  }
  function handleReply(e) {
    e.preventDefault();
    console.log(e.target[0].value);
    let reply = {
      id: replies.length + 1,
      content: e.target[0].value,
      createdAt: "Now",
      score: 1,
      user: currentUser,
      replyingTo: comment.user.username,
    };
    setReplies([...replies, reply]);
    setCurrentReply("");
  }
  // delete reply
  function showDeleteConfirmation(id) {
    console.log(`Comment to be deleted: ${id}`);
    setDeleteReply(id);
    setShowConfirmation(true);
  }
  function handleDeleteReply(status) {
    if (status) {
      let newReplies = replies.filter((reply) => reply.id != deleteReply);
      setReplies(newReplies);
    }
    setShowConfirmation(false);
    setDeleteReply("");
  }

  return (
    <>
      <div key={comment.id} className="comment">
        <div className="score">
          <img src="./images/icon-plus.svg" alt="Add score" />
          <span>{comment.score}</span>
          <img src="./images/icon-minus.svg" alt="Minus score" />
        </div>
        <div className="comment-content">
          <div className="person">
            <div>
              <img
                src={comment.user.image ? comment.user.image.png : ""}
                alt="User icon"
              />
              <span className="username">{comment.user.username}</span>
              <span className="createdAt">{comment.createdAt}</span>
            </div>
            <button
              value={comment.id}
              onClick={() => show_reply_form(comment.id)}
            >
              <img src="./images/icon-reply.svg" alt="Reply" />
              Reply
            </button>
            {/* <div className="delete-reply-btns">
              <button className="delete-btn">
                { currentUser.username == "juliusomo" ? (
                  <>
                    <img
                      src="./images/icon-delete.svg"
                      alt="Delete"
                      id="delete-icon" />
                    Delete
                  </>
                ) : (
                  ""
                ) }
              </button>
              <button className="reply-btn">
                <img
                  src={ currentUser.username == "juliusomo"
                    ? "./images/icon-edit.svg"
                    : "./images/icon-reply.svg" }
                  alt="Reply" />
                { currentUser.username == "juliusomo" ? (
                  "Edit"
                ) : (
                  "Reply"
                ) }
              </button>
            </div> */}
          </div>
          <div className="comment-text">
            <p>{comment.content}</p>
          </div>
        </div>
      </div>
      <div className="reply-container">
        {replies.length > 0 &&
          replies.map((reply) => {
            return (
              <Reply
                reply={reply}
                username={currentUser.username}
                onDeleteReply={() => showDeleteConfirmation(reply.id)}
              />
            );
          })}
      </div>
      {comment.id == currentReply ? (
        <form onSubmit={handleReply} class="new-comment new-reply">
          <img src={currentUser ? currentUser.image.png : ""} alt="User Icon" />
          <textarea
            name="comment"
            id="new-comment"
            cols="70"
            rows="40"
            placeholder="Add a reply..."
          ></textarea>
          <button type="submit" id="btn-send">
            REPLY
          </button>
        </form>
      ) : (
        <></>
      )}
      {showConfimation ? (
        <DeleteConfimation handleConfirmationButtons={handleDeleteReply} />
      ) : (
        ""
      )}
    </>
  );
};
