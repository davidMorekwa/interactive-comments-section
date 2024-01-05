import { useEffect, useState } from "react";
import { Comment } from "./Comment";

function App() {
  const [datasetComments, setdatasetComments] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    image: {
      png: "",
      webp: "",
    },
    username: "",
  });
  const [newComment, setNewComment] = useState("");
  
  async function getData() {
    await fetch("./data.json")
      .then((response) => response.json())
      .then((result) => {
        setCurrentUser(result.currentUser);
        setdatasetComments(result.comments);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  function handleAddNewComment(e) {
    e.preventDefault()
    setNewComment(e.target[0].value);
    e.target[0].value = ""
    // document.getElementById("new-comment-form").reset()
  }
  useEffect(() => {
    let comment = {
      id: datasetComments.length + 1,
      content: newComment,
      createdAt: "Now",
      score: 1,
      user: currentUser,
      replies: [],
    };
    console.log(comment);
    setdatasetComments([...datasetComments, comment]);
    // console.log(datasetComments);
  }, [newComment]);
  useEffect(() => {
    console.log("Dataset comments");
    console.log(datasetComments);
  }, [datasetComments]);

  

  return (
    <div className="App">
      {datasetComments &&
        currentUser &&
        datasetComments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              username={currentUser.username}
              currentUser={currentUser}
            />
          );
        })}
      <form onSubmit={handleAddNewComment} class="new-comment" id="new-comment-form">
        <img src={currentUser ? currentUser.image.png : ""} alt="User Icon" />
        <textarea
          name="comment"
          id="new-comment"
          cols="70"
          rows="40"
          placeholder="Add a comment..."
          defaultValue={newComment}
        ></textarea>
        <button type="submit" id="btn-send">
          SEND
        </button>
      </form>
      
    </div>
  );
}

export default App;
