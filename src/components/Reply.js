import React, { useState } from "react";

const Reply = ({ reply, username, onDeleteReply }) => {
  const [replyContent, setReplyContent] = useState(reply.content)
  const [editReply, setEditReply] = useState(
    reply.user.username == username ? reply.content : ""
  );
  const [showEditForm, setShowEditForm] = useState(false);

  function showEditCommentForm() {
    setShowEditForm(true);
    console.log(showEditForm);
  }
  function handleEdiReply(e) {
    e.preventDefault();
    setEditReply(e.target.value);
  }
  function updateReply(e){
    e.preventDefault()
    setReplyContent(editReply)
    setShowEditForm(false)
  }

  return (
    <>
      <div key={reply.id}>
        <div className="reply">
          <div className="score">
            <img src="./images/icon-plus.svg" alt="Add score" />
            <span>{reply.score}</span>
            <img src="./images/icon-minus.svg" alt="Add score" />
          </div>
          <div className="comment-content">
            <div className="person">
              <div>
                <img src={reply.user.image.png} alt="User icon" />
                <span className="username">{reply.user.username}</span>
                {reply.user.username == username ? (
                  <span id="you">you</span>
                ) : (
                  <span></span>
                )}
                <span className="createdAt">{reply.createdAt}</span>
              </div>
              <div className="delete-reply-btns">
                <button className="delete-btn" onClick={onDeleteReply}>
                  {reply.user.username == username ? (
                    <>
                      <img
                        src="./images/icon-delete.svg"
                        alt="Delete"
                        id="delete-icon"
                      />
                      Delete
                    </>
                  ) : (
                    ""
                  )}
                </button>
                <button
                  className="reply-btn"
                  onClick={() =>
                    reply.user.username == username ? showEditCommentForm() : ""
                  }
                >
                  <img
                    src={
                      reply.user.username == username
                        ? "./images/icon-edit.svg"
                        : "./images/icon-reply.svg"
                    }
                    alt="Reply"
                  />
                  {reply.user.username == username ? "Edit" : "Reply"}
                </button>
              </div>
            </div>
            <div className="comment-text">
              {showEditForm ? (
                <form class="edit-comment-form">
                  <textarea
                    name="comment"
                    id="edit-comment-textarea"
                    cols="150"
                    rows="40"
                    placeholder="Add a reply..."
                    defaultValue={editReply}
                    onChange={handleEdiReply}
                  ></textarea>
                  <button type="submit" id="btn-send" onClick={updateReply}>
                    UPDATE
                  </button>
                </form>
              ) : (
                <p>
                  <span id="replyingTo">{"@" + reply.replyingTo}</span>{" "}
                  {replyContent}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reply;
