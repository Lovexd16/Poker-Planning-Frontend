import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

function IssueMessage({ issueId }: { issueId: string }) {
  const [issueMessages, setIssueMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchConversation = () => {
    const token = localStorage.getItem("token") || "";
    fetch(`http://localhost:8080/issue/${issueId}/conversation`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setIssueMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  };

  useEffect(() => {
    fetchConversation(); 
  }, [issueId]);

  const sendMessage = () => {
    const token = localStorage.getItem("token") || "";
    const decodedToken = jwtDecode(token);
    const loggedInUser = decodedToken.sub;
  
    const timestamp = new Date().toLocaleTimeString("sv-SE");
  
    const newMessageData = `${loggedInUser}: ${newMessage} - skickat: ${timestamp}`;
  
    setIssueMessages(prevMessages => [...prevMessages, newMessageData]);
  
    fetch(
      `http://localhost:8080/issue/${issueId}/${loggedInUser}/conversation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: newMessageData
      }
    )
      .then((res) => res.text())
      .then((data) => console.log("Message sent:", data))
      .catch((error) => console.error("Error sending message:", error));
  
    setNewMessage("");
  };

  return (
    <>
      <div className="totalchat">
        <div className="chatcontainer">
          {issueMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
        <div className="messagecontainer">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></input>
          <button className="issueButtons" onClick={sendMessage}>
            Skicka meddelande
          </button>
        </div>
      </div>
    </>
  );
}

export default IssueMessage;