import React, { useState } from "react";

const DeleteConfimation = ({handleConfirmationButtons}) => {
  return (
    <div id="confirm-deletion-container">
      <div id="delete-confirmation-box">
        <p>Delete Comment</p>
        <p>
          Are you sure you want to delete this comment? This will remove thhe
          comment and can't be undone.
        </p>
        <div>
          <button onClick={() => handleConfirmationButtons(false)}>
            NO, CANCEL
          </button>
          <button onClick={() => handleConfirmationButtons(true)}>
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfimation;
